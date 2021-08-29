/** middle 组合
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

  你可以按 任何顺序 返回答案。

  输入：n = 4, k = 2
  输出：
  [
    [2,4],
    [3,4],
    [2,3],
    [1,2],
    [1,3],
    [1,4],
  ]

  输入：n = 1, k = 1
  输出：[[1]]

  提示:
  组合 {1,2} {2,1} 是同一个组合  
  1 <= n <= 20
  1 <= k <= n
 */
/**
 * 本质 k 为 多少 就嵌套多少for循环 由于k未知 所以无法 手写需要多少for循环
 * 可以递归+for循环
 * 
 * 每次从集合中选取元素，可选择的范围随着选择的进行而收缩，调整可选择的范围。

    图中可以发现n相当于树的宽度，k相当于树的深度。
    每次搜索到了叶子节点，我们就找到了一个结果
    把达到叶子节点的结果收集起来，就可以求得 n个数中k个数的组合集合。
 */
console.log('3,2', combine(3, 3))
console.log('1,1', combine(1, 1))
console.log('4,2', combine(4, 2))
function combine(n, k) {
  const result = []
  let path = []

  const nums = []
  for (let i = 0; i < n; i++) {
    nums[i] = i + 1
  }

  function fn(start, end) {
    if (path.length === k) {
      return result.push(path.slice())
    }

    for (
      let i = start;
      i < end;
      i++
    ) {
      const num = nums[i];
      path.push(num)
      fn(i + 1, end)
      path.pop()
    }
  }

  fn(0, nums.length)

  return result
}

function combine(n, k) {
  const result = []
  const path = []

  function fn(start, end) {
    if (path.length === k) {
      return result.push(path.slice())
    }
    for (let i = start; i < end; i++) {
      path.push(i + 1)
      fn(i + 1, end)
      path.pop()
    }
  };

  fn(0, n)

  return result
}