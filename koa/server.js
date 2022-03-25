const Koa = require('koa')
// const Router = require('koa-router')
const Router = require('./koa-router')
const app = new Koa()
const router = new Router()
const port = 4001

app.use(router.routes())

router.get('/app', async (ctx, next) => {
  ctx.body = 'app'
  await next()
})

router.get('/list', async (ctx, next) => {
  
  await next()
  ctx.body = 'list'
})


app.listen(port, () => {
  console.log(`koa server is listening port ${port}`)
})


app.on('error', err => {
  console.log('catched err  --->>', err)
})