'use strict'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
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
app.use(bodyParser())
app.use(passport.initialize())
app.use(auth.routes())
app.use(rest.restify('/api/'))
app.use(api('v1'))

app.listen(3000)
console.log('App stated at port 3000...')
