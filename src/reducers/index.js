import { combineReducers } from 'redux'
import playReducer from './PlayReducer'
import timerReducer from './TimerReducer'

export default combineReducers({
  playReducer,
  timerReducer
})
