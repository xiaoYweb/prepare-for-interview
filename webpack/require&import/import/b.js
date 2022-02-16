export let counter = {
  count: 1
}
setTimeout(() => {
  console.log('b.js 1s count', counter.count)
  counter.count ++
}, 1000)

setTimeout(() => {
  console.log('b.js 3s count', counter.count)
}, 3000)


const  defaultValue = {
  n: 1
}
export default defaultValue