import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  Share,
  Modal,
} from 'react-native'
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
} from 'react-native-reanimated'
import { Svg, Circle } from 'react-native-svg'
import * as Animatable from 'react-native-animatable'
import * as Haptics from 'expo-haptics'
import CustomButton from '../Button'
import { userStore } from '../../store/userStore'
import { IPremiumData } from '../../constant/types'
import LeftArrow from '../../assets/icons/LeftArrow'
import DownArrow from '../../assets/icons/DownArrow'
import PremiumVideo from '../../screens/PremiumVideo'
import AuthNavigate from '../../screens/AuthNavigate'
import ShareArrow from '../../assets/icons/ShareArrow'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import PlayCircleIcon from '../../assets/icons/PremiumPageIcon/PlayCircle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PremiumDetailsTooltip from '../Tooltips/Premium/PremiumDetailsTooltip'
// import { Audio } from 'expo-av'

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
  const [openImage, setOpenImage] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isSizeSelected, setIsSizeSelected] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false)
  const [isDropdownSizesOpen, setIsDropdownSizesOpen] = useState<boolean>(false)
  const [focus, setFocus] = useState(false)
  const user = userStore((state) => state.user)
  const rate = userStore((state) => state.rate)
  const currency = userStore((state) => state.currency)
  const [toolTip, showToolTip] = useState(false)

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showPremiumDetailsTooltip')

      if (data !== '12') {
        AsyncStorage.setItem('showPremiumDetailsTooltip', '12')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  // const playSound = async () => {
  //   const { sound } = await Audio.Sound.createAsync(require('../../assets/video/sound.mp3'))
  //   await sound.playAsync()
  // }

  // const handleImageClick = () => {
  //   playSound()
  // }

  // useEffect(() => {
  //   handleImageClick()
  // }, [])

  const onSubmit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

    if (!user) {
      console.log('user not found')
      handleSubmit()
    } else {
      handleSubmit()
    }
  }

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
      const currencySymbol = currency ? currency.symbol : '₹'
      const message = `Product-name: ${data.productName}, \n Product-Image: ${data.productImage}, \n Product-description: ${data.description}, \n Product-price: ${data.normalPrice}${currencySymbol}`

      const result = await Share.share({ message })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with active type', result.activityType)
        } else {
          console.log('shared')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
      console.log('Shared succeeded')
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

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
              <TouchableHighlight
                onPress={handleBack}
                activeOpacity={0.6}
                underlayColor='rgba(70, 45, 133, 0.2)'
                style={{ borderRadius: 100 }}
              >
                <IconHoverClr>
                  <IconHoverPressable>
                    <LeftArrow width={24} height={24} />
                  </IconHoverPressable>
                </IconHoverClr>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={share}
                activeOpacity={0.6}
                underlayColor='rgba(70, 45, 133, 0.2)'
                style={{ marginTop: 3, borderRadius: 100 }}
              >
                <IconHoverClr>
                  <IconHoverPressable>
                    <ShareArrow width={24} height={24} />
                  </IconHoverPressable>
                </IconHoverClr>
              </TouchableHighlight>
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
                        marginLeft: 26,
                      }}
                      alt={data.productName}
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
                      }}
                    >
                      <ProductText allowFontScaling={false}>product</ProductText>
                      <ProductName
                        style={{ width: width / 4 }}
                        allowFontScaling={false}
                        numberOfLines={3}
                        ellipsizeMode='tail'
                      >
                        {data.productName}
                      </ProductName>
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
                          <ProductName allowFontScaling={false}>
                            {rate
                              ? (Number(data.normalPrice) * (rate as number)).toFixed(2)
                              : data.normalPrice}
                            {currency ? currency.symbol : '₹'}
                          </ProductName>
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
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <WatchVideoBorder onPress={() => setOpenModal(true)}>
                        <PlayCircleIcon width={12} height={12} />
                        <WatchVideoText allowFontScaling={false}>Watch video</WatchVideoText>
                      </WatchVideoBorder>
                      <WatchVideoBorder onPress={() => setOpenImage(true)}>
                        <WatchVideoText allowFontScaling={false}>View Image</WatchVideoText>
                      </WatchVideoBorder>
                    </View>
                  </View>
                  {openModal && (
                    <PremiumVideo
                      video={data.productVideo}
                      onClose={() => setOpenModal(false)}
                      isVisible={openModal}
                    />
                  )}
                  {openImage && (
                    <Modal animationType='fade' transparent={true}>
                      <ImageWrapper onPress={() => setOpenImage(false)}>
                        <Image
                          source={{ uri: data.fabricImage }}
                          alt={data.productName}
                          style={{ width: 400, height: 300 }}
                        />
                      </ImageWrapper>
                    </Modal>
                  )}
                </Animated.View>
              </PremiumDetailsContent>

              <DropDownContainer>
                <View style={{ width: width / 2.5 }}>
                  <SelectContent onPress={toggleDropdown}>
                    <SelectText allowFontScaling={false}>
                      {selectedCountry || 'Select a country'}
                    </SelectText>
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
                              <SelectListText allowFontScaling={false}>{f.country}</SelectListText>
                            </Pressable>
                          ))}
                      </SelectDropDownList>
                    </Animated.View>
                  )}
                </View>
                <View style={{ width: width / 2.5 }}>
                  <SelectContent onPress={toggleDropdownSizes}>
                    <SelectText allowFontScaling={false}>
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
                              <SelectListText allowFontScaling={false}>
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
            </PremiumDetailsWrapper>

            <Animated.View entering={FadeInUp.duration(2000)} exiting={FadeOut}>
              <Btns>
                {showDetails ? (
                  <HideDetailsBorder
                    style={{ width: width / 2.5 }}
                    onPress={() => setShowDetails(false)}
                  >
                    <HideDetailsText allowFontScaling={false}>Hide details</HideDetailsText>
                  </HideDetailsBorder>
                ) : (
                  <HideDetailsBorder
                    style={{ width: width / 2.5 }}
                    onPress={() => setShowDetails(true)}
                  >
                    <HideDetailsText allowFontScaling={false}>View details</HideDetailsText>
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
      <PremiumDetailsTooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
    marginBottom: 15,
  },
})
const ImageWrapper = styled.Pressable`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`

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
  gap: 5px;
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
  margin-top: 10px;
`

const IconHoverClr = styled.View`
  width: 50px;
  height: 50px;
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
  font-size: 14px;
  font-family: ${FONT_FAMILY.MontserratSemiBold};
  color: ${COLORS.SecondaryTwo};
`

const WatchVideoBorder = styled.Pressable`
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.textSecondaryClr};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  width: 90px;
`

const HideDetailsBorder = styled.TouchableOpacity`
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.textSecondaryClr};
  padding-vertical: 12px;
  padding-horizontal: 20px;
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
  text-align: center;
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
