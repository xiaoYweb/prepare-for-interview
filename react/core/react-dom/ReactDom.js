const DOMRenderer = require('../react-reconciler/ReactFiberReconciler')

const ReactDOM = {
  render(element, container, callback) {
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      false,
      callback,
    );
  }
}

function legacyRenderSubtreeIntoContainer(parentComponent, element, container) {
  const root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
    container,
  );
  DOMRenderer.unbatchedUpdates(() => { // 同步更新  改了全局变量
    root.render(element); // element --> <App />
  })
  
}

function legacyCreateRootFromDOMContainer(container) {
  return new ReactRoot(container, false); // 创建fiberRoot 
}

/**
 * FiberRoot
 * 1. 整个应用的起点
 * 2. 包含目标挂载节点
 * 3. 记录应用更新过程的信息 
 * container._internalRoot = root // FiberRoot
 */
function ReactRoot(container, isConcurrent) { // 
  const root = DOMRenderer.createContainer(container, isConcurrent) // createFiberRoot
  this._internalRoot = root;
}
ReactRoot.prototype.render = function (children) {
  const root = this._internalRoot;

  DOMRenderer.updateContainer(children, root, null);
}