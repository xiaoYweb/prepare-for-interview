// 原型链
/**
 * 当访问对象的属性的时候 首先会查看对象内部是否存在该属性 若存在则返回 若不存在则查找对象原型(本身也是一个对象)上的属性 
 * 若原型上页没有找到就继续向上查找 直到顶层对象原型 如果还是没有找到则返回 undefined 
 * 对象与对象之间的这种关联关系 就是 原型链
 */
// 继承的实现   构造函数继承 原型链继承 组合寄生继承
function parent(name) {
  this.name = name;
}
function child(name, age) {
  parent.call(this, name)
  this.age = age;
}
child.prototype = Object.create(parent.prototype)
child.prototype.constructor = child;

// js的隐式转换


// 数据类型
/**
 * 数据类型分为 基础类型 和 对象类型
 *  基础类型有 number string boolean undefined null symbol bigInt
 *  对象 object 
 *  对象类型的还有很多子类型 function array object Date Error 
 */
// 类型判断
/**
 * typeof -- function number string boolean undefined symbol bigInt
 *  === null
 * Array.isArray 
 * instanceof
 * Object.prototype.toString.call()
 * xx.constructor
 * in 操作符只要通过对象访问到属性就返回 true，hasOwnProperty()只在属性存在于实例中时才返回 true。因此只要 in 操作符返回 true 而 hasOwnProperty()返回 false，就可以确定属性是原型中的属性
 */

// var、const、let 对比

// this 指向问题
// new 的过程
// instanceOf原理，手写一个instanceOf
// bind call apply 实现方式 

// 你说一下箭头函数和普通函数的区别吧？
/**
 * 箭头函数this指向由上一层作用域决定 
 * 箭头函数不能使用 new 构造函数调用 没有构造器
 * 没有arguments 
 */
// 闭包
// 事件循环Event Loop 宏任务有哪些？微任务有哪些？

/**
 * 宏任务
 * io script中的代码块
 * 事件  requestAnimationFrame (浏览器)    
 * 定时器  setTimeout setInterval setTimeout(node)
 * http请求api XMLHttpRequest fetch
 * 微任务
 * MutationObserver(浏览器) Object.observe
 * promise.then catch finally process.next(node)
 */

/**
 * 1. window
 * 
 * 2. node
 */

// 手写 Promise
// promise.all promise.race promise.allSettled  

// 数组去重
function unique1(arr) {
  return new Set([...arr])
}
function unique2(arr) {
  const mp = new Map()
  return arr.filter(item => {
    if (mp.has(item)) return false
    mp.set(item, 1)
    return true
  })
}

// 数组中第k个最大元素
// 二叉树中的所有路径 LeetCode 257
// 二叉树中和为某一值的路径
// String indexOf实现
String.prototype._indexOf = indexOf;
function indexOf(val) {
  const str = this;
  for (let i = 0; i < str.length; i++) {
    const x = str[i];
    if (typeof val === 'number') {
      val = String(val)
    }
    if (x == val) {
      return i
    }
  }
  return -1
}
// fetch兼容超时重传  
/**
 * const controller = new AbortController() 
 * 错误 及 超时 
 * controller.abort()
 * requset again
 */
// 观察者模式（高频）

// 扁平化
Array.prototype._flat = flat;
function flat(n = 1) {
  const val = this; // 能通过原型链调用 肯定是数组实例
  if (n === Infinity || n > 0) {
    n--
    return val.reduce((prev, next) => {
      return prev.concat(Array.isArray(next) ? next.flat(n) : next)
    }, [])
  }
  return val
}
// 柯里化
function curry(fn, ...r) {
  const len = fn.length;

  return function (...args) {
    const payload = [...r, ...args]
    if (payload.length >= len) {
      return fn.apply(this, payload)
    }
    return curry(fn, ...payload)
  }
}

// 深拷贝和浅拷贝是什么，有什么区别，手写一个深拷贝函数，最好能处理循环引用和Date、Reg的


// 实现js的sort api，
arr.sort((a, b) => a - b)

