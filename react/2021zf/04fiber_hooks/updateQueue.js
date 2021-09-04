

export class Update {
  constructor(props) {
    this.props = props
  }
}
// 
export class UpdateQueue {
  constructor() {
    this.firstUpdate = null
    this.lastUpdate = null
  }
  enqueueUpdate(update) {
    if (!this.lastUpdate) {
      this.firstUpdate = this.lastUpdate = update
    } else {
      this.lastUpdate.nextUpdate = update
      this.lastUpdate = update
    }
  }
  forceUpdate(state) {
    let currentUpdate = this.firstUpdate
    while(currentUpdate) {
      const nextState = typeof state.payload === 'function' 
        ? state.payload(state)
        : state.payload

        state = {...state, ...nextState}
    }
    this.firstUpdate = this.lastUpdate = null
    return state
  }
}