
class Layer {
  constructor(path, method, callback) {
    this.path = path
    this.method = method
    this.callback = callback
  }
  match(path, method) {
    return this.path === path && his.method === method.toLowerCase()
  }

}

class Router {
  constructor() {
    this.stack = []
  }
  routes() {
    return async (ctx, next) => {
      const { pathm, method } = ctx;
      const layers = this.stack.filter(layer => layer.match(pathm, method))
      this.compose(layers, ctx, next)
    }
  }
  compose(layers, ctx, next) {
    const dispatch = i => {
      if (i === layers.length) {
        return next()
      }
      const callback = layers[i].callback
      return Promise.resolve(
        callback(ctx, () => dispatch(i + 1))
      )
    }
    return dispatch(0)
  }
}
['get', 'post'].forEach(method => {
  Router.prototype[method] = function (path, callback) {
    const layer = new Layer(path, 'get', callback)
    this.stack.push(layer)
  }
})

module.exports = Router