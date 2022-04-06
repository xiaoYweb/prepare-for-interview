/**
 * 求二叉树的层序遍历
 * 给定一个二叉树，返回该二叉树层序遍历的结果，（从左到右，一层一层地遍历）
例如：
给定的二叉树是{3,9,20,#,#,15,7},
 */


function levelOrder(root) {
  if (!root) return []
  const queue = [root]
  const result = []
  while (queue.length) {
    result.push([])
    let len = queue.length
    while(len --) {
      const node = queue.shift()
      result[result.length - 1].push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return result
}