import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { View, Pressable, Dimensions } from 'react-native'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import ChevronLeft from '../../../assets/icons/ChevronLeft'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { LinearGradient } from 'expo-linear-gradient'
import StarActive from '../../../assets/icons/PostPageIcon/StarActive'
import StarInActive from '../../../assets/icons/PostPageIcon/StarInActive'
import { useTranslation } from 'react-i18next'
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection as collectionLite,
} from 'firebase/firestore/lite'
import { db, dbDefault } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import { IOrder, IRatings } from '../../../constant/types'
import TrackOrder from './TrackOrder'
import Rating from '../../../components/Rating'
import Loader from '../../../components/Loading'

const { height } = Dimensions.get('window')

interface IMyOrders {
  navigation: any
}

const StartIcons = [
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
]

const MyOrders: React.FC<IMyOrders> = ({ navigation }) => {
  const { t } = useTranslation('account')
  const [orderId, setOrderId] = useState('')
  const user = userStore((state) => state.user)
  const [isLoading, setLoading] = useState(false)
  const [openReview, setOpenReview] = useState(false)
  const [orderData, setOrderData] = useState<IOrder[]>([])
  const [openTrackOrder, setOpenTrackOrder] = useState(false)
  const getData = useCallback(async () => {
    try {
      setLoading(true)
      if (!user) return
      const ProductRef = await getDocs(collectionLite(db, 'Orders'))
      const fetchProduct = ProductRef.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }))
      const data = fetchProduct.filter((f: { userId: string }) => f.userId === user.uid)
      setOrderData(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  if (isLoading)
    return (
      <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height }}>
          <Loader />
        </View>
      </LinearGradient>
    )
  if (!orderData.length)
    return (
      <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        <GoBackArrowContent
          onPress={() => {
            navigation.goBack()
          }}
        >
          <LeftArrow width={24} height={24} />
          <CartText allowFontScaling={false}>{t('My orders')}</CartText>
        </GoBackArrowContent>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height }}>
          <ProductText allowFontScaling={false}>No Data</ProductText>
        </View>
      </LinearGradient>
    )

  return (
    <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
      {!openReview && (
        <>
          {!openTrackOrder ? (
            <Animated.View
              entering={SlideInRight.duration(500).delay(200)}
              exiting={SlideOutRight.duration(500).delay(200)}
            >
              <ScrollViewContent>
                <View>
                  <GoBackArrowContent
                    onPress={() => {
                      navigation.goBack()
                    }}
                  >
                    <LeftArrow width={24} height={24} />
                    <CartText allowFontScaling={false}>{t('My orders')}</CartText>
                  </GoBackArrowContent>
                  <CartPageContent>
                    {orderData
                      .filter((f) => f.paymentStatus === 'SUCCESS')
                      .map((f, index) => {
                        return (
                          <OrderCard
                            key={index}
                            data={f}
                            setOpenTrackOrder={setOpenTrackOrder}
                            setOpenReview={setOpenReview}
                            setOrderId={setOrderId}
                          />
                        )
                      })}
                  </CartPageContent>
                </View>
              </ScrollViewContent>
            </Animated.View>
          ) : (
            <TrackOrder
              navigation={navigation}
              orderId={orderId}
              setOpenTrackOrder={setOpenTrackOrder}
            />
          )}
        </>
      )}
      {openReview && <Rating orderId={orderId} setOpenReview={setOpenReview} />}
    </LinearGradient>
  )
}

interface IOrderCard {
  data: IOrder
  setOrderId: React.Dispatch<React.SetStateAction<string>>
  setOpenTrackOrder: React.Dispatch<React.SetStateAction<boolean>>
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>
}

const OrderCard: React.FC<IOrderCard> = ({
  data,
  setOrderId,
  setOpenTrackOrder,
  setOpenReview,
}) => {
  const [ratings, setRatings] = useState<IRatings>()

  const handleGetData = useCallback(() => {
    if (!data.id) return
    const q = query(collection(dbDefault, 'Ratings'), where('orderId', '==', data.id))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data())
        setRatings(doc.data() as IRatings)
      })
    })

    return () => {
      unsubscribe()
    }
  }, [data.id])

  useEffect(() => {
    handleGetData()
  }, [handleGetData])

  return (
    <View>
      <CartPageContainer>
        <CartPageData
          onPress={() => {
            setOpenTrackOrder(true), setOrderId(data.id)
          }}
        >
          <View>
            <TShirtImage source={{ uri: data.productImage }} />
          </View>
          <View>
            <ProductWrapper>
              <View>
                <ProductShirtText allowFontScaling={false}>{data.productName}</ProductShirtText>
                {data.orderStatus.delivery.status && (
                  <Pressable
                    onPress={() => {
                      setOpenReview(true), setOrderId(data.id)
                    }}
                  >
                    <StarContainer>
                      {StartIcons.map((star, index) => (
                        <View key={index}>
                          {index < Number(ratings?.ratings) ? (
                            <star.startActive width={24} height={24} />
                          ) : (
                            <star.startInActive width={24} height={24} />
                          )}
                        </View>
                      ))}
                    </StarContainer>
                    <StatusText allowFontScaling={false}>Write a review</StatusText>
                  </Pressable>
                )}
              </View>
              {/* <Pressable>
                <ChevronLeft width={16} height={16} />
              </Pressable> */}
            </ProductWrapper>
          </View>
        </CartPageData>
      </CartPageContainer>
    </View>
  )
}

const ScrollViewContent = styled.ScrollView`
  height: 100%;
`

const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
`

const StatusText = styled.Text`
  font-size: 12px;
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.textSecondaryClr};
  margin-top: 8px;
`

const ProductText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-family: ${FONT_FAMILY.GilroyMedium};
  font-size: 12px;
`
const ProductShirtText = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.iconsHighlightClr};
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: ${FONT_FAMILY.ArvoRegular};
  font-size: 20px;
  letter-spacing: -0.4px;
`

const ProductWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
`

const TShirtImage = styled.Image`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  object-fit: cover;
`

const StarContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1px;
  margin-top: 16px;
`

const CartPageContainer = styled.View`
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  padding-bottom: 16px;
`
const CartPageData = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding-vertical: 12px;
  width: 350px;
`

const CartPageContent = styled.View`
  padding-horizontal: 24px;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default MyOrders
