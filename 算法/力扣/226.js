/** 翻转二叉树
 * 翻转一棵二叉树
 * 
 *   4
   /   \
  2     7
 / \   / \
1   3 6   9

     4
   /   \
  7     2
 / \   / \
9   6 3   1
 */

function invertTree(root) {
  if (!root) return root
  const temp = root.left
  root.left = root.right
  root.right = temp

  invertTree(root.left)
  invertTree(root.right)
}