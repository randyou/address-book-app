'use strict'

import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import User from '../models/User'
import utils from '../utils'

const localStrategy = async (username, password, done) => {
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
}

passport.use(new LocalStrategy(localStrategy))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  return done(null, user)
})

export default passport

