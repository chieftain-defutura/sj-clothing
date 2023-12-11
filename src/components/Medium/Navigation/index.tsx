import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
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
  const [arrowPressed, setArrowPressed] = useState(false)
  const [arrowLeft, setArrowLeft] = useState(false)
  const [addImagePressed, setAddImagePressed] = useState(false)
  const [addTextPressed, setAddTextPressed] = useState(false)

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
          <Pressable
            onPress={() => {
              setOpenDesign(false)
              handleDecreaseSteps()
              setImageApplied(true)
            }}
          >
            <Text
              allowFontScaling={false}
              style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}
            >
              {t('Done')}
            </Text>
          </Pressable>
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
          <Pressable
            onPress={() => steps !== 1 && handleDecreaseSteps()}
            onPressIn={() => setArrowLeft(true)}
            onPressOut={() => setArrowLeft(false)}
            style={{
              opacity: steps === 1 ? 0 : 1,
              backgroundColor: arrowLeft ? 'rgba(70, 45, 133, 0.2)' : 'transparent',
              borderRadius: 20,
              padding: 6,
            }}
          >
            <Animated.View>
              <ArrowCircleLeft width={24} height={24} />
            </Animated.View>
          </Pressable>
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
                    // opacity: !animationUpdated ? 0.5 : 1,
                    backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.1)' : 'transparent',
                  },
                ]}
                // disabled={!animationUpdated}
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
            </View>
          )}
          {steps === 6 && (
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <Pressable
                onPressIn={() => setAddImagePressed(true)}
                onPressOut={() => setAddImagePressed(false)}
                onPress={() => {
                  setDropDown(true),
                    setDropDown(true),
                    setImageOrText((prevState) => ({
                      ...prevState,
                      title: 'design-images',
                    }))
                }}
                style={[
                  styles.Dropdown,
                  {
                    backgroundColor: addImagePressed ? 'rgba(70, 45, 133, 0.1)' : 'transparent',
                  },
                ]}
              >
                <Text
                  allowFontScaling={false}
                  style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}
                >
                  {t('Add Image')}
                </Text>
              </Pressable>
              <Pressable
                onPressIn={() => setAddTextPressed(true)}
                onPressOut={() => setAddTextPressed(false)}
                onPress={() => {
                  setDropDown(true),
                    setDropDown(true),
                    setImageOrText((prevState) => ({
                      ...prevState,
                      title: 'text-images',
                    }))
                }}
                style={[
                  styles.Dropdown,
                  {
                    backgroundColor: addTextPressed ? 'rgba(70, 45, 133, 0.1)' : 'transparent',
                  },
                ]}
              >
                <Text
                  allowFontScaling={false}
                  style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}
                >
                  {t('Add Text')}
                </Text>
              </Pressable>
            </View>
          )}
          {steps !== 5 && steps !== 6 && (
            <Pressable
              onPress={handleIncreaseSteps}
              onPressIn={() => setArrowPressed(true)}
              onPressOut={() => setArrowPressed(false)}
              // disabled={!animationUpdated}
              style={{
                backgroundColor: arrowPressed ? 'rgba(70, 45, 133, 0.2)' : 'transparent',
                borderRadius: 20,
                padding: 6,
              }}
            >
              <View>
                <ArrowCircleRight width={24} height={24} />
              </View>
              {/* {!animationUpdated && (
                <Text style={{ color: 'red' }}>Please wait till avatar loads</Text>
              )} */}
            </Pressable>
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
