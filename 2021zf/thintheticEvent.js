/**
 * 合成事件
 * 事件委托 到 document上
 * 当触发真实dom事件时候，先处理原生事件，然后会冒泡到document对象上，再出里react事件
 * 合成事件绑定是在reconciliation阶段绑定的，会在原生事件绑定前 执行 所以16版本 (原生事件冒泡到document上才触发委托的react合成事件)先执行模拟捕获冒泡 在执行最后的 document 原生 冒泡
 * 
 * 优点  
 * 1. 兼容性处理
 * 2. 事件都代理到 document 上 减少开销
 */

/**
 * react 16  
 * 1. document 捕获
 * 2. 父元素 原生事件 捕获 
 * 3. 子元素 原生事件 捕获 
 * 4. 子元素 原生事件 冒泡 
 * 5. 父元素 原生事件 冒泡 
 * 6. 父元素 react事件 捕获 
 * 7. 子元素 react事件 捕获 
 * 8. 子元素 react事件 冒泡
 * 9. 父元素 react事件 冒泡
 * 10. document 原生 冒泡
 * 11. document react 捕获
 * 12. document react 冒泡
 * 
 * 存在的问题 event.stopPropagation 是注册到document 上 所以 用这个阻止冒泡 是阻止在 document网上 所以 注册在 document上的事件 冒泡阶段还是会执行
 * event.stopPropagation 不向上冒泡
 * event.stopImmediatePropagation 不向上冒泡 且 本级剩余事件也不执行
 */

function dipatchEvent(event) {
  const paths = []
  let current = event.target
  while (current) {
    paths.push(current)
    current = current.parentNode
  }
  // 模拟捕获冒泡  原生的捕获阶段已经结束
  for (let i = paths.length - 1; i >= 0; i--) { // 捕获
    const handler = paths[i].onClickCapture

    handler && handler()
  }

  for (let i = 0; i < paths.length; i++) { // 冒泡
    const handler = paths[i].onclick;

    handler && handler()
  }
}


/**
 * react 17
 * 事件委托的对象不再是 document 而是 container
 * 1. 可以使页面上 多个 react版本共存 
 * 
 * 
 * 1. document 捕获
 * 2. 父元素 react事件 捕获
 * 3. 子元素 react事件 捕获
 * 4. 父元素 原生事件 捕获
 * 5. 子元素 原生事件 捕获
 * 6. 子元素 原生事件 冒泡
 * 7. 父元素 原生事件 冒泡
 * 8. 子元素 react事件 冒泡
 * 9. 父元素 react事件 冒泡
 * 10. document 原生 冒泡
 * 11. document react 捕获
 * 12. document react 冒泡
 */
function dipatchEvent17(event, isCapture = false) {
  const paths = []
  let current = event.target
  while (current) {
    paths.push(current)
    current = current.parentNode
  }
  if (isCapture) {
    for (let i = paths.length - 1; i >= 0; i--) { // 捕获
      const handler = paths[i].onClickCapture
      handler && handler()
    }
  } else {
    for (let i = 0; i < paths.length; i++) { // 冒泡
      const handler = paths[i].onclick;
      handler && handler()
    }
  }
}
