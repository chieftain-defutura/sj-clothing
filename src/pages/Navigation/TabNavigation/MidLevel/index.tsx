import React from 'react'
import Animated from 'react-native-reanimated'
import { userStore } from '../../../../store/userStore'

import Medium from '../../../../components/Medium'
import Avatar from '../../../../components/Medium/Avatar'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../../styles/theme'
import Languages from '../../StackNavigation/Languages'
import Currency from '../../StackNavigation/Currency'

// import AuthNavigate from '../../../../screens/AuthNavigate'
// import { useIsFocused } from '@react-navigation/native'

const MidLevel: React.FC = () => {
  const { avatar, language, currency, rate } = userStore()
  return (
    <Animated.View style={{ flex: 1 }}>
      <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        {avatar && avatar.gender ? (
          language ? (
            currency && currency.currency && rate ? (
              <Medium />
            ) : (
              <Currency />
            )
          ) : (
            <Languages />
          )
        ) : (
          <Avatar path='MidLevel' />
        )}
      </LinearGradient>
    </Animated.View>
  )
}

export default MidLevel
