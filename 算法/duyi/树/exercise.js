/**
 * 二叉树 节点最大的度为2 即 一个节点最多分出2个叉
 * 左子树
 * 右子数
 */

function maxTreeDepth(tree) {
  if (!tree) return 0
  return Math.max(maxTreeDepth(tree.left), maxTreeDepth(tree.right)) + 1
}

/**
 * 相同的树 LeetCode 100
 * 1. 根节点 相同
 * 2. 两颗树 如果左右子树 树A的左子树 === 树B的左子树 树A的右子树 === 树B的右子树
 * 3. null/空相同
 * 4. 
 */
function isSameTree(p, q) {
  if (!p && !q) return true
  if (!p || !q) return false
  // p q 节点都存在
  if (p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

function preOrder(tree) {
  if (!tree) return
  console.log(tree.val)
  preOrder(tree.left)
  preOrder(tree.right)
}

function inOrder(tree) {
  if (!tree) return
  preOrder(tree.left)
  console.log(tree.val)
  preOrder(tree.right)
}

function laterOrder(tree) {
  if (!tree) return
  preOrder(tree.left)
  preOrder(tree.right)
  console.log(tree.val)
}

function BFS(tree) {
  const queue = [tree]
  while (queue.length) {
    const { left, right, val } = queue.shift()
    console.log(val)
    left && queue.push(left)
    right && queue.push(right)
  }
}

function bfsBy2Queue(root) {
  if (!root) return
  const q1 = [root]
  const q2 = []
  while (q1.length || q2.length) {
    const { left, right, val } = q1.shift()
    console.log(val)
    left && q2.push(left)
    right && q2.push(right)

    if (q1.length === 0) { // 交互指针
      const temp = q1
      q1 = q2
      q2 = temp
    }
  }
}

/**
 *        1
 *      2   3
 *     4 5 6 7
 * 1 2 4 5 3 6 7
 * 4 2 5 1 6 3 7
 * 4 5 2 6 7 3 1
 */
function preOrderByLoop(root) { // 非递归先序遍历
  if (!root) return

  const stack = []
  let current = root
  while (stack.length || current) {
    while (current) {
      console.log(current.val)
      stack.push(current) // 入栈
      current = current.left
    }
    if (stack.length) {
      current = stack.pop() // 出栈
      current = current.right
    }
  }
}

function inOrderByLoop(root) { // 非递归先序遍历
  if (!root) return

  const stack = []
  let current = root
  while (stack.length || current) {
    while (current) {
      stack.push(current) // 入栈
      current = current.left
    }
    if (stack.length) {
      current = stack.pop() // 出栈
      console.log(current.val)
      current = current.right
    }
  }
}

function laterOrderByLoop(root) {
  if (!root) return
  let lastOutNode = null
  const stack = []
  let current = root
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    if (stack.length) {
      current = stack.pop()

      if (!current.right || current.right === lastOutNode) { // 若没有 右子节点 或 上一个出栈节点就是当前节点
        console.log(current.val)
        lastOutNode = current;
        current = null
      } else { // 入栈
        stack.push(current)
        current = current.right
      }
    }
  }
}