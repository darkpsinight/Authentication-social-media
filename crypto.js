// Code by_me to generate ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET using 'crypto' built in nodejs
// jut copy paste both tokens from terminal and use in .env

const crypto = require('crypto')

const generateTokenSecret = () => {
  return crypto.randomBytes(64).toString('hex')
}

const ACCESS_TOKEN_SECRET = generateTokenSecret()
const REFRESH_TOKEN_SECRET = generateTokenSecret()

console.log(ACCESS_TOKEN_SECRET)
console.log(REFRESH_TOKEN_SECRET)
