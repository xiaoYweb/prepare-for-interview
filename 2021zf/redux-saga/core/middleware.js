
/**
 * redux 中间件 接收参数 { getState, dispatch } 返回函数 (next)=> {} // next 调用下一个中间件
 */
import { stdChannel } from './channel'
function sagaMiddlewareFactory() {
  function sagaMiddleware({ getState, dispatch }) {
    return function (next) { //
      return function (action) {
        let result = next(action)

        return result
      }
    }
  }
  return sagaMiddleware
}

export default sagaMiddlewareFactory