
function functionThatReturnTrue() {
  return true
}
function functionThatReturnFalse() {
  return false
}


function createSyntheticEvent(interface) {
  function SyntheticBaseEvent(
    reactName,
    reactEventType,
    targetInst,
    nativeEvent,
    nativeEventTarget
  ) {
    this._reactName = reactName // onClick
    this._targetInst = targetInst // fiber
    this.type = reactEventType // dbclick
    this.target = nativeEventTarget // dom
    this.currentTarget = null // 当前事件源 
    for (const propName in interface) {
      if (Object.hasOwnProperty.call(interface, propName)) {
        this[propName] = nativeEvent[propName]
      }
    }
    this.isDefaultPrevented =  functionThatReturnFalse
    this.isPropagationStopped =  functionThatReturnFalse
    return this
  }

  Object.assign(SyntheticBaseEvent.prototype, {
    preventDefault() { // polyfill 处理兼容
      this.defaultPrevented = true
      const event = this.nativeEvent
      if (event.preventDefault) { // 其他标准浏览器
        event.preventDefault()
      } else { // ie 浏览器
        event.returnValue = false
      }
      this.isDefaultPrevented = functionThatReturnTrue
    },
    stopPropagation() {
      const event = this.nativeEvent
      if (event.stopPropagation) {
        event.stopPropagation()
      } else { // ie 浏览器
        event.cancelBubble = true
      }
      this.isPropagationStopped = functionThatReturnTrue
    }
  })

  return SyntheticBaseEvent 
}

const MouseEventInterface = {
  clientX: 0,
  clientY: 0,
}

export const SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface)
export const SyntheticEvent = createSyntheticEvent({})