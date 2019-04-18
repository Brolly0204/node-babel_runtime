const fs = require('fs')

// 第一阶段 回调函数
function readFile(path, cb) {
  fs.readFile(path, 'utf8', cb)
}

readFile('./package.json', (err, data) => {
  if (err) return console.error(err)
  console.log(data)
})

// 第二阶段 Promise
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}
readFilePromise('./package.json').then(console.log)

// 第三阶段 co + generator + Promise
const co = require('co')
const { promisify } = require('util')

function *read(path) {
  let data = yield promisify(fs.readFile)(path, 'utf8')
  console.log(data)
}
co(read, './package.json')

// 第四阶段 Async await + Promise
const readFileAsync = promisify(fs.readFile)

async function readme(path) {
  const data = await readFileAsync(path, 'utf8')
  console.log(data)
}
readme('./package.json')