/**
 * 给定一个二叉树，返回所有从根节点到叶子节点的路径。
    说明: 叶子节点是指没有子节点的节点。

  输入
  {
    val: 1,
    left: {
      val: 2,
      left: null,
      right: {
        val: 5,
        left: null,
        right: null
      }
    },
    right: {
      val: 3,
      left: null,
      right: null
    }
  }
  输出  ["1->2->5", "1->3"]
 */

function binaryTreePaths(node) {
  if (!node) return []
  if (!node.left && !node.right) {
    return [String(node.val)]
  }
  let paths = []

  if (node.left) {
    const list = binaryTreePaths(node.left);
    for (let i = 0; i < list.length; i++) {
      const val = list[i];
      paths.push(`${node.val}->${val}`)
    }
  }

  if (node.right) {
    const list = binaryTreePaths(node.right);
    for (let i = 0; i < list.length; i++) {
      const val = list[i];
      paths.push(`${node.val}->${val}`)
    }
  }

  return paths;
}

const node = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: {
      val: 5,
      left: null,
      right: null
    }
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
}
var node1 = {
  val: 3,
  left: {
    val: 1,
    left: {
      val: 0
    },
    right: {
      val: 2,
    }
  },
  right: {
    val: 8,
    left: {
      val: 5,
      right: {
        val: 7,
        left: {
          val: 6
        },
      },
    }
  }
}
console.log(binaryTreePaths(node))