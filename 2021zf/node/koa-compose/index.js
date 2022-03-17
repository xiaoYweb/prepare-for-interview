


function compose(middlewares) {
  // 边界处理 确保 都是函数
  return function (ctx, next) {
    let n = -1
    const dispatch = i => {
      if (n >= i) return Promise.reject('next called multiple times')
      n = i
      const fn = middlewares[i]
      if (i === middlewares.length) fn = next
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
    }

  }
}


module.exports = compose