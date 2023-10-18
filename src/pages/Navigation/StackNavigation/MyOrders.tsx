import React, { useState } from 'react'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { View, Pressable, TouchableOpacity } from 'react-native'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import ChevronLeft from '../../../assets/icons/ChevronLeft'
import { MyOrdersData } from '../../../utils/data/myOrdersData'
import { LinearGradient } from 'expo-linear-gradient'
import StarActive from '../../../assets/icons/PostPageIcon/StarActive'
import StarInActive from '../../../assets/icons/PostPageIcon/StarInActive'

interface IMyOrders {
  navigation: any
}

const MyOrders: React.FC<IMyOrders> = ({ navigation }) => {
  const [stars, setStars] = useState([
    { active: true },
    { active: true },
    { active: false },
    { active: false },
    { active: false },
  ])

  const toggleStar = (index: number) => {
    const updatedStars = [...stars]
    updatedStars[index].active = !updatedStars[index].active
    setStars(updatedStars)
  }

  return (
    <LinearGradient colors={gradientOpacityColors}>
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
              <CartText>My orders</CartText>
            </GoBackArrowContent>
            <CartPageContent>
              {MyOrdersData.map((f, index) => {
                return (
                  <View key={index}>
                    <CartPageContainer>
                      <CartPageData onPress={() => navigation.navigate('TrackOrder')}>
                        <View>
                          <TShirtImage source={f.image} />
                        </View>
                        <View>
                          <ProductWrapper>
                            <View>
                              <ProductText>{f.product}</ProductText>
                              <ProductShirtText>{f.productName}</ProductShirtText>
                              <StatusText>{f.status}</StatusText>
                              <ProductShirtText>{f.statusName}</ProductShirtText>
                              <ProductShirtText>{f.date}</ProductShirtText>
                            </View>
                            <Pressable>
                              <ChevronLeft width={16} height={16} />
                            </Pressable>
                          </ProductWrapper>
                        </View>
                      </CartPageData>
                      <StarWrapper>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {stars.map((star, index) => (
                            <TouchableOpacity key={index} onPress={() => toggleStar(index)}>
                              {star.active ? (
                                <StarActive width={24} height={24} />
                              ) : (
                                <StarInActive width={24} height={24} />
                              )}
                            </TouchableOpacity>
                          ))}
                        </View>
                        <View>
                          <DateText>18, Oct 2023</DateText>
                        </View>
                      </StarWrapper>
                    </CartPageContainer>
                  </View>
                )
              })}
            </CartPageContent>
          </View>
        </ScrollViewContent>
      </Animated.View>
    </LinearGradient>
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
const DateText = styled.Text`
  font-size: 12px;
  font-family: ${FONT_FAMILY.GilroySemiBold};
  color: ${COLORS.SecondaryTwo};
`

const StatusText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 16px;
`

const ProductText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
  font-size: 12px;
  text-transform: uppercase;
`
const ProductShirtText = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

const ProductWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 95px;
`

const TShirtImage = styled.Image`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  object-fit: contain;
`

const StarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 8px;
  border-radius: 5px;
  padding-horizontal: 16px;
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
`

const CartPageContent = styled.View`
  padding-horizontal: 24px;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default MyOrders
