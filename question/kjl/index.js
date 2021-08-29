/**
 * 算法题，怎么判断单链表相交。
 * 算法题，怎么找到第一个相交的节点
 */

/**
 * 实现一个 fill 函数，不能用循环
 */

Array.prototype._fill = function (val) {
  const arr = this
  function fill(arr, val, len = arr.length) {
    if (len === 0) return
    arr[--len] = val
    fill(arr, val, len)
  }
  fill(arr, val)
  return arr
}

/**
 * 用 ES5 实现私有变量
 */
function fn() {
  var n = 1
  const add = (val = 0) => {
    return n += val
  }

  const minus = (val = 0) => {
    return n -= val
  }
  return {
    add,
    minus
  }
}

/**
 * 手写：并发只能 10 个 ?? 
 */

/**
 * Ts 有什么优势
 * interface 和 type 的区别
 */