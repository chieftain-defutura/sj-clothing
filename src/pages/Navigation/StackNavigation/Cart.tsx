import React, { useState } from 'react'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { View } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../../components/Button'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { CartData } from '../../../utils/data/cartData'
import CartCard from '../../../components/CartCard'

interface ICartPage {
  navigation: any
}

const CartPage: React.FC<ICartPage> = ({ navigation }) => {
  const [closedItems, setClosedItems] = useState<number[]>([])

  const handleClose = (index: number) => {
    setClosedItems([...closedItems, index])
  }

  return (
    <Animated.View
      entering={SlideInRight.duration(500).delay(200)}
      exiting={SlideOutRight.duration(500).delay(200)}
    >
      <ScrollViewContent style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 150 }}>
          <GoBackArrowContent
            onPress={() => {
              navigation.goBack()
            }}
          >
            <LeftArrow width={24} height={24} />
            <CartText>Cart</CartText>
          </GoBackArrowContent>
          <CartCard cartData={CartData} closedItems={closedItems} handleClose={handleClose} />
        </View>
      </ScrollViewContent>
      <CustomButton
        variant='primary'
        text='Check out'
        fontFamily='Arvo-Regular'
        fontSize={16}
        onPress={() => navigation.navigate('Checkout')}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          backgroundColor: '#FFF',
          padding: 16,
        }}
      />
    </Animated.View>
  )
}

const ScrollViewContent = styled.ScrollView`
  background: ${COLORS.backgroundClr};
  height: 100%;
`

const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

export default CartPage
