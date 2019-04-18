function gen(arr) {
  let nextIndex = 0
  return {
    next: () => {
      return {
        value: arr[nextIndex],
        done: !(nextIndex++ < arr.length)
      }
    }
  }
}

const arr = ['吃饭', '睡觉', '打豆豆']
const ite = gen(arr)
console.log(ite.next())
console.log(ite.next())
console.log(ite.next())
console.log(ite.next())

function *foo(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}
const fte = foo(arr)
console.log(fte.next())
console.log(fte.next())
console.log(fte.next())
console.log(fte.next())