function selfsort(cb = (a, b) => a - b) {
  const arr = this;
  if (arr.length < 2) return arr;
  const current = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    const item = arr[i]
    const res = cb(item, current)
    if (res < 0) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  this.length = 0
  this.push(...left.selfsort(cb), current, ...right.selfsort(cb))
  return this;
}
Array.prototype.selfsort = selfsort;


// 算法，合并两个有序链表 leetcode 21.js


// 算法，一个有序数组反转后，找到第K大的元素(时间复杂度小于等于nlogn)


// ES6都有哪些新的api，每一个都详细谈谈


// vue响应式原理，看过源码吗

// vue diff算法的原理，这里我谈了vue的diff和react的diff，并且分析了他们相同点和不同点


// http和https的区别
/**
 * http 传输的数据都是未加密的，也就是明文的，网景公司设置了 ssl 协议来对 http 协议传输的数据进行加密处理，
 * 简单来说 https 协议是由 http 和 ssl 协议构建的可进行加密传输和身份认证的网络协议，比 http 协议的安全性更高
 * 
  1 https 协议需要 ca 证书，费用较高。
  2 http 是超文本传输协议，信息是明文传输，https 则是具有安全性的 ssl 加密传输协议。
  3 使用不同的链接方式，端口也不同，一般而言，http 协议的端口为80，https 的端口为443.
  4 http 的链接很简单，是无状态的；https 协议是由 ssl+http 协议构建的可进行加密传输、身份认证的网络协议，比 http 协议安全。s
 */

// url从输入到页面展示的过程


// https的握手有了解过吗，详细过程

// 其余对于工程上面的考量，因为我是用webpack打包的，所以会问一下loader，plugin的区别，怎么实现loader，plugin，自己有没有写过，webpack整个流程是什么样的，这边建议自己去手写个简单的webpack玩玩，就全知道了，本质上就是广度递归而已

// 项目中遇到最困难的事是什么（必问），这道题自己提前组织好语言，找一个例子，困难点，最后用的什么方案解决。临时增加需求怎么处理？产品方案明显错误，技术怎么推进？类似这些


// 和许多面试官交流下来，假如你基础特别好，最多也是一块挑一个问题问，20分钟就结束了，很少遇到问的十分细，基本按照题库来问打分的，像米哈游，头条，ucloud就是这样从题库出题，面试时间控制30~45分钟，问的长说明面试官对于你某些方面会有疑问和摇摆，问的短就是挂了。

function fn() {
  var wrap = document.createElement('div')
  wrap.style.width = '220px';
  wrap.style.height = '300px';
  wrap.style.background = '#fff'
  wrap.style.position = 'fixed'
  wrap.style.right = 0
  wrap.style.bottom = 0
  wrap.style.zIndex = 99999999
  document.body.appendChild(wrap)
}

// react中setState以后，是子树渲染还是整颗树渲染还是其他情况？


// setState是异步的还是同步的，内部采用的是什么机制
/**
 * 
 */


// react事件了解吗？ (合成事件)  和普通事件有什么区别，实现原理
/**
 * 合成事件 代理在document 上 (新版本在 container上) 返回的事件对象是包装过的 (老版本的事件对象用完即清除的不允许用于传递后的赋值操作 persist) 合成事件下同步调用 setState是批量更新操作
 * 原生事件绑定在对应的dom上 
 */


// react Fibber 了解吗？ (只答了时间片轮转算法，调度策略)
/**
 * 是一个对象 属性可以分为 
 * 用于解决js执行渲染是视图卡顿问题 
 * 首先 浏览器的刷新频率一般为 60hz 也就是 一帧/16.6ms 每一帧都必须交给浏览器绘制页面 不然就会出现视觉可见的卡顿 ‘
 * 这里还得解释 浏览器的gui线程与 js线程是互斥的 同一时间只能有一个执行 
 * 老版本的react代码每次更新都是从上到下的更新 不能停顿也就是 js线程执行任务有可能会占用了一帧以上的时间 fiber 出现主要是将每个react元素单独看成一个任务 可以
 */

