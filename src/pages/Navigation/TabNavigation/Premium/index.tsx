import React from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'
import { useIsFocused, useNavigation } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../../styles/theme'

import PremiumDetailsCard from '../../../../components/PremiumLevel/PremiumDetailsCard'
import PremiumLevel from '../../../../components/PremiumLevel'

const Premium: React.FC = () => {
  const isFocused = useIsFocused()

  return (
    <LinearGradient colors={gradientOpacityColors}>
      <PremiumWrapper>
        <AuthNavigate focus={isFocused}>
          <PremiumLevel />
        </AuthNavigate>
      </PremiumWrapper>
    </LinearGradient>
  )
}

const PremiumWrapper = styled.ScrollView`
  height: 100%;
  /* flex:1 */
`

export default Premium
