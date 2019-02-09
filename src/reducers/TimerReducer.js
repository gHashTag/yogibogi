import { TIMER_RANGE, TIMER_TICK, STREAM_STOP } from '../types'

const INITIAL_STATE = {
  status: 0,
  tick: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIMER_RANGE:
      return {
        ...state,
        status: state.tick === 0 ? 1 : 2,
        tick: Number(action.payload) * 60
      }
    case TIMER_TICK:
      return {
        ...state,
        status: state.tick === 0 ? 1 : 0,
        tick: action.payload
      }
    case STREAM_STOP:
      return {
        ...state,
        status: 2
      }
    default:
      return state
  }
}
