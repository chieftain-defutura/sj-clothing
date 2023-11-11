import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  TouchableOpacity,
  Share,
} from 'react-native'
import { PlatformPay, confirmPlatformPayPayment } from '@stripe/stripe-react-native'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import LeftArrow from '../../assets/icons/LeftArrow'
import ShareArrow from '../../assets/icons/ShareArrow'
import * as Animatable from 'react-native-animatable'
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
} from 'react-native-reanimated'
import PlayCircleIcon from '../../assets/icons/PremiumPageIcon/PlayCircle'
import { Svg, Circle } from 'react-native-svg'
import CustomButton from '../Button'
import { IPremiumData } from '../../constant/types'
import PremiumVideo from '../../screens/PremiumVideo'
import DownArrow from '../../assets/icons/DownArrow'
import { userStore } from '../../store/userStore'
import AuthNavigate from '../../screens/AuthNavigate'

const { height, width } = Dimensions.get('window')

interface IPremiumDetailsCard {
  data: IPremiumData
  isSize: {
    country: string
    sizeVarient: {
      quantity: number
      size: string
      measurement: string
    }
  }
  setSize: React.Dispatch<
    React.SetStateAction<{
      country: string
      sizeVarient: {
        quantity: number
        size: string
        measurement: string
      }
    }>
  >
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
  handleBack: () => void
  handleSubmit: () => Promise<void>
}

