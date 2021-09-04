
/**
 * 从根节点开始渲染和调度
 * 两个阶段
 * 1. render 阶段 2个步骤 
 *   1.1  vdom 转化为fiber tree 
 *   1.2  收集  effectList 副作用列表
 * render 阶段 比较花时间  所以需要 对任务进行拆分 拆分维度vdom 此阶段可以中断 恢复
 * render 阶段 目的是 effectList 哪些节点删除 新增 更新
 *  
 * 2. commit阶段 进行dom的更新创建 不能中断 
 */

import { DELETION, ElEMENT_TEXT, PLACEMENT, TAG_CLASS, TAG_FUNCTION, TAG_HOST, TAG_ROOT, TAG_TEXT, UPDATE } from "./constants"
import { setProps } from "./setProps"
import { Update, UpdateQueue } from "./updateQueue"


let nextUnitOfWork = null // 下一个工作单元
let workInProgressRoot = null // rootFiber 正在渲染的 根fiber
let currentRoot = null // 当前渲染树 
let deletions = [] // 删除的节点需要单独记录
let workInProgressFiber = null // 正在工作的fiber 
let hookIndex = 0

function scheduleRoot(rootFiber) { // 返回 dom  没有传参 rootFiber 视为更新 
  if (currentRoot && currentRoot.alternate) { // 渲染2次以后 采用双缓存机制
    workInProgressRoot = currentRoot.alternate
    workInProgressRoot.alternate = currentRoot
    if (rootFiber) {
      workInProgressRoot.props = rootFiber.props
    }
  } else if (currentRoot) { // 已经render 渲染过一次了
    if (rootFiber) {
      rootFiber.alternate = currentRoot
      workInProgressRoot = rootFiber
    } else {
      workInProgressRoot = {
        ...currentRoot,
        alternate: currentRoot
      }
    }
  } else { // 第一次渲染
    workInProgressRoot = rootFiber
  }

  workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null
  nextUnitOfWork = rootFiber
}

requestIdleCallback(workLoop, { timeout: 500 })



function workLoop(deadline) {
  let shouldYield = false

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1 // 没有空余时间了
  }

  if (!nextUnitOfWork && workInProgressRoot) {
    console.log('render 结束')
    commitRoot()
  }

  // 若空闲时间用完后还有任务没有完成 再次请求调度时间
  requestIdleCallback(workLoop, { timeout: 500 })
}

function performUnitOfWork(fiber) {
  beginWork(fiber)

  if (fiber.child) {
    return fiber.child
  }

  while (fiber) {
    completeUnitOfWork(fiber)
    if (fiber.sibling) {
      return fiber.sibling
    }
    fiber = fiber.return
  }
}
/**
 * 1. 创建 dom 
 * 2. 创建 子 fiber
 */
function beginWork(fiber) {
  const { tag } = fiber;
  if (tag === TAG_ROOT) {
    updateHostRoot(fiber)
  } else if (tag === TAG_TEXT) {
    updateHostText(fiber) // 创建文本节点 挂载 stateNode
  } else if (tag === TAG_HOST) {
    updateHost(fiber) // 创建 dom 挂载 stateNode 创建 子 fiber
  } else if (tag === TAG_CLASS) {
    updateClassComonent(fiber)
  } else if (tag === TAG_FUNCTION) {
    updateFunctionComonent(fiber)
  }
}

function updateFunctionComonent(fiber) {
  // hook 相关 初始化
  workInProgressFiber = fiber
  hookIndex = 0
  workInProgressFiber.hooks = []

  const { type: FunctionComonent, props } = fiber;
  const children = FunctionComonent(props)
  reconcileChildren(fiber, children)
}
/**
 * 收集副作用 fiber  组成副作用链表 effectList
 * a1Text b1Text c1Text c1 c2Text c2 b1 b2Text b2 a1
 */
