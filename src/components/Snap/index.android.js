/* eslint react/no-string-refs: 0 */
import React, { PureComponent } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Header, Metadata } from '..' // eslint-disable-line
import ModalPicker from '../ModalPicker.andriod.js' // eslint-disable-line
import Video from 'react-native-video'
import Carousel from 'react-native-snap-carousel'
import { playStreamAndroid, timerRange } from '../../actions'
import { sliderWidth, itemWidth } from './styles/SliderEntry.style'
import SliderEntry from './SliderEntry'
import styles from './styles/index.style'
import { ENTRIES, VIDEO } from './static/entries'

class Snap extends PureComponent {
  state = {
    id: 0,
    title: 'Mantra Radio',
    uri: 'http://s6.radioheart.ru:8012/live',
    status: true
  }

  componentDidMount() {
    const { uri } = this.state
    const { playStreamAndroid: _playStreamAndroid } = this.props
    _playStreamAndroid({ uri })
  }

  _onPress = (item) => {
    const { id, title, uri } = item
    const { playStreamAndroid: _playStreamAndroid } = this.props
    this.setState({ title, id, uri, status: true }, () => _playStreamAndroid({ uri }))
  }

  _renderDarkItem = ({ item }) => <SliderEntry data={item} even onPress={() => this._onPress(item)} />

  layoutExample = () => {
    const { slider, sliderContentContainer } = styles
    const { title, status } = this.state
    return (
      <View>
        { status ? (
          <ActivityIndicator
            animating
            style={{ height: 80, marginBottom: 50 }}
            size="large"
          />
        ) :
          <Metadata title={title} />
        }
        <Carousel
          data={ENTRIES}
          renderItem={this._renderDarkItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={slider}
          contentContainerCustomStyle={sliderContentContainer}
          loop
        />
      </View>
    )
  }

  _onChangeSender = ({ label }) => {
    if( label === 'Timer') {
        // call timer 
    } else {
        // call alarm
    }
  }

  _onLoad = () => this.setState({ status: false })

  render() {
    const carousel = this.layoutExample('stack')
    const { safeArea, container } = styles
    const { id } = this.state
    const { playReducer: { uri } } = this.props
    return (
      <View style={safeArea}>
        <Video
          source={{ uri }}
          ref="audioElement"
          onLoad={this._onLoad} 
          audioOnly
          playInBackground
        />
        <Video
          source={VIDEO[id].source}
          ref={(ref) => { this.player = ref }}
          repeat
          resizeMode="cover"
          muted
          style={StyleSheet.absoluteFill}
        />
        <View style={container}>
          {this.props.children}
          <View style={{ position: 'absolute', bottom: 0 }}>
            { carousel }
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ playReducer }) => ({
  playReducer
})

export default connect(
  mapStateToProps, { playStreamAndroid, timerRange }
)(Snap)
