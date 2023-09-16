import React from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'

const Account: React.FC = () => {
  return (
    <AccountWrapper>
      <AuthNavigate>
        <AccountText>Account</AccountText>
      </AuthNavigate>
    </AccountWrapper>
  )
}

const AccountWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const AccountText = styled.Text`
  font-size: 28px;
`

export default Account
