import React, { useRef } from 'react'
import { Text, View, Animated, Easing, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

interface ITextAnimation {
  shake: () => void
  shakeAnimation: any
}

const TextAnimation: React.FC<ITextAnimation> = ({ shake, shakeAnimation }) => {
  //   const shakeAnimation = useRef(new Animated.Value(0)).current

  //   const shake = () => {
  //     Animated.sequence([
  //       Animated.timing(shakeAnimation, {
  //         toValue: 10,
  //         duration: 50,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(shakeAnimation, {
  //         toValue: -10,
  //         duration: 50,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(shakeAnimation, {
  //         toValue: 10,
  //         duration: 50,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(shakeAnimation, {
  //         toValue: 0,
  //         duration: 50,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //     ]).start()
  //   }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={{
          transform: [{ translateX: shakeAnimation }],
        }}
      >
        <Text
          onPress={shake}
          style={{
            color: 'red',
            fontFamily: 'Gilroy-Medium',
            paddingTop: 3,
            position: 'absolute',
            top: 2,
            left: -75,
            width: width / 2,
          }}
        >
          Please wait till avatar loads
        </Text>
      </Animated.View>
    </View>
  )
}

export default TextAnimation
