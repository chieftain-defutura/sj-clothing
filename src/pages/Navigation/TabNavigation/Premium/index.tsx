import React from 'react'
import styled from 'styled-components/native'

const Premium: React.FC = () => {
  return (
    <PremiumWrapper>
      <PremiumText>Premium</PremiumText>
    </PremiumWrapper>
  )
}

const PremiumWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const PremiumText = styled.Text`
  font-size: 28px;
`

export default Premium
