import React from 'react'
import { Text, View, Animated, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

interface ITextAnimation {
  shake: () => void
  shakeAnimation: any
}

const TextAnimation: React.FC<ITextAnimation> = ({ shake, shakeAnimation }) => {
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
            zIndex: 1000,
          }}
        >
          Please wait till avatar loads
        </Text>
      </Animated.View>
    </View>
  )
}

export default TextAnimation
