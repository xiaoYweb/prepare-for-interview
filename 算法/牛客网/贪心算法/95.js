/**
 * 一群孩子做游戏，现在请你根据游戏得分来发糖果，要求如下：

1. 每个孩子不管得分多少，起码分到一个糖果。
2. 任意两个相邻的孩子之间，得分较多的孩子必须拿多一些糖果。(若相同则无此限制)

给定一个数组 arrarr 代表得分数组，请返回最少需要多少糖果。
 */


/**
思路及解法

我们可以将「相邻的孩子中，评分高的孩子必须获得更多的糖果」这句话拆分为两个规则，分别处理。

左规则：当 arr[i-1] < arr[i] 时，i 号学生的糖果数量将比 i - 1 号孩子的糖果数量多。

右规则：当 arr[i] > arr[i+1] 时，i 号学生的糖果数量将比 i + 1 号孩子的糖果数量多

我们遍历该数组两次，处理出每一个学生分别满足左规则或右规则时，最少需要被分得的糖果数量。每个人最终分得的糖果数量即为这两个数量的最大值。

具体地，以左规则为例：我们从左到右遍历该数组，假设当前遍历到位置 ii，如果有 arr[i-1] < arr[i]   那么 i 号学生的糖果数量将比 i - 1 号孩子的糖果数量多 
  ? left[i] = left[i-1] + 1
  : left[i] = 1
 */
// [1,1,2] 4
// [1,1,1] 3
// [1,0,2] 5  [1,1,2]  [2,1,2]
function candy(arr) {
  const len = arr.length
  const left = []
  for (let i = 0; i < len; i++) {
    if (i > 0 && arr[i] > arr[i - 1]) {
      left[i] = left[i - 1] + 1
    } else {
      left[i] = 1
    }
  }
  let right = 0
  let res = 0
  for (let i = len - 1; i >= 0; i--) {
    if (i < len - 1 && arr[i] > arr[i + 1]) {
      right ++ 
    } else {
      right = 1
    }
    res += Math.max(left[i], right);
  }
  return res
}
console.log(candy([1,1,2])) // 4
console.log(candy([1,1,1])) // 3
console.log(candy([1,0,2])) // 5