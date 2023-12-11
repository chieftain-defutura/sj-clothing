import React, { useState } from 'react'
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
  isColor: string

  handleIncreaseSteps: () => void
  handleDecreaseSteps: () => void
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
  setOpenDesign,
  handleIncreaseSteps,
  handleDecreaseSteps,
  setDropDown,
  setImageOrText,
  setDone,
  setImageApplied,
}) => {
  const { t } = useTranslation('midlevel')
  const [isPressed, setIsPressed] = useState(false)

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
          position: 'absolute',
          top: 0,
          zIndex: 1000,
          width: width,
          flex: 1,
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
              alignItems: warning ? 'flex-start' : 'center',

              gap: steps === 6 ? 70 : 0,
            },
          ]}
        >
          <TouchableHighlight
            onPress={() => steps !== 1 && handleDecreaseSteps()}
            activeOpacity={0.6}
            underlayColor='rgba(70, 45, 133, 0.2)'
            style={{
              opacity: steps === 1 ? 0 : 1,
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
                backgroundColor: steps === 4 ? isColor : 'transparent',
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

                {/* {steps !== 5 && <DropDownArrowIcon />} */}
              </Pressable>
              {warning && (
                <Text
                  allowFontScaling={false}
                  style={{
                    color: COLORS.textSecondaryClr,
                    fontFamily: 'Gilroy-Medium',
                    paddingTop: 3,
                  }}
                >
                  {t(warning)}
                </Text>
              )}
              {!animationUpdated && (
                <Text style={{ color: 'red', fontFamily: 'Gilroy-Medium', paddingTop: 3 }}>
                  Please wait till avatar loads
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
              disabled={!animationUpdated}
              style={{
                opacity: !animationUpdated ? 0.5 : 1,
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
})
