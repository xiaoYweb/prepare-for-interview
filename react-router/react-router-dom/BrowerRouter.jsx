import React from 'react'
import { Router } from '../react-router'
import { createBrowerHistory } from '../history'

export default class BrowerRouter extends React.Component {
  history = createBrowerHistory()
  render() {
    return (
      <Router history={this.history}>
        {this.props.children}
      </Router>
    )
  }
}