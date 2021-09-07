
Array.prototype._flat = flat

function flat(n = 1) {
  const arr = this;
  let result = []
  
  // 处理第一层
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    result = result.concat(item)
  }
  if (n === Infinity) {
    
  }
  return result
}


const arr = [
  1,
  [11,12],
  [3],
  [4,44,412,454,4],
  5
]
console.log(arr._flat())
console.log(arr._flat(1))
console.log(arr._flat(2))
console.log(arr._flat(Infinity))