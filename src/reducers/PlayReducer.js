import {
  STREAM_URI,
  STREAM_PLAY,
  STREAM_STATUS
} from '../types'

const INITIAL_STATE = {
  song: '',
  status: 'STOPPED',
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
        uri: action.payload.uri
      }
    case STREAM_STATUS:
      return {
        ...state,
        status: action.payload
      }
    default: return state
  }
}
