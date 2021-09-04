/**
 * 
 */
/**
 * 算法题: 
 * 1. 两个有序链表和并成一个有序链表    LeetCode 21    递归 非递归
 * 2. 分饼干                        LeetCode 455   排序 + 贪心
 * 3. 合并乱序区间
 */
/**
 * tcp 和 udp 的区别和使用场景？
 * https与http有什么区别(一面刚好也被问到)
 * options请求方法有什么用
 * cookie,session,localstorage,sessionstorage有什么区别
 * 你知道哪些状态码
 * 怎么禁止js访问cookie
 * cookie有哪些属性
 * 你知道哪些http头部
 * 怎么与服务端保持连接
 * 你了解哪些请求方法，分别有哪些作用和不同
 * 讲一下同源策略和跨域方案？CORS 的几个头部是什么？
 * 怎么做 DNS 预解析
 */

/**
 * less,sass它们的作用是什么
 * position有哪些属性
 * 
 */

/**
 * 你了解node多进程吗
 * node进程中怎么通信
 * node可以开启多线程吗
 */

/**
 * typescript中type和interface的区别
 * typescript你都用过哪些类型
 * 你觉得typescript和javascript有什么区别
 */

/**
 * 介绍一下项目中的难点
 */

/**
 * 问：0.1 + 0.2 === 0.3 嘛？为什么
 * 两数相加 10进制 会转化为 二进制 0.1 和 0.2 转换成二进制的时候尾数会发生无限循环，然后进行运算 JS 引擎对二进制进行截断，所以造成精度丢失
 * 
 * JS 数据类型 number string boolean null undefined symbol bigInt  object 
 * 
 * 深度克隆
 * 
 * 事件流 (捕获阶段 目标阶段 冒泡阶段 )
 * 
 * 
 * new 一个函数发生了什么 
 * 1. 函数内部 会创建一个对象 
 * 2. 这个对象的原型 指向 函数的prototype 对象属性 
 * 3. 函数内部this指向 指向这个对象 
 * 4. 函数末尾 没有返回对象类型的值时  默认返回 这个实例对象  
 * 
 * 
 * symbol 有什么用处
 * 
 * 
 * 闭包是什么 
 * 
 * 
 * 什么是作用域链 
 * 
 * 
 * 闭包的本质是什么  是作用域的查找规则  
 * 
 * 
 * 闭包应用场景 防抖节流 bind 柯里化  模块机制 
 * 
 * JS 隐式转换，显示转换 
 * 一般非基础类型进行转换时会先调用 valueOf，如果 valueOf 无法返回基本类型值，就会调用 toString
 * 
 * 
 * this 指向 及 修改this指向的 方法 bind call apply  及实现 
 * 
 * js脚本加载问题 
 * async defer 
   如果依赖其他脚本和 DOM 结果，使用 defer
    如果与 DOM 和其他脚本依赖不强时，使用 async

    如何判断一个对象是不是空对象

    在线编程，getUrlParams(url,key); 就是很简单的获取url的某个参数的问题，但要考虑边界情况，多个返回值等等

    说一下原型链和原型链的继承吧
    什么是原型链

    什么是原型继承

    数组能够调用的函数、方法有那些？  
    修改原数组的方法 push pop unshift shift reverse sort splice fill fillwith
    遍历方法  map  forEach  filter  reduce  some every find  findIndex reduceRight 
    切割方法  slice 
    合并方法  concat(支持数组(数组会展开) 及 item)
    展开方法  flat 
    转化为iterator接口 entries keys values
    索引   indexOf includes lastIndexOf
    静态方法  Array.isArray Array.form(str, [], 列数组) entries keys values
    toString toLocalString

    如何判断数组类型
    arr instanceof Array   arr.constructor === Array   Array.isArray  Object.prototype.toString.call(arr) typeof arr.sort === 'function'


    笔试题：写一个处理加法可能产生精度的函数，比如 0.1 + 0.2 = 0.3
 */
function add(a, b) {
  let l1 = 0
  let l2 = 0
  try {
    l1 = a.toString().join('.')[1].length
  } catch (error) {}
  try {
    l2 = b.toString().join('.')[1].length
  } catch (err) {}
  const n = Math.pow(10, Math.max(l1,l2))
  return (Math.round(a * n) + Math.round(b * n)) / n
}
/**
 * [1,2,3,4,6,7,9,13,15,16]=>['1->4',6->7,'9','13','15->16']实现一下
 */
// console.log(fn([1, 2, 3, 4, 6, 7, 9, 13, 15, 16]))
function fn(nums) {
  let prev = nums[0]
  let last = nums[0]
  const result = []
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    if (num - nums[i - 1] === 1) {
      last = num
      continue
    }

    // 
    if (last > prev) {
      result.push(`${prev}->${last}`)
    } else {
      result.push(last)
    }
    prev = num
    last = num
  }

  if (last > prev) {
    result.push(`${prev}->${last}`)
  } else {
    result.push(last)
  }

  return result
}

/**
 * 假设有130个苹果，你我轮流拿，每次可拿1-5个，如何保证你拿到最后一个苹果
 * 保证 最后一次 自己是手选择 
 * 每次 自己拿完 保证 剩余苹果数是 6的倍数  
 */

~(function test() {
  function fn(n = 130) {
    // 每次取完保证是6 的倍数
    if (n <= 5) {
      return 5
    }
    return n % 6
  }
  for (let i = 0; i < 5; i++) {
    const n = 13
    const he = i + 1
    const me = fn(n - he)
    console.log(n, he, me, n - he - me)
  }
})();