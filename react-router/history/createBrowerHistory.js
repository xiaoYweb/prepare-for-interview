

function createBrowerHistory() {
  const GlobalHistory = window.history;
  const location = {
    pathname: window.location.pathname,
    state: window.location.state,

  }
  const history = {
    action: 'POP', // pushState -> PUSH replaceState -> REPLACE    go forward back POP
    location,
    push,
    listen,
    go,
    goBack() {
      go(-1)
    },
    goForward() {
      go(1)
    },
    // block
    // createHref
    // length // 历史站的长度
    // replace

  }

  let state;
  let listeners = []

  // 传参方式 2 种 push('/usr', {}) push({ pathname: '', state: {} })
  function push(pathname, nextState) { // pathname 路径 state 状态属性
    const action = 'PUSH'
    if (typeof pathname === 'object') {
      path = pathname.pathname
      state = pathname.state
    } else {
      state = nextState
    }
    GlobalHistory.pushState(state, null, pathname)
    const location = { pathname, state }

    // 执行监听函数
    notify({ action, location })
  }

  // 通知 
  function notify(payload) {
    Object.assign(history, payload)
    listeners.forEach(listener => listener(location))
  }

  function listen(listener) {
    listeners.push(listener)

    // 返回 取消订阅 方法   
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  window.addEventListener('popstate', () => {
    const location = {
      pathname: window.location.pathname,
      state: GlobalHistory.state
    }
    notify({action: 'POP', location})
  })
  function go(n) {
    GlobalHistory.go(n)
  }

  return history
}

export default createBrowerHistory; 
