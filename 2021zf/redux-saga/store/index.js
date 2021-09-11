// create store reducer  action-type

import { createStore,applyMiddleware } from 'redux'
import createSagaMiddleware from './redux-saga'
import reducer from './reducer'
import { rootSaga } from './saga' // 生成器

// const store = createStore(reducer)
const sagaMiddleware = createSagaMiddleware()
const store = applyMiddleware(sagaMiddleware)(createStore)(reducer)
// 执行 saga
sagaMiddleware.run(rootSaga)

export default store

/**
 * getState
 * subscribe 状态变更订阅
 * dispatch  派发
 */
