function createElement(type, config, children) {

  const props = {}
  Object.keys(config).forEach(key => {
    props[key] = config[key]
  })
  if (arguments.length > 3) {
    props.children = [].slice.call(arguments, 2)
  } else {
    props.children = children
  }

  return {
    type, props
  }
}

const React = {
  createElement
}

export default React