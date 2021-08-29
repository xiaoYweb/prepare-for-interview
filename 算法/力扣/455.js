/** easy 分发饼干
 * 假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

  对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

  输入: g = [1,2,3], s = [1,1]
  输出: 1
  解释: 
  你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
  虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
  所以你应该输出1。

  输入: g = [1,2], s = [1,2,3]
  输出: 2
  解释: 
  你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
  你拥有的饼干数量和尺寸都足以让所有孩子满足。
  所以你应该输出2.
 */
console.log('', findContentChildren([1, 2, 3], [1, 1])) // 1
console.log('', findContentChildren([1, 2], [1, 2, 3])) // 2
console.log('', findContentChildren([10, 9, 8, 7], [5, 6, 7, 8])) // 2
function findContentChildren(g, s) {
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)
  let total = 0
  for (let i = 0; i < g.length; i++) { // 从小到大
    if (s.length === 0) break
    const child = g[i];
    const food = s.shift()
    if (child <= food) {
      total++
    } else {
      i--
    }
  }
  return total
}

/**
 * 尽可能让更多的小孩 分到饼干  
 * 对饼干及 小孩排序        
 * 用最小的饼干 优先满足最小胃口的小孩  (贪心算法)
 * 
 */
function findContentChildren(g, s) {
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)
  let total = 0
  for (let i = 0; i < g.length; i++) {
    const child = g[i]
    if (s.length === 0) break
    while (s.length) {
      const food = s.shift()
      if (food >= child) {
        total++
        break
      }
    }
  }
  return total
}