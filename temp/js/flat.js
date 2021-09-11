
Array.prototype._flat = flat

function flat(n = 1) {
  const arr = this;
  let result = []

  if (n > 0 || n === Infinity) {
    n--
    // 处理一层
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      result = result.concat(
        Array.isArray(item)
          ? item.flat(n)
          : item
      )
    }
  }

  return result
}

function flat(n = 1) {
  if (n < 1) return []
  return this.reduce((prev, next) => {
    n--
    return prev.concat(Array.isArray(next) ? next.flat(n) : next)
  }, [])
}


const arr = [
  1,
  [11, 12],
  [3],
  [4, 44, 412, 454, 4],
  5
]
console.log(arr._flat())
console.log(arr._flat(1))
console.log(arr._flat(2))
console.log(arr._flat(Infinity))
