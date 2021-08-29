/** middle 全排列
 *  给定一个  不含重复数字   的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * 
 * 
 * 输入：nums = [1,2,3] 1 * 2 * 3 
    输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

    输入：nums = [0,1] 1 * 2
    输出：[[0,1],[1,0]]

    输入：nums = [1] 1
    输出：[[1]]

    输入：nums = [1,2,3,4]  24  1 * 2 * 3 * 4
    输出：[
      [1,2,3,4], [1,...], ...* 6
      *4
    ] 
 */
console.log('permute', permute([1, 2, 3]))
console.log('permute', permute([0, 1]))
// console.log('permute', permute([1]))
/**
 *                  []
 * [1]              [2]                [3]      
 * [1,2] [1,3]      [2,1] [2,3]        [3,1] [3,2]
 * [1,2,3] [1,3,2]  [2,1,3] [2,3,1]    [3,1,2] [3,2,1]
 * 
 * 思路 nums 依次(for循环)抽出第一个数 放入位置  (放入一个位置 即记录 path.push(num))
 *      剩余 nums 继续递归上一步操作
 *          出口 当 nums.length === 0      路径走完 一条路径即 一种 排序结果 存入 result  
 *              出栈 返回上一级作用域 path.pop()
 * 整个代码执行完成 即函数执行栈为空 
 */
function permute(nums) {
  const result = []
  const path = []

  function fn(nums) {
    if (nums.length === 0) {
      result.push(path.slice())
      return
    }
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i]
      path.push(num)
      nums.splice(i, 1) // 移除
      fn(nums)
      path.pop()
      nums.splice(i, 0, num) // 添加
    }
  }
  fn(nums)

  return result
}

/**
 * 优化 用指针 替换 增删数组
 * [1,2,3]
 * [1, 2,3] [1,  2, 3]  [1,  3, 2]
 * [2, 1,3] 
 */
function permute(nums) {
  const result = []
  const path = []

  function fn(nums, p, q) {
    if (p === q) {
      result.push(path.slice())
      return
    }
    for (let i = p; i < q; i++) { // 指针为 当前位置 
      const num = nums[i];
      path.push(num)
      swap(nums, p, i)
      fn(nums, p + 1, q)
      swap(nums, p, i)
      path.pop()
    }
  }

  function swap(nums, i, j) {
    if (nums.length === 1) return
    const num = nums[i]
    nums[i] = nums[j]
    nums[j] = num
  }

  fn(nums, 0, nums.length)

  return result
}

function permute(nums) {
  const result = []
  const path = []

  function fn(nums) {
    if (nums.length === 0) {
      result.push(path.slice())
      return
    }
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      path.push(num)
      nums.splice(i, 1)
      fn(nums)
      path.pop()
      nums.splice(i, 0, num)
    }
  }
  fn(nums)

  return result
}

function permute(nums) {
  const result = []
  const path = []

  function fn(nums, start, q) {
    if (start === q) {
      result.push(path.slice())
      return
    }
    for (let i = start; i < q; i++) {
      const num = nums[i];
      swap(nums, start, i)
      path.push(num)
      fn(nums, start + 1, q)
      path.pop()
      swap(nums, start, i)
    }
  }

  fn(nums, 0, nums.length)

  return result
}
function swap(nums, p, q) {
  if (nums.length === 1) return
  const temp = nums[p]
  nums[p] = nums[q]
  nums[q] = temp
}

function permute(nums) {
  const result = []
  const path = []

  function fn() {
    if (nums.length === 0) {
      return result.push(path.slice())
    }
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      path.push(num)
      nums.splice(i, 1)
      fn()
      path.pop()
      nums.splice(i, 0, num)
    }
  }

  fn()
  return result
}