const id = 1
const brolly = {
  id: 2,
  say() {
    setTimeout(function() {
      console.log('id', this.id)
    }, 1000)
  },
  say2() {
    const that = this
    setTimeout(function() {
      console.log('id', that.id)
    }, 1500)
  },
  say3() {
    setTimeout(() => {
      console.log('id', this.id)
    }, 2000)
  },
  say4: () => {
    setTimeout(() => {
      console.log('id', this.id)
    }, 2500)
  }
}

brolly.say()
brolly.say2()
brolly.say3()
brolly.say4()