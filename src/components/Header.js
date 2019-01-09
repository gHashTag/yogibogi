import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Entypo from 'react-native-vector-icons/Entypo'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { iOSUIKit } from 'react-native-typography'
import { Timer } from '.'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    position: 'relative',
    ...ifIphoneX(
      {
        height: 100
      },
      {
        height: 70
      }
    )
  },
  textStyle: {
    ...ifIphoneX(
      {
        paddingTop: 0
      },
      {
        paddingTop: 30
      }
    ),
    width: 200,
    fontSize: 30
  },
  iconLeftStyle: {
    ...ifIphoneX(
      {
        paddingTop: 0
      },
      {
        paddingTop: 40
      }
    ),
    fontSize: 35
  },
  rightIconStyle: {
    paddingTop: 35,
    flex: 1,
    fontSize: 30,
    alignSelf: 'flex-end'
  },
  leftButtonView: {
    flex: 1.5
  },
  titleView: {
    flex: 3,
    alignItems: 'center'
  },
  rightButtonView: {
    flex: 1.5
  }
})

const Header = ({
  iconLeft,
  iconRight,
  colorLeft,
  colorRight = '#fff',
  title,
  onPress,
  totalDuration,
  start,
  reset,
  handleFinish,
  getTime
}) => {
  const { container, textStyle, iconLeftStyle, rightIconStyle, leftButtonView, rightButtonView, titleView } = styles
  return (
    <SafeAreaView style={container}>
      <View style={leftButtonView}>
        {iconLeft ? (
          <TouchableOpacity onPress={onPress}>
            <Ionicons name={iconLeft} style={iconLeftStyle} color={colorLeft} />
          </TouchableOpacity>
        ) : (
          <Text style={[iOSUIKit.largeTitleEmphasizedWhite, textStyle]}>{title}</Text>
        )}
      </View>
      <View style={titleView}>
        {totalDuration < 7200001 && (
          <Timer
            totalDuration={totalDuration}
            start={start}
            reset={reset}
            handleFinish={handleFinish}
            getTime={getTime}
          />
        )}
      </View>
      <View style={rightButtonView}>
        {iconRight && <Entypo name={iconRight} style={[rightIconStyle, { color: colorRight }]} />}
      </View>
    </SafeAreaView>
  )
}

export { Header }
