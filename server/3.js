const Koa = require('koa')
const logger = require('koa-logger')

const app = new Koa()

const mid1 = async (ctx, next) => {
  ctx.body = 'a'
  next()
  ctx.body += '1'
}

const mid2 = async (ctx, next) => {
  ctx.body += 'b'
  next()
  ctx.body += '2'
}

const mid3 = async ctx => {
  ctx.body += 'c'
  ctx.body += '3'
}

app.use(logger())
app
  .use(mid1)
  .use(mid2)
  .use(mid3)

  // app.listen(7711)

  function tail(i) {
    if (i > 3) return
    console.log('修改前', i)
    tail(i + 1)
    console.log('修改后', i)
  }
  tail(0)


  let ctx = {}
  let index = -1
  let middleware = []
  const m1 = (ctx, next) => {
    ctx.body = 1
    console.log('m1', ctx)
    next()
  }
  const m2 = (ctx, next) => {
    ctx.body = 2
    console.log('m2', ctx)
    next()
  }
  const m3 = (ctx, next) => {
    ctx.body = 3
    console.log('m3', ctx)
  }

  middleware.push(m1, m2, m3)
  function dispatch(i) {
    if (i < index) return
    index = i
    console.log(i)
    fn = middleware[i]
    return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))

  }
  dispatch(0)
