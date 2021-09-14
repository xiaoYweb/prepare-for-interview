
const randomKey = Math.random.toString(36).slice(2)
export const internalEventHandlersKey = '__reactEvents$' + randomKey()
export const internalInstanceKey = '__reactFiber$' + randomKey()
export const internalePropsKey = '__reactProps$' + randomKey()

export function getClosestInstanceFromNode(targetNode) { // 从dom节点获取 fiber
  return targetNode[internalInstanceKey]
}

export function getFiberCurrentPropsFromNode(targetNode) { // 从dom节点获取 props 属性
  return targetNode[internalePropsKey]
}

/**
 * 根据dom元素 获取到 需绑定事件
 * @param {*} node 容器节点 原生 dom
 */
export function getEeventListenerSet(node) {
  let elementListenerSet = node[internalEventHandlersKey]
  if (!elementListenerSet) {
    elementListenerSet = node[internalEventHandlersKey] = new Set()
  }
  return elementListenerSet
}