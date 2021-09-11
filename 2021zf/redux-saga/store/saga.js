
/**
 * 在 saga里面我们的三种 generator / saga
 * 1.  根 saga 入口
 * 2. watcher saga   监听者
 * 3. worker saga   工作者
 * effect 指令对象 告诉 saga 做啥
 * take 接收  某个指令
 * put  派发某个动作
 */
import { put, take } from 'react-saga/effects' // 
import { ASYNC_ADD, ADD } from './type'


export function* rootSaga(params) {
  for (let i = 0; i < 3; i++) {
    const action = yield take(ASYNC_ADD)
    // 等到了 
    yield put({ type: ADD })

  }
  // for 结束
}