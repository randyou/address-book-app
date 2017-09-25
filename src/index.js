'use strict'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import mount from 'koa-mount'
import session from "koa-session2"
import auth from './auth'
import passport from './auth/passport'
import permission from './auth/permission'

const app = new Koa()

app.proxy = true
app.use(session({ key: "SESSIONID" }))
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(mount('/', auth.routes()))

app.listen(3000)
console.log('App stated at port 3000...')
