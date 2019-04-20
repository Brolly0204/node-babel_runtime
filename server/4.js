// function add(i) {
//   if (i < 0) return 0
//   console.log(i)
//   return add.bind(null, i + 1)
//  }
//  add(0)()()()

const p1 = Promise.resolve(() => {
  console.log('p1')
})

p1.then(p => {
  p()
})