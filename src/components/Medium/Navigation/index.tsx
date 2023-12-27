import React, { useEffect, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
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
import TextAnimation from './TextAnimation'
import SelectStyleTooltip from '../../Tooltips/MidLevel/SelectStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SelectCountryTooltip from '../../Tooltips/MidLevel/SelectCountry'
import SelectSizeTooltip from '../../Tooltips/MidLevel/SelectSize'
import SelectColorTooltip from '../../Tooltips/MidLevel/SelectColor'
import FinalViewTooltip from '../../Tooltips/MidLevel/FinalViewTooltip'

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
  shakeAnimation: any
  handleIncreaseSteps: () => void
  handleDecreaseSteps: () => void
  shake: () => void

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
}) => {
  const { t } = useTranslation('midlevel')
  const [isPressed, setIsPressed] = useState(false)
  const [toolTip, showToolTip] = useState(false)
  const [toolTipCountry, setTooltipCountry] = useState(false)
  const [toolTipSize, setTooltipSize] = useState(false)
  const [toolTipColor, setToolTipColor] = useState(false)
  const [saving, setSaving] = useState(false)

  console.log('animationUpdated', animationUpdated)

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showSelectStyleTooltip')

      if (data !== '5') {
        AsyncStorage.setItem('showSelectStyleTooltip', '5')
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
      const data = await AsyncStorage.getItem('showSelectCountryTooltip')

      if (data !== '6') {
        AsyncStorage.setItem('showSelectCountryTooltip', '6')
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
      const data = await AsyncStorage.getItem('showSelectSizeTooltip')

      if (data !== '7') {
        AsyncStorage.setItem('showSelectSizeTooltip', '7')
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
      const data = await AsyncStorage.getItem('showSelectSizeTooltip')

      if (data !== '7') {
        AsyncStorage.setItem('showSelectSizeTooltip', '7')
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
            disabled={saving}
            onPress={() => {
              setImageApplied(true)
              setSaving(true)
              setTimeout(() => {
                setOpenDesign(false)
                handleDecreaseSteps()
              }, 2000)
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
                {saving ? 'Saving...' : t('Done')}
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
              gap: steps === 6 ? 70 : 0,
            },
          ]}
        >
          <TouchableHighlight
            onPress={() => steps !== 1 && handleDecreaseSteps()}
            activeOpacity={0.6}
            underlayColor='rgba(70, 45, 133, 0.2)'
            style={{
              opacity: steps === 1 ? 0 : !animationUpdated ? 0.5 : 1,
              borderRadius: 20,
              padding: 6,
            }}
            disabled={!animationUpdated}
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
                    opacity: !animationUpdated ? 0.5 : 1,
                    backgroundColor: steps === 4 ? isColor : 'transparent',
                  },
                ]}
                disabled={!animationUpdated}
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
                  {steps === 2 && `${t(country ? country : 'Select Country')}`}
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
                  <SelectStyleTooltip
                    isVisible={toolTip}
                    onClose={() => {
                      showToolTip(false)
                    }}
                  />
                )}
                {steps === 2 && !country && (
                  <SelectCountryTooltip
                    isVisible={toolTipCountry}
                    onClose={() => {
                      setTooltipCountry(false)
                    }}
                  />
                )}
                {steps === 3 && !sizeVarient.size && (
                  <SelectSizeTooltip
                    isVisible={toolTipSize}
                    onClose={() => {
                      setTooltipSize(false)
                    }}
                  />
                )}
                {steps === 4 && !isColor && (
                  <SelectColorTooltip
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
                style={[styles.Dropdown, { opacity: !animationUpdated ? 0.5 : 1 }]}
                disabled={!animationUpdated}
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
              <TouchableHighlight
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
                style={[styles.Dropdown, { opacity: !animationUpdated ? 0.5 : 1 }]}
                disabled={!animationUpdated}
              >
                <View>
                  <Text
                    allowFontScaling={false}
                    style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}
                  >
                    {t('Add Text')}
                  </Text>
                </View>
              </TouchableHighlight>
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
