const pending = 'pending', resolved = 'resolved', rejected = 'rejected'

class MyPromise {
  constructor(excutor) {
    this.status = pending
    this.value = undefined
    this.resolvedArr = []
    this.rejectedArr = []

    const resolve = result => {
      setTimeout(() => {
        if (this.status !== pending) return
        this.status = resolved
        this.value = result
        this.resolvedArr.forEach(cb => cb())
      }, 0);
    }
    const rejeect = reason => {
      setTimeout(() => {
        if (this.status !== pending) return
        this.status = rejected
        this.value = reason
        this.rejectedArr.forEach(cb => cb())
      }, 0);
    }

    try {
      excutor(resolve, rejeect)
    } catch (err) {
      rejeect(err)
    }
  }
  then(resolvedCb, rejectedCb) {
    return new MyPromise((resolve, reject) => {
      typeof resolvedCb !== 'function' && (resolvedCb = _ => _)
      typeof rejectedCb !== 'function' && (rejectedCb = reason => MyPromise.reject(reason))

      this.resolvedArr.push(() => {
        try {
          const res = resolvedCb(this.value)
          res instanceof MyPromise ? res.then(resolve, reject) : resolve(res)
        } catch (err) {
          reject(err)
        }
      })

      this.rejectedArr.push(() => {
        try {
          const reason = rejectedCb(this.value)
          reason instanceof MyPromise ? reason.then(resolve, reject) : resolve(reason)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  catch(rejectedCb) {
    return this.then(null, rejectedCb)
  }

  static resolve(result) {
    return new Promise(resolve => resolve(result))
  }
  static reject(reason) {
    return new Promise((_, reject) => reject(reason))
  }

  static all(promiseArr) {
    return new MyPromise((resolve, reject) => {
      let index = 0;
      const len = promiseArr.length
      const result = []
      for (let i = 0; i < len; i++) {
        const p = promiseArr[i];
        p.then(res => {
          index++
          result[i] = res
          if (index === len) {
            resolve(result)
          }
        }, reject)
      }
    })
  }

  static race(promiseArr) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        let p = promiseArr[i];
        if (!(p instanceof Promise)) {
          p = Promise.resolve(p)
        }
        p.then(resolve, reject)
      }
    })
  }
  static finally(cb) {
    return this.then(
      result => Promise.resolve(cb()).then(() => result),
      reason => Promise.resolve(cb()).then(() => Promise.reject(reason)),
    )
  }
  static allSettled(promiseArr) {
    return new Promise(resolve => {
      const result = []
      let index = 0
      const len = promiseArr.length
      for (let i = 0; i < len; i++) {
        let p = promiseArr[i];
        if (!(p instanceof Promise)) {
          p = Promise.resolve(p)
        }
        p.then(res => {
          result[i] = {
            status: resolved,
            value: res
          }
        }, err => {
          result[i] = {
            status: rejected,
            reason: err
          }
        }).finally(() => {
          index ++
          index === len && resolve(result)
        })
      }
    })
  }
}