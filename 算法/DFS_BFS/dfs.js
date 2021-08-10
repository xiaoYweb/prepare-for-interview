/**
 * 深度优先搜索
 * 是用于在树/图中遍历/搜索的一种重要算法
 * 与 BFS 不同，更早访问的结点可能不是更靠近根结点的结点。因此，你在DFS 中找到的第一条路径可能不是最短路径
 * 在DFS中，结点的处理顺序是完全相反的顺序，就像它们被添加到栈中一样，它是后进先出。所以深度优先搜索一般使用栈实现
 */
var node = {
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
/**
 * 二叉树 中序遍历 
 */
function inorderTraversal(root, result = []) {
  if (!root) return result;
  const current = root;
  if (current.left) {
    inorderTraversal(current.left, result)
  }
  result.push(current.val)
  // console.log(current.val)
  if (current.right) {
    inorderTraversal(current.right, result)
  }
  return result
}

// console.log('result', inorderTraversal(node))

/**
 * 二叉树 最大深度 
 */

function maxTreeDepth(root) {
  return !root
    ? 0
    : Math.max(maxTreeDepth(root.left), maxTreeDepth(root.right)) + 1
}

// console.log('deep', maxTreeDepth(node))


/**
 * 路径总和
 */

/**
 * 课程表
 */

/**
 * 岛屿数量
 */