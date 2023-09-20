import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import Animated, {
  BounceInUp,
  BounceOutUp,
  Easing,
  FadeInDown,
  FadeOut,
  FlipInXDown,
  FlipOutXDown,
  LightSpeedInLeft,
  LightSpeedOutRight,
} from 'react-native-reanimated'
import { PostCreationStore } from '../../../store/postCreationStore'

const Colors = ['white', 'violet', 'blue', 'red', 'orange', 'green']

interface ISelectColor {
  navigation: any
  setPostCreationSteps: React.Dispatch<React.SetStateAction<number>>
}

const SelectColor: React.FC<ISelectColor> = ({ navigation, setPostCreationSteps }) => {
  const [isDropDown, setDropDown] = useState(false)
  const [isSelectedColor, setSelectedColor] = useState('white')
  const { setColor } = PostCreationStore()

  return (
    <View style={styles.selectColorContainer}>
      {isDropDown && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            },
          ]}
        >
          <Animated.View
            entering={FlipInXDown}
            exiting={FlipOutXDown.duration(400)}
            style={[
              {
                backgroundColor: COLORS.iconsNormalClr,
                borderBottomRightRadius: 50,
                borderBottomLeftRadius: 50,
                paddingHorizontal: 15,
              },
            ]}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Gilroy-Medium',
                borderBottomColor: COLORS.borderClr,
                borderBottomWidth: 2,
                paddingVertical: 20,
                color: COLORS.textClr,
              }}
            >
              Colors
            </Text>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 15,
                  paddingVertical: 20,
                }}
              >
                {Colors.map((color, index) => (
                  <Pressable onPress={() => setSelectedColor(color)} key={index}>
                    <View
                      style={{
                        borderRadius: 50,
                        borderColor: COLORS.textTertiaryClr,
                        borderWidth: 1,
                        padding: 1,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: `${color}`,
                          // width: 40,
                          // height: 40,
                          borderRadius: 50,
                          padding: 23,
                        }}
                      ></View>
                    </View>
                    <Text
                      style={{
                        color:
                          isSelectedColor === color
                            ? COLORS.textSecondaryClr
                            : COLORS.textTertiaryClr,
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        fontFamily: 'Gilroy-Regular',
                      }}
                    >
                      {color}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Animated.View>
          <Animated.View
            entering={BounceInUp.duration(800)}
            exiting={BounceOutUp.duration(500)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
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
                zIndex: 10,
              }}
            >
              <CloseIcon />
            </Pressable>
          </Animated.View>
        </Animated.View>
      )}
      <Animated.View style={styles.selectColorNavigator}>
        <Pressable onPress={() => setPostCreationSteps(0)}>
          <ArrowCircleLeft width={24} height={24} />
        </Pressable>
        <Pressable onPress={() => setDropDown(true)} style={styles.selectColorDropdown}>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Select Color</Text>
          <DropDownArrowIcon />
        </Pressable>
        <Pressable
          onPress={() => {
            setPostCreationSteps(2), setColor(isSelectedColor)
          }}
        >
          <ArrowCircleRight width={24} height={24} />
        </Pressable>
      </Animated.View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <View style={[styles.selectColorTShirt]}>
          <Image source={require('../../../assets/images/plain-shirt.png')} />
        </View>
        <View style={styles.selectColor360Degree}>
          <ThreeSixtyDegree width={40} height={40} />
        </View>
      </View>
    </View>
  )
}

export default SelectColor

const styles = StyleSheet.create({
  selectColorContainer: {
    flex: 1,
    backgroundColor: '#FFEFFF',
  },
  selectColorNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: -1,
  },
  selectColorDropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectColorTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: -1,
  },
  selectColor360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
