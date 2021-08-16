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

function createNode(data, left, right) {
  return new Node(data, left, right)
}

module.exports = createNode;