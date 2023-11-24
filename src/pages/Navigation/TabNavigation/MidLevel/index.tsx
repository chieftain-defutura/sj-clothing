import React from 'react'
import Animated from 'react-native-reanimated'
import { userStore } from '../../../../store/userStore'

import Medium from '../../../../components/Medium'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../../styles/theme'

import BeforeUser from '../../../../components/BeforeUser'

const MidLevel: React.FC = () => {
  const confirmDetails = userStore((state) => state.confirmDetails)
  return (
    <Animated.View style={{ flex: 1 }}>
      <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        {confirmDetails ? <Medium /> : <BeforeUser />}
      </LinearGradient>
    </Animated.View>
  )
}

export default MidLevel
