import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

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
    paddingTop: 1,
    fontSize: 13,
    width: 20,
    textAlign: 'center',
    color: '#FFF'
  }
})

class Timer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      remainingTime: props.totalDuration
    }
  }

  componentDidMount() {
    if(this.props.start) {
      this.start()
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.start) {
      this.start()
    } else {
      this.stop()
    }
    if(newProps.reset) {
      this.reset(newProps.totalDuration)
    }
  }

  componentWillUnmount() {
     if (this.interval) {
        this.stop()
     }
  }

  start = () => {
    const endTime = new Date().getTime() + this.state.remainingTime
    this.interval = setInterval(() => {
      const remaining = endTime - new Date()
      if(remaining <= 1000) {
        this.setState({ remainingTime: 0 })
        this.stop()
        this.props.handleFinish()
        return
      }
      this.setState({ remainingTime: remaining })
    }, 1)
  }

  stop = () => {
    clearInterval(this.interval)
  }

  reset = (newDuration) => {
    const { totalDuration } = this.props
    this.setState({ remainingTime: totalDuration !== newDuration ?  newDuration : totalDuration })
  }

  formatTime = () => {
    const now = this.state.remainingTime
    const { floor } = Math
    let seconds = floor(now / 1000)
    let minutes = floor(now / 60000)
    const hours = floor(now / 3600000)
    seconds -= (minutes * 60)
    minutes -= (hours * 60)

    const { getTime } = this.props
    const formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
      0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`

    if (typeof getTime === "function")
      getTime(formatted)

    return formatted
  }

  render() {
    const { container, semi, text, sub } = styles
    const arr = this.formatTime().split(':') 
    const { start } = this.props
    return(
      <View>
        { start &&
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
        }
      </View>
    )
  }
}

export { Timer }
