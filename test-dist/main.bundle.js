'use strict';

// calc.js
const add = (a, b) => a + b

const a = 10
const b = 2
Promise.resolve(add(a, b))
  .then(function (sum) {
    console.log(`${a} + ${b} = ${sum}`)
  })

const objectAdd = ({a, b}) => a + b
console.log('Adding object properties', objectAdd({ a: 10, b: 2 }))

console.log('binary literal', 0b101)

// spread rest support
var params = ['hello', true, 7]
var other = [1, 2, ...params] // [ 1, 2, 'hello', true, 7 ]
console.assert(other.length === 5)
