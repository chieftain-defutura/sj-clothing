import React, { useState } from 'react'

import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import Animated, {
  BounceInUp,
  BounceOutUp,
  FlipInXDown,
  FlipOutXDown,
} from 'react-native-reanimated'
import CloseIcon from '../../../assets/icons/Close'
import { COLORS } from '../../../styles/theme'
import { IDesigns, IMidlevel } from '../../../constant/types'

const { width } = Dimensions.get('window')

interface IAddImageOrText {
  isDropDown: boolean
  isImageOrText: {
    title: string
    position: string
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
      designs: {
        hashtag: string
        image: string
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
  return (
    <View style={styles.AddImageOrTextContainer}>
      {isDropDown && (
        <Animated.View>
          <Animated.View
            entering={FlipInXDown}
            exiting={FlipOutXDown.duration(400)}
            style={{
              backgroundColor: COLORS.iconsNormalClr,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                borderBottomColor: COLORS.borderClr,
                borderBottomWidth: 1,
                paddingVertical: 20,
                color: COLORS.textClr,
                fontSize: 14,
                fontFamily: 'Gilroy-Medium',
              }}
            >
              Select area to add image
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
              {data.backSide && (
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
                  <View
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
                  </View>

                  <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Front</Text>
                </Pressable>
              )}
              {data.frontSide && (
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
                  <View
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
                  </View>

                  <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Back</Text>
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
                  <View
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
                  </View>

                  <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
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
                  <View
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
                  </View>

                  <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                    Left arm
                  </Text>
                </Pressable>
              )}
            </View>
          </Animated.View>
          <Animated.View
            entering={BounceInUp.duration(800)}
            exiting={BounceOutUp.duration(700)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setDropDown(false)}
              style={{
                backgroundColor: COLORS.iconsNormalClr,
                width: 42,
                height: 42,
                borderRadius: 50,
                padding: 10,
              }}
            >
              <CloseIcon />
            </Pressable>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  )
}

export default AddImageOrText

const styles = StyleSheet.create({
  AddImageOrTextContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: width,
    zIndex: 100,
  },
})
