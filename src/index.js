'use strict'
import Koa from 'koa'

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>Hello, koa2!</h1>';
  await next()
})

app.listen(3000)
console.log('App stated at port 3000...')
