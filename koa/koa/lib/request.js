const URL = require('url')

const request = {
  get url() {
    return this.req.url
  },
  get path() {
    return URL.parse(this.url).pathname
  }
}


module.exports = request 