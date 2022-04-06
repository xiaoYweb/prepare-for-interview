/**
 * BM23 二叉树的前序遍历
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
 */

function preorderTraversal1(root, arr = []) {
  if (!root) return arr
  arr.push(root.val)
  arr = arr.concat(preorderTraversal(root.left))
  arr = arr.concat(preorderTraversal(root.right))
  return arr
}

function preorderTraversal(root) {
  const stack = [root]
  const result = []
  while (stack.length) {
    const current = stack.pop()
    result.push(root.val)
    
    current.right && stack.push(current.right)
    current.left && stack.push(current.left)
  }

  return result
}


function preorderTraversal(root) {
  if (!root) return 
  let current= root
  const stack = []
  const result = []
  while(current || stack.length) {
    while(current) {
      result.push(current.val)
      stack.push(current)
      current = current.left
    }
    if (stack.length) {
      current = stack.pop()
      current = current.right
    }
  }
  return result 
}