
module.exports = compose

function compose(middlewares) {
  return function (ctx, next) {
    let n = -1
    
    const dispatch = (i) => {
      if (n >= i) throw ('next called multiple times') // 
      n = i
      let fn = middlewares[i]
      if (i === middlewares.length) fn = next
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
    }

    return dispatch(0)
  }
}
