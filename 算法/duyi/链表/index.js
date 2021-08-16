/**
 * 32 34 33 23 -> HERO   第几行第几列
 * ONE 
 * TWO 
 * THREE 
 * FOR
 * 84 82 83 32 -> ? HIGH
 * ONE 
 * TWO 
 * THREE 
 * FOR
 * FIVE
 * SIX
 * SEVEN
 * EIGHT
 */

/**
 * 链表
 * 
 * 线性表 线性存储结构 一定联系关联 存储到内存空间中
 * 
 * 顺序(数据物理地址顺序/挨着存储)  -- 插入数据更加快捷 
 * 链式(数据物理地址不连着 而通过逻辑上关联 数据之间是引用关联的)
 */

/**
 * 烧一根不均匀的绳子 从头烧到尾需要 1h 提供很多条这样的绳子
 * 如何通过烧绳子 计算 1h25min 
 * 思路 主要是 25min 的计算 
 * 1. 同时烧2根绳子 一根从一边开始烧 另一根 从2头开始烧 一根烧完后 则可以计算出剩余绳子 烧完需要的时间 是半小时
 * 2. 剩余烧完需要半个小时的绳子 从2端开始烧 就计算出 15min时间了
 */

/**
 * 链表和数组的区别
 * 1. 链表实现了真正的动态， 不需要处理固定容量带来的问题
 * 2. 链表失去了随机访问的能力
 * 链表增删块 查找慢；数组查询块 增删慢
 */

/**
 * 单链表 数据+下一个节点的引用
 * 双链表 
 * 新增删除 (头部 中间 尾部)
 * 查询 
 * 根据元素索引位置 找到元素本身 若索引在前面 从前往后找 反之 从后往前找
 *  
 * 环形链表
 * 判断一个链表，链表是否有环 LeetCode 141 
 */

// 
function toSycle(node, pos) {
  let i = 0;
  let entryNode = null;
  while (node = node.next) {
    if (i === pos) {
      entryNode = node;
    }
    if (!node.next) {
      node.next = entryNode;
      return
    }
    i++
  }
}

/**
 * 跑步时 快的人和慢的人在某一点相遇
 * 快慢指针 判断环形链表
 * [1,2,3,4,5] --> 1为入口 [13524 1] [12345 1]
 * [1,2,3,4,5] --> 2为入口 [135 35 35 35] [123 45 23 45]
 * [1,2,3,4,5,6] --> 2为入口 [135246 35246] [123456 23456]
 * 
 * 如何通过快慢指针 找到入口节点(即 尾节点指向的节点)
 * [1,2,3,4,5,6] 3位入口 [135 35 35 35 13] [123 45 63 45 63]
 * [1,2,3,4,5,6,7] 5为入口 [1357 6 6 1357] [1234 5 6 7567]
 */
function isSycle(head) {
  if (!head || !head.next) return false;
  let fast = head;
  let slow = head;
  while (true) {
    if (!fast || !fast.next) {
      return false
    }
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true
    }
  }
}

/**
 * 约瑟夫环 有n个人围成一圈，从第一个人开始报数，报道被M杀，然后下一个人继续从1开始报数，循环往复，直到剩下最后一个人，最后一个人的初始位置在哪里
 * 0 1 2 fn(3,3)
 * 
 */
class LinkedList {
  constructor(val) {
    this.val = val;
  }
}
function josephu(n, m) { // 环形链表解决
  const head = new LinkedList(1)
  let current = head;
  for (let i = 1; i < n; i++) {
    const node = new LinkedList(i + 1)
    current.next = node;
    current = node;
  }
  current.next = head;

  let node = head;
  let count = 1;

  while (true) {
    if (count === m - 1) {
      console.log(node.next.val)
      node.next = node.next.next;
      count = 0
    }
    node = node.next;
    count++
    if (node.next === node) return node
  }
}
// console.log('josephu(31,4)', josephu(41, 3)) // ...16 31
// console.log('josephuByArr(31,4)', josephuByArr(41, 3)) // ...16 31

function josephuByArr(n, m) { // 数组形式实现
  const people = []
  for (let i = 0; i < n; i++) {
    people[i] = i + 1
  }
  let index = -1; // 轮到第几个人报数
  let count = 0; // 当前报数
  let remain = n; // 还剩多少人
  while (remain > 0) {
    index ++
    if (index >= n) {
      index = 0
    }
    if (!people[index]) continue;
    
    if (count === m) {
      people[index] = null;
      count = 0;
      remain --;
    }
    
    count ++
  }
  return index;
}