// react diff采用的什么原则， (重点 last_index)


// 算法，判断一个字符串是否是回文串 LeetCode 125

function func(str) {
  if (typeof str !== 'string') return false
  if (typeof str.length < 1) return true
  while (str.length > 1) {
    const first = str.slice(0, 1)
    const last = str.slice(-1)
    if (first !== last) return false
    str = str.slice(1, -1)
  }
  return true
}


// 算法，最大连续子序列(dp)




// react开发的几种方式


// react函数式写法和类写法的优缺点


// react 类组件新增的两个生命周期是哪两个，作用是什么


// react hook使用过吗？ 使用过哪些hook


// react 高阶组件有哪几种方式，如何写一个高阶组件


// 什么时候使用useRef，可以做到什么事情


// 算法，链表反转

// react16新增了哪些生命周期、有什么作用，为什么去掉某些15的生命周期（写过码看过文档都能答上了）
// fiber怎样的，如何实现异步渲染（链表/可中断）
// redux和redux-saga的区别和原理
// useEffect的实现原理（坦白说自己没看过react的实现，就说了下preact的实现）
// 异步渲染和旧版的diff的区别
// babel实现转码的过程（词法/语法分析）
// 项目的技术栈怎么选型（这种问题好几次都被问到，感觉我真的不太知道怎么答）
// 项目nodeJs应用异常退出如何处理(pm2/uncaughtException事件等)、日志上报怎么做（输出重定向到文件，elk服务传传到kibana）
// 有哪些技术驱动业务的案例（说了下这个插件的思路和webpack一些优化）


// redux的理念(说了下action dispatch state啥的，单向数据流)
// react-redux中connect怎么实现(高阶组件、context注入store、subscribe订阅store数据变化)
// mixin hoc 继承的区别，优缺点
// react diff如何实现
// react 旧版的diff用深度优先还是广度优先。为什么用深度优先，广度优先能实现吗（其实我认为广度也能实现的，面试官问广度有啥不好，我确实不知道..）
// diff的时间复杂度？为什么？(o(n)。提了下react优化o(n3)->o(n))
// react-router实现原理(hash/html5 history)
// 客户端路由hash/history实现的区别、原理
// 有哪些常见的http头
// tcp的握手过程
// tcp/udp的区别
// 一个应用场景redux触发几次action如何设计（这个问题感觉有点迷，不知道有啥问，我回答也有点迷，面试官说可以了...）
// 尽可能多实现pdd app导航布局实现（就是类似4等分div并列排布）
// 如何清除浮动
// BFC实现原理
// 开放题：pdd首页假设没有任何优化，尽可能多的想优化的办法（懒加载、打包优化、webpack速度、代码压缩、雪碧图、http2 balabala....）


// css的盒子模型（content-box border-box）
// 实现动画有哪些方法 (js css)
// react mixing hoc 继承 hook之间的区别/优缺点
// 浏览器渲染出一个页面的过程
// vue/react技术选型
// 项目相关，项目重构开发如何并行balabala...
// 项目中工程化进行了哪些优化
// 项目中继续进行优化会从哪些方面去做(说了下webpack5 module fedration)
// nodejs项目的性能优化
// 前端监控怎样实现 (数据采集、上报、展示之类)

// http 302 301 307之间的区别
// 301和302对于seo来说哪个更好 (301)
// 跨域是什么、如何解决
// jsonp有什么缺点
// 图片base64和外链的应用场景，各有什么优缺点(base64减少请求数，但是会增加额外的体积)
// http缓存机制
// https的握手过程是怎样的
// set/map的区别
// hook的局限性
// setState和hook的区别
// decorator的作用，编译后是怎样的(@decorator -> decorator(target)...)
// symbol是什么，一般用来做什么
// csrf 是什么 如何防范
// sql注入是什么，如何防范
// react 调用setState之后发生了什么
// nodejs事件循环机制
// pm2的原理，有哪些模式(cluster fork)
// docker和k8s有了解多少(k8s听过没用过)
// 移动端端一个元素拖动，如何实现和优化（节流、改变位置）


