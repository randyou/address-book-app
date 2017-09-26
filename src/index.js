'use strict'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import session from "koa-session2"
import api from './api'
import rest from './api/rest'
import auth from './auth'
import passport from './auth/passport'
import permission from './auth/permission'

const app = new Koa()

app.proxy = true
app.use(session({ key: "SESSIONID" }))
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(auth.routes())
app.use(rest.restify('/api/'))
app.use(api('v1'))

app.listen(3000)
console.log('App stated at port 3000...')
