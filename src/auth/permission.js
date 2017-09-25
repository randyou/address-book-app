'user strict'

export default (path) => {
  return async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      await next()
    } else {
      ctx.throw(401)
      ctx.body = 'Unauthorized'
    }
  }
}
