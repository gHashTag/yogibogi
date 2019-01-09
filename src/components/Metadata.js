import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp('5%')
  },
  h1: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'SacredGeometry',
    fontSize: 35,
    width: wp('80%')
  },
  h2: {
    color: '#fff',
    textAlign: 'center',
    width: wp('80%'),
    fontFamily: '3270Medium',
    paddingTop: 20
  }
})

class Metadata extends PureComponent {
  render() {
    const { title, song } = this.props
    const { container, h1, h2 } = styles
    return (
      <View style={container}>
        <Text style={h1}>{title}</Text>
        <Text style={h2}>{song}</Text>
      </View>
    )
  }
}

export { Metadata }
