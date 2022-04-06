/**
 * BM25 二叉树的后序遍历
 * 给定一个二叉树，返回他的后序遍历的序列。

后序遍历是值按照 左节点->右节点->根节点 的顺序的遍历。
      1
    2   3
  4   5 

[]            
[1]           入栈 1
[1,2]         入栈 2
[1,2,4]       入栈 4
[1,2]           出栈 4
[1,2,5]       入栈 5
[1,2]           出栈 5
[1]             出栈 2
[1,3]         入栈 3
[1]             出栈 3
[]              出栈 1
 */


function postorderTraversal(root) {
  if (!root) return []
  let current = root
  const stack = []
  const result = []

  let lastOutNode = null
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    if (stack.length) {
      current = stack.pop()
      if (!current.right || lastOutNode === current.right) { // 允许出栈
        lastOutNode = current
        result.push(current.val)
        current = null
      } else { // 不允许出栈
        stack.push(current)
        current = current.right
      }
    }
  }
  return result
}