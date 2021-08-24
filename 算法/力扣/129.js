/** middle 求根节点到叶节点数字之和
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
每条从根节点到叶节点的路径都代表一个数字：

  例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
  计算从根节点到叶节点生成的 所有数字之和 。

  叶节点 是指没有子节点的节点。


  输入：root = [1,2,3]
  输出：25
  解释：
  从根到叶子节点路径 1->2 代表数字 12
  从根到叶子节点路径 1->3 代表数字 13
  因此，数字总和 = 12 + 13 = 25

  输入：root = [4,9,0,5,1]
  输出：1026
  解释：
  从根到叶子节点路径 4->9->5 代表数字 495
  从根到叶子节点路径 4->9->1 代表数字 491
  从根到叶子节点路径 4->0 代表数字 40
  因此，数字总和 = 495 + 491 + 40 = 1026
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
const createTree = require('./createTree')
const tree = createTree([4, 9, 0, 5, 1])
console.log(
  'sumNumbers',
  // tree
  sumNumbers(tree)
)
function sumNumbers(root) {
  if (!root) return 0
  let result = []
  function laterOrderByLoop(root) {
    if (!root) return
    let stringStack = []
    let lastOutNode = null // 记录对应节点等待有节点完成遍历后 需要出栈
    let lastNode = null // 记录 上一次入栈的节点 用于 是否刚好等于下次出栈的节点  标识叶子节点 
    const stack = []
    let current = root
    while (current || stack.length) {
      while (current) {
        lastNode = current;
        stringStack.push(current.val)

        stack.push(current)
        current = current.left
      }

      current = stack.pop()

      if (!current.right || current.right === lastOutNode) { // 需要出栈
        if (current === lastNode) { // 叶子节点
          result.push(stringStack.join(''))
        }
        stringStack.pop()

        lastOutNode = current
        current = null
      } else { // 不需要出栈
        stack.push(current)
        current = current.right;
      }
    }
  }
  laterOrderByLoop(root)
  // console.log('result', result)
  return result.reduce((prev, next) => prev + (+next), 0)
}
