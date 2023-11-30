import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import Animated, {
  BounceInUp,
  BounceOutUp,
  Easing,
  FadeInDown,
  FadeOut,
} from 'react-native-reanimated'
import { COLORS } from '../styles/theme'
import ArrowCircleRight from '../assets/icons/ArrowCircleRight'
import DropDownArrowIcon from '../assets/icons/DropDownArrow'
import ArrowCircleLeft from '../assets/icons/ArrowCircleLeft'
import CloseIcon from '../assets/icons/Close'

const Colors = ['white', 'violet', 'blue', 'red', 'orange', 'green']

interface ISelectColor {
  navigation: any
  setPostCreationSteps: React.Dispatch<React.SetStateAction<number>>
}

const SimpleDropdownWithAnimation: React.FC<ISelectColor> = ({ setPostCreationSteps }) => {
  const [isSelectedColor, setSelectedColor] = useState('white')
  const [isOpen, setOpen] = useState(false)

  return (
    <View style={styles.selectColorContainer}>
      {isOpen ? (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              marginTop: 50,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            },
          ]}
        >
          <Animated.View
            entering={FadeInDown}
            exiting={FadeOut.duration(700).easing(Easing.ease)}
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
              allowFontScaling={false}
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
                          borderRadius: 50,
                          padding: 23,
                        }}
                      ></View>
                    </View>
                    <Text
                      allowFontScaling={false}
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
            exiting={BounceOutUp.duration(700)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Pressable
              onPress={() => setOpen(false)}
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
      ) : (
        <View style={styles.selectColorNavigator}>
          <Pressable onPress={() => setPostCreationSteps(0)}>
            <ArrowCircleLeft width={24} height={24} />
          </Pressable>
          <Pressable onPress={() => setOpen(true)} style={styles.selectColorDropdown}>
            <Text
              allowFontScaling={false}
              style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}
            >
              Select Color
            </Text>
            <DropDownArrowIcon />
          </Pressable>
          <Pressable
            onPress={() => {
              setPostCreationSteps(2)
            }}
          >
            <ArrowCircleRight width={24} height={24} />
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default SimpleDropdownWithAnimation

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
    marginTop: 60,
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
    marginTop: 64,
  },
  selectColor360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
