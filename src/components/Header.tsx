import * as React from 'react'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import ShoppingCart from '../assets/icons/ShoppingCart'
import Logo from '../assets/icons/Logo'

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Pressable>
        <Logo />
      </Pressable>
      <Pressable>
        <ShoppingCart height={24} width={24} />
      </Pressable>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  margin-top: 26px;
`

export default Header
