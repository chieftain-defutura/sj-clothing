import React, { useState } from 'react'
import styled from 'styled-components/native'
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import LeftArrow from '../../assets/icons/LeftArrow'
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { Svg, Circle } from 'react-native-svg'
import CustomButton from '../Button'
import { IAccessory } from '../../constant/types'
import { userStore } from '../../store/userStore'
import AuthNavigate from '../../screens/AuthNavigate'

const { height, width } = Dimensions.get('window')

interface IAccessoryDetailsCard {
  data: IAccessory
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
  handleBack: () => void
  handleSubmit: () => Promise<void>
}

const AccessoryDetailsCard: React.FC<IAccessoryDetailsCard> = ({
  data,
  handleBack,
  setOpenDetails,
  handleSubmit,
}) => {
  const [focus, setFocus] = useState(false)
  const user = userStore((state) => state.user)
  const rate = userStore((state) => state.rate)
  const [isPressed, setIsPressed] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const currency = userStore((state) => state.currency)

  const onSubmit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    if (!user) {
      console.log('user not found')
      setFocus(true)
    } else {
      handleSubmit()
    }
  }

  const onClose = () => {
    setFocus(false)
  }

  const Description = data.description.split(',')
  return (
    <View style={{ flex: 1, width: width, zIndex: 6 }}>
      <AuthNavigate focus={focus} onClose={onClose}>
        <ScrollView>
          <View style={styles.linearGradient}>
            <FlexContent>
              <Pressable
                onPress={handleBack}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
              >
                {() => (
                  <IconHoverClr
                    style={{
                      backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.5)' : 'transparent',
                    }}
                  >
                    <IconHoverPressable>
                      <LeftArrow width={24} height={24} />
                    </IconHoverPressable>
                  </IconHoverClr>
                )}
              </Pressable>
              {/* <Pressable onPress={share}>
                <ShareArrow width={24} height={24} />
              </Pressable> */}
            </FlexContent>

            <AccessoryDetailsWrapper>
              <AccessoryDetailsContent>
                <Animated.View entering={FadeInLeft.duration(800).delay(200)} exiting={FadeOutLeft}>
                  <TouchableOpacity
                    onPress={() => setOpenDetails(true)}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Image
                      source={{ uri: data.productImage }}
                      style={{
                        width: width / 1.2,
                        height: height * 0.3,
                        resizeMode: 'contain',
                        borderRadius: 6,
                        marginVertical: 12,
                      }}
                    />
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  entering={FadeInRight.duration(800).delay(200)}
                  exiting={FadeOutRight}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 30,
                      paddingHorizontal: 30,
                      paddingBottom: 5,
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <ProductText allowFontScaling={false}>product</ProductText>
                      <ProductName allowFontScaling={false}>{data.productName}</ProductName>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 6,
                        alignItems: 'center',
                      }}
                    >
                      {!data.offerPrice ? (
                        <View>
                          <ProductText allowFontScaling={false}>price</ProductText>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <ProductName allowFontScaling={false}>
                              {rate
                                ? (Number(data.offerPrice) * (rate as number)).toFixed(2)
                                : data.offerPrice}
                            </ProductName>
                            <ProductName allowFontScaling={false}>{currency.symbol}</ProductName>
                          </View>
                        </View>
                      ) : (
                        <View>
                          <View>
                            <ProductText allowFontScaling={false}>price</ProductText>
                          </View>
                          <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <OldPriceText allowFontScaling={false}>
                                {rate
                                  ? (Number(data.normalPrice) * (rate as number)).toFixed(2)
                                  : data.normalPrice}
                              </OldPriceText>
                              <OldPriceText allowFontScaling={false}>
                                {' '}
                                {currency ? currency.symbol : '₹'}
                              </OldPriceText>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <ProductName allowFontScaling={false}>
                                {rate
                                  ? (Number(data.offerPrice) * (rate as number)).toFixed(2)
                                  : data.offerPrice}
                              </ProductName>
                              <ProductName allowFontScaling={false}>
                                {currency ? currency.symbol : '₹'}
                              </ProductName>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </Animated.View>
              </AccessoryDetailsContent>

              {showDetails && (
                <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOut}>
                  <View style={{ marginTop: 14 }}>
                    <DetailsHeading allowFontScaling={false}>Detailed features</DetailsHeading>
                    {Description.map((f, index) => (
                      <View
                        key={index}
                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
                      >
                        <Svg width={8} height={8}>
                          <Circle cx={3} cy={3} r={3} fill='rgba(70, 45, 133, 0.6)' />
                        </Svg>

                        <DetailsParaText
                          allowFontScaling={false}
                          key={index}
                          style={{ marginLeft: 8 }}
                        >
                          {f}
                        </DetailsParaText>
                      </View>
                    ))}
                  </View>
                </Animated.View>
              )}
            </AccessoryDetailsWrapper>
            <Animated.View entering={FadeInUp.duration(2000)} exiting={FadeOut}>
              <Btns>
                {showDetails ? (
                  <HideDetailsBorder onPress={() => setShowDetails(false)}>
                    <HideDetailsText allowFontScaling={false}>Hide details</HideDetailsText>
                  </HideDetailsBorder>
                ) : (
                  <HideDetailsBorder onPress={() => setShowDetails(true)}>
                    <HideDetailsText allowFontScaling={false}>View details</HideDetailsText>
                  </HideDetailsBorder>
                )}
                <CustomButton
                  text='Buy Now'
                  fontFamily='Arvo-Regular'
                  fontSize={13}
                  style={{ width: 170 }}
                  onPress={onSubmit}
                />
              </Btns>
            </Animated.View>
          </View>
        </ScrollView>
      </AuthNavigate>
    </View>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
  },
})

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

const IconHoverClr = styled.View`
  border-radius: 20px;
  width: 32px;
  height: 32px;
`

const Btns = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  margin-bottom: 4px;
`

const DetailsHeading = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-bottom: 8px;
`

const AccessoryDetailsWrapper = styled.View``

const AccessoryDetailsContent = styled.View`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const DetailsParaText = styled.Text`
  font-size: 12px;
  color: rgba(70, 45, 133, 0.6);
  letter-spacing: -0.24px;
  line-height: 16px;
  text-transform: capitalize;
  font-family: ${FONT_FAMILY.GilroyRegular};
`

const ProductText = styled.Text`
  font-size: 12px;
  font-family: ${FONT_FAMILY.MontserratRegular};
  color: ${COLORS.SecondaryTwo};
`

const WatchVideoBorder = styled.Pressable`
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.textSecondaryClr};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 8px;
  margin-top: 22px;
`

const HideDetailsBorder = styled.TouchableOpacity`
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.textSecondaryClr};
  padding-vertical: 12px;
  padding-horizontal: 20px;
  width: 170px;
`

const ProductName = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-top: 4px;
`
const WatchVideoText = styled.Text`
  font-size: 10px;
  color: ${COLORS.textSecondaryClr};
`

const HideDetailsText = styled.Text`
  color: ${COLORS.textSecondaryClr};
  font-size: 13px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  text-align: center;
`

const OldPriceText = styled.Text`
  font-size: 13px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.SecondaryTwo};
  text-decoration-line: line-through;
  margin-top: 4px;
`

export default AccessoryDetailsCard
