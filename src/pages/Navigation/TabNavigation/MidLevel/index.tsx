import React from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'

const MidLevel: React.FC = () => {
  return (
    <MidLevelWrapper>
      <AuthNavigate>
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
