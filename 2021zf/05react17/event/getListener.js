import { getFiberCurrentPropsFromNode } from "./ReactDomComponentTree"


export default function getListener(fiberInstance, registrationName) {
  const stateNode = fiberInstance.stateNode
  const props = getFiberCurrentPropsFromNode(stateNode)
  const listener = props[registrationName] // onClick || onClickCapture
  return listener
}