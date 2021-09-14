import { dispatchEventForPluginEventSystem } from "./DOMPluginEventSystem"
import { getClosestInstanceFromNode, getFiberCurrentPropsFromNode } from "./ReactDomComponentTree"
import { batchedEventUpdates } from "./ReactDomUpdateBatching"

/**
 * 
 * @param {*} domEventName 事件名
 * @param {*} eventSystemFlags 事件标识 0 - 冒泡 4 - 捕获
 * @param {*} targetContainer 容器 原生 dom
 * @param {*} nativeEvent 原生事件对象
 */
export function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  const target = nativeEvent.target || nativeEvent.srcElement || window
  const targetInst = getClosestInstanceFromNode(target)
  // const props = getFiberCurrentPropsFromNode(target)

  batchedEventUpdates(() => {
    dispatchEventForPluginEventSystem(
      domEventName,
      eventSystemFlags,
      nativeEvent,
      targetInst,
      targetContainer
    )
  })
}
