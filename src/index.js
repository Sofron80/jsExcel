import './module.js'
import './scss/index.scss'

console.log('working...!')

class Test {
  constructor(a) {
    this.a = a
  }
}

const p = new Test(10)

console.log(p.a)
