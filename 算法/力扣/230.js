/** 二搜索树中叉第K小的元素 
 * 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。

  输入：root = [3,1,4,null,2], k = 1
  输出：1

  输入：root = [5,3,6,2,4,null,null,1], k = 3
  输出：3 

  提示：

  树中的节点数为 n 。
  1 <= k <= n <= 104
  0 <= Node.val <= 104
  二叉搜索树 特性 
  左子节点值 小于 右子节点值
   

  进阶：如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化算法？

 */

/**
 * 二叉搜索树 左子节点值 小于 右子节点值 --> 中序遍历 --> 顺序从小到大
 * 第k个最小元素 
 */
const createTree = require('./createTree')
const tree = createTree()
kthSmallest(tree)
function kthSmallest(root, k) {
  if (!root) return
  const stack = []
  let current = root
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left
    }

    if (stack.length) {
      current = stack.pop()

      k --
      if (k === 0) return current.val
      
      current = current.right
    }
  }
}