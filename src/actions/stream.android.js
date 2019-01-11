import {
  STREAM_URI,
  STREAM_STOP
} from '../types'

const playStreamAndroid = uri => async (dispatch) => dispatch({ type: STREAM_URI, payload: uri })

const stopStreamAndroid = uri => async (dispatch) => dispatch({ type: STREAM_STOP, payload: uri })

export { playStreamAndroid, stopStreamAndroid }
