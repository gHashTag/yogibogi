import React from 'react'
import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    position: 'absolute',
    height: 80,
    right: 10,
    left: 10,
    bottom: 60,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
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
    bottom: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  mainItem: {
    borderTopWidth: 0.2,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  titleStyle: {
    height: 40,
    paddingTop: 11,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff'
  },
  item: {
    paddingTop: 15,
    fontSize: 23
  },
  cancel: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  }
})

const ModalView = ({ data, visible, onPress, onPressItem }) => {
  const { container, cancel, modal, subModal, mainItem, item, titleStyle } = styles
  return (
    <View style={container}>
      <Modal
        animationType="slide"
        onRequestClose={()=>{}}
        transparent
        visible={visible}
      >
        <View style={modal}>
          {data.map(({ id, title }) => (
            <TouchableOpacity style={id !== 0 ? mainItem : null} key={id} onPress={onPressItem(id)}>
              <Text style={titleStyle}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={subModal} >
          <TouchableOpacity style={item} onPress={onPress}>
            <Text style={cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export { ModalView }
