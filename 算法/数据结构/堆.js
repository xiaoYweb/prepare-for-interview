/** 堆
 * 堆的底层实际上是一棵完全二叉树 (1.从左到右一次添加节点)。
 * 可以用数组实现
 * 每个的节点元素值不小于其子节点 - 最大堆
 * 每个的节点元素值不大于其子节点 - 最小堆
 */

/**
 * 大顶堆
  和孩子节点的最大值max比较
  大于max — 不需要在下沉
  小于max — 和max交换位置 - 继续和下一层孩子节点比较，直到队列末尾
 */
function createMaxHeap(arr, length) {
  const n = Math.floor(length / 2)
  for (let i = n - 1; i >= 0; i--) {
    adjustMaxHeap(arr, i, length)
  }
  return arr
}
function adjustMaxHeap(arr, index, length) {
  for (let i = index * 2 + 1; i < length; i = index * 2 + 1) {
    const element = array[i];

  }
}