import React from 'react'
import { StyleSheet, Modal, Text, TouchableOpacity } from 'react-native'
import { BlurView } from 'react-native-blur'
import { ifIphoneX } from 'react-native-iphone-x-helper'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    position: 'absolute',
    height: 80,
    right: 10,
    left: 10,
    ...ifIphoneX(
      {
        bottom: 85
      },
      {
        bottom: 70
      }
    ),
    borderRadius: 15
  },
  sub: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  subModal: {
    position: 'absolute',
    height: 50,
    right: 10,
    left: 10,
    ...ifIphoneX(
      {
        bottom: 30
      },
      {
        bottom: 15
      }
    ),
    borderRadius: 15
  },
  mainItem: {
    fontSize: 23,
    borderBottomWidth: 0.3,
    borderColor: 'rgba(41, 41, 41, 0.6)'
  },
  titleStyle: {
    height: 40,
    paddingTop: 11,
    textAlign: 'center',
    fontSize: 16
  },
  item: {
    paddingTop: 15,
    fontSize: 23
  },
  cancel: {
    fontSize: 16,
    textAlign: 'center'
  }
})

const ModalView = ({ data, visible, onPress, onPressItem }) => {
  const { cancel, modal, subModal, mainItem, item, titleStyle } = styles
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <BlurView blurType="light" blurAmount={10} style={modal}>
        {data.map(({ id, title }) => (
          <TouchableOpacity style={mainItem} key={id} onPress={onPressItem(id)}>
            <Text style={titleStyle}>{title}</Text>
          </TouchableOpacity>
        ))}
      </BlurView>
      <BlurView blurType="light" blurAmount={10} style={subModal} >
        <TouchableOpacity style={item} onPress={onPress}>
          <Text style={cancel}>Cancel</Text>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  )
}

export { ModalView }
