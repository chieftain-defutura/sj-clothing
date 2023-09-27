import React from 'react'
import styled from 'styled-components/native'
import { View, Pressable } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import LeftArrow from '../../../assets/icons/LeftArrow'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import OrderGroup from '../../../assets/icons/OrderGroup'

interface ITrackOrder {
  navigation: any
}

const TrackOrder: React.FC<ITrackOrder> = ({ navigation }) => {
  return (
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
            <CartText>Track order</CartText>
          </GoBackArrowContent>
          <TShirtImageWrapper>
            <TShirtImage source={require('../../../assets/images/t-shirt.png')} />
            <ThreeSixtyDegreeImage>
              <ThreeSixtyDegree width={40} height={40} />
            </ThreeSixtyDegreeImage>
          </TShirtImageWrapper>
          <TrackOrderContent>
            <FlexContent>
              <View>
                <TrackOrderText>Product</TrackOrderText>
                <TrackOrderDate>Purple ape t-shirt</TrackOrderDate>
              </View>
              <View>
                <TrackOrderText>Style</TrackOrderText>
                <TrackOrderDate>Half sleeve</TrackOrderDate>
              </View>
              <View>
                <TrackOrderText>Quantity</TrackOrderText>
                <TrackOrderDate>x50</TrackOrderDate>
              </View>
            </FlexContent>
            <FlexContentTwo>
              <View>
                <TrackOrderText>Ordered on</TrackOrderText>
                <TrackOrderDate>23 June, 2023</TrackOrderDate>
              </View>
              <View>
                <TrackOrderText>Delivery on</TrackOrderText>
                <TrackOrderDate>23 Jul, 2023</TrackOrderDate>
              </View>
              <View>
                <TrackOrderText>Price</TrackOrderText>
                <TrackOrderDate>450 INR</TrackOrderDate>
              </View>
            </FlexContentTwo>

            <OrderGroupContent>
              <Pressable>
                <OrderGroup width={25} height={203} />
              </Pressable>
              <View>
                <FlexOrder>
                  <OrderPlacedFlexContent>
                    <View>
                      <OrderPlacedText>Order placed</OrderPlacedText>
                    </View>
                    <View>
                      <OrderPlacedDate>23 Jul, 2023</OrderPlacedDate>
                    </View>
                  </OrderPlacedFlexContent>

                  <OrderDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut
                    laboredolore aliqua.
                  </OrderDescription>
                </FlexOrder>
                <FlexOrder>
                  <OrderPlacedFlexContent>
                    <View>
                      <OrderPlacedText>Shipping</OrderPlacedText>
                    </View>
                    <View>
                      <OrderPlacedDate>23 Jul, 2023</OrderPlacedDate>
                    </View>
                  </OrderPlacedFlexContent>

                  <OrderDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut
                    laboredolore aliqua.
                  </OrderDescription>
                </FlexOrder>
                <FlexOrder>
                  <OrderPlacedFlexContent>
                    <View>
                      <OrderPlacedText>Delivery</OrderPlacedText>
                    </View>
                    <View>
                      <OrderPlacedDate>23 Jul, 2023</OrderPlacedDate>
                    </View>
                  </OrderPlacedFlexContent>

                  <OrderDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut
                    laboredolore aliqua.
                  </OrderDescription>
                </FlexOrder>
              </View>
            </OrderGroupContent>
          </TrackOrderContent>
        </View>
      </ScrollViewContent>
    </Animated.View>
  )
}

const ScrollViewContent = styled.ScrollView`
  background: ${COLORS.iconsNormalClr};
`

const FlexOrder = styled.Pressable`
  margin-bottom: 25px;
`

const TrackOrderContent = styled.View`
  background: ${COLORS.backgroundClr};
  padding: 24px;
`

const OrderDescription = styled.Text`
  margin-top: 8px;
  font-size: 12px;
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
  line-height: 18px;
`

const OrderPlacedFlexContent = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const OrderPlacedText = styled.Text`
  font-size: 16px;
  color: ${COLORS.iconsHighlightClr};
  font-family: Montserrat-SemiBold;
`

const OrderPlacedDate = styled.Text`
  font-size: 12px;
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
`

const OrderGroupContent = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding-right: 24px;
  margin-top: 30px;
`

const FlexContent = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`
const FlexContentTwo = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 16px;
`

const TrackOrderText = styled.Text`
  font-size: 10px;
  font-family: Montserrat-Regular;
  color: ${COLORS.SecondaryTwo};
`

const TrackOrderDate = styled.Text`
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
`

const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
`
const TShirtImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const ThreeSixtyDegreeImage = styled.View`
  margin-top: 24px;
  margin-bottom: 8px;
`

const TShirtImage = styled.Image`
  width: 300px;
  height: 300px;
  flex-shrink: 0;
  margin-top: 50px;
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

export default TrackOrder
