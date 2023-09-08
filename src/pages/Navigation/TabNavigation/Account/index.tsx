import React from 'react'
import styled from 'styled-components/native'

const Account = () => {
  return (
    <AccountWrapper>
      <AccountText>Account</AccountText>
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
