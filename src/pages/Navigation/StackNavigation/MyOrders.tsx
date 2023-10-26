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

const StartIcons = [
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
  { startActive: StarActive, startInActive: StarInActive },
]

const MyOrders: React.FC<IMyOrders> = ({ navigation }) => {
  const [stars, setStars] = useState(4)

  const handleStarClick = (index: number) => {
    setStars(index + 1)
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
                              <ProductShirtText>{f.productName}</ProductShirtText>
                              <ProductText>{f.product}</ProductText>
                              <StarContainer>
                                {StartIcons.map((star, index) => (
                                  <TouchableOpacity
                                    key={index}
                                    onPress={() => handleStarClick(index)}
                                  >
                                    {index < stars ? (
                                      <star.startActive width={24} height={24} />
                                    ) : (
                                      <star.startInActive width={24} height={24} />
                                    )}
                                  </TouchableOpacity>
                                ))}
                              </StarContainer>
                              <StatusText>Write a review</StatusText>
                              {/* <ProductShirtText>{f.statusName}</ProductShirtText> */}
                              {/* <ProductShirtText>{f.date}</ProductShirtText> */}
                            </View>
                            <Pressable>
                              <ChevronLeft width={16} height={16} />
                            </Pressable>
                          </ProductWrapper>
                        </View>
                      </CartPageData>
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
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  object-fit: contain;
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
