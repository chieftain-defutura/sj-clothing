import React from 'react'
import MediumLevel from '../../../../components/MediumLevel'
import Animated from 'react-native-reanimated'

const MidLevel: React.FC = () => {
  return (
    <Animated.View style={{ flex: 1 }}>
      <MediumLevel />
    </Animated.View>
  )
}

export default MidLevel
