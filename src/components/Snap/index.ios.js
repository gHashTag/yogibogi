/* eslint-disable */
import React, { PureComponent } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Metadata } from '..'
import Video from 'react-native-video'
import Carousel from 'react-native-snap-carousel'
import { playStream } from '../../actions'
import { sliderWidth, itemWidth } from './styles/SliderEntry.style'
import SliderEntry from './SliderEntry'
import styles from './styles/index.style'
import { ENTRIES, VIDEO } from './static/entries'

class Snap extends PureComponent {
  state = {
    id: 0,
    title: 'Mantra Radio',
    uri: 'http://s6.radioheart.ru:8012/live'
  }

  componentDidMount() {
    const { uri } = this.state
    const { playStream: _playStream } = this.props
    //_playStream({ uri })
  }

  _onPress = (item) => {
    const { id, title, uri } = item
    const { playStream: _playStream } = this.props
    this.setState({ title, id, uri }, () => _playStream({ uri }))
  }

  _renderDarkItem = ({ item }) => <SliderEntry data={item} even onPress={() => this._onPress(item)} />

  layoutExample = () => {
    const { slider, sliderContentContainer } = styles
    const { title } = this.state
    const { playReducer: { song, status } } = this.props
    return (
      <View>
        { status === 'STREAMING' ? (
           <Metadata title={title} song={song} />
        ) : status === 'STOPPED' ? <View /> :
          <ActivityIndicator
            animating
            style={{ height: 80, marginBottom: 50 }}
            size="large"
          />
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

  render() {
    const carousel = this.layoutExample('stack')
    const { safeArea, container } = styles
    const { id } = this.state
    return (
      <View style={safeArea}>
        { /*
        <Video
          source={VIDEO[id].source}
          ref={(ref) => { this.player = ref }}
          onBuffer={this.onBuffer}
          onError={this.videoError}
          repeat
          resizeMode="cover"
          muted
          style={StyleSheet.absoluteFill}
        />
        */
        }
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

export default connect(mapStateToProps, { playStream })(Snap)
