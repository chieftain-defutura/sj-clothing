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

const Images = [
  {
    title: 'Front',
    image: require('../../../assets/images/front-design.png'),
  },
  {
    title: 'Back',
    image: require('../../../assets/images/front-design.png'),
  },
  {
    title: 'Right arm',
    image: require('../../../assets/images/left-arm-design.png'),
  },
  {
    title: 'Left arm',
    image: require('../../../assets/images/left-arm-design.png'),
  },
]

const { width } = Dimensions.get('window')

interface IPostAddImageOrText {
  isDropDown: boolean
  isImageOrText: {
    title: string
    image: string
    position: string
  }
  data: any
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
  setImageOrText: React.Dispatch<
    React.SetStateAction<{
      title: string
      image: string
      position: string
    }>
  >
}
const PostAddImageOrText: React.FC<IPostAddImageOrText> = ({
  isDropDown,
  isImageOrText,
  data,
  setDropDown,
  setOpenDesign,
  setImageOrText,
}) => {
  return (
    <View style={styles.PostAddImageOrTextContainer}>
      {isDropDown && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
            },
          ]}
        >
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
                paddingHorizontal: 1,
                gap: 10,
              }}
            >
              {data[0].backSide && (
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
              {data[0].frontSide && (
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
              {data[0].rightSide && (
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
              {data[0].leftSide && (
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
                      source={require('../../../assets/images/left-arm-design.png')}
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
              zIndex: 10,
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

export default PostAddImageOrText

const styles = StyleSheet.create({
  PostAddImageOrTextContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: width,
    zIndex: 10,
  },
})