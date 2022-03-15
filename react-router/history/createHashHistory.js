

function createHashHistory() {
  const historyStack = [] // location {pathname, state}[]
  let listeners = []
  let current = -1 // 
  let action = 'POP'
  let state;


  function listen(listener) {
    listeners.push(listener)

    // 返回 取消订阅 方法   
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  const location = {
    path: '/',
    state
  }

  const history = {
    action,
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


  }

  function hashChangeHandler(event) {
    const pathname = window.location.pathname.slice(1)
    const location = {
      pathname, state
    }
    Object.assign(history, {
      action,
      location,
    })
    if (action === 'PUSH') {
      historyStack[++current] = location
    }

    // 执行监听函数
    listeners.forEach(listener => listener(location))
  }
  window.addEventListener('hashchange', hashChangeHandler)
  // 传参方式 2 种 push('/usr', {}) push({ pathname: '', state: {} })
  function push(pathname, nextState) { // pathname 路径 state 状态属性
    const action = 'PUSH'
    if (typeof pathname === 'object') {
      path = pathname.pathname
      state = pathname.state
    } else {
      state = nextState
    }
    window.location.hash = pathname // 
  }

  function go(n) {
    action = 'POP'
    current += n
    const nextLocation = historyStack[current]
    state = nextLocation.state
    window.location.hash = nextLocation.pathname
  }

  if (window.location.hash) {
    action = 'PUSH'
    hashChangeHandler()
  } else {
    window.localStorage.hash = '/'
  }

  return history
}


export default createHashHistory;
