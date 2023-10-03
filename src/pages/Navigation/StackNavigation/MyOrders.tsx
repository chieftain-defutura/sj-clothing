import React from 'react'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { View, Pressable } from 'react-native'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { COLORS, gradientOpacityColors } from '../../../styles/theme'
import ChevronLeft from '../../../assets/icons/ChevronLeft'
import { MyOrdersData } from '../../../utils/data/myOrdersData'
import { LinearGradient } from 'expo-linear-gradient'

interface IMyOrders {
  navigation: any
}

const MyOrders: React.FC<IMyOrders> = ({ navigation }) => {
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
                  <Pressable key={index} onPress={() => navigation.navigate('TrackOrder')}>
                    <CartPageContainer>
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
                    </CartPageContainer>
                  </Pressable>
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

const CartPageContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 16px;
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  padding-vertical: 24px;
`

const CartPageContent = styled.View`
  padding-horizontal: 24px;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default MyOrders
