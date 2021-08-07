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
        current = current.left;
        if (!current) {
          parent.left = node;
          return
        }
      } else {
        current = current.right;
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
  getMaxDeep(node, deep) {
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
console.log(t);
// t.middleOrder(t.root);
// console.log(t.getMin(), t.getMax());
// console.log(t.getDeep(t.root, 0));
// console.log(t.getNode(5, t.root));