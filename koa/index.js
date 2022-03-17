// const Koa = require('koa')
const Koa = require('./koa')

const app = new Koa()
const port = 4000


// app.use(ctx => {
//   console.log('ctx.url', ctx.url)
//   console.log('ctx.req.url', ctx.req.url)
//   console.log('ctx.request.url', ctx.request.url)
//   console.log('ctx.request.req.url', ctx.request.req.url)

//   console.log('ctx.path', ctx.path)


//   ctx.body = 'hello'
// })

app.use(async (ctx, next) => {
  console.log('1')
  await next()
  // await next()
  console.log('2')
  ctx.body = 'hello'
})

app.use(async (ctx, next) => {
  console.log('3')
  await next()
  console.log('4')
})

app.use(async (ctx, next) => {
  console.log('5')
  await next()
  console.log('6')
})


app.listen(port, () => {
  console.log(`koa server is listening port ${port}`)
})


app.on('error', err => {
  console.log('catched err  --->>', err)
})