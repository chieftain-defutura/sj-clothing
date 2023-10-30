import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import ShoppingCart from '../assets/icons/ShoppingCart'
// import NotificationInActive from '../assets/icons/NotificationInActive'
// import NotificationActive from '../assets/icons/NotificationActive'
import { COLORS } from '../styles/theme'

export const HeaderLeft = () => {
  const navigation = useNavigation()

  return (
    <LogoContent>
      <Pressable onPress={() => navigation.navigate('Stack')}>
        <TShirtImg source={require('../assets/logo/logo-img-1.png')} />
      </Pressable>
      {/* <View>
        <LogoText>SPRINKLE</LogoText>
        <NadarText>NADAR</NadarText>
      </View> */}
    </LogoContent>
  )
}

export const HeaderRight = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false)
  const navigation = useNavigation()

  const toggleNotification = () => {
    setIsNotificationActive(!isNotificationActive)
    goToNotification()
  }

  const goToCart = () => {
    navigation.navigate('Cart')
  }

  const goToNotification = () => {
    navigation.navigate('Notification')
  }

  return (
    <Icons>
      <Pressable onPress={goToCart}>
        <ShoppingCart height={24} width={24} />
      </Pressable>
      {/* <View>
        <Pressable onPress={toggleNotification}>
          {isNotificationActive ? (
            <NotificationActive height={24} width={24} />
          ) : (
            <NotificationInActive height={24} width={24} />
          )}
        </Pressable>
      </View> */}
    </Icons>
  )
}

const LogoContent = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  padding-vertical: 12px;
`

const TShirtImg = styled.Image`
  height: 100%;
  width: 190px;
  height: 55px;
  object-fit: contain;
  margin-left: -20px;
  margin-top: 10px;
`

const NadarText = styled.Text`
  letter-spacing: 5.5px;
  font-size: 12px;
  color: ${COLORS.iconsHighlightClr};
  font-family: Gilroy-Medium;
  margin-top: 1px;
`

const LogoText = styled.Text`
  letter-spacing: 5.4px;
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  font-family: Gilroy-Medium;
`

const Icons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
  margin-right: 16px;
  gap: 24px;
`
