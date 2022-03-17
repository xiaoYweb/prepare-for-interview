const URL = require('url')

const request = {
  get url() {
    return this.req.url
  },
  get path() {
    const url = this.req.url
    return URL.parse(url).pathname
  },
  get query() {
    const url = this.req.url
    return URL.parse(url, true).query
  }
}


module.exports = request