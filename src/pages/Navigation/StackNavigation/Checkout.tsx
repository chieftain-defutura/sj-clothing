import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { View, Pressable, StyleSheet, Text, Alert } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { COLORS, gradientOpacityColors } from '../../../styles/theme'
import { useStripe } from '@stripe/stripe-react-native'
import CustomButton from '../../../components/Button'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { LinearGradient } from 'expo-linear-gradient'
import ChevronLeft from '../../../assets/icons/ChevronLeft'
import Phonepe from '../../../assets/icons/Phonepe'
import TruckMovingIcon from '../../../assets/icons/TruckMoving'
import OrderPlaced from '../../../screens/OrderPlaced'
import CartCard from '../../../components/CartCard'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import { ICheckout } from '../../../constant/types'
import GiftIcon from '../../../assets/icons/GiftIcon'

type RootStackParamList = {
  Checkout: { product: string }
}

interface IDeliveryfees {
  Continents: string
  DeliveryFees: number
}

const API_URL = 'https://sj-clothing-backend.cyclic.app'

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
  const [deliveryFees, setDeliveryFees] = useState<IDeliveryfees>()
  const { user, orderId, rate, currency } = userStore()
  const stripe = useStripe()

  const openOrderPlaced = () => {
    setOrderPlacedVisible(true)
  }

  const fetchData = useCallback(async () => {
    try {
      if (!user) return

      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()

      if (userData) {
        setCartItems(userData.CartProduct)
        await updateDoc(userDocRef, userData)
        console.log('success')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      handleError()
    }
  }, [user])

  const handleError = useCallback(async () => {
    try {
      if (!user) return

      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()

      if (userData) {
        setCartItems(userData.CartProduct)
        await updateDoc(userDocRef, userData)
        console.log('handled error')
      }
    } catch (error) {
      console.error('Error handling error:', error)
    }
  }, [user])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
  }, [orderId])

  useEffect(() => {
    fetchOrderData()
  }, [fetchOrderData])

  const processPay = async () => {
    try {
      const amount = orderData?.offerPrice
        ? Number(orderData?.offerPrice) + Number(deliveryFees?.DeliveryFees || 0)
        : Number(orderData?.price) + Number(deliveryFees?.DeliveryFees || 0)

      console.log('orderData', orderData)

      const address = addr
      if (!address) {
        Alert.alert('Please add address first')
        return
      }
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds: orderData?.id,
          name: user?.displayName,
          email: user?.email,
          currency: currency.currency,
          address: address,
          paymentStatus: 'pending',
          userid: user?.uid,
          amount: Number(amount) * (rate as number),
        }),
      })

      console.log('amount', Number(amount) * (rate as number))

      const data = await response.json()
      console.log('data', data.message)
      console.log(response.ok)

      if (!response.ok) {
        return Alert.alert(data.message)
      }

      //1. order create
      const { paymentId } = data
      console.log('payment id', paymentId)
      if (!user) return

      //creating order
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()

      console.log(userData?.my_orders)
      if (userData && !userData?.my_orders) {
        userData.my_orders = []
      }
      userData?.my_orders.push(orderData)
      await updateDoc(userDocRef, userData)

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
      // const presentSheet = await stripe.presentGooglePay({
      //   clientSecret: data.clientSecret,
      // })
      if (presentSheet.error) {
        console.error(presentSheet.error)
        return Alert.alert(presentSheet.error.message)
      }
      Alert.alert('Payment successfully! Thank you.')
    } catch (err) {
      console.error(err)
      Alert.alert('failed!', err.message)
    }
  }

  const getData = useCallback(async () => {
    try {
      if (!user) return
      const q = doc(db, 'users', user.uid)
      const querySnapshot = await getDoc(q)

      const fetchData = querySnapshot.data()
      const addressData = fetchData?.address.find(
        (f: { isSelected: boolean }) => f.isSelected === true,
      )
      console.log('addressData', addressData)
      setAddr(addressData)
      // if (fetchData?.address) {
      //   const addressData: AddressData[] = Object.values(fetchData?.address)
      //   addressData.forEach((d, index) => {
      //     if (d.isSelected === true) {
      //       setAddr(d)
      //       console.log('selected', d)
      //     }
      //   })
      // }
    } catch (error) {
      console.log(error)
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

  const getDeliveryFees = useCallback(async () => {
    try {
      const deliveryFeesCollection = await getDocs(collection(db, 'DeliveryFees'))
      const deliveryFeesData = deliveryFeesCollection.docs.map((doc) => doc.data() as IDeliveryfees)
      const deliveryFee = deliveryFeesData.find((f) => f.Continents === 'Europe')
      setDeliveryFees(deliveryFee)
    } catch (error) {
      console.error('Error fetching delivery fees:', error)
    }
  }, [])

  useEffect(() => {
    getDeliveryFees()
  }, [getDeliveryFees])

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
              <HomeFlexContent onPress={() => navigation.navigate('LocationAddAddress')}>
                {addr ? (
                  <Pressable>
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
                    <Pressable>
                      <HomeText>Please add a address first</HomeText>
                    </Pressable>
                  </View>
                )}
                <Pressable>
                  <ChevronLeft width={16} height={16} />
                </Pressable>
              </HomeFlexContent>

              <PhonepeWrapper>
                <GiftContent onPress={() => navigation.navigate('GiftOptions')}>
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

                <Pressable>
                  <ChevronLeft width={16} height={16} />
                </Pressable>
              </PhonepeWrapper>

              <PhonepeWrapper>
                <GiftContent onPress={processPay}>
                  <Phonepe width={32} height={32} />
                  <GiftText>Payment</GiftText>
                </GiftContent>

                <Pressable>
                  <ChevronLeft width={16} height={16} />
                </Pressable>
              </PhonepeWrapper>

              {/* <PhonepeWrapper>
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
              </PhonepeWrapper> */}
              <Content>
                <DeliveryWrapper>
                  <DeliveryContent>
                    <Pressable>
                      <TruckMovingIcon width={24} height={24} />
                    </Pressable>
                    <DeliveryText>Delivery fee</DeliveryText>
                  </DeliveryContent>
                  <INRText>
                    {Number(deliveryFees?.DeliveryFees) * (rate as number)}
                    {currency.symbol}
                  </INRText>
                </DeliveryWrapper>

                {/* <DeliveryWrapper style={{ marginTop: 20 }}>
                  <DeliveryContent>
                    <Pressable>
                      <ShippingIcon width={24} height={24} />
                    </Pressable>
                    <DeliveryText>Shipping fee</DeliveryText>
                  </DeliveryContent>
                  <INRText>900 INR</INRText>
                </DeliveryWrapper> */}
              </Content>
              <TotalContent>
                <TotalText>Total</TotalText>
                <TotalValue>
                  {orderData?.offerPrice
                    ? Number(orderData?.offerPrice) + Number(deliveryFees?.DeliveryFees)
                    : Number(orderData?.price) + Number(deliveryFees?.DeliveryFees)}
                  {currency.symbol}
                </TotalValue>
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

const HomeFlexContent = styled.Pressable`
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

const PhonepeWrapper = styled.Pressable`
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  border-top-color: ${COLORS.strokeClr};
  border-top-width: 1px;
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
