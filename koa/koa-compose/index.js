
module.exports = compose

function compose(middlewares) {
  return function (ctx, next) {
    let n = -1
    const dispatch = i => {
      if (n >= i) return Promise.reject('next called multiple times')
      n = i
      const fn = middlewares[i]
      if (i === middlewares.lengtn) fn = next
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
    }

    return dispatch(0)
  }
}
