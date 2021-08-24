/** middle 二叉树的层序遍历
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
 * 
 * 二叉树：[3,9,20,null,null,15,7]
 *  3
   / \
  9  20
    /  \
   15   7
   返回其层序遍历结果：
  [
    [3],
    [9,20],
    [15,7]
  ]
 */
/**
 * [3]   
 * []             out 3
 * [9]          in 9
 * [9, 20]      in 20
 * [20]           out 9
 * []             out 20
 * [15]         in 15
 * [15, 7]      in 7
 * [7]            out 15
 * []             out 7
 */
/**
 * [1,2,3,4,5,6,7]
 *  1
   /  \
  2     3
 / \   /  \
4   5  6   7
[1]           
[]          out 1
[2]       in 2
[2,3]     in 3
[3]         out 2
[3,4]     in 4
[3,4,5]   in 5
[4,5]       out 3
[4,5,6]   in 6
[4,5,6,7] in 7
[5,6,7]     out 4
[6,7]       out 5
[7]         out 6
[]          out 7
 */
function levelOrder(root) {
  if (!root) return []
  const result = []
  const queue = []
  let current = null
  while (queue.length) {
    current = queue.shift()
    if (current.left) {
      queue.push(current.left)
    }
    if (current.right) {
      queue.push(current.right)
    }
    result.push(list)
  }
}

// 第二种 层序遍历方式
function levelOrder(root) {
  if (!root) return []
  const result = []
  const queue = [root]
  let current = null
  while(queue.length) {
    let len = queue.length
    result.push([])
    while(len --) {
      current = queue.shift()
      result[result.length - 1].push(current.val)
      if (current.left) {
        queue.push(current.left)
      }
      if (current.right) {
        queue.push(current.right)
      }
    }
  }
  return result
}