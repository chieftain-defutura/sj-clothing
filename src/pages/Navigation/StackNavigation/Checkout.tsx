import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { View, Pressable, StyleSheet, Text, Alert } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { COLORS, gradientOpacityColors } from '../../../styles/theme'
import { useStripe } from '@stripe/stripe-react-native'
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
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import { RouteProp } from '@react-navigation/native'
import { use } from 'i18next'
import { ICheckout } from '../../../constant/types'

type RootStackParamList = {
  Checkout: { product: string }
}

interface AddressData {
  name: string
  mobile: string
  email: string
  addressLineOne: string
  addressLineTwo: string
  city: string
  region: string
  pinCode: string
  saveAsAddress: string
  isSelected: boolean
}

const Checkout: React.FC<ICheckout> = ({ navigation }) => {
  const [closedItems, setClosedItems] = useState<number[]>([])
  const [isOrderPlacedVisible, setOrderPlacedVisible] = React.useState(false)
  const [addr, setAddr] = useState<AddressData | null>(null)
  const [cartItems, setCartItems] = useState()
  const [orderData, setOrderData] = useState<ICheckout | null>(null)
  const { user, orderId } = userStore()
  const stripe = useStripe()

  const openOrderPlaced = () => {
    setOrderPlacedVisible(true)
  }

  useEffect(() => {
    if (!user) return
    const temp = async () => {
      if (!user) return
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()
      if (!userData) return
      setCartItems(userData.CartProduct)
      await updateDoc(userDocRef, userData)
    }

    const handleError = async () => {
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()
      if (!userData) return
      setCartItems(userData.CartProduct)
      await updateDoc(userDocRef, userData)
    }
    temp()
      .then(() => {
        console.log('success')
      })
      .catch(() => {
        handleError()
        console.log('handled error')
      })
  }, [])

  const fetchOrderData = useCallback(async () => {
    try {
      const OrderDocRef = doc(db, 'Orders', orderId as string)
      const OrderDoc = await getDoc(OrderDocRef)
      const data = OrderDoc.data()

      if (data) {
        setOrderData(data as ICheckout)
      } else {
        console.warn('Order data is undefined.')
      }
    } catch (error) {
      console.error('Error fetching order data: ', error)
    }
  }, [orderId, orderData])

  useEffect(() => {
    fetchOrderData()
  }, [fetchOrderData])

  const processPay = async () => {
    try {
      const amount = orderData?.offerPrice ? orderData?.offerPrice : orderData?.price

      const address = addr
      const response = await fetch(
        'https://315c-2401-4900-1cd4-6c58-d8ff-a13b-b7d6-e7af.ngrok-free.app/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productIds: orderData?.id,
            name: user?.displayName,
            email: user?.email,
            currency: 'INR',
            address: address,
            paymentStatus: 'pending',
            userid: user?.uid,
            amount: amount,
          }),
        },
      )

      const data = await response.json()
      console.log('data', data.message)
      console.log(response.ok)

      if (!response.ok) {
        return Alert.alert(data.message)
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: 'Dewall',
      })
      if (initSheet.error) {
        console.error(initSheet.error)
        return Alert.alert(initSheet.error.message)
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      })
      if (presentSheet.error) {
        console.error(presentSheet.error)
        return Alert.alert(presentSheet.error.message)
      }
      Alert.alert('Payment successfully! Thank you for the donation.')
    } catch (err) {
      console.error(err)
      Alert.alert('Payment failed!')
    }
  }

  const getData = useCallback(async () => {
    if (!user) return
    const q = doc(db, 'users', user.uid)
    const querySnapshot = await getDoc(q)

    const fetchData = querySnapshot.data()
    if (fetchData?.address) {
      const addressData: AddressData[] = Object.values(fetchData?.address)
      addressData.forEach((d, index) => {
        if (d.isSelected === true) {
          setAddr(d)
          console.log('selected', d)
        }
      })
    }
  }, [user])

  useEffect(() => {
    getData()
  }, [getData])

  const closeOrderPlaced = () => {
    setOrderPlacedVisible(false)
  }

  const handleClose = (index: number) => {
    const temp = async (index: any) => {
      if (!user) return
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()
      if (!userData) return
      const newProds = userData.CartProduct.filter((element: any) => {
        userData.CartProduct.indexOf(element) !== index
      })
      await updateDoc(userDocRef, { newProds })
    }
    setClosedItems([...closedItems, index])
    temp(index)
  }

  return (
    <LinearGradient colors={gradientOpacityColors}>
      <Animated.View
        entering={SlideInRight.duration(500).delay(200)}
        exiting={SlideOutRight.duration(500).delay(200)}
      >
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
            {orderData ? (
              <CartCard cartData={orderData} closedItems={closedItems} handleClose={handleClose} />
            ) : (
              <Text>No item</Text>
            )}
            <CartPageContent>
              <HomeFlexContent>
                {addr ? (
                  <Pressable onPress={() => navigation.navigate('AddressBook')}>
                    <View>
                      <HomeText>{addr.saveAsAddress}</HomeText>
                      <HomeDescription>
                        {addr.addressLineOne}, {addr.addressLineTwo}, {addr.city}, {addr.region},{' '}
                        {addr.isSelected}
                        {addr.email}, {addr.pinCode}, {addr.mobile}
                      </HomeDescription>
                    </View>
                  </Pressable>
                ) : (
                  <View style={{ paddingVertical: 12 }}>
                    <Pressable onPress={() => navigation.navigate('AddressBook')}>
                      <HomeText>Please add a address first</HomeText>
                    </Pressable>
                  </View>
                )}
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
                <GiftContent onPress={processPay}>
                  <Phonepe width={32} height={32} />
                  <GiftText>Payment</GiftText>
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
            backgroundColor: 'rgba(145, 177, 225, 0.2)',
            padding: 16,
          }}
        />
        <OrderPlaced isVisible={isOrderPlacedVisible} onClose={closeOrderPlaced} />
      </Animated.View>
    </LinearGradient>
  )
}

const ScrollViewContent = styled.ScrollView`
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

const GiftContent = styled.TouchableOpacity`
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
