const createNode = require('./createNode')
/**
 * 树 递归的数据结构
 * 由一个或多个数据节点组成 (根节点{1} 子节点{0,} 叶子节点{0,})
 * 根节点 
 * 分支节点
 * 叶子节点 没有子节点的节点)
 * 度 节点拥有子节点个数
 * 兄弟节点 父节点 子节点
 * 层 根节点(第一层)
 * 深度 数的最大层次数
 */

/**
 * 二叉树 节点最大的度为2 即 一个节点最多分出2个叉
 * 左子树
 * 右子数
 */
function maxTreeDepth(tree) { // leetcode 104
  if (!tree) return 0;
  return Math.max(maxTreeDepth(tree.left), maxTreeDepth(tree.right)) + 1
}

/**
 * 满二叉树 
 * 1. 叶子节点都在同一层
 * 2. 所有分支节点(非叶子节点 非根节点) 都有左右子树
 * 第i层的节点个数 2 ^ (i - 1)
 * 深度为h的树 节点数 2^h - 1
 */

/**
 * 斜树
 * 所有子节点都向一个方向分叉 只分叉出左子树 或右子树 
 * 类似链表
 */

/**
 * 完全二叉树
 * 从做到右添加节点
 * 深度为h的二叉树 他的h-1层都是满的 h层从左侧连续排列 空位均在右侧
 * 满二叉树 是 完全二叉树
 * 
 * 将完全二叉树进行编号
 * [1,2,3,4,5]
     1
    /  \
   2    3
  / \   
 4   5 
 
  1. 节点k的 父节点 Math.floor(k / 2)
  2. 子节点排序 先左后右  从左往右添加
  3. 左孩子 2k   右孩子2k + 1
 */
class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
  show() {
    console.log(this.data);
  }
}
// 构建一个  完全二叉树
function createTree(arr) {
  const nodeList = []
  for (let i = 0; i < arr.length; i++) {
    const node = new Node(arr[i])
    nodeList.push(node)
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
  } ``
  return nodeList[0];
}

// console.log(createTree([1,2,3,4,5]))


/**
 * 相同的树 LeetCode 100
 * 1. 根节点 相同
 * 2. 两颗树 如果左右子树 树A的左子树 === 树B的左子树 树A的右子树 === 树B的右子树
 * 3. null/空相同
 * 4. 
 */

function isSameTree(p, q) { // leetcode 100
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

/**
 * 树的遍历 对数中的每个节点都访问一次
 * 深度优先遍历 dfs deep first search
 * 广度优先遍历 bfs breath first search 一层层遍历
 * 
 * 前序遍历 根节点 左节点 由节点
 * 中序遍历 左节点 根节点 由节点
 * 后序遍历 左节点 由节点 根节点
 * 
 * 
 * 对于一颗完全二叉树的遍历
 * 层次遍历 123456789
 * 先序遍历 124895367
 * 中序遍历 849251637
 * 后序遍历 894526731
 */
// 遍历完全二叉树 递归法
function preOrder(tree) {
  if (!tree) return
  console.log(tree.val)
  preOrder(tree.left)
  preOrder(tree.right)
}
function inOrder(tree) {
  if (!tree) return
  console.log(tree.val)
  preOrder(tree.left)
  preOrder(tree.right)
}
function laterOrder(tree) {
  if (!tree) return
  console.log(tree.val)
  preOrder(tree.left)
  preOrder(tree.right)
}
// 遍历完全二叉树 迭代法
/**
 * 从根节点开始遍历 放入队列中 
 * 取出对头节点 获取左节点和有节点放入队列... 以此类推
 * 队列长度为0  遍历结束
 */
function BFS(root) { // 层次遍历
  if (!root) return;
  const queue = [root]

  while (queue.length) {
    const current = queue.pop()
    console.log(current.val)
    if (current.left) {
      queue.push(current.left)
    }
    if (current.right) {
      queue.push(current.right)
    }
  }
}
// console.log('--', preOrderBFS())


/**
 * 递归 有去有回 大问题不断分解为子孙问题 先解决子问题 然后解决依赖关系的子问题 最后解决当前问题 
 * fib(3) -> fib(2) + fib(1)  
 * 先进后出 类似于栈 函数栈
 * 先序遍历 (栈 当前节点指针)
 * 1. 从根节点开始 当前指针节点为 根节点 指针节点入栈 
 * 2. 然后查找 当前指针节点 左子节点是否存在 是 则 当前指针节点 指向/赋值 左子节点 入栈  循环步骤 2 
 * 3. 当前节点指针 为空/null 指向/赋值 (取出栈顶节点) 看出有没有 右子节点 有则进入步骤 2
 */

function preOrderByLoop(root) { // 非递归先序遍历
  if (!root) return
  let current = root;
  const stack = []
  while (current || stack.length) {
    while (current) {
      console.log(current.val) // 入栈时 
      stack.push(current)
      current = current.left;
    }
    if (stack.length) {
      current = stack.pop()
      current = current.right;
    }
  }
}

function preOrderByLoop(root) { // 非递归中序遍历
  if (!root) return
  let current = root;
  const stack = []
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left;
    }
    if (stack.length) {
      current = stack.pop()
      console.log(current.val) // 出栈时
      current = current.right;
    }
  }
}

