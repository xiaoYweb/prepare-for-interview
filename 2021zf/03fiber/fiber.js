


const container = document.getElementById('root')
const element = {}

let nextUnitOfWork = {
  stateNode: container,
  props: {
    children: [element]
  }
}
const Placement = 'Placement'
let workInProgressRoot = nextUnitOfWork

requestIdleCallback(workLoop)

function workLoop() {
  while (nextUnitOfWork) {
    nextUnitOfWork = performWork(nextUnitOfWork)
  }
  commitRoot()
}

/**
 * beginWork vdom 转化为 fiber tree
 * 1. 创建dom 
 * 2. 创建fiber 子树
 */
function performWork(workingInProgress) {
  beginWork(workingInProgress)
  if (workingInProgress.child) {
    return workingInProgress.child
  }
  while (workingInProgress) {
    completeUnitOfWork(workingInProgress) // 没有子节点 节点完成 
    if (workingInProgress.sibling) {
      return workingInProgress.sibling
    }
    workingInProgress = workingInProgress.return
  }

}

function beginWork(workingInProgress) {
  const { stateNode, props, type, children } = workingInProgress
  if (!workingInProgress.stateNode) {
    workingInProgress.stateNode = document.createElement(type)
    for (const key in props) {
      if (key !== 'children') {
        workingInProgress.stateNode[key] = props[key]
      }
    }
  }
  let previousFiber

  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const fiber = {
        type: child.type,
        props: child.props,
        effectTag: Placement,
        return: previousFiber,
      }
      if (!previousFiber) { // 第一个孩子
        workingInProgress.child = previousFiber
      } else {
        previousFiber.sibling = fiber
      }
      previousFiber = fiber
    }
  }
}

/**
 *           A1
 *        B1    B2
 *      C1  C2
 */
// 构建 副作用 链  存在副作用的节点
function completeUnitOfWork(workingInprogress) { // C1 -> C2 -> B1 -> B2 -> A1
  let returnFiber = workingInprogress.return
  if (returnFiber) { // 把当前有副作用的子链表 挂载到 父fiber身上
    if (!returnFiber.fistEffect) {
      returnFiber.fistEffect = workingInprogress
    }
    if (workingInprogress.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInprogress.fistEffect
      }
      returnFiber.lastEffect = workingInprogress.lastEffect
    }

    // 再把自己挂到后面取 
    if (workingInprogress.effectTag) {
      if (returnFiber.lastEffect) { // 
        returnFiber.lastEffect.nextEffect = workingInprogress
      } else { // 
        returnFiber.fistEffect = workingInprogress
      }
      returnFiber.lastEffect = workingInprogress
    }
  }
}


function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffct
  while (currentFiber) {
    console.log()
    if (currentFiber.effectTag === Placement) {
      const parentFiber = currentFiber.return.stateNode
      parentFiber.appendChild(currentFiber.stateNode)
    }
    currentFiber = currentFiber.nextEffect
  }
  workInProgressRoot = null
}