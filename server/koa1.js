var Koa = require('koa')
var logger = require('koa-logger')

var app = new Koa()

function indent(n) {
  return '&nbsp;'.repeat(n)
}
var mid1 = function () {
  return function *(next) {
    this.body = '<h3>请求 => 第一层中间件</h3>'
    yield next
    this.body += '<h3>响应 <= 第一层中间件</h3>'
  }
}

var mid2 = function () {
  return function * (next) {
    this.body += `<h3>${indent(4)}请求 => 第二层中间件</h3>`
    yield next
    this.body += `<h3>${indent(4)}响应 <= 第二层中间件</h3>`
  }
}

var mid3 = function () {
  return function * (next) {
    this.body += `<h3>${indent(8)}请求 => 第三层中间件</h3>`
    yield next
    this.body += `<h3>${indent(8)}响应 <= 第三层中间件</h3>`
  }
}

app.use(logger())
app.use(mid1())
app.use(mid2())
app.use(mid3())

app.use(function *() {
  this.body += `<p style="color: #f60">${indent(12)}=>Koa1核心业务处理<=</p>`
})

app.listen(2233)