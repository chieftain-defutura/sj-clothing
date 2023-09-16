import React from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'

const Premium: React.FC = () => {
  return (
    <PremiumWrapper>
      <AuthNavigate>
        <PremiumText>Premium</PremiumText>
      </AuthNavigate>
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
