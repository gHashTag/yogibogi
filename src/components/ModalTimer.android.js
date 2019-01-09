import React from 'react'
import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native'
import Picker from 'react-native-wheel-picker'

const PickerItem = Picker.Item

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    position: 'absolute',
    height: 200,
    right: 10,
    left: 10,
    bottom: 90,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  subModal: {
    position: 'absolute',
    height: 80,
    right: 10,
    left: 10,
    bottom: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  pickerStyle: {
    marginTop: 15,
    width: 150,
    height: 180,
    alignSelf: 'center' 
  },
  itemStyle: {
    color: 'white',
    fontSize:26 
  },
  item: {
    color: '#fff',
    borderBottomWidth: 0.3,
    borderColor: 'rgba(41, 41, 41, 0.6)'
  },
  done: {
    paddingTop: 13,
    height: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff'
  },
  cancel: {
    paddingTop: 8,
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  }
})

const ModalTimer = ({ data, visible, onPressDone, onPressCancel, updateTimer, timer }) => {
  const { container, cancel, done, modal, subModal, item, pickerStyle, itemStyle } = styles
  return (
    <View style={container}>
      <Modal
        animationType="slide"
        onRequestClose={()=>{}}
        transparent
        visible={visible}
      >
        <View style={modal} >
          <Picker 
            style={pickerStyle}
            selectedValue={timer}
            itemStyle={itemStyle}
            onValueChange={updateTimer}
          >
            {data.map(({ id, title }) => <PickerItem label={title} value={id} key={id} />)}
          </Picker>
        </View>
        <View style={subModal}>
          <TouchableOpacity style={item} onPress={onPressDone}>
            <Text style={done}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCancel}>
            <Text style={cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export { ModalTimer }
