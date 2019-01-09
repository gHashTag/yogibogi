import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Header } from '../../components'
import ModalPicker from '../../components/ModalPicker.ios.js' // eslint-disable-line
import Snap from '../../components/Snap/index' // eslint-disable-line
import { timerRange, stopStream } from '../../actions'

const data1 = [{ key: 1, label: 'Timer' }, { key: 2, label: 'Alarm' }]

class RadioScreen extends PureComponent {
  state = {
    timerStart: false,
    timerReset: false
  }

  componentDidMount() {
    this._toggleTimer()
  }

  _onPressDone = async () => {
    const reset = await this._resetTimer()
    if (reset) {
      this._toggleTimer()
    }
  }

  _onChangeSender = ({ label }) => {
    console.log('label', label)
    if (label === 'Timer') {
      // call timer
    } else {
      // call alarm
    }
  }

  _resetTimer = () => {
    this.setState({ timerStart: false, timerReset: true })
    return true
  }

  _getFormattedTime = time => {
    this.currentTime = time
  }

  _handleTimerComplete = () => {
    this.props.stopStream()
    this.setState({ timerStart: false })
  }

  _toggleTimer = () =>
    this.setState(({ timerStart }) => ({
      timerStart: !timerStart,
      timerReset: false
    }))

  render() {
    const {
      timerReducer: { time }
    } = this.props
    const { timerStart, timerReset } = this.state
    return (
      <Snap>
        <ModalPicker data={data1} initValue="Select" onChange={this._onChangeSender} startTimer={this._onPressDone}>
          <Header
            title="YogiBogi"
            iconRight="stopwatch"
            timer={timerStart}
            totalDuration={time}
            start={timerStart}
            reset={timerReset}
            handleFinish={this._handleTimerComplete}
            getTime={this._getFormattedTime}
          />
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
