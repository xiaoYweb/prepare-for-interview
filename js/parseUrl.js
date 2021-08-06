function parseUrl(url) {
  // scheme://user:passwd@ 部分
  let schemeStr = '(?:([^/?#]+))?//(?:([^:]*)(?::?(.*))@)?',
    // host:port path?query 部分
      urlStr = '(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\\?(?:[^#]*))?',
    // #fragment 部分
    fragmentStr = '(#(?:.*))'
      
  let pattern = RegExp(`^${schemeStr}${urlStr}${fragmentStr}?`)
  let matched = url.match(pattern) || []
  return {
    protocol: matched[1], // 协议
    username: matched[2], // 用户名
    password: matched[3], // 密码
    hostname: matched[4], // 主机
    port: matched[5],     // 端口
    pathname: matched[6], // 路径
    search: matched[7],   // 查询字符串 queryString
    hash: matched[8],     // 锚点
  }
}
