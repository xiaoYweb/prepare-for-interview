function createStory(reducer) {
  let state = preloadState



  function dispatch(action) {
    state = reducer(state, action)



  }

  function getState() {
    return state
  }

  return {
    getState,
    dispatch,
    
  }
}

function reducer(state = initialState, action) {

}