import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native'
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
import SelectStyleTooltip from '../../Tooltips/MidLevel/SelectStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SelectCountryTooltip from '../../Tooltips/MidLevel/SelectCountry'
import SelectSizeTooltip from '../../Tooltips/MidLevel/SelectSize'
import SelectColorTooltip from '../../Tooltips/MidLevel/SelectColor'
import FinalViewTooltip from '../../Tooltips/MidLevel/FinalViewTooltip'
import TextAnimation from '../../Medium/Navigation/TextAnimation'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

interface IPostNavigation {
  steps: number
  slideValue: SharedValue<number>
  openDesign: boolean
  warning: string
  dropDown: boolean
  animationUpdated: boolean
  done: boolean
  style: string
  country: string
  sizeVarient: {
    size: string
    measurement: string
    quantity: string
  }
  colorAnimationUpdate: boolean
  color: string
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

const PostNavigation: React.FC<IPostNavigation> = ({
  steps,
  slideValue,
  openDesign,
  warning,
  dropDown,
  done,
  country,
  color,
  style,
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
  const navigation = useNavigation()
  const [isPressed, setIsPressed] = useState(false)
  const [toolTip, showToolTip] = useState(false)
  const [toolTipCountry, setTooltipCountry] = useState(false)
  const [toolTipSize, setTooltipSize] = useState(false)
  const [toolTipColor, setToolTipColor] = useState(false)

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
      {openDesign && (
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
              done
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

      {!openDesign && (
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
            onPress={() => (steps !== 1 ? handleDecreaseSteps() : navigation.navigate('Post'))}
            activeOpacity={0.6}
            underlayColor='rgba(70, 45, 133, 0.2)'
            style={{
              // opacity: steps === 1 ? 0 : 1,
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
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                borderRadius: 50,
                backgroundColor: steps === 4 ? color : 'transparent',
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
                    backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.1)' : 'transparent',
                  },
                ]}
                disabled={!animationUpdated}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: COLORS.textClr,
                    fontFamily: 'Gilroy-Medium',
                    opacity: steps === 4 && color ? 0 : 1,
                  }}
                >
                  {steps === 1 && `${t(style ? style : 'Select Style')}`}
                  {steps === 2 && `${t(country ? country : 'Select Country')}`}
                  {steps === 3 &&
                    `${t(
                      sizeVarient.size
                        ? ` ${country} - ${sizeVarient.size}-${sizeVarient.measurement}`
                        : 'Select Size',
                    )}`}
                  {steps === 4 && `${t(color ? color : 'Select Color')}`}
                  {steps === 5 && `${t('Add more')}`}
                </Text>
                {steps === 1 && !style && <DropDownArrowIcon />}
                {steps === 2 && !country && <DropDownArrowIcon />}
                {steps === 3 && !sizeVarient.size && <DropDownArrowIcon />}

                {steps === 4 && !color && <DropDownArrowIcon />}
                {steps === 1 && !style && (
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
                {steps === 4 && !color && (
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
              {!animationUpdated && (
                <TextAnimation shake={shake} shakeAnimation={shakeAnimation}>
                  Please wait till avatar loads
                </TextAnimation>
              )}
              {/* {steps === 4 && color && !colorAnimationUpdate && (
                <TextAnimation shake={shake} shakeAnimation={shakeAnimation}>
                  Please wait till avatar loads
                </TextAnimation>
              )} */}
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

export default PostNavigation

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
})
