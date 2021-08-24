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


/**
 * 构建完全二叉树
   [1,2,3,4,5]
     1
    /  \
   2    3
  / \   
 4   5 
 */
function createTree(arr = [1, 2, 3, 4, 5]) {
  const nodeList = new Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    nodeList[i] = val === null 
      ? null
      : createNode(val) 
  }

  for (let i = 0; i < Math.floor(nodeList.length / 2); i++) {
    const node = nodeList[i];
    const leftChildIndex = 2 * i + 1
    const rightChildIndex = 2 * i + 2
    node.left = nodeList[leftChildIndex]
    if (rightChildIndex < nodeList.length) {
      node.right = nodeList[rightChildIndex]
    }
  }

  return nodeList[0]
}

// console.log('createTree', createTree())

module.exports = createTree;
