class Node {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
  show() {
    console.log(this.val);
  }
}

function createNode(val, left, right) {
  return new Node(val, left, right)
}

module.exports = createNode;