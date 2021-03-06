/** easy 逆波兰表达式求值
 * 有效的算符包括 +、-、*、/ 。每个运算对象可以是整数，也可以是另一个逆波兰表达式
 * 整数除法只保留整数部分。
  给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。

  输入：tokens = ["2","1","+","3","*"]
  输出：9
  解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9

  输入：tokens = ["4","13","5","/","+"]
  输出：6
  解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6

  输入：tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
  输出：22
  解释：
  该算式转化为常见的中缀算术表达式为：
    ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
  = ((10 * (6 / (12 * -11))) + 17) + 5
  = ((10 * (6 / -132)) + 17) + 5
  = ((10 * 0) + 17) + 5
  = (0 + 17) + 5
  = 17 + 5
  = 22
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
    if (this.index < 0) return
    const val = this[this.index]
    delete this[this.index--]
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
 * 后缀表达式 自带优先级
 * 1. 出现数字 存入栈中
 * 2. 取出栈中的两个数字(popSecond +-/* popFirst) 计算 结果 入栈
 * 3. 
 */
// console.log('9->', evalRPN(["2", "1", "+", "3", "*"]))
console.log('6->', evalRPN(["4", "13", "5", "/", "+"]))
console.log('11->', evalRPN(ret()))
console.log('22->', evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])) 
//  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
function evalRPN(tokens) { // reversePolishNotation
  const stack = new MyStack()
  const mp = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  }
  for (let i = 0; i < tokens.length; i++) {
    const el = tokens[i];
    const fn = mp[el]
    if (!fn) {
      stack.push(el)
      continue
    }
    const num1 = parseInt(stack.pop())
    const num2 = parseInt(stack.pop())
    const res = fn(num2, num1)

    stack.push(res)
  }
  return parseInt(stack.pop())
}

function ret() {
  return ["-8", "23", "8", "-", "9", "23", "-", "-", "*", "33", "-8", "/", "+", "38", "-14", "-", "-", "-7", "32", "-19", "-", "11", "+", "+", "+", "14", "22", "-", "-", "27", "-9", "-", "+", "31", "+", "-12", "-11", "-", "-", "14", "+", "30", "+", "37", "30", "-", "+", "-9", "+", "7", "-", "37", "+", "-5", "13", "/", "-", "19", "-2", "-19", "12", "+", "-", "23", "+", "-", "-19", "-", "+", "6", "+", "-17", "+", "17", "+", "5", "36", "+", "-10", "+", "+", "23", "-8", "-", "-", "18", "-", "31", "-16", "-", "+", "34", "+", "-6", "+", "24", "-", "22", "-", "-8", "-", "28", "+", "-12", "+", "39", "28", "-7", "+", "+", "-14", "5", "+", "5", "+", "10", "+", "+", "+", "-18", "*", "10", "+", "-5", "11", "-", "6", "+", "-", "-12", "31", "+", "+", "30", "29", "-", "-", "39", "+", "13", "-8", "-5", "+", "-", "26", "19", "-", "*", "-", "10", "-", "-20", "5", "+", "+", "0", "-", "28", "-", "19", "/", "28", "+", "-18", "-", "28", "20", "+", "-5", "-19", "+", "+", "-", "-12", "-", "3", "-", "6", "-15", "+", "4", "-", "-", "38", "+", "-9", "-", "38", "-", "12", "-20", "-", "10", "5", "-15", "-", "-", "-", "+", "-11", "+", "5", "+", "2", "-", "28", "+", "-9", "-11", "-", "+", "37", "-", "-17", "31", "-", "2", "+", "+", "-16", "-12", "-", "-", "12", "+", "34", "-", "15", "+", "8", "+", "17", "-", "2", "-", "33", "+", "-5", "+", "14", "+", "29", "-", "33", "23", "+", "26", "30", "-", "+", "+", "39", "+", "9", "24", "-", "-", "20", "15", "+", "-", "24", "+", "37", "-", "30", "-1", "-", "+", "34", "+", "-13", "-", "23", "15", "-", "-", "-5", "-8", "8", "30", "35", "-9", "22", "+", "-", "-", "36", "-1", "+", "5", "-", "-", "+", "25", "-", "+", "27", "-", "16", "+", "+", "+", "39", "-", "15", "-", "-3", "+", "5", "-6", "-", "+", "-6", "-15", "-7", "-", "+", "/", "13", "-", "18", "+", "4", "+", "29", "+", "-17", "0", "-6", "-20", "-17", "+", "12", "-", "+", "-", "+", "+", "-10", "22", "+", "+", "-11", "-", "-2", "38", "-", "-", "-6", "+", "0", "-", "-10", "+", "-4", "-10", "+", "-", "0", "-", "31", "30", "-", "37", "5", "+", "+", "+", "-15", "+", "38", "4", "-", "-16", "-17", "+", "+", "+", "38", "-", "27", "-19", "/", "12", "+", "/"]
}

function evalRPN(tokens) {
  const stack = new MyStack()
  const mp = {
    '+': (a, b) => parseInt(a) + parseInt(b),
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => parseInt(a / b),
  }
  for (let i = 0; i < tokens.length; i++) {
    const char = tokens[i];
    const fn = mp[char]
    if (typeof fn === 'function') {
      const b = stack.pop()
      const a = stack.pop()
      const res = fn(a, b)
      // console.log("🚀 ~ file: 150.js ~ line 104 ~ evalRPN ~ res", res)
      stack.push(res)
      continue
    }
    stack.push(char)
  }
  return stack.pop()
}