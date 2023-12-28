import React from 'react'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, View, TouchableHighlight } from 'react-native'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
import { IMidlevel } from '../../../constant/types'
import { COLORS, dropDownGradient } from '../../../styles/theme'

interface IAddImageOrText {
  isDropDown: boolean
  isImageOrText: {
    title: string
    position: string
    rate: number
    designs: {
      hashtag: string
      image: string
    }
  }
  data: IMidlevel
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
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
const AddImageOrText: React.FC<IAddImageOrText> = ({
  isDropDown,
  isImageOrText,
  data,
  setDropDown,
  setOpenDesign,
  setImageOrText,
}) => {
  const { t } = useTranslation('midlevel')

  return (
    <LinearGradient
      colors={dropDownGradient}
      style={{
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
      }}
    >
      {isDropDown && (
        <Animated.View>
          <Animated.View
            entering={FlipInXDown}
            exiting={FlipOutXDown.duration(400)}
            style={{
              backgroundColor: 'rgba(191, 148, 228, 0.1)',
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              paddingHorizontal: 15,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                paddingTop: 20,
                color: COLORS.textClr,
                fontSize: 14,
                fontFamily: 'Gilroy-Medium',
              }}
            >
              {t(
                `Select area to add ${isImageOrText.title === 'design-images' ? 'image' : 'text'}`,
              )}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingVertical: 20,
                paddingHorizontal: 24,
                gap: 10,
              }}
            >
              {data.frontSide && (
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.2)'
                  onPress={() => {
                    setOpenDesign(true),
                      setDropDown(false),
                      setImageOrText((prevState) => ({
                        ...prevState,
                        position: 'Front',
                      }))
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        color:
                          isImageOrText.position === 'Front'
                            ? COLORS.textSecondaryClr
                            : COLORS.iconsNormalClr,
                        fontFamily: 'Gilroy-Medium',
                        padding: 4,
                      }}
                    >
                      Front
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              {data.backSide && (
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.2)'
                  onPress={() => {
                    setOpenDesign(true),
                      setDropDown(false),
                      setImageOrText((prevState) => ({
                        ...prevState,
                        position: 'Back',
                      }))
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        color:
                          isImageOrText.position === 'Back'
                            ? COLORS.textSecondaryClr
                            : COLORS.iconsNormalClr,
                        fontFamily: 'Gilroy-Medium',
                        padding: 4,
                      }}
                    >
                      Back
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              {data.rightSide && (
                <TouchableHighlight
                  onPress={() => {
                    setOpenDesign(true),
                      setDropDown(false),
                      setImageOrText((prevState) => ({
                        ...prevState,
                        position: 'Right arm',
                      }))
                  }}
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.2)'
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        color:
                          isImageOrText.position === 'Right arm'
                            ? COLORS.textSecondaryClr
                            : COLORS.iconsNormalClr,
                        fontFamily: 'Gilroy-Medium',
                        padding: 4,
                      }}
                    >
                      Right arm
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              {data.leftSide && (
                <TouchableHighlight
                  onPress={() => {
                    setOpenDesign(true),
                      setDropDown(false),
                      setImageOrText((prevState) => ({
                        ...prevState,
                        position: 'Left arm',
                      }))
                  }}
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.2)'
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        color:
                          isImageOrText.position === 'Left arm'
                            ? COLORS.textSecondaryClr
                            : COLORS.iconsNormalClr,
                        fontFamily: 'Gilroy-Medium',
                        padding: 4,
                      }}
                    >
                      Left arm
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </LinearGradient>
  )
}

export default AddImageOrText
