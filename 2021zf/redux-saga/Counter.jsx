import React from 'react'
import { connect } from 'react-redux'
import actions from './store/action'


class Counter extends React.Component {
  state = {
    number : 0
  }
  render() {
    return <div>
      <p>{this.props.number}  </p>
      <button onClick={this.props.add}></button>
    </div>
  }
}


export default connect(
  state => state,
  actions
)(Counter)