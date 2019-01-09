import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { ParallaxImage } from 'react-native-snap-carousel'
import { shape, bool, string, number } from 'prop-types'
import { sanFranciscoWeights } from 'react-native-typography'
import styles from './styles/SliderEntry.style'

export default class SliderEntry extends PureComponent {
  get image () { // eslint-disable-line
    const { data: { illustration }, parallax, parallaxProps, even } = this.props
    const { image, imageContainerEven } = styles

    return parallax ? (
      <ParallaxImage
        source={illustration}
        containerStyle={imageContainerEven}
        style={image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={illustration} style={image} />
    )
  }


  render() {
    const { data: { title }, even, onPress } = this.props
    const { titleStyles } = styles
    const uppercaseTitle = title ? (
      <Text
        style={[sanFranciscoWeights.thin, titleStyles]}
        numberOfLines={1}
      >
        { title.toUpperCase() }
      </Text>
    ) : false

    const { slideInnerContainer, shadow, imageContainer, imageContainerEven, radiusMaskEven, radiusMask, textContainer, textContainerEven } = styles

    return (
      <View>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={1}
          style={slideInnerContainer}
        >
          <View style={shadow} />
          <View style={[imageContainer, even ? imageContainerEven : {}]}>
            { this.image }
            <View style={[radiusMask, even ? radiusMaskEven : {}]} />
          </View>
          <View style={[textContainer, even ? textContainerEven : {}]}>
            { uppercaseTitle }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

SliderEntry.propTypes = {
  data: shape({
    title: string,
    illustration: number
  }),
  even: bool.isRequired
}

SliderEntry.defaultProps = {
  data: {
    title: '',
    illustration: ''
  }
}
