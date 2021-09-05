const URL = require('url')

const request = {
  get url() {
    return this.req.url
  },
  get path() {
    return URL.parse(this.url, true).pathname
  },
  get query() {
    return URL.parse(this.url, true).query
  }
}

module.exports = request