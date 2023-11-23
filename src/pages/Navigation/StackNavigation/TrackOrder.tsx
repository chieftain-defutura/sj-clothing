import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { COLORS, FONT_FAMILY } from '../../../styles/theme'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { RadioButton } from 'react-native-paper'
import moment from 'moment'
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import { IOrder } from '../../../constant/types'
import { userStore } from '../../../store/userStore'

const { height, width } = Dimensions.get('window')

interface ITrackOrder {
  navigation: any
  orderId: string
  setOpenTrackOrder: React.Dispatch<React.SetStateAction<boolean>>
}

const TrackOrder: React.FC<ITrackOrder> = ({ orderId, setOpenTrackOrder }) => {
  const [orderData, setOrderData] = useState<IOrder>()
  const rate = userStore((state) => state.rate)
  const currency = userStore((state) => state.currency)

  const getOrderDataById = useCallback(async () => {
    const q = doc(db, 'Orders', orderId)
    const querySnapshot = await getDoc(q)

    const fetchData = querySnapshot.data()
    // if(!fetchData) return
    setOrderData(fetchData as IOrder)
  }, [])

  useEffect(() => {
    getOrderDataById()
  }, [getOrderDataById])

  console.log('orderData', orderData?.orderStatus)
  console.log('jbjjhjhj', orderData?.totalamount)

  return (
    <View style={{ flex: 1 }}>
      {!orderData ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height }}>
          <ProductText>Loading...</ProductText>
        </View>
      ) : (
        <Animated.View
          entering={SlideInRight.duration(500).delay(200)}
          exiting={SlideOutRight.duration(500).delay(200)}
        >
          <ScrollViewContent>
            <View>
              <GoBackArrowContent
                onPress={() => {
                  setOpenTrackOrder(false)
                }}
              >
                <LeftArrow width={24} height={24} />
                <CartText>Track order</CartText>
              </GoBackArrowContent>
              <TShirtImageWrapper>
                <TShirtImage source={{ uri: orderData.productImage }} />
                {/* <ThreeSixtyDegreeImage>
              <ThreeSixtyDegree width={40} height={40} />
            </ThreeSixtyDegreeImage> */}
              </TShirtImageWrapper>
              {/* <TrackOrderContent>
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
              </TrackOrderContent> */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 37,
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: width / 4,
                      paddingTop: 16,
                    }}
                  >
                    <ProductText>Product</ProductText>
                    <Text
                      style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
                    >
                      {orderData.productName}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingTop: 16,
                    }}
                  >
                    <ProductText>Size</ProductText>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text
                        style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
                      >
                        {orderData?.sizes.sizeVarient.size}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingTop: 16,
                      width: width / 4,
                    }}
                  >
                    <ProductText>Price</ProductText>

                    <Text
                      style={{
                        color: COLORS.textClr,
                        fontFamily: 'Arvo-Regular',
                        fontSize: 14,
                      }}
                    >
                      {orderData.totalamount}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 37,
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 95,
                      paddingTop: 16,
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 6,
                        alignItems: 'center',
                      }}
                    >
                      <View>
                        <View>
                          <ProductText>Ordered on</ProductText>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <ProductName>
                              {orderData?.orderStatus?.orderPlaced?.createdAt
                                ? moment(orderData?.orderStatus?.orderPlaced?.createdAt).format(
                                    'DD-MM-YYYY',
                                  )
                                : ''}
                            </ProductName>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 97,
                      paddingTop: 16,
                    }}
                  >
                    <ProductText>Delivered on</ProductText>
                    <Text
                      style={{
                        color: COLORS.textClr,
                        fontFamily: 'Arvo-Regular',
                        fontSize: 14,
                        textTransform: 'capitalize',
                      }}
                    >
                      {orderData?.orderStatus?.delivery?.createdAt
                        ? moment(orderData?.orderStatus?.delivery?.createdAt).format('DD-MM-YYYY')
                        : '-'}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 115,
                      paddingTop: 16,
                    }}
                  >
                    <ProductText>Quantity</ProductText>
                    <Text
                      style={{
                        color: COLORS.textClr,
                        fontFamily: 'Arvo-Regular',
                        fontSize: 14,
                        // backgroundColor: color,
                      }}
                    >
                      1
                    </Text>
                  </View>
                </View>
              </View>

              <TrackOrderContent>
                <OrderGroupContent>
                  <View style={styles.radioBtn}>
                    <View style={{ marginTop: -4 }}>
                      {/* <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} /> */}
                      <RadioButton.Android
                        value='option1'
                        status={
                          orderData?.orderStatus?.orderPlaced?.status ? 'checked' : 'unchecked'
                        }
                        // onPress={() => setOnCheckOrderPlaced()}
                        color={COLORS.textSecondaryClr}
                      />
                    </View>
                    <FlexOrder>
                      <OrderPlacedFlexContent>
                        <View>
                          <OrderPlacedText>Order Placed</OrderPlacedText>
                        </View>

                        <OrderPlacedDate>
                          {orderData?.orderStatus?.orderPlaced?.createdAt
                            ? moment(orderData?.orderStatus?.orderPlaced?.createdAt).format(
                                'DD-MM-YYYY',
                              )
                            : ''}
                        </OrderPlacedDate>
                      </OrderPlacedFlexContent>

                      <OrderDescription>
                        {orderData?.orderStatus?.orderPlaced?.description}
                      </OrderDescription>
                    </FlexOrder>
                  </View>
                </OrderGroupContent>
                <OrderGroupContent>
                  <View style={styles.radioBtn}>
                    <View style={{ marginTop: -4 }}>
                      {/* <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} /> */}
                      <RadioButton.Android
                        value='option1'
                        status={
                          orderData?.orderStatus?.manufacturing?.status ? 'checked' : 'unchecked'
                        }
                        // onPress={() => setOnCheckOrderPlaced()}
                        color={COLORS.textSecondaryClr}
                      />
                    </View>
                    <FlexOrder>
                      <OrderPlacedFlexContent>
                        <View>
                          <OrderPlacedText>Manufacturing</OrderPlacedText>
                        </View>
                        <View>
                          <OrderPlacedDate>
                            {orderData?.orderStatus?.manufacturing?.createdAt
                              ? moment(orderData?.orderStatus?.manufacturing?.createdAt).format(
                                  'DD-MM-YYYY',
                                )
                              : ''}
                          </OrderPlacedDate>
                        </View>
                      </OrderPlacedFlexContent>

                      <OrderDescription>
                        {orderData?.orderStatus?.manufacturing?.description}
                      </OrderDescription>
                    </FlexOrder>
                  </View>
                </OrderGroupContent>
                <OrderGroupContent>
                  <View style={styles.radioBtn}>
                    <View style={{ marginTop: -4 }}>
                      {/* <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} /> */}
                      <RadioButton.Android
                        value='option1'
                        status={
                          orderData?.orderStatus?.readyToShip?.status ? 'checked' : 'unchecked'
                        }
                        // onPress={() => setOnCheckOrderPlaced()}
                        color={COLORS.textSecondaryClr}
                      />
                    </View>
                    <FlexOrder>
                      <OrderPlacedFlexContent>
                        <View>
                          <OrderPlacedText>Ready to ship</OrderPlacedText>
                        </View>
                        <View>
                          <OrderPlacedDate>
                            {orderData?.orderStatus?.readyToShip?.createdAt
                              ? moment(orderData?.orderStatus?.readyToShip?.createdAt).format(
                                  'DD-MM-YYYY',
                                )
                              : ''}
                          </OrderPlacedDate>
                        </View>
                      </OrderPlacedFlexContent>

                      <OrderDescription>
                        {orderData?.orderStatus?.readyToShip?.description}
                      </OrderDescription>
                    </FlexOrder>
                  </View>
                </OrderGroupContent>
                <OrderGroupContent>
                  <View style={styles.radioBtn}>
                    <View style={{ marginTop: -4 }}>
                      {/* <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} /> */}
                      <RadioButton.Android
                        value='option1'
                        status={orderData?.orderStatus?.shipping?.status ? 'checked' : 'unchecked'}
                        // onPress={() => setOnCheckOrderPlaced()}
                        color={COLORS.textSecondaryClr}
                      />
                    </View>
                    <FlexOrder>
                      <OrderPlacedFlexContent>
                        <View>
                          <OrderPlacedText>Shipping</OrderPlacedText>
                        </View>
                        <View>
                          <OrderPlacedDate>
                            {orderData?.orderStatus?.shipping?.createdAt
                              ? moment(orderData?.orderStatus?.shipping?.createdAt).format(
                                  'DD-MM-YYYY',
                                )
                              : ''}
                          </OrderPlacedDate>
                        </View>
                      </OrderPlacedFlexContent>

                      <OrderDescription>
                        {orderData?.orderStatus?.shipping?.description}
                      </OrderDescription>
                    </FlexOrder>
                  </View>
                </OrderGroupContent>
                <OrderGroupContent>
                  <View style={styles.radioBtn}>
                    <View style={{ marginTop: -4 }}>
                      {/* <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} /> */}
                      <RadioButton.Android
                        value='option1'
                        status={orderData?.orderStatus?.delivery?.status ? 'checked' : 'unchecked'}
                        // onPress={() => setOnCheckOrderPlaced()}
                        color={COLORS.textSecondaryClr}
                      />
                    </View>
                    <FlexOrder>
                      <OrderPlacedFlexContent>
                        <View>
                          <OrderPlacedText>Delivery</OrderPlacedText>
                        </View>
                        <View>
                          <OrderPlacedDate>
                            {orderData?.orderStatus?.delivery?.createdAt
                              ? moment(orderData?.orderStatus?.delivery?.createdAt).format(
                                  'DD-MM-YYYY',
                                )
                              : ''}
                          </OrderPlacedDate>
                        </View>
                      </OrderPlacedFlexContent>

                      <OrderDescription>
                        {orderData?.orderStatus?.delivery?.description}
                      </OrderDescription>
                    </FlexOrder>
                  </View>
                </OrderGroupContent>
              </TrackOrderContent>
            </View>
          </ScrollViewContent>
        </Animated.View>
      )}
    </View>
  )
}

const ScrollViewContent = styled.ScrollView``

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
  padding-left: 145px;
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
  font-size: 12px;
  font-family: ${FONT_FAMILY.MontserratRegular};
  color: ${COLORS.SecondaryTwo};
  margin-bottom: 4px;
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

const OldPriceText = styled.Text`
  font-size: 13px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.SecondaryTwo};
  text-decoration-line: line-through;
  margin-top: 4px;
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
