import React from 'react'
import Animated from 'react-native-reanimated'
import { userStore } from '../../../../store/userStore'

import Medium from '../../../../components/Medium'
import Avatar from '../../../../components/Medium/Avatar'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../../styles/theme'
import Languages from '../../StackNavigation/Languages'
import Currency from '../../StackNavigation/Currency'
import BeforeUser from '../../../../components/BeforeUser'

// import AuthNavigate from '../../../../screens/AuthNavigate'
// import { useIsFocused } from '@react-navigation/native'

const MidLevel: React.FC = () => {
  const { confirmDetails } = userStore()
  return (
    <Animated.View style={{ flex: 1 }}>
      <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        {confirmDetails ? <Medium /> : <BeforeUser />}
      </LinearGradient>
    </Animated.View>
  )
}

export default MidLevel
