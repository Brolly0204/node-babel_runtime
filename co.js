const co = require('co')
const fetch = require('node-fetch')

// co(function *gen() {
//   const res = yield fetch('https://api.douban.com/v2/movie/1291843')
//   const movie = yield res.json()
//   return movie.summary
// }, 1).then(res => {
//   console.log(res)
// })

// run(function *gen() {
//   const res = yield fetch('https://api.douban.com/v2/movie/1291843')
//   const movie = yield res.json()
//   return movie.summary
// }, 1)

// function run(gen) {
//   const iterator = gen()
//   const it = iterator.next()
//   const promise = it.value
//   promise.then(data => {
//     const it2 = iterator.next(data)
//     const promise2 = it2.value
//     promise2.then(data => {
//       const it3 = iterator.next(data)
//       console.log(it3.value)
//     })
//   })
// }


function *fn(a = 0) {
  console.log('a', a)
  const b = yield Promise.resolve(2)
  console.log('b', b)
  const c = yield Promise.resolve(3)
  console.log('c', c)
  return a + b + c
}

const it = fn(1)
it.next()
it.next(2)
it.next(3)

co(fn, 1)


run(fn, 10).then(res => {
  console.log(res)
})

function run(gen) {
  const slice = [].slice
  const args = slice.call(arguments, 1)
  return new Promise((resolve, reject) => {
    const ite = (typeof gen === 'function') && gen.apply(this, args)
    if (!ite || typeof ite.next !== 'function') return resolve(ite)
    function next(res) {
      const { value, done } = ite.next(res)
      if (done) {
        resolve(value)
      } else if (value instanceof Promise) {
        value.then(next)
      } else {
        next(value)
      }
    }
    next()
  })
}

