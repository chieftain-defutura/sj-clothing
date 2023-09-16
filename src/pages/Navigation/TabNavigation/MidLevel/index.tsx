import React from 'react'
import styled from 'styled-components/native'

const MidLevel: React.FC = () => {
  return (
    <MidLevelWrapper>
      <MidLevelText>MidLevel</MidLevelText>
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
