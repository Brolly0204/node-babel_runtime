const fs = require('fs')

// fs.readFile('./package.json', (err, data) => {
//   if (err) return console.log(err)
//   data = JSON.parse(data)
//   console.log(data.name)
// })

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// readFileAsync('./package.json')
//   .then(JSON.parse)
//   .then(data => {
//     console.log(data.name)
//   })
//   .catch(err => {
//     console.log('err', err)
//   })

const { promisify } = require('util')
promisify(fs.readFile)('./package.json', 'utf8')
  .then(JSON.parse)
  .then(data => {
    console.log('data', data.name)
  })
  .catch(err => {
    console.log('err', err)
  })

function promiseify(fn) {
  return (...rest) =>
    new Promise((resolve, reject) => {
      fn(...rest, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
}
promiseify(fs.readFile)('./package.json', 'utf8')
  .then(JSON.parse)
  .then(data => {
    console.log('data', data.name)
  })
  .catch(err => {
    console.log('err', err)
  })
