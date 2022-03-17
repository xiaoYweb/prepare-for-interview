import compose from '../koa-compose'

class Layer {
  constructor(method, path, callback) {
    this.method = method
    this.path = path
    this.callback = callback
  }
  match(method, path) {
    return this.method === method.toLowerCase() && this.path === path
  }
}

class Router {
  constructor() {
    super()
    this.middlewares = []
  }
  routes() {
    return async (ctx, next) => {
      const middlewares = this.middlewares.filter(layer => layer.match(ctx.path, ctx.method))
      const composedFn = compose(middlewares)
      try {
        composedFn(ctx, next)
      } catch (err) {
        next()
      }
    }
  }
}


['get', 'post'].forEach(method => {
  Router.prototype[method] = function (callback) {
    const layer = new Layer(method, path, callback)
    this.middlewares.push(layer)
  }
})
