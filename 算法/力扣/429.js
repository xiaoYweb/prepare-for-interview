/** N 叉树的层序遍历
 * 给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。

    树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。

    输入：root = [1,null,3,2,4,null,5,6]
    输出：[[1],[3,2,4],[5,6]]
 */

function levelOrder(root) {
  if (!root) return []
  let queue1 = [root]
  let queue2 = []
  const result = []
  while (queue1.length || queue2.length) {
    const list = []
    while (queue1.length) {
      const { val, children = [] } = queue1.shift()
      list.push(val)
      console.log(children)
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        queue2.push(child)
      }
    }

    result.push(list)

    // 队列指针 交换
    const temp = queue2
    queue2 = queue1
    queue1 = temp
  }
  return result
}

function levelOrder(root) {
  if (!root) return root
  let queue1 = [root]
  let queue2 = []
  while (queue1.length || queue2.length) {
    while (queue1.length) {
      const { val, left, right } = queue1.shift()
      console.log('val', val)
      left && queue2.push(left)
      right && queue2.push(right)
    }

    let temp = queue2
    queue2 = queueq1
    queue1 = temp
  }
  // return root
}