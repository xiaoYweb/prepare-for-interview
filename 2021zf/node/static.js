const fs = require('fs').promises
const path = require('path')


function static(staticPath) {
  return async (ctx, next) => {
    try {
      const filePath = path.join(staticPath, ctx.path)
      const statObj = await fs.stat(filePath) // 是否存在
      if (statObj.isDirectory()) { // 若 是文件夹 则 默认读取 index.html文件
        filePath = path.join(filePath, 'index.html')
      }
      ctx.body = await fs.readFile(filePath)
    } catch (err) {
      return next() // 报错处理不了
    }
  }
}

module.exports = static