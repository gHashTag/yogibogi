import {
  TIMER_RANGE
} from '../types'

const INITIAL_STATE = {
  time: 900000000000000
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIMER_RANGE:
      return {
        ...state,
        time: Number(action.payload) * 60000
      }
    default: return state
  }
}
