import {
  STREAM_URI,
  STREAM_PLAY,
  STREAM_STATUS,
  STREAM_STOP
} from '../types'

const INITIAL_STATE = {
  song: '',
  status: 'STOPPED',
  paused: true,
  uri: 'http://s6.radioheart.ru:8012/live'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STREAM_PLAY:
      return {
        song: action.payload.song
      }
    case STREAM_URI:
      return {
        ...state,
        uri: action.payload.uri,
        paused: false 
      }
    case STREAM_STATUS:
      return {
        ...state,
        status: action.payload
      }
    case STREAM_STOP:
      return {
        ...state,
        paused: true 
      }
    default: return state
  }
}
