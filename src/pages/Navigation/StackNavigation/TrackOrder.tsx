import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, StyleSheet } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { RadioButton } from 'react-native-paper'
// import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import { LinearGradient } from 'expo-linear-gradient'

interface ITrackOrder {
  navigation: any
}

const data = [
  {
    orderName: 'Order placed',
    orderDate: '23 Jul, 2023',
    orderDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut laboredolore aliqua.',
  },
  {
    orderName: 'Manufacturing',
    orderDate: '23 Jul, 2023',
    orderDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut laboredolore aliqua.',
  },
  {
    orderName: 'Ready to ship',
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
            {/* <ThreeSixtyDegreeImage>
              <ThreeSixtyDegree width={40} height={40} />
            </ThreeSixtyDegreeImage> */}
          </TShirtImageWrapper>
          <LinearGradient colors={gradientOpacityColors}>
            <TrackOrderContent>
              <Container>
                <Row>
                  {ProductData.slice(0, 3).map((f, index) => (
                    <Column key={index}>
                      <ProductText>{f.product}</ProductText>
                      <ProductName>{f.productName}</ProductName>
                    </Column>
                  ))}
                </Row>

                <Row>
                  {ProductData.slice(3, 6).map((f, index) => (
                    <Column key={index}>
                      <ProductText>{f.product}</ProductText>
                      <ProductName>{f.productName}</ProductName>
                    </Column>
                  ))}
                </Row>
              </Container>
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
  margin-top: -20px;
`

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  margin-left: 12px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  gap: 32px;
`
const Column = styled.View`
  flex: 1;
`

const ProductText = styled.Text`
  text-align: left;
  font-size: 11px;
  font-family: ${FONT_FAMILY.MontserratRegular};
  color: ${COLORS.SecondaryTwo};
`
const ProductName = styled.Text`
  font-family: ${FONT_FAMILY.ArvoRegular};
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  margin-top: 4px;
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
