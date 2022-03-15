import React from 'react'
import RouterContext from './RouterContext'

class Route extends React.Component {
  static contextType = RouterContext

  render() {
    const { location, history, match } = this.context;
    const { path, component: RouteComponent } = this.props;
    const isMatch = location.pathnmae === path;
     
    if (isMatch) {
      const routeProps = {
        history,
        location,
        match
      }
      return <RouteComponent {...routeProps} />
    }
    return null
  }
}

export default Route; 
