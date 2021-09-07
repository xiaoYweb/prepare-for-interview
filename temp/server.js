const Koa = require('./koa')

const port = 3000
const app = new Koa()


// app.use((ctx) => {
//   throw new Error('err')

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

//   ctx.body = 'hello' // 响应结果 
// })

app.use(async (ctx, next) => {
  ctx.body = '1'
  console.log(1)
  next()
  // await next()
  // await next() //
  console.log(2)
  ctx.body = {name: 'exo'}
})
app.use( async (ctx, next) => {
  console.log(3)
  ctx.body = '3'
  await sleep()
  await next()
  console.log(4)
  ctx.body = '4'
})

app.listen(port, () => {
  console.log(`koa server is listening port ${port}`)
})

function sleep(wait= 300) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, wait);
  })
}

app.on('error', err => {
  console.log('catch err', err)
})