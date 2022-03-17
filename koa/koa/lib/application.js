const EventEmitter = require('events')
const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
const compose = require('./compose')

class Application extends EventEmitter {
  constructor() {
    super()
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middlewares = []
  }

  use(fn) {
    this.middlewares.push(fn)
  }

  createContext(req, res) {
    const ctx = Object.create(this.context)
    const request = ctx.request = Object.create(this.request)
    const response = ctx.response = Object.create(this.response)

    // ctx.request = request
    ctx.req = request.req = response.req = req

    // ctx.response = response
    ctx.res = request.res = response.res = res


    return ctx
  }

  handleRequest = (fn, ctx) => {
    ctx.res.statusCode = 404
    const handleResponse = () => respond(ctx)
    fn(ctx).then(handleResponse).catch(err => {
      this.emit('error', err)
    })
  }

  callback = () => {
    const fn = compose(this.middlewares)

    const handleRequest = (req, res) => {
      // 每次请求需要独立创建一个 ctx对象 
      const ctx = this.createContext(req, res)
      return this.handleRequest(fn, ctx)
    }

    return handleRequest
  }
  
  listen(...args) {
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }
}

module.exports = Application



function respond(ctx) {
  const result = ctx.body
  const { res } = ctx
  res.setHeader('Content-Type', 'application/json') // 设置响应头 大小写敏感
  res.end(result)
}