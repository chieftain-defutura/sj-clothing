import React from 'react'
import { Text, View, Animated } from 'react-native'
import InfoIcon from '../../../assets/icons/MidlevelIcon/infoIcon'

interface ITextAnimation {
  shake: () => void
  shakeAnimation: any
  children: React.ReactNode
}

const TextAnimation: React.FC<ITextAnimation> = ({ shake, shakeAnimation, children }) => {
  return (
    <Animated.View
      style={{
        transform: [{ translateX: shakeAnimation }],
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <InfoIcon width={24} height={24} style={{ marginTop: 4 }} />
        <Text
          onPress={shake}
          allowFontScaling={false}
          style={{
            color: 'red',
            fontFamily: 'Gilroy-Medium',
            paddingTop: 3,
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          {children}
        </Text>
      </View>
    </Animated.View>
  )
}

export default TextAnimation