/**
 * 左 根 右  后序遍历的打印顺序是 左右根
 * 如何判断一个节点已经遍历完成 上一次遍历的节点是当前节点的右子树 判定 当前节点遍历完成 
 * 更改出栈顺序  根节点先不弹出 等右子树遍历完成后 弹出 
 * 出栈情况 为 2种 右子节点为null  上一次出栈的节点是 右子节点
 */
function laterOrderByLoop(root) { // 非递归后序遍历
  if (!root) return
  let current = root;
  let lastOutNode = null;
  const stack = []
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left;
    }
    if (stack.length) {
      current = stack.pop()
      // 更改出栈顺序 出栈情况 为 2种 右子节点为null  上一次出栈的节点是 右子节点
      if (!current.right || current.right === lastOutNode) {
        console.log(current.val) // 出栈时
        lastOutNode = current;
        current = null; //
      } else { // 不满足出栈条件
        stack.push(current) // 重新放入栈中
        current = current.right;
      }
    }
  }
}

/**
 * 对称二叉树 递归实现
 */

function isSymmetric(root) {
  if (!root) return true;
  return isMirror(root.left, root.right)
}
function isMirror(leftNode, rightNode) {
  if (!leftNode && !rightNode) return true;
  if (!leftNode || !rightNode) return false;
  if (leftNode.val !== rightNode.val) return false;
  return isMirror(leftNode.left, rightNode.right) && isMirror(leftNode.right, rightNode.left)
}

/**
 * 对称二叉树 广度优先遍历
 */

function isSymmetric2(root) {
  if (!root) return true;
  const queue = [root.left, root.right]

  while (queue.length) {
    const node1 = queue.shift()
    const node2 = queue.shift()
    if (!node1 && !node2) continue
    if (!node1 || !node2) return false;
    if (node1.val !== node2.val) return false;
    queue.push(node1.left, node2.right, node1.right, node2.left)
  }
  return true;
}

/**
 * 翻转二叉树 翻转前和翻转后 是对称的
 * 
 * 1. 从根节点开始 左右子树翻转 然后 递归操作
 * 2. 先翻转左子树 在翻转右子树 然后 交互左右子树
 */

// 交互左右子树 然后分别翻转左右子树   ---- 前序遍历 先处理根 然后 处理左右 子节点 
function invertTreeByPreOrder(root) {
  if (!root) return;
  [root.left, root.right] = [root.right, root.left]
  invertTreeByPreOrder(root.left)
  invertTreeByPreOrder(root.right)
  return root;
}
// 翻转左子树 交换左右子树 翻转右子树  ---- 中序遍历 先处左子树 然后处理根节点 然后 处理右子树 
function invertTreeByInOrder(root) {
  if (!root) return
  let temp = root.left;
  invertTreeByInOrder(root.left)
  temp.left = temp.right;
  temp.right = temp;
  invertTreeByInOrder(root.left)

  return root;
}

