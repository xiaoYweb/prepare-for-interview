class EventEmitter1 {
  constructor() {
    this._maxListeners = 10;
    this._listenerMap = Object.create(null);
  }

  addListener(eventType, listener, prepend) {
    const listeners = (this._listenerMap[eventType] || (this._listenerMap[eventType] = []))

    prepend // prepend 为true表示向事件队列头部添加事件
      ? listeners.unshift(listener)
      : listeners.push(listener)
  }
  removeListener(eventType, listener) {
    const listeners = this._listenerMap[eventType];
    if (!Array.isArray(listeners)) return false;
    if (!listener) {
      delete this._listenerMap[eventType]
      return
    }
    this._listenerMap[eventType] = listeners.filter(n => !(n === listener || n.origin === listener))
  }
  once(eventType, listener) { // 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器
    const only = (...args) => {
      listener.apply(this, args);
      this.removeListener(eventType, listener);
    }
    only.origin = listener;
    this.addListener(eventType, only);
  }

  // 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。
  setMaxListeners(maxCount) {
    this.maxListeners = maxCount;
  }
  // 按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false
  emit(eventType, ...args) {
    const listeners = this._listenerMap[eventType];
    listeners.forEach(listener => {
      listener.apply(this, args)
    });
  }
}

class EventEmitter {
  constructor() {
    this.listenersMap = {}

  }
  addListener(type, fn, prepend) {
    const listeners = (this.listenersMap[type] || (this.listenersMap[type] = []))
    prepend
      ? listeners.unshift(fn)
      : listeners.push(fn)
  }
  emit(type, ...args) {
    this.listenersMap[type].forEach(cb => cb.apply(this, args))
  }
  removeListener(type, listener) {
    if (!listener) {
      this.listenersMap[type] = []
      return
    }
    this.listenersMap[type] = this.listenersMap[type].filter(
      fn => !(fn === listener || fn.origin === listener)
    )
  }
  once(type, listener) {
    const func = (...r) => {
      listener.apply(this, r)
      this.removeListener(type, listener)
    }
    func.origin = listener
    this.addListener(type, func)
  }
}

var emitter = new EventEmitter();

var onceListener = function (args) {
  console.log('我只能被执行一次', args);
}

var listener = function (args) {
  console.log('我是一个listener', args);
}

emitter.once('click', onceListener);
emitter.addListener('click', listener);

emitter.emit('click', '参数 第1次执行');
emitter.emit('click', '参数 第2次执行');

emitter.removeListener('click', listener);
emitter.emit('click');


