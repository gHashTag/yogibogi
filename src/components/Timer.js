import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import BackgroundTimer from 'react-native-background-timer'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { timerTick, stopStreamAndroid } from '../actions'

const styles = StyleSheet.create({
  container: {
    ...ifIphoneX(
      {
        paddingTop: 7
      },
      {
        paddingTop: 38
      }
    ),
    paddingLeft: 95,
    flexDirection: 'row'
  },
  sub: {
    width: 27,
    height: 19,
    borderRadius: 3.3,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  semi: {
    fontSize: 12,
    color: '#fff',
    padding: 3
  },
  text: {
    fontSize: 13,
    width: 20,
    textAlign: 'center',
    color: '#FFF'
  }
})

class Timer extends Component {
  shouldComponentUpdate(nextProps) {
    const shouldUpdate = nextProps.tick !== this.props.tick
    return shouldUpdate
  }

  componentWillUpdate(nextProps) {
    if (nextProps.status === 1) {
      const intervalId = BackgroundTimer.setInterval(() => {
        console.log('tic')
        const { tick, status } = this.props
        switch (true) {
          case tick > 0:
            this.props.timerTick(tick - 1)
            break
          default:
            status !== 2 && this.props.stopStreamAndroid()
            BackgroundTimer.clearInterval(intervalId)
        }
      }, 1000)
    }
  }

  componentWillUnmount() {
    BackgroundTimer.stopBackgroundTimer()
  }

  formatTime = seconds => {
    const dur = moment.duration(seconds, 'second')
    const { floor } = Math
    const hours = floor(dur.asHours())
    const mins = floor(dur.asMinutes()) - hours * 60
    const sec = floor(dur.asSeconds()) - hours * 60 * 60 - mins * 60
    const len = digit => (digit.toString().length === 1 ? `0${digit}` : digit)
    return [len(hours), len(mins), len(sec)]
  }

  render() {
    const { container, semi, text, sub } = styles
    const { tick } = this.props
    const arr = this.formatTime(tick)
    return (
      <View>
        {tick > 0 && (
          <View style={container}>
            <View style={sub}>
              <Text style={text}>{arr[0]}</Text>
            </View>
            <Text style={semi}>:</Text>
            <View style={sub}>
              <Text style={text}>{arr[1]}</Text>
            </View>
            <Text style={semi}>:</Text>
            <View style={sub}>
              <Text style={text}>{arr[2]}</Text>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ timerReducer }) => ({
  tick: timerReducer.tick,
  status: timerReducer.status
})

export default connect(
  mapStateToProps,
  { timerTick, stopStreamAndroid }
)(Timer)
