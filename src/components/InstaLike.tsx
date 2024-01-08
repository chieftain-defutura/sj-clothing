import React, { useCallback, useRef } from 'react'
import { StyleSheet, Image, Dimensions, ImageBackground } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const AnimatedImage = Animated.createAnimatedComponent(Image)

const InstaLike = () => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)
  const doubleTapRef = useRef()

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }))

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0))
      }
    })
  }, [])

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1))
      }
    })
  }, [])
  return (
    <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
      <TapGestureHandler
        maxDelayMs={250}
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={onDoubleTap}
      >
        <Animated.View>
          <ImageBackground
            source={require('../assets/images/accountProfile.png')}
            style={styles.image}
          >
            <AnimatedImage
              source={require('../assets/images/AccountImage/heart-img.png')}
              style={[
                styles.image,
                {
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.35,
                  shadowRadius: 35,
                  tintColor: 'red',
                },
                rStyle,
              ]}
              resizeMode={'center'}
            />
          </ImageBackground>
        </Animated.View>
      </TapGestureHandler>
    </TapGestureHandler>
  )
}

export default InstaLike

const { width: SIZE } = Dimensions.get('window')

const styles = StyleSheet.create({
  image: {
    width: SIZE,
    height: SIZE,
  },
})
