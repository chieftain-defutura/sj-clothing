import React, { useState } from 'react'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { View } from 'react-native'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import CustomButton from '../../../components/Button'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { CartData } from '../../../utils/data/cartData'
import CartCard from '../../../components/CartCard'
import { LinearGradient } from 'expo-linear-gradient'
import LocationIcon from '../../../assets/icons/Location'
import { userStore } from '../../../store/userStore'
import AuthNavigate from '../../../screens/AuthNavigate'

interface ICartPage {
  navigation: any
}

const CartPage: React.FC<ICartPage> = ({ navigation }) => {
  const [closedItems, setClosedItems] = useState<number[]>([])
  const [focus, setFocus] = useState(false)
  const user = userStore((state) => state.user)
  // const focus = useIsFocused()

  const handleClose = (index: number) => {
    setClosedItems([...closedItems, index])
  }

  const handleCheckout = () => {
    if (!user) {
      setFocus(true)
    } else {
      navigation.navigate('Checkout')
      setFocus(true)
    }
  }

  const onClose = () => {
    setFocus(false)
  }

  return (
    <LinearGradient colors={gradientOpacityColors}>
      <AuthNavigate focus={focus} onClose={onClose}>
        <Animated.View
          entering={SlideInRight.duration(500).delay(200)}
          exiting={SlideOutRight.duration(500).delay(200)}
        >
          <ScrollViewContent style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
            <View style={{ paddingBottom: 130 }}>
              <FlexContent>
                <GoBackArrowContent
                  onPress={() => {
                    navigation.goBack()
                  }}
                >
                  <LeftArrow width={24} height={24} />
                  <CartText>Cart</CartText>
                </GoBackArrowContent>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                  <LocationIcon width={16} height={16} />
                  <LocationText>Home</LocationText>
                </View>
              </FlexContent>

              <CartCard cartData={CartData} closedItems={closedItems} handleClose={handleClose} />
            </View>
          </ScrollViewContent>
          <CustomButton
            variant='primary'
            text='Check out'
            fontFamily='Arvo-Regular'
            fontSize={16}
            onPress={() => handleCheckout()}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              backgroundColor: 'rgba(145, 177, 225, 0.2)',
              padding: 16,
            }}
          />
        </Animated.View>
      </AuthNavigate>
    </LinearGradient>
  )
}

const ScrollViewContent = styled.ScrollView`
  height: 100%;
`

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 16px;
  padding-top: 16px;
`

const LocationText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.iconsHighlightClr};
`

const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

export default CartPage
