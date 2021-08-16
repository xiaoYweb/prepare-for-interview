/**
 * 递归 
 * 将复杂问题 分解为最简问题 然后将结果回归的过程 
 * 1. 找规律 递推公式
 * 2. 找出口
 * 斐波那契数列
 * 
 * 兔子问题 有一对大兔子 每个月可以繁衍 一对小兔子(一公一母)
 * 小兔子 一个月后生长为大兔子 
 * 现在又一对兔子 一年后有多少兔子
 * M1  1   a
 * M2  1   A
 * M3  2   A -> b
 * M4  3   A -> c  B
 * M5  5   A -> d C B -> e
 * M6  8   A -> f D C -> f B -> g E
 * ...
 * 当前的所有的兔子 = 可以繁衍的大兔子 + 小兔子
 *                上个月的所有兔子 + 这个月新生的兔子
 *              上个月的所有的兔子 + 上上个月所有的兔子
 * 
 */

function fibonacci(n = 12) {
  if (n < 3) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2)
}
// console.log('', fibonacci(3))
// console.log('', fibonacci(4))
// console.log('', fibonacci(5))
// console.log('', fibonacci(6))

// 缓存优化
// function fibonacci() {

// }

// 迭代  大部分递归可以转化为 迭代
// make it work, make it right, make it fast
function fibonacci(n) {
  if (n === 0) return 0;
  if (n < 3) return 1;
  const cache = [1, 1]
  let i = 2;
  while (i < n) {
    cache[i] = cache[i - 1] + cache[i - 2]
    i++
  }
  return cache[i - 1]
}

/**
 * 汉诺塔
 * 
 * 1 / 1 a->c
 * 2 / 3 a->b a->c b->c  
 * 3 / 7 a->c a->b c->b(前2个圆盘移到b) 
 *       a->c (最大的圆盘) 
 *       b->a b->c a->c(前2个圆盘 从b 移到c)
 * n 个圆盘的问题 每次都是最大的圆盘移动到c 
 * n-1 个圆盘 a->b(经由c)
 * 最大的圆盘  a->c
 * 再把前n-1个圆盘 
 * h(1) = 1
 * h(2) = 3
 * h(3) = h(2) + 1 + h(2)
 * h(4) = h(3) + 1 + h(3)
 */
/**
 * 
 * @param {*} n 几个圆盘
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 * @returns 
 */
function hanoi(n, a, b, c) {
  if (n === 1) {
    console.log(a, '->', c)
    return
  }
  // 先把n-1个圆盘   a -> b
  // 最大的圆盘      a -> c
  // 最后吧n-1个圆盘  b->c
  hanoi(n - 1, a, c, b)
  console.log(a, '->', c)
  hanoi(n - 1, b, a, c)
}
hanoi(3,'a','b','c')
