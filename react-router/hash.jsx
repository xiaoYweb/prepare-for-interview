import React from 'react'
import ReactDOM from 'react-dom'
// import { HashRouter as Router, Route } from './react-router-dom'
import { BrowerRouter as Router, Route } from './react-router-dom'
import Home from './component/Home'
import User from './component/User'
import Profile from './component/Profile'

const App = <Router>
  <div>
    <Route path="/" component={Home} exact />
    <Route path="/user" component={User} />
    <Route path="/profile" component={Profile} />
  </div>
</Router>

ReactDOM.render(<App />, document.getElementById('root'))


/**
 * 路由嵌套的组件 props 中添加 属性 history location match
 * history {cation: 'POP', go, goBack, goForward, length, push, replace, location} 
 * location {}
 * match {}
 * 
 * react-router-dom
 * react-router
 * history
 */