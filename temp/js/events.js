class EventEmitter {
  constructor() {
    this.listeners = {}
  }
  addListener(eventType, listener, bol) {
    const listeners = (this.listeners[eventType] || (this.listeners[eventType] = []))
    bol
      ? listeners.unshift(listener)
      : listeners.push(listener)
  }
  removeListener(eventType, listener) {
    if (!Array.isArray(this.listeners[eventType])) {
      return
    }
    if (!listener) {
      delete this.listeners[eventType]
      return
    }
    this.listeners[eventType] = this.listeners[eventType].filter(
      fn => !(fn === listener || fn.origin === listener)
    )
  }
  emit(eventType, ...args) {
    const listeners =  this.listeners[eventType]
    listeners && listeners.forEach(fn => fn.apply(this, args));
  }
  once(eventType, listener) {
    const only = (...args) => {
      listener.apply(this, args)
      this.removeListener(eventType, listener)
    }
    only.origin = listener
    this.addListener(eventType, only)
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

emitter.emit('click', '参数1');
emitter.emit('click', '参数2');

emitter.removeListener('click', listener);
emitter.emit('click');