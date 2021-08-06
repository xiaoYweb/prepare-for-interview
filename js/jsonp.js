
function jsonp({ url, params, callbackName }) {
  if (!callbackName) return 
  const generateURL = () => { // 根据 URL 格式生成地址
    url = `${url}?callback=${callbackName}`;
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        url += `&${key}=${params[key]}`
      }
    }
    return url;
  }
  return new Promise((resolve, reject) => {
    try {
      let script = document.createElement('script')
      script.src = generateURL()
      document.body.appendChild(script)
      // 服务器返回字符串 `${callbackName}(${服务器的数据})`，浏览器解析即可执行。
      window[callbackName] = (data) => {
        resolve(data)
        document.body.removeChild(script) // 别忘了清除 dom
      }
    } catch (err) {
      reject(err)
    }
  })

}