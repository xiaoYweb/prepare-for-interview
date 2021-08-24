const createNode = require('./createNode')

/**
 * 创建完全二叉树
 * 构造节点关系 找出分支节点 === Math.floor(arr.length / 2)个 
 */
function createTree(arr) {
  const nodeList = new Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    nodeList[i] = createNode(val)
  }
  // 构造节点关系 找出分支节点 === Math.floor(arr.length / 2)个 
  // 1 -> 2 & 3  2 -> 4 $ 5 
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    const node = nodeList[i]
    const n = i + 1;
    // 一定有左子节点 2n 数组索引 -1 
    node.left = nodeList[2 * n - 1]

    // 不一定有右子节点 判断越界  2n + 1 数组索引 -1 
    const rightNodeIndex = 2 * n + 1 - 1
    if (rightNodeIndex < arr.length) {
      node.right = nodeList[rightNodeIndex]
    }
  }
  return nodeList[0];
}
const root = createTree([1, 2, 3, 4, 5])

function dfs(root) {
  if (!root) return
  console.log(root.val)
  dfs(root.left)
  dfs(root.right)
}

function maxTreeDepth(root) {
  if (!root) return 0
  return Math.max(maxTreeDepth(root.left), maxTreeDepth(root.right)) + 1
}
// console.log('maxTreeDepth', maxTreeDepth(root)) //

function bfs(root) {
  if (!root) return
  const queue = [root]
  while (queue.length) {
    const current = queue.shift()
    console.log(current.val)
    if (current.left) {
      queue.push(current.left)
    }
    if (current.right) {
      queue.push(current.right)
    }
  }
}
function preOrder(root) {
  if (!root) return
  console.log(root.val)
  preOrder(root.left)
  preOrder(root.right)
}
function inOrder(root) {
  if (!root) return
  inOrder(root.left)
  console.log(root.val)
  inOrder(root.right)
}
function laterOrder(root) {
  if (!root) return
  laterOrder(root.left)
  laterOrder(root.right)
  console.log(root.val)
}
// console.log('preOrder', preOrder(root)) // 12453
// console.log('inOrder', inOrder(root)) // 42513
// console.log('laterOrder', laterOrder(root)) // 45231

/**
 *   [1,2,3,4,5]
     1
    /  \
   2    3
  / \   
 4   5 
 tack=[root] 
 1. root节点入栈 [1]  current = root
 2. current.left  左子节点2  入栈 [1,2] current = current.left
 3. current.left 左子节点4 入栈 [1,2,4] current = current.left
 4. current === null 节点 4出栈 取右子几点 current = stack.pop() current = current.right
 5. 右子节点 5 入栈 [1,2,5]  循环 。。。

[1]         入栈 1
[1,2]       入栈 2
[1,2,4]     入栈 4
[1,2]         出栈 4
[1]           出栈 2
[1,5]       入栈 5
[1]           出栈 5
[]            出栈 1
[3]         入栈 3
[]            出栈 3
preOrder    12453  入栈时打印顺序
inOrder     42513  出栈时打印顺序
laterOrder  45231  
 */
// console.log('preOrderByLoop', preOrderByLoop(root)) // 12453
console.log('inOrderByLoop', inOrderByLoop(root)) // 42513
// console.log('laterOrderByLoop', laterOrderByLoop(root)) // 45231
function preOrderByLoop(root) {
  const stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      console.log(current.val) // 入栈时
      stack.push(current)
      current = current.left;
    }
    if (stack.length === 0) break
    current = stack.pop()
    current = current.right;
  }
}

function inOrderByLoop(root) {
  const stack = []
  let current = root
  while (current || stack.length) {
    while (current) {
      console.log('入栈', current.val)
      stack.push(current)
      current = current.left;
    }
    if (stack.length === 0) break
    current = stack.pop()
    // console.log(current.val) // 出栈时
    console.log(' 出栈', current.val)
    current = current.right;
  }
}

function laterOrderByLoop(root) {
  let current = root
  const stack = []
  let lastOutNode = null;
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    if (stack.length === 0) break
    current = stack.pop()
    current = current.right
  }
}
