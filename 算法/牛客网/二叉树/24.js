/**
 * BM24 二叉树的中序遍历
 * 给定一个二叉树的根节点root，返回它的中序遍历结果。
 * 
 * 
 */

/**
 * 
 * @param {*} root 
 * @returns 
 */
function inorderTraversal(root) {
  if (!root) return []
  const stack = []
  let current = root
  const result = []

  while(current || stack.length) {
    while(current) {
      stack.push(current)
      current = current.left
    }
    if (stack.length) {
      current = stack.pop()
      result.push(current.val)
      current = current.right
    }
  }

  return result
}