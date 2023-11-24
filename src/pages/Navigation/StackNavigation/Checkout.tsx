import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { View, Pressable, StyleSheet, Alert, Platform } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import { PlatformPay, usePlatformPay, useStripe } from '@stripe/stripe-react-native'
import CustomButton from '../../../components/Button'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { LinearGradient } from 'expo-linear-gradient'
import ChevronLeft from '../../../assets/icons/ChevronLeft'
import Phonepe from '../../../assets/icons/Phonepe'
import TruckMovingIcon from '../../../assets/icons/TruckMoving'
import CartCard from '../../../components/CartCard'
import { collection, doc, getDoc, getDocs, updateDoc, setDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import { ICheckout } from '../../../constant/types'
import GiftIcon from '../../../assets/icons/GiftIcon'
import GiftOptions from './GiftOptions'
import { useNavigation } from '@react-navigation/native'

type RootStackParamList = {
  Checkout: { product: string }
}

interface IDeliveryfees {
  Continents: string
  DeliveryFees: number
}

const API_URL = 'https://sj-clothing-backend.cyclic.app'

interface AddressData {
  addressOne: string
  addressTwo: string
  city: string
  state: string
  pinCode: string
  country: string
  floor: string
  fullAddress: string
  isSelected: boolean
  phoneNo: string
  saveAddressAs: string
}

const Checkout: React.FC<ICheckout> = ({
  description,
  gender,
  offerPrice,
  price,
  productImage,
  productName,
  size,
  id,
  color,
  style,
  textAndImage,
  type,
  setOpenCheckout,
}) => {
  const navigation = useNavigation()
  const [closedItems, setClosedItems] = useState<number[]>([])
  const [addr, setAddr] = useState<AddressData | null>(null)
  const [cartItems, setCartItems] = useState()
  const [isLoading, setIsLoading] = useState(false)
  // const [orderData, setOrderData] = useState<ICheckout | null>(null)
  const [deliveryFees, setDeliveryFees] = useState<IDeliveryfees>()
  const rate = userStore((state) => state.rate)
  const user = userStore((state) => state.user)
  const currency = userStore((state) => state.currency)
  const [openGift, setOpengift] = useState(false)
  const [giftOptions, setGiftOptions] = useState({ giftMessage: '', from: '' })
  const stripe = useStripe()
  const { isPlatformPaySupported, confirmPlatformPayPayment } = usePlatformPay()
  const [isPaySupported, setIsPaySupported] = useState(false)

  const setup = useCallback(async () => {
    if (!(await isPlatformPaySupported())) {
      Alert.alert(
        'ERROR',
        `${Platform.OS === 'android' ? 'google' : 'apple'} pay is not supported on this platform`,
      )
      setIsPaySupported(false)
    } else {
      setIsPaySupported(true)
    }
  }, [])

  useEffect(() => {
    setup()
  }, [setup])

  console.log('checkoutrate', rate)
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

  const addressOne = addr?.addressOne
  const addressTwo = addr?.addressTwo
  const city = addr?.city
  const state = addr?.state
  const pinCode = addr?.pinCode
  const country = addr?.country

  const processPay = async () => {
    try {
      setIsLoading(true)
      const amount = offerPrice
        ? Number(offerPrice) + Number(deliveryFees ? deliveryFees?.DeliveryFees : 0)
        : Number(price) + Number(deliveryFees ? deliveryFees?.DeliveryFees : 0)

      const address = addr
      if (!address) {
        Alert.alert('Please add address first')
        return
      }

      const fixedAmount = Number((Number(amount) * (rate as number)).toFixed(2)) * 100

      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user?.displayName,
          email: user?.email,
          amount: fixedAmount,
          address: {
            line1: addressOne,
            line2: addressTwo,
            postal_code: pinCode,
            city: city,
            state: state,
            country: country,
          },
          description: 'sjclothing merchant product',
          currency: currency.currency,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return Alert.alert(data.message)
      }

      //1. order create
      const { paymentId } = data

      console.log(paymentId)

      //creating order
      const userDocRef = doc(db, 'Orders', paymentId)

      await setDoc(userDocRef, {
        sizes: size ? size : '',
        style: style ? style : '',
        color: color ? color : '',
        textAndImage: textAndImage ? textAndImage : '',
        productImage: productImage,
        description: description,
        price: price,
        offerPrice: offerPrice,
        productId: id,
        totalamount: `${
          offerPrice
            ? (
                (Number(offerPrice) + Number(deliveryFees ? deliveryFees?.DeliveryFees : 0)) *
                (rate as number)
              ).toFixed(2)
            : (
                (Number(price) + Number(deliveryFees ? deliveryFees?.DeliveryFees : 0)) *
                (rate as number)
              ).toFixed(2)
        } ${currency.symbol}`,
        paymentStatus: 'pending',
        userId: user?.uid,
        gender: gender,
        type: type,
        productName: productName,
        giftMessage: giftOptions,
        orderStatus: {
          orderPlaced: {
            createdAt: Date.now(),
            description: 'Your order has been placed successfully',
            status: true,
          },
          manufacturing: {
            createdAt: null,
            description: '',
            status: false,
          },
          readyToShip: {
            createdAt: null,
            description: '',
            status: false,
          },
          shipping: {
            createdAt: null,
            description: '',
            status: false,
          },
          delivery: {
            createdAt: null,
            description: '',
            status: false,
          },
        },
      })
      // payment
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: 'Sj Clothing',
        applePay: {
          merchantCountryCode: 'IN',
          cartItems: [
            {
              label: 'Total',
              amount: fixedAmount.toString(),
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
        },
        googlePay: {
          merchantCountryCode: 'IN',
          currencyCode: 'USD',
          testEnv: true,
        },
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
      navigation.navigate('Thankyou')
      // Alert.alert('Payment successfully! Thank you.')
    } catch (err) {
      console.error(err)
      Alert.alert('failed!')
    } finally {
      setIsLoading(false)
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
      setAddr(addressData)
    } catch (error) {
      console.log(error)
    }
  }, [user])

  useEffect(() => {
    getData()
  }, [getData])

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
    <View style={{ flex: 1 }}>
      {!openGift && (
        <Animated.View
          entering={SlideInRight.duration(500).delay(200)}
          exiting={SlideOutRight.duration(500).delay(200)}
          style={{
            flex: 1,
          }}
        >
          <ScrollViewContent showsVerticalScrollIndicator={false}>
            <View style={{ paddingBottom: 80 }}>
              <GoBackArrowContent
                onPress={() => {
                  setOpenCheckout(false)
                }}
              >
                <LeftArrow width={24} height={24} />
                <CartText>Check Out</CartText>
              </GoBackArrowContent>
              <CartCard
                setOpenCheckout={setOpenCheckout}
                offerPrice={offerPrice}
                price={price}
                productImage={productImage}
                productName={productName}
              />

              <CartPageContent>
                <HomeFlexContent onPress={() => navigation.navigate('LocationAddAddress')}>
                  {addr ? (
                    <Pressable>
                      <View>
                        <HomeText>{addr.saveAddressAs}</HomeText>
                        <HomeDescription>
                          {addr.addressOne}, {addr.addressTwo}, {addr.city}, {addr.state},{' '}
                          {addr.pinCode}, {addr.country}, {addr.floor}, {addr.phoneNo}
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
                  <GiftContent onPress={() => setOpengift(true)}>
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

                {/* <PhonepeWrapper style={{ borderTopWidth: 0 }}>
                  <GiftContent onPress={processPay}>
                    <Phonepe width={32} height={32} />
                    <GiftText>Payment</GiftText>
                  </GiftContent>

                  <Pressable>
                    <ChevronLeft width={16} height={16} />
                  </Pressable>
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
                      {(Number(deliveryFees?.DeliveryFees) * (rate as number)).toFixed(2)}
                      {currency.symbol}
                    </INRText>
                  </DeliveryWrapper>
                </Content>
                <TotalContent>
                  <TotalText>Total</TotalText>
                  <TotalValue>
                    {offerPrice
                      ? (
                          (Number(offerPrice) +
                            Number(deliveryFees ? deliveryFees?.DeliveryFees : 0)) *
                          (rate as number)
                        ).toFixed(2)
                      : (
                          (Number(price) + Number(deliveryFees ? deliveryFees?.DeliveryFees : 0)) *
                          (rate as number)
                        ).toFixed(2)}
                    {currency.symbol}
                  </TotalValue>
                </TotalContent>
              </CartPageContent>
            </View>
          </ScrollViewContent>
          <CustomButton
            variant='primary'
            text={isLoading ? 'Your Order is placing...' : 'Place order'}
            fontFamily='Arvo-Regular'
            onPress={processPay}
            disabled={isLoading}
            fontSize={16}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              padding: 16,
            }}
          />
        </Animated.View>
      )}
      {openGift && (
        <GiftOptions
          navigation={navigation}
          setGiftOptions={setGiftOptions}
          setOpengift={setOpengift}
        />
      )}
    </View>
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
