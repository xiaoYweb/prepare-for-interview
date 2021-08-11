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
    const n  = i + 1;
    // 一定有左子节点 2n 数组索引 -1 
    node.left = nodeList[2 * n - 1]
    
    // 不一定有右子节点 判断越界  2n + 1 数组索引 -1 
    const rightNodeIndex = 2 * n + 1 - 1
    if (rightNodeIndex < arr.length) {
      node.right = nodeList[rightNodeIndex]
    }
  }``
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