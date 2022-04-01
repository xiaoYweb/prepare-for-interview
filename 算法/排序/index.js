const bubbleSort = require('./bubbleSort')
const insertSort = require('./insertSort')
const mergeSort = require('./mergeSort')
const quickSort = require('./quickSort')
const selectSort = require('./selectSort')


// console.log('bubbleSort', bubbleSort(retArr()))
// console.log('insertSort', insertSort(retArr()))
// console.log('mergeSort', mergeSort(retArr()))
console.log('quickSort', quickSort(retArr()))
console.log('selectSort', selectSort(retArr()))

function retArr(len = 10) {
  const arr = Array(len)
  for (let i = 0; i < len; i++) {
    arr[i] = Math.floor(Math.random() * len)
  }
  return arr
}
