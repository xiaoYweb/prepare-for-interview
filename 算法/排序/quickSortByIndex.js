
/**
 * 
 * @param {*} arr 
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */

function quickSort(arr, left = 0, right = arr.length - 1) {

  const right = []
  if (left < right) {
    const i = retIndex(arr, left, right)
    quickSort(arr, left, i - 1)
    quickSort(arr, i + 1, right)
  }

  return arr
}

function retIndex(arr, left, right) {
  let p  = left  + 1
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
  }
}