function completeUnitOfWork(fiber) {
  let returnFiber = fiber.return
  if (returnFiber) {
    // 1. 先让自身的effectList链 绑定到父节点上
    /**
     *         a
     *     b1      b2
     *   c1  c2  d1  d2
     */
    if (!returnFiber.firstEffect) { // 父节点没有 第一个副作用节点
      returnFiber.firstEffect = fiber.firstEffect
    }
    if (fiber.lastEffect) { // 当前节点的存在 lastEffect
      if (returnFiber.lastEffect) { // 存在 
        returnFiber.lastEffect.nextEffect = fiber.firstEffect
      }
      returnFiber.lastEffect = fiber.lastEffect
    }

    const { effectTag } = fiber
    // 2. 然后如果 自身存在副作用 再将自己身也关联到父节点上
    if (effectTag) { // 存在副作用的 节点 fiber
      if (returnFiber.lastEffect) { // 父节点已存在
        returnFiber.lastEffect.nextEffect = fiber
        // returnFiber.lastEffect = fiber
      } else { // 父节点没有 指向 副作用的链条
        returnFiber.firstEffect = fiber
        // returnFiber.lastEffect = fiber
      }
      returnFiber.lastEffect = fiber
    }
  }
}

function commitRoot() {
  deletions.forEach(commitWort) // 执行提交前 该删除的元素 先删除
  let currentFiber = workInProgressRoot.firstEffect
  while (currentFiber) {
    commitWort(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  deletions.length = 0 // 提交完成后 需要清空
  currentRoot = workInProgressRoot
  workInProgressRoot = null
}

function commitWort(fiber) {
  if (!fiber) return
  let returnFiber = fiber.return
  while (
    returnFiber.tag !== TAG_HOST
    && returnFiber.tag !== TAG_ROOT
    && returnFiber.tag !== TAG_TEXT
  ) { // 找到真实dom节点 或者 host节点
    returnFiber = returnFiber.return
  }
  const parent = returnFiber.stateNode
  const child = fiber.stateNode
  if (fiber.effectTag === PLACEMENT) {
    // if (fiber.tag === TAG_CLASS) return 
    // 若果挂载的节点不是 dom节点  类组件 函数组件
    let currentFiber = fiber
    while (currentFiber.tag !== TAG_HOST && currentFiber.tag !== TAG_TEXT) {
      currentFiber = currentFiber.child
    }
    parent.appendChild(currentFiber.stateNode)
  } else if (fiber.effectTag === DELETION) {
    commitDeletion(fiber, parent)
    return
  } else if (fiber.effectTag === UPDATE) {
    if (fiber.type === ElEMENT_TEXT) { // 文本节点
      if (fiber.props.text !== fiber.alternate.props.text) {
        child.textContent = fiber.props.text
      } else {
        if (fiber.tag === TAG_CLASS) return // 类组件 无须更新 
        updateDom(
          child,
          fiber.alternate.props,
          fiber.props
        )
      }
    }
  }
  returnFiber.effectTag = null
}

function commitDeletion(fiber, parentNode) {
  if (currentFiber.tag === TAG_HOST && currentFiber.tag === TAG_TEXT) {
    parentNode.removeChild(fiber.stateNode)
  } else {
    commitDeletion(fiber.child, parentNode)
  }
}

/**
 * 1. 创建 子 fiber
 */
function updateHostRoot(fiber) { // 
  const children = fiber.props.children;
  reconcileChildren(fiber, children)
}

function reconcileChildren(fiber, children) { // vdom -> fiber
  let childIndex = 0
  let prevFiber = null // 上一个子 fiber
  let oldFiber = fiber.alternate && fiber.alternate.child
  if (oldFiber) {
    oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null
  }
  // 遍历 子 vdom 转化为 fiber
  while (childIndex < children.length || oldFiber) {
    const child = children[childIndex]
    let newFiber

    const { type } = child;
    let tag;
    // 类组件
    if (child && typeof child.type === 'function' && child.type.prototype.isReactElement) {
      tag = TAG_CLASS
    } else if (child && typeof child.type === 'function') {
      tag = TAG_FUNCTION
    } else if (type === ElEMENT_TEXT) { // 文本节点
      tag = TAG_TEXT
    } else if (typeof type === 'string') { // dom节点
      tag = TAG_HOST
    }

    const sameType = oldFiber && fiber && oldFiber.type === fiber.type
    if (sameType) {
      if (oldFiber.alternate) { // 第三次渲染及后面的渲染
        newFiber = oldFiber.alternate
        newFiber.props = child.props
        newFiber.alternate = oldFiber
        newFiber.effectTag = UPDATE
        newFiber.nextEffect = null
        newFiber.updateQueue = oldFiber.updateQueue || new UpdateQueue()
      } else {
        newFiber = {
          tag: oldFiber.tag,
          type,
          props: child.props,
          stateNode: oldFiber.stateNode,
          return: fiber,
          effectTag: UPDATE,
          nextEffect: null, // effectList 单链表
          alternate: oldFiber,
          updateQueue: new UpdateQueue()
        }
      }

    } else {
      newFiber = {
        tag,
        type,
        props: child.props,
        stateNode: null,
        return: fiber,
        effectTag: PLACEMENT,
        nextEffect: null, // effectList 单链表
      }
      if (oldFiber) {
        oldFiber.effectTag = DELETION
        deletions.push(oldFiber)
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling // oldFiber 指针向后移动 新vdom也在向后移动
    }

    if (childIndex === 0) {
      fiber.child = newFiber
    } else {
      prevFiber.sibling = newFiber
    }

    prevFiber = fiber
    childIndex++
  }
}


function updateHostText(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDom(fiber)
  }
}

function createDom(fiber) {
  const { tag } = fiber; tta
  if (tag === TAG_TEXT) { // 文本节点
    return document.createTextNode(fiber.props.text)
  } else if (tag === TAG_HOST) { // 原生dom
    const stateNode = document.createElement(fiber.type)
    updateDom(stateNode, {}, fiber.props) // 更新属性
    return stateNode
  }
}

function updateDom(dom, oldProps, newProps) { // 更新属性
  // 判断是否是dom节点
  dom && dom.setAttribute && setProps(dom, oldProps, newProps)
}

function updateHost(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDom(fiber)
  }
  const children = fiber.props.children

  reconcileChildren(fiber, children)
}

function updateClassComonent(fiber) {
  const { stateNode, type: ClassComponent, props } = fiber
  if (!stateNode) {
    fiber.stateNode = new ClassComponent(props)
    fiber.stateNode.internalFiber = fiber
    fiber.updateQueue = new UpdateQueue()
  }
  fiber.stateNode.state = fiber.updateQueue.forceUpdate(fiber.stateNode.state)
  const newEl = fiber.stateNode.state.render()
  const newChildren = [newEl]
  reconcileChildren(fiber, newChildren)
}


export {
  scheduleRoot
}

/**
 * 
 * @param {Function} reducer // 函数返回 
 * @param {*} initialValue 
 * @returns state
 * workInProgressFiber = fiber
  hookIndex = 0
  workInProgressFiber.hooks = []
 */
export function useReducer(reducer, initialValue) { // 
  const oldHook = workInProgressFiber.alternate && workInProgressFiber.alternate.hooks && workInProgressFiber.alternate.hooks[hookIndex]
  let newHook = oldHook
  if (oldHook) { // 第二次及n次渲染
    oldHook.state = oldHook.updateQueue.forceUpdate(oldHook.state)
  } else { // 第一次初始化
    newHook = {
      state: initialValue,
      updateQueue: new UpdateQueue()
    }
  }
  const dispatch = action => {
    const payload = reducer
      ? reducer(newHook.state, action)
      : action
    newHook.updateQueue.enqueueUpdate(new Update(payload))
    scheduleRoot()
  }
  workInProgressFiber.hooks[hookIndex] = newHook
  return [newHook.state, dispatch]
}

export function useState(initialValue) {
  return useReducer(null, initialValue)
}

function useEffect(cb, dep) {

}
