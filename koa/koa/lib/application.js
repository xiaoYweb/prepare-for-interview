const EventEmitter = require('events')
const http = require('http')
const compose = require('./compose')
const context = require('./context')
const request = require('./request')
const response = require('./response')


class Application extends EventEmitter {
  constructor() {
    super()
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middlewares = []
  }
  use(callback) {
    this.middlewares.push(callback)
  }

  listen(...args) {
    const server = http.createServer(this.callback())

    return server.listen(...args)
  }
  callback() {
    const fn = compose(this.middlewares)

    return (req, res) => {
      const ctx = this.createContext(req, res)
      this.handleRequest(fn, ctx)
    }
  }
  createContext(req, res) {
    const ctx = Object.create(this.context)
    const request = Object.create(this.request)
    const response = Object.create(this.response)
    ctx.request = request
    ctx.response = response

    ctx.req = request.req = req
    ctx.res = response.res = res

    return ctx
  }

  handleRequest(fn, ctx) {
    ctx.res.StatusCode = 404
    const handleResponse = () => respond(ctx)
    fn(ctx).then(handleResponse).catch(err => {
      this.emit('error', err)
    })
  }
}

function respond(ctx) {
  const result = ctx.body
  ctx.res.end(result)
}


module.exports = Application