// 实现一个对象被for of遍历
// 实现链表的添加、删除。复杂度多少
class LinkedList {
  add(node) {
    if (!this.head) {
      this.head = node;
      return true
    }
    let current = this.head
    while (current) {
      if (!current.next) {
        current.next = node;
      } else {
        current = current.next;
      }
    }
  }
  remove(node) {
    if (!this.head) {
      return false
    }
    let current = this.head;
    if (current === node) {
      this.head = null
      return true;
    }
    while (current = current.next) {
      if (current === node) {
        
        return true
      }
      if (current === )
      current = current.next;
    }
  }
}

// 给了两段效果上都可以实现child 继承 parent，细节上的差别function child(){}
// function parent(){}
// child.prototype.__proto__ = parent.prototype
// child.prototype = new parent()
// 一些代码看输出的题目。考点有函数this指向的问题
// 如何监听html外链资源加载失败(面试官又追问了onerror 和addEventListener的error都能吗。面试官说onerror不行，具体我没试过...)
// Mutation Observer、Intersection Observer使用场景（Intersection听过没用过）
// 127.0.0.1和0.0.0.0差别（一个只能通过localhost ，一个可以通过本机ip或者localhost都行）
// 利用promise js sleep函数实现
// jsx转换后是怎样的
// redux compose函数做什么的，中间件呢
// redux-saga是什么，和redux-thunk有什么区别
// dva有了解吗
// umi.js有用过吗
// req.pipe(res)
// stream 如何处理数据消费和数据生产的速率不一致问题
// writeable stream drain事件是做什么的（这是和一个控制读写速率有关的事件）


// 常用的http状态码(101 200 204 301 302 304 307 400 404 500...)
// 301和302的区别(永久/临时)
// 前端路由怎样实现(hashchange事件 hack history.pushState)
// 前端路由直接刷新404怎样处理(404时重定向到index.html 如nginx)
// 从前端到后端全链路如何设计实现一个登陆的流程(session方案、jwt)
// 什么是跨域，怎样处理
// 简单请求和复杂请求的区别
// 浏览器的缓存策略说下
// domain属性解决跨域。几种domain设置对跨域是否生效
// ts 泛型做什么的，infer关键字的作用

// jwt的原理（以前用过，比较好说）
// xss和csrf是怎样的，如何去解决
// pureComponent和Component的区别(前者shouldComponentUpdate默认比较props)
// react hoc hook解决了什么问题
// 有哪些常用的react hook，它们做了什么(useState useReducer`` useContext等等...)
// 项目实现一个中间层的意义（前端全链路日志打通）
// setState同步还是异步
// setState传递对象和函数有什么区别？如何选择
// 合成事件怎样的，有什么好处
// 事件冒泡和事件捕获的区别、react中的冒泡和捕获呢（react中都是合成事件，无论冒泡和捕获，对应于原生事件都是冒泡）
// 怎样看待加班（hhh 加班很正常啦，在腾讯的时候也是每天加班）
// 为啥选择跳槽


/**执行顺序 1 4 5 2 6 8 9 3 7 （7 3也有可能）setTimeout和setImmediate 宏任务谁先执行 看node版本 还有就是 事假循环执行到哪个过程了
 * console.log(1);

  process.nextTick(()=> console.log(2))

  setTimeout(()=> console.log(3))

  new Promise(resolve =>{
    console.log(4);
    resolve();
    console.log(5);
  }).then(()=>console.log(6))

  setImmediate(()=>console.log(7))

  Promise.resolve().then(()=>{
    console.log(8);
    process.nextTick(()=> console.log(9))
  })
 */

// 实现css垂直、水平居中
// 实现快速排序

// 为啥选择了redux-saga作为解决方案(解决异步优雅/提供很多工具函数)。redux的异步中间件方案有哪些，对比。saga对比dva？
// react fiber的机制是怎样的


// css的选择器有哪些？权重？