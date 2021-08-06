/**
 * 如何分配 才能让竟可能多的孩子满足
  输入: [1,2,3], [1,1]

  输出: 1

  解释: 
  你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
  虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
  所以你应该输出1。

  思路 孩子胃口 及 小饼干尺寸 升序排列 
  遍历饼干列表(升序) 最小的匹配最小胃口的 小朋友 依次向上匹配
 */

function fn(list, children) {
  let count = 0;
  list.sort((a, b) => a - b)
  children.sort((a, b) => a - b)
  for (let i = 0; i < list.length; i++) {
    const food = list[i];
    for (let j = 0; j < children.length; j++) {
      const child = children[j];
      if (child <= food) {
        count++
        children = children.slice(0, j + 1)
        break
      }
    }
  }
  return count;
}
