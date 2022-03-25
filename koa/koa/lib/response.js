

const response = {
  // _body: undefined,
  get body() {
    return this._body
  },
  set body(val) {
    this.res.statusCode = 200
    return this._body = val
  }
}

module.exports = response 
