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

class Tree {
  constructor() {
    this.root = null;
  }
  insert(data) {
    const node = new Node(data, null, null)
    if (!this.root) { // 树没有节点 则 直接作为root节点/根节点
      this.root = node;
      return;
    }
    let current = this.root;
    let parent = null;
    while (current) {
      parent = current;
      if (data < parent.data) { // 
        current = parent.left;
        if (!current) {
          parent.left = node;
          return
        }
      } else {
        current = parent.right;
        if (!current) {
          parent.right = node;
          return
        }
      }
    }
  }
  preOrder(node) { // 前序遍历
    if (!node) return
    node.show()
    this.preOrder(node.left)
    this.preOrder(node.right)
  }
  middleOrder(node) { // 中序遍历
    if (!node) return
    this.middleOrder(node.left)
    node.show()
    this.middleOrder(node.right)
  }
  laterOrder(node) { // 后序遍历
    if (!node) return
    this.laterOrder(node.left)
    this.laterOrder(node.right)
    node.show()
  }
  getMin() { // 获取最小的 节点
    let current = this.root;
    while (current) {
      if (!current.left) return current;
      current = current.left;
    }
  }
  getMax() { // 获取最大的 节点
    let current = this.root;
    while (current) {
      if (!current.right) return current;
      current = current.right;
    }
  }
  getDeep(node, deep) {
    deep = deep || 0;
    if (node == null) {
      return deep;
    }
    deep++;
    const dleft = this.getDeep(node.left, deep);
    const dright = this.getDeep(node.right, deep);
    return Math.max(dleft, dright);
  }
  getMinDeep() {

  }
  getNode(data, node) {
    if (!node) return null
    if (data === node.data) {
      return node
    } else if (data < node.data) {
      return this.getNode(data, node.left)
    } else {
      return this.getNode(data, node.right)
    }
  }
}

const t = new Tree();
t.insert(3);
t.insert(8);
t.insert(1);
t.insert(2);
t.insert(5);
t.insert(7);
t.insert(6);
t.insert(0);
// console.log(t)
// console.log(t.preOrder(t.root));
// console.log(t.middleOrder(t.root));
// console.log(t.laterOrder(t.root));
// console.log('getMin', t.getMin());
// console.log('getMax', t.getMax());
// console.log(t.getDeep(t.root));
// console.log(t.getNode(5, t.root));
var node = {
  data: 3,
  left: {
    data: 1,
    left: {
      data: 0
    },
    right: {
      data: 2,
    }
  },
  right: {
    data: 8,
    left: {
      data: 5,
      right: {
        data: 7,
        left: {
          data: 6
        },
      },
    }
  }
}
function func(tree) {
  
  if (tree.left) {
    func(tree.left)
  }
  console.log(tree.data);
  if (tree.right) {
    func(tree.right)
  }
  
}
// func(node)


// 二叉树中序遍历
function inorderTraversalByRecursion(root, result = []) { // 递归实现
  if (!root) return result;
  if (root.left) {
    inorderTraversalByRecursion(root.left, result)
  }
  result.push(root.data)
  if (root.right) {
    inorderTraversalByRecursion(root.right, result)
  }
  return result;
}

function inorderTraversal(root) {
  let current = root;
  const stack = []
  const result = []
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left;
    }
    // current === null
    current = stack.pop()
    result.push(current.data)
    current = current.right;
  }

  return result;
}

// 二叉树前序遍历
function preorderTraversalByRecursion(root, result = []) { // 递归实现
  if (!root) return result;
  result.push(root.data)
  if (root.left) {
    preorderTraversalByRecursion(root.left, result)
  }
  if (root.right) {
    preorderTraversalByRecursion(root.right, result)
  }
  return result
}

function preorderTraversal(root) { 
  let current = root;
  const stack = [];
  const result = []
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      result.push(current.data)
      current = current.left;
    }
    current = stack.pop()
    current = current.right;
  }
  return result;
}
// 二叉树后序遍历
function laterorderTraversalByRecursion(root, result = []) { // 递归实现
  if (!root) return result;
  if (root.left) {
    laterorderTraversalByRecursion(root.left, result)
  }
  if (root.right) {
    laterorderTraversalByRecursion(root.right, result)
  }
  result.push(root.data)
  return result;
}
function laterorderTraversal(root) {
  // todo 
}

// console.log('inorderTraversalByRecursion', inorderTraversalByRecursion(node)) // 0123 5678
// console.log('inorderTraversal', inorderTraversal(node)) // 0123 5678
// console.log('preorderTraversalByRecursion', preorderTraversalByRecursion(node)) // 3102 8576
// console.log('preorderTraversal', preorderTraversal(node)) // 3102 8576
// console.log('laterorderTraversalByRecursion', laterorderTraversalByRecursion(node)) // 0216 7583
// console.log('laterorderTraversal', laterorderTraversal(node)) // 0216 7583
// 入栈出栈 实时情况
// []
// [ 3 ]
// [ 3, 1 ]
// [ 3, 1, 0 ]
// [ 3, 1 ]
// [ 3 ]
// [ 3, 2 ]
// [ 3 ]
// []
// [ 8 ]
// [ 8, 5 ]
// [ 8 ]
// [ 8, 7 ]
// [ 8, 7, 6 ]
// [ 8, 7 ]
// [ 8 ]