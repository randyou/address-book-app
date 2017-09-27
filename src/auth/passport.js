'use strict'

import jwt from 'jsonwebtoken'
import passport from 'koa-passport'
import BearerStrategy from 'passport-http-bearer'
import LocalStrategy from 'passport-local'
import User from '../models/User'
import utils from '../utils'
import jwtconfig from '../config/jwt-config'

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const where = { where: { username: username } }
    const user = await User.findOne(where)
    if (!user) {
      return done(null, false, { error: 'Invalid username' })
    } else if (user.password === utils.md5(password)) {
      return done(null, user)
    } else {
      return done(null, false, { error: 'Invalid password' })
    }
  } catch (err) {
    return done(err, false)
  }
})

const bearerStrategy = new BearerStrategy(async (token, done) => {
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtconfig.secret, (err, decoded) => {
        if (!err) {
          resolve(decoded)
        }
        resolve(null)
      })
    })
    const where = { where: { token: token } }
    const user = await User.findOne(where)
    if (!user) {
      return done(null, false, { error: 'Invalid token' })
    }
    if (!decoded || decoded.userid !== user.id) {
      return done(null, false, { error: 'Invalid token' })
    }
    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
})

passport.use(localStrategy)
passport.use(bearerStrategy)



passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  return done(null, user)
})

const isBearerAuthenticated = function () {
  return passport.authenticate('bearer', { session: false })
}

const isLocalAuthenticated = () => {
  return passport.authenticate('local', { session: true })
}

export default passport

