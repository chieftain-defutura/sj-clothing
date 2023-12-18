import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native'
import LeftArrow from '../../assets/icons/LeftArrow'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import StarActive from '../../assets/icons/PostPageIcon/StarActive'
import StarInActive from '../../assets/icons/PostPageIcon/StarInActive'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection as collectionLite,
} from 'firebase/firestore/lite'
import { userStore } from '../../store/userStore'
import { IOrder, IRatings } from '../../constant/types'
import { db, dbDefault } from '../../../firebase'
import CustomButton from '../Button'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import axios from 'axios'

const StartIcons = [
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
]

interface IOrderCard {
  orderId: string
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>
}

const Rating: React.FC<IOrderCard> = ({ orderId, setOpenReview }) => {
  const user = userStore((state: { user: any }) => state.user)
  const [ratings, setRatings] = useState<IRatings>()
  const [review, setReview] = useState('')
  const [stars, setStars] = useState(0)
  const [orderData, setOrderData] = useState<IOrder>()
  const [isLoading, setIsLoading] = useState(false)

  const getOrderDataById = useCallback(async () => {
    if (!orderId) return
    const q = doc(db, 'Orders', orderId)
    const querySnapshot = await getDoc(q)

    const fetchData = querySnapshot.data()
    // if(!fetchData) return
    setOrderData(fetchData as IOrder)
  }, [orderId])

  useEffect(() => {
    getOrderDataById()
  }, [getOrderDataById])

  const handleGetData = useCallback(() => {
    if (!orderId) return
    const q = query(collection(dbDefault, 'Ratings'), where('orderId', '==', orderId))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data())
        setRatings(doc.data() as IRatings)
      })
    })

    return () => {
      unsubscribe()
    }
  }, [orderId])

  useEffect(() => {
    handleGetData()
  }, [handleGetData])

  const handleTextChange = (text: React.SetStateAction<string>) => {
    setReview(text)
  }

  const handleStarClick = (index: number) => {
    setStars(index + 1)
  }

  const handleReview = async () => {
    try {
      setIsLoading(true)
      if (!user) return
      const ratingDocRef = doc(db, 'Ratings', orderId)
      const templateParams = {
        service_id: 'service_n32ytbw',
        template_id: 'template_7168usd',
        user_id: 'K-e_VO9kSsyCRevPa',
        template_params: {
          to_email: 'sprinklenadar@gmail.com',
          subject: 'Product Rating',
          message: `userName:${user.displayName}
          productName:${orderData?.productName}
          rating:${stars}
          description: ${review}`,
          to_name: 'Sprinkle Nadar',
          from_name: user.displayName,
        },
        accessToken: '6QdtVkNQ_KdK672G8cg_l',
      }
      const { data } = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        templateParams,
      )

      if (!ratings) {
        await setDoc(ratingDocRef, {
          userId: user.uid,
          productId: orderData?.productId,
          orderId: orderId,
          ratings: stars,
          review: review,
        })
        setOpenReview(false)
      }
      if (ratings) {
        await updateDoc(ratingDocRef, { ratings: stars })
        setOpenReview(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(1400)}
      exiting={FadeOutDown.duration(800)}
      style={{ flex: 1 }}
    >
      <GoBackArrowContent
        onPress={() => {
          setOpenReview(false)
        }}
      >
        <LeftArrow width={24} height={24} />
        <CartText allowFontScaling={false}>Review product</CartText>
      </GoBackArrowContent>
      <CartPageContainer style={{ paddingHorizontal: 16 }}>
        <CartPageData>
          <View>
            <TShirtImage source={{ uri: orderData?.productImage }} alt={orderData?.productName} />
          </View>
          <View>
            <ProductWrapper>
              <View style={{ marginBottom: -100, marginLeft: -20 }}>
                <ProductShirtText allowFontScaling={false}>
                  {orderData?.productName}
                </ProductShirtText>
                {/* <ProductText>{productName}</ProductText> */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 28,
                  }}
                >
                  <StarContainer>
                    {StartIcons.map((star, index) => (
                      <TouchableOpacity key={index} onPress={() => handleStarClick(index)}>
                        {index < Number(stars === 0 ? ratings?.ratings : stars) ? (
                          <star.startActive width={24} height={24} />
                        ) : (
                          <star.startInActive width={24} height={24} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </StarContainer>
                  {/* <Pressable onPress={handleReview}>
                    <StatusText>{ratings?.review ? 'Edit a review' : 'Save a review'}</StatusText>
                  </Pressable> */}
                </View>
                {/* <ProductShirtText>{f.statusName}</ProductShirtText> */}
                {/* <ProductShirtText>{f.date}</ProductShirtText> */}
              </View>
              {/* <Pressable>
                <ChevronLeft width={16} height={16} />
              </Pressable> */}
            </ProductWrapper>
          </View>
        </CartPageData>
      </CartPageContainer>

      <View style={{ paddingHorizontal: 20 }}>
        <TextArea
          multiline={true}
          numberOfLines={3}
          placeholder='How is the product? What do you like? What do you hate?'
          placeholderTextColor={COLORS.SecondaryTwo}
          onChangeText={handleTextChange}
          value={review}
        />
      </View>
      <CustomButton
        variant='primary'
        text={isLoading ? 'Submiting...' : 'Submit'}
        fontFamily='Arvo-Regular'
        onPress={handleReview}
        disabled={isLoading}
        fontSize={16}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
        }}
      />
    </Animated.View>
  )
}

export default Rating
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

const TextArea = styled.TextInput`
  border-width: 1px;
  border-color: ${COLORS.dropDownClr};
  border-radius: 5px;
  margin-top: 8px;
  padding-horizontal: 16px;
  margin-horizontal: 13px;
  padding-vertical: 12px;
  margin-bottom: 40px;
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  font-family: ${FONT_FAMILY.GilroyMedium};
`

const StatusText = styled.Text`
  font-size: 13px;
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
  font-size: 14px;
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
  /* border-bottom-color: ${COLORS.strokeClr}; */
  /* border-bottom-width: 1px; */
  margin-top: 15px;
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
