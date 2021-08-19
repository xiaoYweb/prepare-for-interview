/** easy 栈的最小值
 * 请设计一个栈，除了常规栈支持的pop与push函数以外，还支持min函数，该函数返回栈元素中的最小值。执行push、pop和min操作的时间复杂度必须为O(1)。

  MinStack minStack = new MinStack();
  minStack.push(-2);
  minStack.push(0);
  minStack.push(-3);
  minStack.getMin();   --> 返回 -3.
  minStack.pop();
  minStack.top();      --> 返回 0.
  minStack.getMin();   --> 返回 -2.
*/

class MyStack {
  constructor() {
    this.index = -1
  }
  push(val) {
    this[++this.index] = val
    return val
  }
  pop() {
    if(this.index < 0) return
    const val = this[this.index]
    delete this[this.index --]
    return val
  }
  size() {
    return this.index + 1
  }
  isEmpty() {
    return this.index === -1
  }
  peek() {
    if (this.isEmpty()) return 
    return this[this.index]
  }
}

/**
 * 新增 记录最小值栈
 * -2 0 -3
 * -2 -2 -3  minstack
 */

class MinStack {
  constructor() {
    this.stack = new MyStack()
    this.minStack = new MyStack()
  }
  push(x) {
    const { stack, minStack } = this;
    stack.push(x)
    if (!minStack.isEmpty() && minStack.peek() < x) {
      minStack.push(minStack.peek())
    } else {
      minStack.push(x)
    }
  }
  pop() {
    if (this.stack.length === 0) return
    const val = this.stack.pop()
    this.minStack.pop()
    return val
  }
  top() {
    return this.stack.peek()
  }
  getMin() {
    return this.minStack.peek()
  }
}

/**
 * 不使用额外的栈
 * [-2 0 -3 1]
 * push -2  0  -3  1
 * min  -2     -3     最小值发生变化时  将之前的最小值推入栈中 
 * [-2 0 -2 -3 1]
 * 
 * pop  1   -3(===min pop*2)-2  0  -2 
 * min  -3  -2
 */
class MinStack2 {
  constructor() {
    this.stack = new MyStack()
    this.min = Infinity;
  }
  push(x) {
    const { stack, min } = this;
    if (x <= min) { // 此处必须得 <=  [0,1,0]  [0,1,0,0]
      if (!stack.isEmpty()) {
        stack.push(min)
      }
      // 最小值重新赋值
      this.min = x;
    }
    stack.push(x)
  }
  pop() {
    const { stack, min } = this;
    if (stack.isEmpty()) return
    if (stack.size() === 1) {
      this.min = Infinity
    } else if (stack.peek() === min) {
      stack.pop()
      this.min = stack.peek()
    }
    // 如果移除的不是最小值 直接 pop
    // 如果移除的是最小值 则先
    return stack.pop()
  }
  top() {
    this.stack.peek()
  }
  getMin() {
    if (this.stack.isEmpty()) return
    return this.min;
  }
}
const minStack = new MinStack2();
console.log('push -2', minStack.push(2147483646))
console.log('push 0', minStack.push(2147483646))
console.log('push -3', minStack.push(2147483647))
console.log('getMin', minStack.getMin())
console.log('pop', minStack.pop())
console.log('getMin', minStack.getMin())
console.log('pop', minStack.pop())
console.log('getMin', minStack.getMin())
console.log('pop', minStack.pop())
console.log('push -3', minStack.push(2147483647))
console.log('top', minStack.top())
console.log('getMin ---', minStack.getMin(), minStack)
console.log('push -3', minStack.push(-2147483648))
console.log('getMin', minStack.getMin())
console.log('pop', minStack.pop())
console.log('getMin', minStack.getMin())

// ["MinStack","push","push","push","top","pop","getMin","pop","getMin","pop","push","top","getMin","push","top","getMin","pop","getMin"]
// [[],[2147483646],[2147483646],[2147483647],[],[],[],[],[],[],[2147483647],[],[],[-2147483648],[],[],[],[]]
// [
//   [],
//   [],// push 2147483646
//   [],// push 2147483646
//   [],// push 2147483647
//   [2147483647],// top 2147483647
//   [],// pop 2147483647
//   [2147483646],// getMin 2147483646
//   [],// pop 2147483646
//   [2147483646],// getMin 2147483646
//   [],// pop 2147483646
//   [],// push 2147483647
//   [2147483647],// top 2147483647
//   [2147483647],// getMin 2147483647
//   [],// push -2147483648
//   [],// top -2147483648
//   [],// getMin -2147483648
//   [],// pop -2147483648
//   [],// getMin
// ]