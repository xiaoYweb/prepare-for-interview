/**
 * 给定一个二叉树，返回所有从根节点到叶子节点的路径。
    说明: 叶子节点是指没有子节点的节点。

  输入
  {
    val: 1,
    left: {
      val: 2,
      left: null,
      right: {
        val: 5,
        left: null,
        right: null
      }
    },
    right: {
      val: 3,
      left: null,
      right: null
    }
  }
  输出  ["1->2->5", "1->3"]
 */

function binaryTreePaths(node) {
  const stack = []
  const result = [node[val]]
  

  while (node) {
    stack.push(node)
    if (node.left) {
      node = node.left;
      continue
    } else {
      result.push(stack.join('->'))
    }
    if (node.right) {
      node = node.right;
      continue
    } else {
      result.push(stack.join('->'))
    }
    
  }
}