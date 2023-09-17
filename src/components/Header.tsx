import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import ShoppingCart from '../assets/icons/ShoppingCart'
// import Logo from '../assets/icons/Logo'
import NotificationInActive from '../assets/icons/NotificationInActive'
import NotificationActive from '../assets/icons/NotificationActive'
import { COLORS } from '../styles/theme'

const Header: React.FC = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false)
  const navigation = useNavigation()

  const toggleNotification = () => {
    setIsNotificationActive(!isNotificationActive)
  }

  const goToCart = () => {
    navigation.navigate('Cart')
  }

  const goToNotification = () => {
    navigation.navigate('Notification')
  }

  return (
    <HeaderWrapper>
      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 8 }}>
        <Pressable onPress={() => navigation.navigate('Stack')}>
          <TShirtImg source={require('../assets/logo/HeaderLogo.png')} />
        </Pressable>
        <LogoText>SPRINKLE</LogoText>
      </View>
      <Icons>
        <Pressable onPress={goToCart}>
          <ShoppingCart height={24} width={24} />
        </Pressable>
        <View>
          <Pressable
            onPress={() => {
              toggleNotification()
              goToNotification()
            }}
          >
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
  align-items: center;
  padding: 16px;
  margin-top: 30px;
`

const LogoText = styled.Text`
  letter-spacing: 5.6px;
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  font-family: Gilroy-Medium;
`
const TShirtImg = styled.Image`
  height: 35px;
  width: 16px;
  flex-shrink: 0;
`

const Icons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`

export default Header
