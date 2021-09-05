const qs = require('querystring')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid') // 随机值 时间错 网卡 生成唯一值
// console.log(qs.parse('name=lil&age=3'))



Buffer.prototype.split = function (sep) {
  const result = [] // 'aaa|vvvvv|ccc'
  const buffer = this
  const len = Buffer.from(sep).length // 分隔符可能是中文 字节数可能存在问题 取值的结果是字节的
  let offset = 0
  // 二进制查找 sep的位置
  let i
  while (-1 != (i = buffer.indexOf(sep, offset))) { // 多少分割符 循环多少次
    result.push(buffer.slice(offset, i))
    offset = len + i
  }
  // 最后一段也需要放进去 
  result.push(buffer.slice(offset))

  return result
}

// console.log(Buffer.from('aaa|bbbb|ccccc').split('|'))

function bodyParse(payload) {
  const { dir = './public' } = payload || {}
  return async (ctx) => {
    ctx.request.body = await new Promise((resolve) => {
      const arr = []
      ctx.req.on('data', chunk => {
        arr.push(chunk)
      })

      ctx.req.on('end', function () {
        const type = ctx.get('Content-Type')
        const body = Buffer.concat(arr) // 2进制 数据 buffer

        if (type === 'multipart/form-data') { // 文件
          const boundary = '--' + body.split('=')[1]
          const lines = body.split(boundary).slice(1, -1) // 分割为 n 个  前后不需要 
          const formData = {}
          lines.forEach(line => {
            let [head, body] = line.split('\r\n\r\n') // http规范规定
            const key = head.toString().mach(/name="(.+?)"/)[1]
            if (head.includes('filename')) { // 总长 - head.length - head与body之间4个 body后\r\n 2个
              const content = line.slice(head.length + 4, -2)
              const filename = path.resolve(__dirname, uuid.v4())
              const fileUrl = dir + filename

              formData[key] = {
                fileUrl,
                size: content.length
              }

              fs.writeFileSync(fileUrl, content)
            } else {
              
              const val = body.toString().slice(0, -2)
              formData[key] = val
            }
          });
          resolve(formData)
        } else if (type === 'application/x-www-form-unlencoded') {
          resolve(qs.parse(body.toString()))
        } else if (type.startWith('text/plain')) {
          resolve(body.toString())
        } else if (type.startWith('application/json')) {
          resolve(JSON.parse(body.toString()))
        } else {
          resolve({})
        }

      })
    })

    await next()
  }
}


module.exports = bodyParse