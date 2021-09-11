import {
  ADD, ASYNC_ADD
} from './type'

const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case ASYNC_ADD:
      return {
        number: state.number + 1
      }
    default:
      break;
  }
}

export default reducer;