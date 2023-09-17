import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'
import { useIsFocused } from '@react-navigation/native'

const MidLevel: React.FC = () => {
  const isFocused = useIsFocused()
  return (
    <MidLevelWrapper>
      <AuthNavigate focus={isFocused}>
        <MidLevelText>MidLevel</MidLevelText>
      </AuthNavigate>
    </MidLevelWrapper>
  )
}

const MidLevelWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const MidLevelText = styled.Text`
  font-size: 28px;
`

export default MidLevel
