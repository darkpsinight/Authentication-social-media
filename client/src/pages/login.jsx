import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Login = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData
  const [typePass, setTypePass] = useState(false)

  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (auth.token) {
      history.push('/')
    }
  }, [auth.token, history])

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(userData))
  }

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Social Network</h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            name="email"
            autoComplete="email"
          />

          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="pass">
            <input
              type={typePass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
              autoComplete="password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? (
                <>
                  <AiOutlineEyeInvisible style={{ fontSize: '18px' }} />
                  Hide
                </>
              ) : (
                <>
                  {' '}
                  <AiOutlineEye style={{ fontSize: '18px' }} />
                  Show
                </>
              )}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>

        <p className="my-2">
          You don't have an account? <Link to="/register">Register Now</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
