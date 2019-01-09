import { ReactNativeAudioStreaming } from 'react-native-audio-stream'
import {
  STREAM_URI,
  STREAM_STOP,
  STREAM_STOP_ERROR
} from '../types'

const playStreamAndroid = uri => async (dispatch) => dispatch({ type: STREAM_URI, payload: uri })

const stopStreamAndroid = () => async (dispatch) => {
  function onSuccess(success) {
    dispatch({ type: STREAM_STOP })
    return success
  }
  function onError(error) {
    dispatch({ type: STREAM_STOP_ERROR, error })
    return error
  }
  try {
    ReactNativeAudioStreaming.stop()
    return onSuccess()
  } catch (error) {
    //console.log('error', error)
    return onError(error)
  }
}

export { playStreamAndroid, stopStreamAndroid }
