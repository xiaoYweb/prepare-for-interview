const EventEmmiter = require('events')
const http = require('http')
const stream = require('stream')
const context = require('./context')
const request = require('./request')
const response = require('./response')


class Koa extends EventEmmiter {
  constructor() {
    super()
    // 多个应用之间的 ctx 不共享
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middlewares = []
  }
  use(fn) {
    this.middlewares.push(fn)
  }
  createContext = (req, res) => {
    // 多个请求之间每次请求上下文之间独立 
    const ctx = Object.create(this.context) // ctx.__proto__.__proto__ = context
    const request = Object.create(this.request)
    const response = Object.create(this.response)

    ctx.request = request
    ctx.req = request.req = req

    ctx.response = response
    ctx.res = ctx.response.res = response
    return ctx
  }
  // ctx (req,res, qpp,request,response,socket)
  handleRequest = (req, res) => {
    res.stateCode = 404
    const ctx = this.createContext(req, res)

    this.composee(ctx).then(() => {
      if (ctx.body instanceof stream) { // 数据流
        ctx.body.pipe(res)
      } else if (typeof ctx.body === 'undefined') {
        res.end('Not Found')
      } else if (typeof ctx.body === 'object') {
        res.setHeader('Content-type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(ctx.body))
      } else {
        res.end(ctx.body)
      }
    }).catch(err => {
      this.emit('error', err)
    })
  }
  // 将所有middlewares取出 串联
  composee = ctx => {
    let index = -1
    const dispatch = i => {
      if (i <= index) return Promise.reject('next() called multiple times')
      index = i
      if (this.middlewares.length === i) {
        return Promise.resolve()
      }
      return Promise.resolve(
        this.middlewares[i](ctx, () => dispatch(i + 1))
      )
    }
    return dispatch(0)
  }

  listen(...arg) {
    const server = http.createServer(this.handleRequest)
    server.listen(...arg)
  }
}

module.exports = Koa