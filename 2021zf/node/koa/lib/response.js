
const response = {
  get body( ) {
    return this._body
  },
  set body(val) {
    res.stateCode = 200
    this._body = val
  },
}

module.exports = response