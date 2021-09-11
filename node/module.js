/**
 * node 中的模块
 * 1. 内置模块 核心模块
 * 2. 第三方模块  commander/co
 * 3. 文件模块
 * 
 * es6 Module '静态'导入 在编译时候就知道使用了哪些变量  可以实现 tree-shaking  (es7 支持动态 import()) {需要发送http请求}
 * commonjs 模块动态导入   {读文件}
 */

// function fn() {
//   require('./xxx')
// }

/**
 * commonjs 模块定义了自己的规范 按照规范来使用就可以
 * 1. 后缀可以忽略  先找 .js .json
 * 2. 模块导出 module.exports = xxx  
 * 3. 在node中 每个文件都是一个模块
 * 4. 一个包含有多个模块 每个包 都需要 配置package.json文件
 */
// module.exports = 'hello' // a.js
// const a = require('./a')
// console.log(a)

/**
 * 原理  
 * 1. 读取文件
 * 2. 包装函数
 * 3. 默认返回 module.exports
 * 
 * 
 * 
 * 1. 实现一个require方法
 * 2. Module._load 实现模块加载
 * 3. Module.resolveFilename 把文件 名解析成一个绝对路径
 * 4. 实现模块缓存
 *    第一次 require  会更具绝对路径 做缓存 n次require 即使模块内部内容变化也不会读取新的值  返回是对象的话 是缓存了引用地址  < es6 模块导出 export { a }  导出的是一个变量 内部对应的值发生变化会有影响 >
 * 5. 会尝试加载核心模块 如果带了相对路径或者绝对路径就不是核心模块
 * 6. 创建一个模块 根据文件路径来创建 （含有三个属性id path exports 文件导出结果保存在exports 变量上）
 * 7. 根据创建的模块进行加载
 * 8. 记载模块是会构建paths属性 这个属性就是第三方模块的查找路径
 * 9. 取出文件后缀名 Module.extensions 调用对应的模块加载器
 * 10. 读取文件内容
 * 11. 在文件内容外包裹一个函数 exports = module.exports
 * 12. require中 拿到 module.exports
 */
// const a = function (exports, module, require, __dirname, __filename) {
//   module.exports = 'hello'
//   return module.exports
// }();
// console.log(a)


const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
  this.id = id
  this.exports = {}
}
Module._cache = {}
Module.prototype.load = function () {
  const filePath = this.id
  const extname = path.extname(filePath)
  // 根据后缀名找到 对应的 加载策略
  const fn = Module._extensions[extname]
  fn && fn(this)
}
Module._extensions = {
  '.js'(module) {
    const filename = module.id
    const dirname = path.dirname(filename)
    const code = fs.readFileSync(filename, 'utf-8')
    const template = `(function(exports , module , require, __dirname, __filename){${code}})`
    const compileFunction = vm.runInThisContext(template)
    const exports = module.exports // exports 指向 
    const thisValue = exports

    compileFunction.call(thisValue, exports, module, _require, filename, dirname)
  },
  '.json'(module) {
    const filename = module.id
    const content = fs.readFileSync(filename, 'utf-8')
    module.exports = JSON.parse(content)
  }
}
Module.resolveFilename = function (filename) { // 若 filename 不写绝对路径 则 在哪个文件夹下执行命令就以次作为root目录
  const filePath = path.resolve(__dirname, filename) // 绝对路径
  const exist = fs.existsSync(filePath)
  if (exist) return filePath
  // 尝试添加后缀
  const keys = Reflect.ownKeys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const newFilePath = filePath + key
    if (fs.existsSync(newFilePath)) return newFilePath
  }
  throw new Error('module is not found')
}
function _require(filename) {
  // 获取文件绝对路径
  const filePath = Module.resolveFilename(filename)

  const cachedModule = Module._cache[filePath]
  if (cachedModule) {
    return cachedModule.exports
  }
  // 创造一个模块
  const module = new Module(filePath)
  Module._cache[filePath] = module


  // 获取模块内的内容 包装函数 让函数执行 用户辉哥 module.exports 赋值
  module.load()

  return module.exports

}

// const a = _require('./index')
const a = _require('./a.json')
console.log('--', a)