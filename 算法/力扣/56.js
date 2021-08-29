/** middle 合并区间
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。



  输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
  输出：[[1,6],[8,10],[15,18]]
  解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

  输入：intervals = [[1,4],[4,5]]
  输出：[[1,5]]
  解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

  提示
  1 <= intervals.length <= 104
  intervals[i].length == 2
  0 <= starti <= endi <= 104
  乱序
 */
// console.log('[[1,3],[2,6],[8,10],[15,18]]', merge([[1, 3], [2, 6], [8, 10], [15, 18]]))
// console.log('[[1,4],[4,5]]', merge([[1, 4], [4, 5]]))
console.log(
  '[[1,9], [2,5], [19,20], [10,11], [12,20], [0,3], [0,1], [0,2]] ->',
  merge([[1, 9], [2, 5], [19, 20], [10, 11], [12, 20], [0, 3], [0, 1], [0, 2]])
)
// [ [1,9], [2,5], [19,20], [10,11], [12,20], [0,3], [0,1], [0,2] ]
// [ [0,3], [0,1], [0,2], [1,9], [2,5], [10,11], [12,20], [19,20],]
/**
 * 1. 乱序 需要优先依照左边界 从小到大排序 
 * 2. 后边有边界可能 会 小于前面的右边界 
 */
function merge(intervals) {
  if (intervals.length === 1) return intervals
  intervals.sort((a, b) => a[0] - b[0])
  const result = []
  let record = intervals[0].slice()
  for (let i = 1; i < intervals.length; i++) {
    const arr = intervals[i];
    // console.log(record, arr)
    if (record[0] === arr[0]) { // 左边界一致  取右边界 最大的作为 缓存 
      record[1] = Math.max(record[1], arr[1]) // 取右边界较大值
      continue
    }
    // 左边界 小于 当前左边界  对比 右边界 
    if (record[1] >= arr[0]) { // 区间越界
      record[1] = Math.max(record[1], arr[1]) // 取右边界较大值
    } else {
      result.push(record)
      record = arr.slice() // 浅拷贝当前 arr
    }
  }
  result.push(record)

  return result
}