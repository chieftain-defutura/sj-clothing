import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Pressable, StyleSheet } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../../components/Button'
import LeftArrow from '../../../assets/icons/LeftArrow'
import GiftIcon from '../../../assets/icons/GiftIcon'
import { LinearGradient } from 'expo-linear-gradient'
import ChevronLeft from '../../../assets/icons/ChevronLeft'
import Phonepe from '../../../assets/icons/Phonepe'
import SackDollar from '../../../assets/icons/SackDollar'
import TruckMovingIcon from '../../../assets/icons/TruckMoving'
import ShippingIcon from '../../../assets/icons/Shipping'
import OrderPlaced from '../../../screens/OrderPlaced'
import { CheckoutData } from '../../../utils/data/checkoutData'
import CartCard from '../../../components/CartCard'

interface ICheckout {
  navigation: any
}

const Checkout: React.FC<ICheckout> = ({ navigation }) => {
  const [closedItems, setClosedItems] = useState<number[]>([])
  const [isOrderPlacedVisible, setOrderPlacedVisible] = React.useState(false)

  const openOrderPlaced = () => {
    setOrderPlacedVisible(true)
  }

  const closeOrderPlaced = () => {
    setOrderPlacedVisible(false)
  }

  const handleClose = (index: number) => {
    setClosedItems([...closedItems, index])
  }

  return (
    <View>
      <ScrollViewContent showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 80 }}>
          <GoBackArrowContent
            onPress={() => {
              navigation.goBack()
            }}
          >
            <LeftArrow width={24} height={24} />
            <CartText>Check Out</CartText>
          </GoBackArrowContent>
          <CartCard cartData={CheckoutData} closedItems={closedItems} handleClose={handleClose} />
          <CartPageContent>
            <HomeFlexContent>
              <Pressable onPress={() => navigation.navigate('AddressBook')}>
                <View>
                  <HomeText>Home</HomeText>
                  <HomeDescription>
                    Mr John Smith. 132, My Street, Kingston, New York 12401.
                  </HomeDescription>
                </View>
              </Pressable>
              <Pressable>
                <ChevronLeft width={16} height={16} />
              </Pressable>
            </HomeFlexContent>
            <GiftWrapper>
              <Pressable onPress={() => navigation.navigate('GiftOptions')}>
                <GiftContent>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#462D85', '#DB00FF']}
                    style={styles.gradientColor}
                  >
                    <GiftIcon width={16} height={16} />
                  </LinearGradient>
                  <GiftText>Gift options available</GiftText>
                </GiftContent>
              </Pressable>
              <Pressable>
                <ChevronLeft width={16} height={16} />
              </Pressable>
            </GiftWrapper>
            <PhonepeWrapper>
              <GiftContent>
                <Phonepe width={32} height={32} />
                <GiftText>Pay with Phonepe</GiftText>
              </GiftContent>
              <Pressable>
                <ChevronLeft width={16} height={16} />
              </Pressable>
            </PhonepeWrapper>
            <PhonepeWrapper>
              <GiftContent>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#462D85', '#DB00FF']}
                  style={styles.gradientColor}
                >
                  <SackDollar width={16} height={16} />
                </LinearGradient>
                <GiftText>Royalties</GiftText>
                <InrBorderRadius>
                  <InrText>1200INR</InrText>
                </InrBorderRadius>
              </GiftContent>
              <UseBorderRadius>
                <UseText>Use</UseText>
              </UseBorderRadius>
            </PhonepeWrapper>
            <Content>
              <DeliveryWrapper>
                <DeliveryContent>
                  <Pressable>
                    <TruckMovingIcon width={24} height={24} />
                  </Pressable>
                  <DeliveryText>Delivery fee</DeliveryText>
                </DeliveryContent>
                <INRText>900 INR</INRText>
              </DeliveryWrapper>
              <DeliveryWrapper style={{ marginTop: 20 }}>
                <DeliveryContent>
                  <Pressable>
                    <ShippingIcon width={24} height={24} />
                  </Pressable>
                  <DeliveryText>Shipping fee</DeliveryText>
                </DeliveryContent>
                <INRText>900 INR</INRText>
              </DeliveryWrapper>
            </Content>
            <TotalContent>
              <TotalText>Total</TotalText>
              <TotalValue>900 INR</TotalValue>
            </TotalContent>
          </CartPageContent>
        </View>
      </ScrollViewContent>
      <CustomButton
        variant='primary'
        text='Place order'
        fontFamily='Arvo-Regular'
        onPress={openOrderPlaced}
        fontSize={16}
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
      <OrderPlaced isVisible={isOrderPlacedVisible} onClose={closeOrderPlaced} />
    </View>
  )
}

const ScrollViewContent = styled.ScrollView`
  background: ${COLORS.backgroundClr};
  height: 100%;
`

const TotalContent = styled.View`
  margin-top: 20px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const TotalText = styled.Text`
  font-size: 14px;
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Medium;
`

const TotalValue = styled.Text`
  font-size: 20px;
  font-family: Gilroy-SemiBold;
  color: ${COLORS.iconsHighlightClr};
`

const Content = styled.View`
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  padding-vertical: 20px;
`

const INRText = styled.Text`
  color: ${COLORS.iconsHighlightClr};
  font-size: 14px;
  font-family: Gilroy-SemiBold;
`

const DeliveryContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const DeliveryText = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

const DeliveryWrapper = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const HomeFlexContent = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const InrText = styled.Text`
  font-size: 10px;
  font-family: Gilroy-Medium;
  color: ${COLORS.textSecondaryClr};
`

const InrBorderRadius = styled.View`
  background: ${COLORS.strokeClr};
  padding-vertical: 4px;
  padding-horizontal: 8px;
  border-radius: 10px;
`

const UseBorderRadius = styled.Pressable`
  border-color: ${COLORS.textSecondaryClr};
  border-width: 1px;
  border-radius: 20px;
  padding-vertical: 4px;
  padding-horizontal: 16px;
`

const UseText = styled.Text`
  font-size: 12px;
  color: ${COLORS.textSecondaryClr};
`

const HomeText = styled.Text`
  font-size: 16px;
  color: ${COLORS.iconsHighlightClr};
  font-family: Gilroy-Medium;
  margin-bottom: 8px;
`

const PhonepeWrapper = styled.View`
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  padding-vertical: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const GiftWrapper = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-top-color: ${COLORS.strokeClr};
  border-top-width: 1px;
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  padding-vertical: 16px;
`

const GiftContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const GiftText = styled.Text`
  color: ${COLORS.iconsHighlightClr};
  font-family: Gilroy-Medium;
  font-size: 14px;
`

const HomeDescription = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-size: 14px;
  font-family: Gilroy-Regular;
  line-height: 18px;
  margin-bottom: 16px;
  max-width: 280px;
  width: 100%;
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

const CartPageContent = styled.View`
  padding-vertical: 16px;
  padding-horizontal: 36px;
`

const styles = StyleSheet.create({
  gradientColor: {
    borderRadius: 30,
    width: 32,
    height: 32,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Checkout
