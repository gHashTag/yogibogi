import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Header } from '../components'
import ModalPicker from '../components/ModalPicker'
import Snap from '../components/Snap/index' // eslint-disable-line
import { timerRange, stopStream } from '../actions'

const data1 = [{ key: 1, label: 'Timer' }, { key: 2, label: 'Alarm' }]

class RadioScreen extends PureComponent {
  _onChangeSender = ({ label }) => {
    if (label === 'Timer') {
      // call timer
    } else {
      // call alarm
    }
  }

  render() {
    return (
      <Snap>
        <ModalPicker data={data1} initValue="Select" onChange={this._onChangeSender}>
          <Header title="@gHashTag" iconRight="stopwatch" />
        </ModalPicker>
      </Snap>
    )
  }
}

const mapStateToProps = ({ timerReducer }) => ({
  timerReducer
})

export default connect(
  mapStateToProps,
  { timerRange, stopStream }
)(RadioScreen)
