/** middle 螺旋矩阵
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素
 * 
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
    输出：[1,2,3,6,9,8,7,4,5]

  输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
  输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 */

/**
 * i === 1  start matrix[0][1]  end matrix[end]
 * i === 2  start matrix[0]  end matrix[0][1]
 */
// console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))
// console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))
function spiralOrder(matrix) {
  const result = []
  const i = matrix.length // 数组y轴 向下
  const j = matrix[0].length // 数组x轴 向右
  let total = i * j - 1
  let x = 0 // 数组x轴 向左  对应 j
  let y = 0 // 数组y轴 向下  对应 i
  let flag = 0 // 执行顺序为 右0 下1 左2 上3 
  result.push(matrix[y][x])
  matrix[y][x] = null // 沉岛思维

  while (total > 0) {
    if (flag % 4 === 0) { // 向右
      while (x < j - 1 && matrix[y][x + 1] !== null) {
        x++
        result.push(matrix[y][x])
        matrix[y][x] = null 
        total--
      }
      flag++
    }
    if (flag % 4 === 1) { // 向下
      while (y < i - 1 && matrix[y + 1][x] !== null) {
        y++
        result.push(matrix[y][x])
        matrix[y][x] = null 
        total--
      }
      flag++
    }
    if (flag % 4 === 2) { // 向左
      while (x > 0 && matrix[y][x - 1] !== null) {
        x--
        result.push(matrix[y][x])
        matrix[y][x] = null 
        total--
      }
      flag++
    }
    if (flag % 4 === 3) { // 向上
      while (y > 0 && matrix[y - 1][x] !== null) {
        y--
        result.push(matrix[y][x])
        matrix[y][x] = null 
        total--
      }
      flag++
    }
  }
  return result
}