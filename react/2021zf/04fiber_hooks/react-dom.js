import { TAG_ROOT } from "./constants"
import { scheduleRoot } from "./schedule"


function render(element, container) {
  const rootFiber = {
    tag: TAG_ROOT,
    stateNode: container, // 元素dom | class 实例
    props: {
      children: [element] // 存放 vdom  后期 生成 fiber 
    }
  }

  const child = scheduleRoot(rootFiber)

  container.appendChild(child)
}


const ReactDom = {
  render
}

export default ReactDom