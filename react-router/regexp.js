function fn(pathname) {
  // const re = /^\/home$/; // true false false
  // const re = /^\/home\/?$/; // true true false
  // const re = /^\/home\/?(?=\/|$)/; // true true true 
  return re.test(pathname)
}

// console.log('/home', fn('/home'))
// console.log('/home/', fn('/home/'))
// console.log('/home//', fn('/home//'))





// console.log('1ab'.match(/1([a-z])([b-c])/)) // () 捕获分组
// console.log('1ab'.match(/1(?:[a-z])([b-c])/)) // (?:) 非捕获分组


function fn2() {
  console.log(/\d{2}-\d{2}/.exec('22-66')) // 
  const re = /(?<x>\d{2})-(?<y>\d{2})/; // 命名捕获分组
  const result = re.exec('22-66')
  console.log(result) 
  const res = '77-88'.replace(re, '$<y>-$<x>')
  console.log(res)
}
// fn2()


/**
 * ?=patten 前瞻 后面必须跟什么
 * (?=patten) 正向肯定查找(前瞻) (后面必须跟什么 && 该匹配不计算在内)
 * ?!=patten 后顾 后面不能跟什么
 * (?!=patten) 正向否定查找(后顾) (后面不能跟什么 && 该匹配不计算在内)
 * ?<=patten 返向肯定查找
 * (?<=patten) 
 * ?<!patten 返向否定查找
 * (?<!patten) 
 */
function fn3() {
  console.log('1a'.match(/\d[a-z][a-z]/)) // null
  console.log('1a'.match(/\d(?=[a-z])[a-z]/)) // null
}
// fn3()

function fn4(pathname) {
  const re = /^\/home\/??=\//; // true ?=patten 后面必须跟对应的匹配
  // const re = /^\/home\/?(?=\/)/; // true (?=patten) 后面必须跟对应的匹配 && 该匹配不计算在内
  return re.test(pathname)
}

// console.log('/home//', fn4('/home///'))