// 翻转左子树  翻转右子树 交换左右子树 ---- 后序遍历 先处左右子树 然后处理根节点
function invertTreeByLaterOrder(root) {
  if (!root) return
  let temp = root.left;
  invertTreeByInOrder(root.left)
  invertTreeByInOrder(root.right)
  temp.left = temp.right;
  temp.right = temp;

  return root;
}

/**
 * 翻转二叉树 广度优先遍历
 */

function invertTreeByBFS(root) { // 层次遍历
  if (!root) return;
  const queue = [root]

  while (queue.length) {
    const current = queue.pop() // 当前节点
    // 交换此节点的左右子树
    [current.left, current.right] = [current.right, current.left]

    if (current.left) {
      queue.push(current.left)
    }
    if (current.right) {
      queue.push(current.right)
    }
  }
}

/**
 * 非递归遍历的 前序 中序 后序 实现 翻转二叉树
 */

/**
 * 前序中序结果 倒推二叉树
 * 根据前序遍历及中序遍历的结果 还原二叉树
 * 1. 根据前序结果 找到根节点 
 * 2. 找到中序结果中根节点位置 确认左右子树 节点个数 
 * 3. 递归处理
 *      ---  3 1 0 2 8 5 7 6 --- preOrder
 *      ---  0 1 2 3 5 6 7 8 --- inOrder
 *      root = 3 
 *      index = indexof(3) = 3  size = 3
 *      left inOrder.slice(0, size + 1) preOrder.slice(1, size + 1)
 *      right inOrder.slice(size + 1) preOrder.slice(size + 1)
 */
function buildTreeByOrder(preOrder, inOrder) {
  if (preOrder.length === 0 || inOrder.length === 0) return;
  const rootVal = preOrder[0]
  const root = createNode(rootVal)

  const leftSize = inOrder.indexOf(rootVal)
  const leftPreOrder = preOrder.slice(1, leftSize + 1)
  const leftInOrder = inOrder.slice(0, leftSize)
  root.left = buildTreeByOrder(leftPreOrder, leftInOrder)

  const rightPreOrder = preOrder.slice(leftSize + 1)
  const rightInOrder = inOrder.slice(leftSize + 1)
  root.right = buildTreeByOrder(rightPreOrder, rightInOrder)

  return root;
}

/**
 * 中序结果 倒推二叉树
 * 根据前序遍历及中序遍历的结果 还原二叉树
 * 1. 根据后序结果 找到根节点 
 * 2. 找到中序结果中根节点位置 确认左右子树 节点个数 
 * 3. 递归处理
 *      ---  0 2 1 6 7 5 8 3 --- laterOrder
 *      ---  0 1 2 3 5 6 7 8 --- inOrder
 *      root = laterOrder[laterOrder.length - 1]  root 最后一项 
 *      index = indexof(3) = 3  size = 3
 *      left inOrder.slice(0, size + 1) laterOrder.slice(0, size + 1)
 *      right inOrder.slice(size + 1) laterOrder.slice(size, -1)
 */
function buildTreeByOrder(laterOrder, inOrder) {
  if (laterOrder.length === 0 || inOrder.length === 0) return;
  const rootVal = laterOrder[laterOrder.length - 1]
  const root = createNode(rootVal)

  const leftSize = inOrder.indexOf(rootVal)
  const leftLaterOrder = laterOrder.slice(0, leftSize)
  const leftInOrder = inOrder.slice(0, leftSize)
  root.left = buildTreeByOrder(leftLaterOrder, leftInOrder)

  const rightLaterOrder = laterOrder.slice(leftSize, -1)
  const rightInOrder = inOrder.slice(leftSize + 1)
  root.right = buildTreeByOrder(rightLaterOrder, rightInOrder)

  return root;
}