const express = require('express')

const app = express()

function indent(n) {
  return '&nbsp;'.repeat(n)
}

const mid1 = () => {
  return (req, res, next) => {
    res.body = '<h3>请求 => 第一层中间件</h3>'
    next()
    res.body += '<h3>响应 <= 第一层中间件</h3>'
  }
}

const mid2 = () => {
  return (req, res, next) => {
    res.body += `<h3>${indent(4)}请求 => 第二层中间件</h3>`
    next()
    res.body += `<h3>${indent(4)}响应 <= 第二层中间件</h3>`
  }
}

const mid3 = () => {
  return (req, res, next) => {
    res.body += `<h3>${indent(8)}请求 => 第三层中间件</h3>`
    next()
    res.body += `<h3>${indent(8)}响应 <= 第三层中间件</h3>`
  }
}

app.use(mid1())
app.use(mid2())
app.use(mid3())

app.use((req, res, next) => {
  res.body += `<p style="color: #f60">${indent(12)}=>Koa2核心业务处理<=</p>`
  res.send(res.body)
})

app.listen(2211)