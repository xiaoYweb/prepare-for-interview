
import { listenToAllSupportedEvents } from './DOMPluginEventSystem'
import { HostComponent } from './ReactWorkTags'
import { internalePropsKey, internalInstanceKey} from './ReactDomComponentTree'

function render(reactEl, container) {
  listenToAllSupportedEvents(container)
  mount(reactEl, container)
}

function mount(reactEl, container) {
  const dom = createDom(reactEl)
  container.appendChild(dom)
}

function createDom(reactEl, container) {
  const { type, props } = reactEl
  let dom
  if (typeof reactEl === 'string' || typeof reactEl === 'number') {
    dom = document.createTextNode(reactEl)
  } else {
    dom = document.createElement(type)
  }

  const returnFiber = container[internalInstanceKey] || null
  const fiber = {
    tag: HostComponent, // 5
    type,
    stateNode: dom,
    returnFiber
  }
  dom[internalInstanceKey] = fiber // 
  dom[internalePropsKey] = props // 存放属性 方便查找 onClick onCaptureClick

  if (props) {
    updateProps(dom, {}, props)
    if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom)
    } else {
      mount(props.children, dom)
    }
  }
}

function reconcileChildren(children, prentNode) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    mount(child, prentNode)
  }
}

function updateProps(dom, oldProps, newProps) {

}

const ReactDom = {
  render
}

export default ReactDom