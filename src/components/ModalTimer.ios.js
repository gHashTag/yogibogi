import React from 'react'
import { StyleSheet, Modal, Text, TouchableOpacity, Picker, View } from 'react-native'
import { BlurView } from 'react-native-blur'
import { ifIphoneX } from 'react-native-iphone-x-helper'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    position: 'absolute',
    height: 200,
    right: 10,
    left: 10,
    ...ifIphoneX(
      {
        bottom: 115 
      },
      {
        bottom: 100
      }
    ),
    borderRadius: 15
  },
  subModal: {
    position: 'absolute',
    height: 80,
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
  item: {
    borderBottomWidth: 0.3,
    borderColor: 'rgba(41, 41, 41, 0.6)'
  },
  done: {
    paddingTop: 13,
    height: 40,
    textAlign: 'center',
    fontSize: 16
  },
  cancel: {
    paddingTop: 8,
    fontSize: 16,
    textAlign: 'center'
  }
})

const ModalTimer = ({ data, visible, onPressDone, onPressCancel, updateTimer, timer }) => {
  const { container, cancel, done, modal, subModal, item } = styles
  return (
    <View style={container}>
      <Modal
        animationType="slide"
        transparent
        visible={visible}
      >
        <BlurView blurType="light" blurAmount={10} style={modal} >
          <Picker selectedValue={timer} onValueChange={updateTimer}>
            {data.map(({ id, title }) => (
              <Picker.Item key={id} label={title} value={title} />
            ))}
          </Picker>
        </BlurView>
        <BlurView blurType="light" blurAmount={10} style={subModal} >
          <TouchableOpacity style={item} onPress={onPressDone}>
            <Text style={done}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCancel}>
            <Text style={cancel}>Cancel</Text>
          </TouchableOpacity>
        </BlurView>
      </Modal>
    </View>
  )
}

export { ModalTimer }
