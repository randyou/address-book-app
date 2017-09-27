'use strict'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import api from './api'
import rest from './api/rest'
import auth from './auth'
import passport from './auth/passport'

process.on('uncaughtException', (err) => {
  console.error(err)
  process.exit(-1)
})

const app = new Koa()

app.proxy = true
app.use(cors())
app.use(bodyParser())
app.use(passport.initialize())
app.use(auth.routes())
app.use(rest.restify('/api/'))
app.use(api('v1'))

export default app
