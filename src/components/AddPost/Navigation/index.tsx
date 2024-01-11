import React, { useEffect, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Platform,
} from 'react-native'
import LeftArrow from '../../../assets/icons/LeftArrow'
import Animated, {
  BounceIn,
  BounceOut,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import { COLORS } from '../../../styles/theme'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SelectColorPostTooltip from '../../Tooltips/Post/SelectColor'
import SelectCountryPostTooltip from '../../Tooltips/Post/SelectCountry'
import SelectSizePostTooltip from '../../Tooltips/Post/SelectSize'
import SelectStylePostTooltip from '../../Tooltips/Post/SelectStyle'

const { width } = Dimensions.get('window')

interface INavigation {
  steps: number
  slideValue: SharedValue<number>
  isOpenDesign: boolean
  warning: string
  dropDown: boolean
  animationUpdated: boolean
  isDone: boolean
  isSelectedStyle: string
  country: string
  sizeVarient: {
    size: string
    measurement: string
    quantity: string
  }
  colorAnimationUpdate: boolean
  isColor: string
  openPost: boolean
  shakeAnimation: any
  handleIncreaseSteps: () => void
  handleDecreaseSteps: () => void
  shake: () => void
  setOpenPost: React.Dispatch<React.SetStateAction<boolean>>
  setDone: React.Dispatch<React.SetStateAction<boolean>>
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
  setImageApplied: React.Dispatch<React.SetStateAction<boolean>>
  setImageOrText: React.Dispatch<
    React.SetStateAction<{
      title: string
      position: string
      rate: number
      designs: {
        hashtag: string
        image: string
        originalImage: string
      }
    }>
  >
}

const Navigation: React.FC<INavigation> = ({
  steps,
  slideValue,
  isOpenDesign,
  warning,
  dropDown,
  isDone,
  country,
  isColor,
  isSelectedStyle,
  sizeVarient,
  animationUpdated,
  shakeAnimation,
  colorAnimationUpdate,
  setOpenDesign,
  handleIncreaseSteps,
  shake,
  handleDecreaseSteps,
  setDropDown,
  setImageOrText,
  setDone,
  setImageApplied,
  openPost,
  setOpenPost,
}) => {
  const { t } = useTranslation('midlevel')
  const [isPressed, setIsPressed] = useState(false)
  const [toolTip, showToolTip] = useState(false)
  const [toolTipCountry, setTooltipCountry] = useState(false)
  const [toolTipSize, setTooltipSize] = useState(false)
  const [toolTipColor, setToolTipColor] = useState(false)

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showSelectStylePostTooltip')

      if (data !== '22') {
        AsyncStorage.setItem('showSelectStylePostTooltip', '22')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  const isShowToolTipCountry = async () => {
    try {
      const data = await AsyncStorage.getItem('showSelectCountryPostTooltip')

      if (data !== '20') {
        AsyncStorage.setItem('showSelectCountryPostTooltip', '20')
        setTooltipCountry(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTipCountry()
  }, [isShowToolTipCountry])

  const isShowToolTipSize = async () => {
    try {
      const data = await AsyncStorage.getItem('showSelectSizePostTooltip')

      if (data !== '21') {
        AsyncStorage.setItem('showSelectSizePostTooltip', '21')
        setTooltipSize(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTipSize()
  }, [isShowToolTipSize])

  const isShowToolTipColor = async () => {
    try {
      const data = await AsyncStorage.getItem('showSelectColorPostTooltip')

      if (data !== '19') {
        AsyncStorage.setItem('showSelectColorPostTooltip', '19')
        setToolTipColor(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTipColor()
  }, [isShowToolTipColor])

  const slideX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideValue.value * 400 }], // Slide 400 units (assuming a screen width of 400)
    }
  })

  const handleIncrease = () => {
    let currentField
    switch (steps) {
      case 1:
        currentField = isSelectedStyle
        break
      case 2:
        currentField = country
        break
      case 3:
        currentField = sizeVarient
        break
      case 4:
        currentField = isColor
        break
      default:
        currentField = 'any'
    }
  }

  return (
    <Animated.View
      style={[
        slideX,
        {
          opacity: dropDown ? 0 : 1,
          zIndex: 100,
        },
      ]}
    >
      {isOpenDesign && (
        <View
          style={[
            styles.Navigator,
            {
              justifyContent: 'space-between',
            },
          ]}
        >
          <Pressable
            onPress={() => {
              isDone
                ? setDone(false)
                : (setOpenDesign(false),
                  setImageOrText({
                    title: '',
                    position: '',
                    rate: 0,
                    designs: {
                      hashtag: '',
                      image: '',
                      originalImage: '',
                    },
                  }),
                  handleDecreaseSteps())
            }}
          >
            <Animated.View entering={BounceIn.duration(800)} exiting={BounceOut}>
              <LeftArrow width={24} height={24} />
            </Animated.View>
          </Pressable>
          <TouchableHighlight
            onPress={() => {
              setOpenDesign(false)
              handleDecreaseSteps()
              setImageApplied(true)
            }}
            activeOpacity={0.6}
            underlayColor='rgba(70, 45, 133, 0.2)'
          >
            <View>
              <Text
                allowFontScaling={false}
                style={{
                  color: COLORS.textClr,
                  fontFamily: 'Gilroy-Regular',
                  padding: 4,
                  borderRadius: 20,
                }}
              >
                {t('Done')}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )}

      {!isOpenDesign && (
        <View
          style={[
            styles.Navigator,
            {
              justifyContent: steps === 6 ? 'flex-start' : 'space-between',
              alignItems: 'center',
              gap: steps === 6 ? 120 : 0,
            },
          ]}
        >
          <TouchableHighlight
            onPress={() => (openPost && steps === 1 ? setOpenPost(false) : handleDecreaseSteps())}
            activeOpacity={0.6}
            underlayColor='rgba(70, 45, 133, 0.2)'
            disabled={!openPost && steps === 1}
            style={{
              opacity: openPost ? 1 : steps === 1 ? 0 : 1,
              borderRadius: 20,
              padding: 6,
            }}
          >
            <Animated.View>
              <ArrowCircleLeft width={24} height={24} />
            </Animated.View>
          </TouchableHighlight>
          {steps !== 6 && (
            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: steps === 5 ? 'flex-end' : 'center',
                borderRadius: 50,
                position: 'relative',
              }}
            >
              <Pressable
                onPress={() => (steps !== 5 ? setDropDown(true) : handleIncreaseSteps())}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                style={[
                  styles.Dropdown,

                  {
                    opacity: steps !== 5 && !animationUpdated ? 0.5 : 1,
                    backgroundColor: steps === 4 ? isColor : 'transparent',
                  },
                ]}
                disabled={steps !== 5 && !animationUpdated}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: COLORS.textClr,
                    fontFamily: 'Gilroy-Medium',
                    opacity: steps === 4 && isColor ? 0 : 1,
                  }}
                >
                  {steps === 1 && `${t(isSelectedStyle ? isSelectedStyle : 'Select Style')}`}

                  {steps === 2 && `${t(country ? country : 'Select Continent')}`}
                  {steps === 3 &&
                    `${t(
                      sizeVarient.size
                        ? ` ${country} - ${sizeVarient.size}-${sizeVarient.measurement}`
                        : 'Select Size',
                    )}`}
                  {steps === 4 && `${t(isColor ? isColor : 'Select Color')}`}
                  {steps === 5 && `${t('Add more')}`}
                </Text>
                {steps === 1 && !isSelectedStyle && <DropDownArrowIcon />}
                {steps === 2 && !country && <DropDownArrowIcon />}
                {steps === 3 && !sizeVarient.size && <DropDownArrowIcon />}

                {steps === 4 && !isColor && <DropDownArrowIcon />}
                {steps === 1 && !isSelectedStyle && (
                  <SelectStylePostTooltip
                    isVisible={toolTip}
                    onClose={() => {
                      showToolTip(false)
                    }}
                  />
                )}
                {steps === 2 && !country && (
                  <SelectCountryPostTooltip
                    isVisible={toolTipCountry}
                    onClose={() => {
                      setTooltipCountry(false)
                    }}
                  />
                )}
                {steps === 3 && !sizeVarient.size && (
                  <SelectSizePostTooltip
                    isVisible={toolTipSize}
                    onClose={() => {
                      setTooltipSize(false)
                    }}
                  />
                )}
                {steps === 4 && !isColor && (
                  <SelectColorPostTooltip
                    isVisible={toolTipColor}
                    onClose={() => {
                      setToolTipColor(false)
                    }}
                  />
                )}

                {/* {steps !== 5 && <DropDownArrowIcon />} */}
              </Pressable>
              {warning && animationUpdated && (
                <Text
                  allowFontScaling={false}
                  style={{
                    color: COLORS.textSecondaryClr,
                    fontFamily: 'Gilroy-Medium',
                    paddingTop: 3,
                    position: 'absolute',
                    top: 40,
                    width: width,
                    textAlign: 'center',
                  }}
                >
                  {t(warning)}
                </Text>
              )}

              {/* <View style={[{ position: 'absolute', top: 560, left: 70 }, styles.errorText]}>
                {!animationUpdated && (
                  <TextAnimation shake={shake} shakeAnimation={shakeAnimation}>
                    Please wait till avatar loads
                  </TextAnimation>
                )}
              </View> */}
            </View>
          )}
          {steps === 6 && (
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <TouchableHighlight
                onPress={() => {
                  setDropDown(true),
                    setDropDown(true),
                    setImageOrText((prevState) => ({
                      ...prevState,
                      title: 'design-images',
                    }))
                }}
                activeOpacity={0.6}
                underlayColor='rgba(70, 45, 133, 0.2)'
                style={styles.Dropdown}
              >
                <View>
                  <Text
                    allowFontScaling={false}
                    style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}
                  >
                    {t('Add Image')}
                  </Text>
                </View>
              </TouchableHighlight>
              {/* <TouchableHighlight
                onPress={() => {
                  setDropDown(true),
                    setDropDown(true),
                    setImageOrText((prevState) => ({
                      ...prevState,
                      title: 'text-images',
                    }))
                }}
                activeOpacity={0.6}
                underlayColor='rgba(70, 45, 133, 0.2)'
                style={styles.Dropdown}
              >
                <View>
                  <Text
                    allowFontScaling={false}
                    style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}
                  >
                    {t('Add Text')}
                  </Text>
                </View>
              </TouchableHighlight> */}
            </View>
          )}

          {steps !== 5 && steps !== 6 && (
            <TouchableHighlight
              onPress={handleIncreaseSteps}
              activeOpacity={0.6}
              underlayColor='rgba(70, 45, 133, 0.2)'
              disabled={!colorAnimationUpdate && steps === 4}
              style={{
                opacity: !colorAnimationUpdate && steps === 4 ? 0.5 : 1,
                borderRadius: 20,
                padding: 6,
              }}
            >
              <View>
                <ArrowCircleRight width={24} height={24} />
              </View>
            </TouchableHighlight>
          )}
        </View>
      )}
    </Animated.View>
  )
}

export default Navigation

const styles = StyleSheet.create({
  Navigator: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
  },
  Dropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#462D85',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  errorText: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        top: 550,
        left: 50,
      },
    }),
  },
})
