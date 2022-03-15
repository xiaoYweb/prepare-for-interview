import React from 'react'
import RouterContext from './RouterContext'

class Router extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.history.location
    }
    // 监听路径发生变化 hashchange
    this.unlisten = props.history.listen(location => {
      this.setState({ location }) // 更新组件
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    const { location } = this.state
    const { children, history } = this.props;
    const value = {
      history,
      location,
      match: {}
    }

    return (
      <RouterContext.Provider value={value}>
        {children}
      </RouterContext.Provider>
    );
  }
}

export default Router; 
