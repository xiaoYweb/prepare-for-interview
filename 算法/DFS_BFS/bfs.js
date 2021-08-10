/**
 * 广度优先搜索 
 * 广度优先搜索（BFS）是一种遍历或搜索数据结构（如树或图）的算法，也可以在更抽象的场景中使用。
 * 它的特点是越是接近根结点的结点将越早地遍历
 * 例如，我们可以使用 BFS 找到从起始结点到目标结点的路径，特别是最短路径
 * 在BFS中，结点的处理顺序与它们添加到队列的顺序是完全相同的顺序，即先进先出，所以广度优先搜索一般使用队列实现
  从上到下打印二叉树
  单词接龙
  员工的重要性
  岛屿数量
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
      left: {
        val: 6
      },
      right: {
        val: 7,
      },
    }
  }
}
/**
  在打印第一行时，将左孩子节点和右孩子节点存入一个队列里
  队列元素出队列打印，同时分别将左孩子节点和右孩子节点存入队列
  这样打印二叉树的顺序就是没行从左到右打印
*/
function PrintFromTopToBottom(root) { // 从上到下打印二叉树
  if (!root) return
  const result = []
  const queue = [root]
  while (queue.length) {
    const current = queue.shift()
    if (current.left) {
      queue.push(current.left)
    }
    if (current.right) {
      queue.push(current.right)
    }
    result.push(current.val)
  }
  return result;
}
// console.log('', PrintFromTopToBottom(node))

/**
 * 把二叉树打印成多行
 * 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行
  使用一个队列存储当前层遍历的节点
  使用两个变量来标记当前遍历的状态
  currentNums：当前层剩余的节点数
  childNums：孩子节点数
  当前层遍历完成后开始遍历孩子节点，currentNums赋值为childNums，childNums赋值为0，
 */
function Print1(root) {
  if (!root) return
  const result = []
  root.deep = 0;
  const queue = [root]
  while (queue.length) {
    const current = queue.shift()
    const { deep } = current;
    if (current.left) {
      current.left.deep = deep + 1
      queue.push(current.left)
    }
    if (current.right) {
      current.right.deep = deep + 1
      queue.push(current.right)
    }
    (result[deep] || (result[deep] = [])).push(current.val)
  }
  return result;
}
function Print(root) {
  if (!root) return
  const result = [];
  const queue = [root];
  let tempArr = []; // 每层要打印的数据
  let currentNums = 1; // 当前层省余节点数 
  let childNums = 0; // 孩子节点数 

  while (queue.length > 0) {
    const current = queue.shift();
    tempArr.push(current.val);
    currentNums--;
    if (current.left) {
      queue.push(current.left);
      childNums++;
    }
    if (current.right) {
      queue.push(current.right);
      childNums++;
    }


    if (currentNums === 0) {
      currentNums = childNums;
      childNums = 0;
      result.push(tempArr);
      tempArr = [];
    }
  }
  return result;
}

console.log('', Print(node))


/**
 * 按之字形顺序打印二叉树
 * 即第一行按照从左到右的顺序打印，
 * 第二层按照从右至左的顺序打印，
 * 第三行按照从左到右的顺序打印，其他行以此类推
 */

function PrintAsZ(root) {
  if (!root) return
  const result = []
  root.deep = 0;
  const queue = [root]
  while (queue.length) {
    const current = queue.shift()
    const { deep } = current;
    if (current.left) {
      current.left.deep = deep + 1;
      queue.push(current.left)
    }
    if (current.right) {
      current.right.deep = deep + 1;
      queue.push(current.right)
    }
    const list = result[deep] || (result[deep] = []);
    (deep + 1) % 2 === 0
      ? list.unshift(current.val) // 偶数层 从右至左的顺序打印
      : list.push(current.val)  // 奇数层 从左到右的顺序打印
  }
  return result;
}
console.log('PrintAsZ', PrintAsZ(node))



/**
 * 单词接龙
 */

/**
 * 员工的重要性
 */