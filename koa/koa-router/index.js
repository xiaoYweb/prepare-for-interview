const Layer = require('./layer')
const compose  = require('../koa-compose')


class Router {
  constructor() {
    this.stack = []
  }
  routes() {
    const stack = this.stack
    return async function(ctx, next) {
      const middlewares = stack.filter(layer => layer.match(ctx.method, ctx.url)).map(layer => layer.callback)
      const composedFn = compose(middlewares)
      try {
        await composedFn(ctx, next)
      } catch (err) {
        await next()
      }
    }
  }
  
} 

['get', 'post'].forEach(method => {
  Router.prototype[method] = function(url, callback) {
    const layer = new Layer(method, url, callback)
    this.stack.push(layer)
  }
})

module.exports = Router
