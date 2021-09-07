
const response = {
  set body(val) {
    this._body = val
  },
  get body() {
    return this._body
  }
}


module.exports = response