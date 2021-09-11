// 扁平化
Array.prototype._flat = flat;
function flat(n = 1) {
  const val = this; // 能通过原型链调用 肯定是数组实例
  if (n === Infinity || n > 0) {
    n--
    return val.reduce((prev, next) => {
      return prev.concat(Array.isArray(next) ? next.flat(n) : next)
    }, [])
  }
  return val
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