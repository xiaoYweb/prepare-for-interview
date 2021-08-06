const pending = 'pending', resolved = 'fulfilled', rejected = 'rejected';

class Promise {
  constructor(excutor) {
    this.status = pending;
    this.value = undefined;
    this.resolveArr = []
    this.rejectArr = []
    const resolve = result => {
      setTimeout(() => {
        if (this.status !== pending) return
        this.status = resolved;
        this.value = result;
        this.resolveArr.forEach(cb => cb())
      }, 0);
    }
    const reject = reason => {
      setTimeout(() => {
        if (this.status !== pending) return
        this.status = rejected;
        this.value = reason;
        this.rejectArr.forEach(cb => cb())
      }, 0);
    }
    try {
      excutor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(resolveCb, rejectCb) {
    return new Promise((resolve, reject) => {
      typeof resolveCb !== 'function' && (resolveCb = _ => _)
      typeof rejectCb !== 'function' && (rejectCb = resaon => Promise.reject(resaon))

      this.resolveArr.push(() => {
        try {
          const result = resolveCb(this.value)
          result instanceof Promise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      })
      this.rejectArr.push(() => {
        try {
          const reason = rejectCb(this.value)
          reason instanceof Promise ? reason.then(resolve, reject) : resolve(reason)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  catch(rejectCb) {
    return this.then(null, rejectCb)
  }
  static resolve(result) {
    return new Promise(resolve => resolve(result))
  }
  static reject(reason) {
    return new Promise((_, reject) => reject(reason))
  }
  static all(promiseArr) {
    return new Promise((resolve, reject) => {
      let index = 0;
      const result = []
      const len = promiseArr.length;
      for (let i = 0; i < len; i++) {
        const p = promiseArr[i];
        p.then((val) => {
          index++
          result[i] = val
          if (index === len) resolve(result)
        }, reject)
      }
    })
  }
  static race(promiseArr) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        const p = promiseArr[i];
        p.then(resolve, reject)
      }
    })
  }
  finally(cb) {
    return this.then(
      result => Promise.resolve(cb()).then(() => result),
      reason => Promise.resolve(cb()).then(() => Promise.reject(reason))
    )
  }
  static allSettled(promiseArr) {
    return new Promise(resolve => {
      let index = 0;
      const result = []
      const len = promiseArr.length;
      for (let i = 0; i < len; i++) {
        const p = promiseArr[i];
        p.then(val => {
          result[i] = {
            status: resolved,
            value: val
          }
          index++
          index === len && resolve(result)
        }, reason => {
          result[i] = {
            status: rejected,
            value: reason
          }
          index++
          index === len && resolve(result)
        })
      }
    })
  }
}

module.exports = Promise;
