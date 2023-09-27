import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'
import { useIsFocused } from '@react-navigation/native'
import MediumLevel from '../../../../components/MediumLevel'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const MidLevel: React.FC = () => {
  const isFocused = useIsFocused()
  return (
    <Animated.View entering={FadeIn.duration(800)} exiting={FadeOut} style={{ flex: 1 }}>
      {/* <AuthNavigate focus={isFocused}>
      </AuthNavigate> */}
      <MediumLevel />
    </Animated.View>
  )
}

const MidLevelWrapper = styled.View`
  flex: 1;
`

export default MidLevel