const PremiumDetailsCard: React.FC<IPremiumDetailsCard> = ({
  data,
  handleBack,
  setSize,
  isSize,
  setOpenDetails,
  handleSubmit,
}) => {
  const { currency, rate } = userStore()
  const [showDetails, setShowDetails] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isSizeSelected, setIsSizeSelected] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false)
  const [isDropdownSizesOpen, setIsDropdownSizesOpen] = useState<boolean>(false)
  const [focus, setFocus] = useState(false)
  const user = userStore((state) => state.user)

  const onSubmit = () => {
    if (!user) {
      console.log('user not found')
      setFocus(true)
    } else {
      handleSubmit()
    }
  }

  const fetchPaymentIntentClientSecret = async () => {
    const reqData = {
      name: 'johns',
      email: 'a@a.com',
      currency: 'INR',
      amount: 200,
    }
    const response = await fetch('https://sj-clothing-backend.cyclic.app/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify(reqData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  }

  // const pay = async () => {
  //   const clientSecret = await fetchPaymentIntentClientSecret()

  //   const { error } = await confirmPlatformPayPayment(clientSecret, {
  //     googlePay: {
  //       testEnv: true,
  //       merchantName: 'Sj clothing',
  //       merchantCountryCode: 'US',
  //       currencyCode: 'USD',
  //       billingAddressConfig: {
  //         format: PlatformPay.BillingAddressFormat.Full,
  //         isPhoneNumberRequired: true,
  //         isRequired: true,
  //       },
  //     },
  //   })
  // }

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState)
  }

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)
  }

  const toggleDropdownSizes = () => {
    setIsDropdownSizesOpen((prevState) => !prevState)
  }

  const handleSelectSizes = (sizes: string) => {
    setIsDropdownSizesOpen(false)
    setIsSizeSelected(true)
  }

  const share = async () => {
    try {
      const result = await Share.share({
        message: ` Product-name: ${data.productName}, \n Product-Image: ${data.productImage}, \n Product-description: ${data.description}`,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with active type', result.activityType)
        } else {
          console.log('shared')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const handleLogin = () => {
  //   if (!user) {
  //     setFocus(true)
  //   } else {
  //     navigation.navigate('Checkout')
  //     setFocus(true)
  //   }
  // }

  const onClose = () => {
    setFocus(false)
  }

  const Sizes = data?.sizes.filter((f: any) => f.country).map((f: any) => f.sizeVarients)

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
              <Pressable onPress={share}>
                <ShareArrow width={24} height={24} />
              </Pressable>
            </FlexContent>

            <PremiumDetailsWrapper>
              <PremiumDetailsContent>
                <Animated.View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                  }}
                  entering={FadeInLeft.duration(800).delay(200)}
                  exiting={FadeOutLeft}
                >
                  <TouchableOpacity onPress={() => setOpenDetails(true)}>
                    <Image
                      source={{ uri: data.productImage }}
                      style={{
                        width: width / 1.2,
                        height: height * 0.45,
                        resizeMode: 'contain',
                        borderRadius: 6,
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
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: 20,
                      paddingHorizontal: 16,
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: 80,
                      }}
                    >
                      <ProductText>product</ProductText>
                      <ProductName>{data.productName}</ProductName>
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
                          <ProductText>price</ProductText>
                          <ProductName>
                            {(Number(data.normalPrice) * (rate as number)).toFixed(2)}INR
                          </ProductName>
                        </View>
                      ) : (
                        <View>
                          <View>
                            <ProductText>price</ProductText>
                          </View>
                          <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <OldPriceText>
                                {(Number(data.normalPrice) * (rate as number)).toFixed(2)}
                              </OldPriceText>
                              <OldPriceText> {currency.symbol}</OldPriceText>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <ProductName>
                                {(Number(data.offerPrice) * (rate as number)).toFixed(2)}
                              </ProductName>
                              <ProductName>{currency.symbol}</ProductName>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                    <WatchVideoBorder onPress={() => setOpenModal(true)}>
                      <PlayCircleIcon width={12} height={12} />
                      <WatchVideoText>Watch video</WatchVideoText>
                    </WatchVideoBorder>
                  </View>
                  {openModal && (
                    <PremiumVideo
                      video={data.productVideo}
                      onClose={() => setOpenModal(false)}
                      isVisible={openModal}
                    />
                  )}
                </Animated.View>
              </PremiumDetailsContent>

              <DropDownContainer>
                <View style={{ width: 160 }}>
                  <SelectContent onPress={toggleDropdown}>
                    <SelectText>{selectedCountry || 'Select a country'}</SelectText>
                    <Animatable.View
                      animation={isDropdownOpen ? 'rotate' : ''}
                      duration={500}
                      easing='ease-out'
                    >
                      <DownArrow width={16} height={16} />
                    </Animatable.View>
                  </SelectContent>
                  {isDropdownOpen && (
                    <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
                      <SelectDropDownList>
                        {data?.sizes
                          .filter((f) => f.gender === data.gender)
                          .map((f: any, index: number) => (
                            <Pressable
                              key={index}
                              onPress={() => {
                                setSize((prevState) => ({
                                  ...prevState,
                                  country: f.country,
                                }))
                                handleSelectCountry(f.country)
                              }}
                            >
                              <SelectListText>{f.country}</SelectListText>
                            </Pressable>
                          ))}
                      </SelectDropDownList>
                    </Animated.View>
                  )}
                </View>
                <View style={{ width: 158 }}>
                  <SelectContent onPress={toggleDropdownSizes}>
                    <SelectText>
                      {isSize.sizeVarient.size
                        ? `${isSize.sizeVarient.size}-${isSize.sizeVarient.measurement}`
                        : 'Select a Sizes'}
                    </SelectText>
                    <Animatable.View
                      animation={isDropdownSizesOpen ? 'rotate' : ''}
                      duration={500}
                      easing='ease-out'
                    >
                      <DownArrow width={16} height={16} />
                    </Animatable.View>
                  </SelectContent>
                  {isDropdownSizesOpen && selectedCountry && (
                    <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
                      <SelectDropDownList>
                        <View>
                          {Sizes[0].map((f: any, index: number) => (
                            <Pressable
                              key={index}
                              onPress={() => {
                                setSize((prevState) => ({
                                  ...prevState,
                                  sizeVarient: {
                                    measurement: f.measurement,
                                    size: f.size,
                                    quantity: f.quantity,
                                  },
                                }))
                                handleSelectSizes(f.sizes)
                              }}
                            >
                              <SelectListText>
                                {f.size} - {f.measurement}
                              </SelectListText>
                            </Pressable>
                          ))}
                        </View>
                      </SelectDropDownList>
                    </Animated.View>
                  )}
                </View>
              </DropDownContainer>

              {showDetails && (
                <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOut}>
                  <View style={{ margin: 14 }}>
                    <DetailsHeading>Detailed features</DetailsHeading>
                    {Description.map((f, index) => (
                      <View
                        key={index}
                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
                      >
                        <Svg width={8} height={8}>
                          <Circle cx={3} cy={3} r={3} fill='rgba(70, 45, 133, 0.6)' />
                        </Svg>

                        <DetailsParaText key={index} style={{ marginLeft: 8 }}>
                          {f}
                        </DetailsParaText>
                      </View>
                    ))}
                  </View>
                </Animated.View>
              )}
            </PremiumDetailsWrapper>

            <Animated.View entering={FadeInUp.duration(2000)} exiting={FadeOut}>
              <Btns>
                {showDetails ? (
                  <HideDetailsBorder onPress={() => setShowDetails(false)}>
                    <HideDetailsText>Hide details</HideDetailsText>
                  </HideDetailsBorder>
                ) : (
                  <HideDetailsBorder onPress={() => setShowDetails(true)}>
                    <HideDetailsText>View details</HideDetailsText>
                  </HideDetailsBorder>
                )}
                <CustomButton
                  text='Buy Now'
                  fontFamily='Arvo-Regular'
                  fontSize={13}
                  style={{ width: 170 }}
                  onPress={onSubmit}
                  disabled={!isSizeSelected}
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
    marginBottom: 15,
  },
})

const CardPairContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const DropDownContainer = styled.View`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 16px;
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`

const SelectText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
`
const SelectListText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  padding-horizontal: 12px;
  padding-vertical: 7px;
`

const SelectContent = styled.Pressable`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

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
  margin-top: 20px;
  gap: 8px;
`

const DetailsHeading = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-bottom: 8px;
`

const PremiumDetailsWrapper = styled.View`
  flex: 1;
`

const PremiumDetailsContent = styled.View`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
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

export default PremiumDetailsCard
