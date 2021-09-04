


function setProps(dom, oldProps, newProps) {
  for (const key in oldProps) { // 删除新的没有 老的存在的 属性
    if (key === 'children') continue
    if (!newProps.hasOwnProperty(key)) {
      dom.removerAttribute(key)
    } else { // 更新 老的有 新的有
      setProp(dom, key, newProps[key])
    }
  }
  for (const key in newProps) { // 新增
    if (key === 'children') continue
    if (!oldProps.hasOwnProperty(key)) { // 新有 老没有 新增
      setProp(dom, key, newProps[key])
    }
  }
}
function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    dom[key.toLowerCase()] = value
  } else if (key === 'style') {
    if (value) {
      for (const styleName in value) {
        dom.style[styleName] = value[styleName]
      }
    }
  } else {
    dom.setAttribute(key, value)
  }
}



export {
  setProps
}