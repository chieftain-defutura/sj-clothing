import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { COLORS, gradientOpacityColors } from '../../../styles/theme'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { RadioButton } from 'react-native-paper'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import { LinearGradient } from 'expo-linear-gradient'
import RadioButtonGroup from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonGroup'
//radio button
interface ITrackOrder {
  navigation: any
}

const { width, height } = Dimensions.get('window')

const data = [
  {
    orderName: 'Order placed',
    orderDate: '23 Jul, 2023',
    orderDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut laboredolore aliqua.',
  },
  {
    orderName: 'Shipping',
    orderDate: '23 Jul, 2023',
    orderDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut laboredolore aliqua.',
  },
  {
    orderName: 'Delivery',
    orderDate: '23 Jul, 2023',
    orderDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut laboredolore aliqua.',
  },
]

const ProductData = [
  {
    product: 'Product',
    productName: 'purple ape t-shirt',
  },
  {
    product: 'Style',
    productName: 'Half sleeve',
  },
  {
    product: 'Quantity',
    productName: 'x50',
  },
  {
    product: 'Ordered on',
    productName: '23 June, 2023',
  },
  {
    product: 'Delivery on',
    productName: '23 June, 2023',
  },
  {
    product: 'Price',
    productName: '450 INR',
  },
]

const TrackOrder: React.FC<ITrackOrder> = ({ navigation }) => {
  const [onCheckChange, setCheck] = useState('first')
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
          <LinearGradient colors={gradientOpacityColors}>
            <TrackOrderContent>
              <FlexContent>
                {ProductData.slice(0, 3).map((f, index) => (
                  <View key={index}>
                    <TrackOrderText>{f.product}</TrackOrderText>
                    <TrackOrderDate>{f.productName}</TrackOrderDate>
                  </View>
                ))}
              </FlexContent>
              <FlexContent style={{ marginTop: 16 }}>
                {ProductData.slice(3, 6).map((f, index) => (
                  <View key={index}>
                    <TrackOrderText>{f.product}</TrackOrderText>
                    <TrackOrderDate>{f.productName}</TrackOrderDate>
                  </View>
                ))}
              </FlexContent>
            </TrackOrderContent>

            <TrackOrderContent>
              <OrderGroupContent>
                <RadioButton.Group
                  value={onCheckChange}
                  onValueChange={(newValue) => setCheck(newValue)}
                >
                  {data.map((f, index) => (
                    <View key={index} style={styles.radioBtn}>
                      <View style={{ marginTop: -4 }}>
                        <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} />
                      </View>
                      <FlexOrder>
                        <OrderPlacedFlexContent>
                          <View>
                            <OrderPlacedText>{f.orderName}</OrderPlacedText>
                          </View>
                          <View>
                            <OrderPlacedDate>{f.orderDate}</OrderPlacedDate>
                          </View>
                        </OrderPlacedFlexContent>

                        <OrderDescription>{f.orderDescription}</OrderDescription>
                      </FlexOrder>
                    </View>
                  ))}
                </RadioButton.Group>
              </OrderGroupContent>
            </TrackOrderContent>
          </LinearGradient>
        </View>
      </ScrollViewContent>
    </Animated.View>
  )
}

const ScrollViewContent = styled.ScrollView`
  background: ${COLORS.iconsNormalClr};
`

const FlexOrder = styled.View`
  margin-bottom: 25px;
`

const TrackOrderContent = styled.View`
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
  padding-right: 24px;
`

const FlexContent = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
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

const styles = StyleSheet.create({
  radioBtn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
})

export default TrackOrder
