'use strict'

import Router from 'koa-router'
import uuid from 'uuid'
import passport from './passport'
import User from '../models/User'
import utils from '../utils'
import permission from './permission'

const router = new Router()

/**
 * login
 */
router.post('/auth/login', async (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.body = 'Successfully login'
      return ctx.login(user)
    } else {
      ctx.body = info
    }
  })(ctx, next)
})

/**
 * logout
 */
router.get('/auth/logout', async (ctx, next) => {
  ctx.logout()
  ctx.body = 'Successfully logged out'
})

/**
 * register
 */
router.post('/auth/register', async (ctx, next) => {
  const username = ctx.request.body.username || ''
  const password = ctx.request.body.password || ''
  if (!username || !password) {
    ctx.throw(400)
    ctx.body = 'INVALID REQUEST'
  } else {
    try {
      const now = Date.now()
      const o = {
        id: uuid.v4(),
        username: username,
        password: utils.md5(password),
        createdAt: now,
        updatedAt: now
      }

      const { user, created } = await new Promise((resolve, reject) => {
        User.findOrCreate({ where: { username: username }, defaults: o })
          .spread((user, created) => {
            resolve({ user, created })
          })
      })

      if (created) {
        ctx.status = 201
        ctx.body = {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      } else {
        ctx.status = 409
        ctx.body = 'Username conflict'
      }

    } catch (err) {
      console.log(err)
      ctx.status = 500
      ctx.body = 'INTERNAL SERVER ERROR'
    }
  }
})

export default router

