const koa = require('koa')
const Koa = require('../2021zf/node/koa/lib/application')

const app = new Koa()
const port = 3000


app.use(ctx => {
  console.log('path', ctx.path)
})
app.listen(port, () => {
  console.log(`koa server is listening port ${port}`)
})


app.on('error', err => {
  console.log('catched err  --->>', err)
})