'use strict'

function restify(prefix = '/api/') {
  return async (ctx, next) => {
    if (ctx.request.path.startsWith(prefix)) {
      ctx.rest = (data) => {
        ctx.response.type = 'application/json'
        ctx.body = data
      }
    }
    await next()
  }
}


export default {
  restify
}
