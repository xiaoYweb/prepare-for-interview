import { ElEMENT_TEXT } from "./constants"
import { scheduleRoot } from "./scheduler"
import { Update, UpdateQueue } from "./updateQueue"



/**
 * 
 * @param {*} type 元素类型 dom nodeType Fucntion Class
 * @param {*} config 
 * @param  {...any} children 
 */
function createElement(type, config = {}, ...children) {
  delete config.__self
  delete config.__source

  return {
    type,
    props: {
      ...config,
      children: children.map(child => {
        return typeof child === 'string'
          ? {
            type: ElEMENT_TEXT,
            props: {
              text: child,
              children: []
            }
          }
          : child
      })
    }
  }

}


class Component {
  constructor(props) {
    this.props = props
    // this.updateQueue = new UpdateQueue(this)
  }
  setState(partialState) {
    const update = new Update(partialState)
    // this.updateQueue.enqueueUpdate(update)
    this.internalFiber.updateQueue.enqueueUpdate(update)
    scheduleRoot()
  }
}
Component.prototype.isReactComponent = {}



const React = {
  createElement,
  Component
}

export default React