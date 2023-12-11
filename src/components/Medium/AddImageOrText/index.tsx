import React from 'react'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View, Pressable } from 'react-native'
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
                `Select area to add ${isImageOrText.title === 'design-images' ? 'image' : 'text'} `,
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
                <Pressable
                  onPress={() => {
                    setOpenDesign(true),
                      setDropDown(false),
                      setImageOrText((prevState) => ({
                        ...prevState,
                        position: 'Front',
                      }))
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {/* <View
                    style={{
                      backgroundColor: COLORS.BoxBackgoundClr,
                      padding: 16,
                      borderRadius: 10,
                      borderColor:
                        isImageOrText.position === 'Front' ? COLORS.textSecondaryClr : '',
                      borderWidth: isImageOrText.position === 'Front' ? 1 : 0,
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 72, objectFit: 'contain' }}
                      source={require('../../../assets/images/front-design.png')}
                    />
                  </View> */}

                  <Text
                    allowFontScaling={false}
                    style={{
                      color:
                        isImageOrText.position === 'Front'
                          ? COLORS.textSecondaryClr
                          : COLORS.iconsNormalClr,
                      fontFamily: 'Gilroy-Medium',
                      paddingBottom: 12,
                    }}
                  >
                    Front
                  </Text>
                </Pressable>
              )}
              {data.backSide && (
                <Pressable
                  onPress={() => {
                    setOpenDesign(true),
                      setDropDown(false),
                      setImageOrText((prevState) => ({
                        ...prevState,
                        position: 'Back',
                      }))
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {/* <View
                    style={{
                      backgroundColor: COLORS.BoxBackgoundClr,
                      padding: 16,
                      borderRadius: 10,
                      borderColor: isImageOrText.position === 'Back' ? COLORS.textSecondaryClr : '',
                      borderWidth: isImageOrText.position === 'Back' ? 1 : 0,
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 72, objectFit: 'contain' }}
                      source={require('../../../assets/images/front-design.png')}
                    />
                  </View> */}

                  <Text
                    allowFontScaling={false}
                    style={{
                      color:
                        isImageOrText.position === 'Back'
                          ? COLORS.textSecondaryClr
                          : COLORS.iconsNormalClr,
                      fontFamily: 'Gilroy-Medium',
                      paddingBottom: 12,
                    }}
                  >
                    Back
                  </Text>
                </Pressable>
              )}
              {data.rightSide && (
                <Pressable
                  onPress={() => {
                    setOpenDesign(true),
                      setDropDown(false),
                      setImageOrText((prevState) => ({
                        ...prevState,
                        position: 'Right arm',
                      }))
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {/* <View
                    style={{
                      backgroundColor: COLORS.BoxBackgoundClr,
                      padding: 16,
                      borderRadius: 10,
                      borderColor:
                        isImageOrText.position === 'Right arm' ? COLORS.textSecondaryClr : '',
                      borderWidth: isImageOrText.position === 'Right arm' ? 1 : 0,
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 72, objectFit: 'contain' }}
                      source={require('../../../assets/images/left-arm-design.png')}
                    />
                  </View> */}

                  <Text
                    allowFontScaling={false}
                    style={{
                      color:
                        isImageOrText.position === 'Right arm'
                          ? COLORS.textSecondaryClr
                          : COLORS.iconsNormalClr,
                      fontFamily: 'Gilroy-Medium',
                      paddingBottom: 12,
                    }}
                  >
                    Right arm
                  </Text>
                </Pressable>
              )}
              {data.leftSide && (
                <Pressable
                  onPress={() => {
                    setOpenDesign(true),
                      setDropDown(false),
                      setImageOrText((prevState) => ({
                        ...prevState,
                        position: 'Left arm',
                      }))
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {/* <View
                    style={{
                      backgroundColor: COLORS.BoxBackgoundClr,
                      padding: 16,
                      borderRadius: 10,
                      borderColor:
                        isImageOrText.position === 'Left arm' ? COLORS.textSecondaryClr : '',
                      borderWidth: isImageOrText.position === 'Left arm' ? 1 : 0,
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 72, objectFit: 'contain' }}
                      source={require('../../../assets/images/left-arm.png')}
                    />
                  </View> */}

                  <Text
                    allowFontScaling={false}
                    style={{
                      color:
                        isImageOrText.position === 'Left arm'
                          ? COLORS.textSecondaryClr
                          : COLORS.iconsNormalClr,
                      fontFamily: 'Gilroy-Medium',
                      paddingBottom: 12,
                    }}
                  >
                    Left arm
                  </Text>
                </Pressable>
              )}
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </LinearGradient>
  )
}

export default AddImageOrText

const styles = StyleSheet.create({
  AddImageOrTextContainer: {},
})
