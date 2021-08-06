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