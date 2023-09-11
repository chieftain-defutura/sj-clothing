import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import ShoppingCart from '../assets/icons/ShoppingCart'
import Logo from '../assets/icons/Logo'
import NotificationInActive from '../assets/icons/NotificationInActive'
import NotificationActive from '../assets/icons/NotificationActive'

const Header: React.FC = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false)
  const navigation = useNavigation()

  const toggleNotification = () => {
    setIsNotificationActive(!isNotificationActive)
  }

  const goToCartPage = () => {
    navigation.navigate('Cart')
  }

  return (
    <HeaderWrapper>
      <Pressable>
        <Logo />
      </Pressable>
      <Icons>
        <Pressable onPress={goToCartPage}>
          <ShoppingCart height={24} width={24} />
        </Pressable>
        <View>
          <Pressable onPress={toggleNotification}>
            {isNotificationActive ? (
              <NotificationActive height={24} width={24} />
            ) : (
              <NotificationInActive height={24} width={24} />
            )}
          </Pressable>
        </View>
      </Icons>
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
const Icons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
`

export default Header
