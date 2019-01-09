import { DeviceEventEmitter } from 'react-native'
import { ReactNativeAudioStreaming } from 'react-native-audio-stream'
import {
  STREAM_PLAY,
  STREAM_STOP,
  STREAM_STOP_ERROR,
  STREAM_STATUS,
  STREAM_ERROR
} from '../types'

const METADATA_UPDATED = 'METADATA_UPDATED'

export const playStream = ({ uri }) => async (dispatch) => {
  function onSuccess(success) {
    dispatch({ type: STREAM_PLAY, payload: success })
    return success
  }
  function onStatus(evt) {
    dispatch({ type: STREAM_STATUS, payload: evt })
    return evt.status
  }
  function onError(error) {
    dispatch({ type: STREAM_ERROR, error })
    return error
  }
  try {
    ReactNativeAudioStreaming.stop()
    this.subscription = DeviceEventEmitter.addListener(
      'AudioBridgeEvent', ({ status, key, value }) => {
        if (status === METADATA_UPDATED && key === 'StreamTitle') {
          return onSuccess({ song: value })
        } if (status !== METADATA_UPDATED) {
          return onStatus(status)
        }
        return null
      }
    )
    return ReactNativeAudioStreaming.play(uri, { showIniOSMediaCenter: true, showInAndroidNotifications: true })
  } catch (error) {
    //console.log('error', error)
    return onError(error)
  }
}

export const stopStream = () => async (dispatch) => {
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
