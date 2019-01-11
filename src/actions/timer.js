import {
  TIMER_RANGE,
  TIMER_TICK
} from '../types'

const timerRange = time => async (dispatch) => dispatch({ type: TIMER_RANGE, payload: time })

const timerTick = tick => async (dispatch) => dispatch({ type: TIMER_TICK, payload: tick })

export { timerRange, timerTick }
