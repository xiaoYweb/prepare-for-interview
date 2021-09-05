// const Koa = require('koa')
const static = require('koa-static')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const Koa = require('./koa/lib/application')
const app = new Koa()
const port = 3000

const router = new Router()
// 中间件存在执行 顺序  注册顺序
app.use(router.routes())
app.use(static(__dirname))
app.use(static(path.resolve(__dirname, 'public')))

router.get('/login1', async (ctx, next) => {
  console.log('login1')
  await next()
}) 
router.get('/login2', async (ctx, next) => {
  console.log('login2')
}) 
router.post('/name', async (ctx, next) => {
  console.log('name')
}) 
/**
 * 1. 增强 req res 
 * 2. 中间件机制 
 * 3. 错误处理
 */
// app.use((ctx) => {
//   // throw new Error('err')

//   console.log(ctx.req.url) // 原生
//   console.log(ctx.request.url) // koa
//   console.log(ctx.request.req.url) // koa - 原生
//   console.log(ctx.url) // koa

//   console.log(ctx.req.path) // 原生 undefined
//   console.log(ctx.request.path) // koa
//   console.log(ctx.request.req.path) // koa - 原生 undefined
//   console.log(ctx.path) // koa

//   console.log(ctx.req.query) // 原生 undefined
//   console.log(ctx.request.query) // koa
//   console.log(ctx.request.req.query) // koa - 原生 undefined
//   console.log(ctx.query) // koa

//   // ctx.body = 'hello' // 响应结果 
// })

/**
 * koa 会将多个中间件组合处理 将函数包装成promise 并将这几个包装行数串联期来第一个 useCallback函数 执行完成 就已经完成请求响应
 * await next() 多次调用 报错
 * ctx.body 支持 数据流输出
 */
// app.use(async (ctx, next) => {
//   ctx.body = '1'
//   console.log(1)
//   // next()
//   await next()
//   // await next() //
//   console.log(2)
//   // ctx.body = '2'
// })
// app.use( async (ctx, next) => {
//   console.log(3)
//   ctx.body = '3'
//   await sleep()
//   await next()
//   console.log(4)
//   ctx.body = '4'
// })

//ctx.body 支持 数据流输出
app.use(async (ctx, next) => {
  const filePath = path.resolve(__dirname, './koa/package.json')
  console.log("🚀 ~ file: server.js ~ line 63 ~ app.use ~ filePath", filePath)
  ctx.body = fs.createReadStream(filePath)
})

app.listen(port, () => {
  console.log(`http server is listening port ${port}`)
})

app.on('error', err => {
  console.log('catch err', err)
})


function sleep(wait = 300) {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, wait);
  })
}