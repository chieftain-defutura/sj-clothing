import React from 'react'
import { Text, View, Animated, Dimensions } from 'react-native'
import InfoIcon from '../../../assets/icons/MidlevelIcon/infoIcon'

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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <InfoIcon width={24} height={24} style={{ marginTop: 4 }} />
          <View>
            <Text
              onPress={shake}
              style={{
                color: 'red',
                fontFamily: 'Gilroy-Medium',
                paddingTop: 3,
                width: width / 1,
                fontSize: 18,
              }}
            >
              Please wait till avatar loads
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

export default TextAnimation
