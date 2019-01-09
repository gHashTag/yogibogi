import React, { PureComponent } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { timerRange } from '../actions'
import { ModalView, ModalTimer } from '.' // eslint-disable-line

const data = [{
  id: 0,
  title: 'Timer'
}, {
  id: 1,
  title: 'Alarm'
}]

const dataTimer = [{
  id: 0,
  title: '10'
}, {
  id: 1,
  title: '20'
}, {
  id: 2,
  title: '30'
}, {
  id: 3,
  title: '40'
}, {
  id: 4,
  title: '50'
}, {
  id: 5,
  title: '60'
}, {
  id: 6,
  title: '120'
}]

class ModalPicker extends PureComponent {
  state = { 
    visible: false,
    visibleTimer: false,
    timer: 0
  }

  _toggleModal = () => this.setState(({ visible }) => ({ visible: !visible }))

  _toggleModalTimer = () => this.setState(({ visibleTimer })=> ({ visibleTimer: !visibleTimer }))

  _onPressItem = id => () => {
    if (id === 0) {
      this.setState({ visible: false, visibleTimer: true })
    }
  }

  _onPressDone = () => {
    this.props.timerRange(this.state.timer)
    this._toggleModalTimer()
  }

  _updateTimer = timer => {
    this.setState({ timer: dataTimer[timer].title })
  }

  render() {
    const { visible, visibleTimer, timer } = this.state
    return (
      <View>
        <ModalView
          data={data}
          visible={visible}
          onPress={this._toggleModal}
          onPressItem={this._onPressItem}
        />
        <ModalTimer
          data={dataTimer}
          visible={visibleTimer}
          onPressCancel={this._toggleModalTimer}
          onPressDone={this._onPressDone}
          timer={timer}
          updateTimer={this._updateTimer}
        />

        <TouchableOpacity onPress={this._toggleModal}>
          {this.props.children}
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(
  null, { timerRange }
)(ModalPicker)
