const EventEmmiter = require('events')
const http = require('http')
const Stream = require('stream')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa extends EventEmmiter {
  constructor() {
    super()
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middlewares = []
  }
  createContext(req, res) {
    const context = Object.create(this.context)
    const request = Object.create(this.request)
    const response = Object.create(this.response)

    context.req = request.req = response.req = req
    context.res = request.res = response.res = res

    context.request = request
    context.response = response

    return context
  }
  handleRequest = (req, res) => {
    res.statusCode = 404
    const ctx = this.createContext(req, res)

    this.compose(ctx).then(() => {
      const { body } = ctx
      res.statusCode = 200
      
      if (typeof body === 'undefined') {
        ctx.body = 'Not Found'
      } else if (body instanceof Stream) {
        body.pipe(res)
      } else if (typeof body === 'object') {
        res.setHeader('Content-Type','application/json;charset:utf-8')
        res.end(JSON.stringify(ctx.body))
      } else {
        res.end(ctx.body)
      }
    }).catch(err => {
      this.emit('error', err)
    })
  }
  compose = (ctx) => {
    let index = -1
    const dispatch = async i => {
      if (i <= index) throw new Error('next() called mutiple times')
      index = i
      if (i === this.middlewares.length) {
        return
      }
      const fn = this.middlewares[i]
      return fn(ctx, () => dispatch(i + 1))
    }
    return dispatch(0)
  }
  use(fn) {
    this.middlewares.push(fn)
  }
  listen(...args) {
    const app = http.createServer(this.handleRequest)
    app.listen(...args)
  }
}


module.exports = Koa