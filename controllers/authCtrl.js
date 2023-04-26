const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body

      const newUserName = await username.toLowerCase().replace(/ /g, '')
      const userName = await Users.findOne({ username: newUserName })
      if (userName) {
        return res.status(400).json({ msg: 'This username already exists' })
      }

      const userEmail = await Users.findOne({ email })
      if (userEmail) {
        return res.status(400).json({ msg: 'This email already exists' })
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters' })
      }
      const passwordHash = await bcrypt.hash(password, 12)

      // Population dans la DB celon les entrées s'ils existes
      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender
      })

      const accessToken = createAccessToken({ id: newUser._id })
      const refreshToken = createRefreshToken({ id: newUser._id })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days = 1 month
      })

      // Remove 'password' field from user object
      // delete newUser._doc.password

      await newUser.save() // add to DB

      res.json({
        msg: 'Register Success!',
        accessToken,
        user: {
          ...newUser._doc, // newUser._doc = (newUser + more mongodb details) = all mongodb document elements = more preferable
          password: ''
        }
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await Users.findOne({ email }).populate(
        'followers following',
        '-password' // Remove password from user doc (to improve security)
      )
      if (!user) {
        return res.status(400).json({ msg: 'This email does not exist' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Password is incorrect' })
      }

      const accessToken = createAccessToken({ id: user._id })
      const refreshToken = createRefreshToken({ id: user._id })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: false,
        path: '/api/refresh_token',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
      })

      res.json({
        msg: 'Login Success!',
        accessToken,
        user: {
          ...user._doc,
          password: ''
        }
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/api/refresh_token' })
      res.json({ msg: 'Logged out!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rfToken = req.cookies.refreshToken

      if (!rfToken) {
        return res.status(400).json({ msg: 'Please login now' })
      }

      jwt.verify(
        rfToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) {
            return res.status(400).json({ msg: 'Please login now' })
          }

          const user = await Users.findById(result.id)
            .select('-password')
            .populate('followers following', '-password')

          if (!user) {
            res.status(400).json({ msg: 'User not found' })
          }

          const accessToken = createAccessToken({ id: result.id })

          res.json({ accessToken, user })
        }
      )
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = authCtrl
