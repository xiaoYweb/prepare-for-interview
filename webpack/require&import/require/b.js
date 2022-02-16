let count = 1
let tom = {
  age: 11,
  addr: 'address11'
}
let plusCount = () => {
  count++
}
let modifyTom = () => {
  tom.age = 22
}
setTimeout(() => {
  console.log('b.js-1', count)
  console.log('b.js tom', tom)
}, 1000)
module.exports = {
  count,
  plusCount,
  tom,
  modifyTom
}
