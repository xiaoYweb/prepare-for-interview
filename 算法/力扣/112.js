/** easy 路径总和 采用 非递归后续遍历 实现 
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。

  叶子节点 是指没有子节点的节点。

输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
 */

/**
 *  [1,2,3,4,5]
     1
    /  \
   2    3
  / \   
 4   5  
 []                             []          
 [1]      入栈 1                 [1]            入栈 1 
 [1,2]    入栈 2                 [1,2]          入栈 2
 [1,2,4]  入栈 4                 [1,2,4]        入栈 4
 [1,2]      出栈 4               [1,2]              出栈 4
 [1]        出栈 2               [1,2,5]        入栈 5
 [1,5]    入栈 5                 [1,2]              出栈 5
 [1]        出栈 5               [1]                出栈 2
 []         出栈 1               [1,3]          入栈 3
 [3]      入栈 3                 [1]                出栈 3
 []         出栈 3              []                  出栈 1
 */
// [1 2] 1   [] [1] [1,2] [1] []
// [] 0   
// [1] 1     [] [1] []
// [5,4,8,11,null,13,4,7,2,null,null,null,1]
function hasPathSum(root, targetSum) { // 边界处理 3种情况
  if (!root) return false
  function hasSum(root, sum) {
    let current = root
    const stack = []
    let lastOutNode = null
    let lastNode = null
    while (current || stack.length) {
      while (current) {
        stack.push(current) // 入栈
        sum -= current.val
        lastNode = current
        current = current.left
      }
      current = stack.pop()
      if (!current.right || current.right === lastOutNode) { //
        if (current === lastNode && sum === 0) return true
        sum += current.val

        lastOutNode = current
        current = null
      } else { // 不需要出栈 继续向右子节点遍历
        stack.push(current)
        current = current.right
      }
    }

    return false
  }

  return hasSum(root, targetSum)
}

// 后续遍历解法
function hasPathSumByLaterOrder(root, targetSum) {
  if (!root) return false
  let current = root
  const stack = []
  let lastOutStackNode = null  // 上一次 入出栈的节点
  let lastInStackNode = null // 上一次 入栈的节点
  let sum = 0
  while (current || stack.length) {
    while (current) {
      lastInStackNode = current
      sum += current.val

      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    if (!current.right || current.right === lastOutStackNode) { // 需要出栈
      if (current === lastInStackNode && sum === targetSum) return true // 得到结果 
      // 不相等
      sum -= current.val

      lastOutStackNode = current
      current = null
    } else { // 不需要弹出
      stack.push(current)
      current = current.right
    }
  }
  return false
}

// 递归解法 叶子节点 没有左右子节点 
function hasPathSum(root, targetSum) { // [] 0 --> false
  if (!root) return targetSum === 0
  targetSum -= root.val
  const { left, right } = root;

  if (left && right) {
    return hasPathSum(left, targetSum) || hasPathSum(right, targetSum)
  }
  if (left) {
    return hasPathSum(left, targetSum)
  }
  if (right) {
    return hasPathSum(right, targetSum)
  }
  // 当前节点 为叶子节点
  return targetSum === 0
}