/*
BM87 合并两个有序的数组
给出一个有序的整数数组 A 和有序的整数数组 B ，请将数组 B 合并到数组 A 中，变成一个有序的升序数组

    0 <= n,m <= 100
1.保证 A 数组有足够的空间存放 B 数组的元素， A 和 B 中初始的元素数目分别为 m 和 n，A的数组空间大小为 m+n
2.不要返回合并的数组，将数组 B 的数据合并到 A 里面就好了，且后台会自动将合并后的数组 A 的内容打印出来，所以也不需要自己打印
3. A 数组在[0,m-1]的范围也是有序的
*/

// [4,5,6],[1,2,3]
function merge( A, m, B, n ) {
  let len = A.length
  let bLen = b.length
  let left = 0
  let right = 0
  while (len --) {
    if (A[left] <= B[right]) {
      left ++
      
    } else {
      left = len - bLen + right
      temp = B[right] // 1
      B[right] = a[left] // 4
      right++
      a[left] = temp // 1
    }
  }
}