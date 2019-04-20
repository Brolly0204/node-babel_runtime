const Koa = require('koa')
const session = require('koa-session')

const app = new Koa()

app.keys = ['wenli']

app.use(session(app))

app.use(ctx => {
  if (ctx.path === '/favicon.ico') return;
  console.log(ctx.path)
  if (ctx.path === '/') {
    let n = ctx.session.views || 0
    ctx.session.views = ++n
    ctx.body = n + ' views'
  }

  if (ctx.path === '/hi') {
    ctx.body = 'hi brolly'
  }

  if (ctx.path === '/rest') {
    ctx.session.views = 0
    ctx.body = 0 + ' views'
  }
}).listen(8800)