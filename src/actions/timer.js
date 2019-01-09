import {
  TIMER_RANGE
} from '../types'

const timerRange = time => async (dispatch) => dispatch({ type: TIMER_RANGE, payload: time })

export { timerRange }
