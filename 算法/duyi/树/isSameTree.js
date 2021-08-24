const createTree = require('./createTree')
function isSameTree(p, q) {
  if (!p && !q) return true
  if (!p || !q) return false
  if (p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.left, q.left)
}

function bfs(root) {
  const stack = [root]
  let current = null
  while (stack.length) {
    current = stack.shift()
    console.log("🚀 ", current.val)
    if (current.left) {
      stack.push(current.left)
    }
    if (current.right) {
      stack.push(current.right)
    }
  }
}
// console.log('createTree',bfs(createTree()))
const tree1 = createTree([1, 2])
function hasPathSum(root, targetSum) { // [] 0   [1,2] [1]
  if (!root) return false
  function hasSum(root, targetSum) {
    console.log(root, targetSum)
    if (!root) return targetSum === 0
    const dis = targetSum - root.val
    if (dis < 0) return false
    return hasSum(root.left, dis) || hasSum(root.right, dis)
  }
  return hasSum(root, targetSum)
}

// console.log(
//   'hasPathSum',
//   // tree1,
//   hasPathSum(tree1, 0)
// )

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
/**
 * []
 * [5]
 * [5,4]
 * [5,4,11]
 * [5,4,11,7]
 * [5,4,11]
 * [5,4]
 * [5,4,2]
 * [5,4]
 */

function laterOrderByLoop(root, sum) {
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

  return hasSum(root, sum)
}

// [] 0 false
// [1] 1  true
// [1,2] 1  false
// [-2,null,-3] -5  true
function laterOrder(root, sum) {
  if (!root) return false
  function hasSum(root, sum) {
    if (!root) return sum === 0
    sum -= root.val
    const { left, right } = root;
    if (left && right) {
      return hasSum(root.left, sum) || hasSum(root.right, sum)
    }
    if (left) { // 只存在左子节点情况
      return hasSum(root.left, sum)
    }
    if (right) { // 只存在右子节点情况
      return hasSum(root.right, sum)
    }
    // 没有字节点 
    return sum === 0
  }
  return hasSum(root, sum)
}
// const tree2 = createTree([-2, null, -3])

console.log(
  'laterOrderByLoop',
  laterOrder(createTree([-2, null, -3]), -5)
)