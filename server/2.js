const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = 'Hello Brolly!'
  console.log(ctx.ip)
  console.log(ctx.ips)
})

app.listen(7700)