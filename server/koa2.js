const Koa = require('koa')
const logger = require('koa-logger')

const app = new Koa()

function indent(n) {
  return '&nbsp;'.repeat(n)
}
const mid1 = () => {
  return async (ctx, next) => {
    ctx.body = '<h3>请求 => 第一层中间件</h3>'
    await next()
    ctx.body += '<h3>响应 <= 第一层中间件</h3>'
  }
}

const mid2 = () => {
  return async (ctx, next) => {
    ctx.body += `<h3>${indent(4)}请求 => 第二层中间件</h3>`
    await next()
    ctx.body += `<h3>${indent(4)}响应 <= 第二层中间件</h3>`
  }
}

const mid3 = () => {
  return async (ctx, next) => {
    ctx.body += `<h3>${indent(8)}请求 => 第三层中间件</h3>`
    await next()
    ctx.body += `<h3>${indent(8)}响应 <= 第三层中间件</h3>`
  }
}

app.use(logger())
app.use(mid1())
app.use(mid2())
app.use(mid3())

app.use(async (ctx) => {
  ctx.body += `<p style="color: #f60">${indent(12)}=>Koa2核心业务处理<=</p>`
})

app.listen(2233)