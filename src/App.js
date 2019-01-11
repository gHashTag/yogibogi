import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import RadioScreen from './screen/RadioScreen' // eslint-disable-line

const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk)))

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RadioScreen />
      </Provider>
    )
  }
}
