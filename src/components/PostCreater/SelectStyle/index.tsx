import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import styled from 'styled-components/native'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const StyleShirtData = [
  {
    Title: 'Half sleeve',
    Image: '../../../assets/images/plain-shirt.png',
  },
  {
    Title: 'Round neck',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Sleeveless',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Full sleeve',
    Image: '../../../assets/images/plain-shirt.png',
  },
  {
    Title: 'V neck',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Polo',
    Image: '../../../assets/images/plain-shirt.png',
  },
]
const StyleTShirtData = [
  {
    Title: 'Half sleeve',
    Image: '../../../assets/images/plain-shirt.png',
  },
  {
    Title: 'Sleeveless',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Round neck',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Full sleeve',
    Image: '../../../assets/images/plain-shirt.png',
  },
  {
    Title: 'V neck',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Polo',
    Image: '../../../assets/images/plain-shirt.png',
  },
]

interface ISelectStyle {
  navigation: any
}

const SelectStyle: React.FC<ISelectStyle> = ({ navigation }) => {
  const [isType, setType] = useState('shirt')
  const height = useSharedValue(0)
  const display = useSharedValue<'none' | 'flex'>('none')
  const [isSelectedStyle, setSelectedStyle] = useState('Half sleeve')
  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    display: display.value,
  }))
  const animate = () => {
    if (height.value === 0) {
      display.value = 'flex' as 'none' | 'flex'
      height.value = withSpring(95)
    } else {
      height.value = withTiming(0, { duration: 300 })
      setTimeout(() => {
        display.value = 'none'
      }, 250)
    }
  }
  return (
    <View style={styles.selectStyleContainer}>
      <View style={styles.selectStyleNavigator}>
        <Pressable onPress={() => navigation.navigate('Stack')}>
          <ArrowCircleLeft width={24} height={24} />
        </Pressable>
        <Pressable onPress={animate} style={styles.selectStyleDropdown}>
          <SelectText>Select Style</SelectText>
          <DropDownArrowIcon />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Color')}>
          <ArrowCircleRight width={24} height={24} />
        </Pressable>
      </View>

      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            backgroundColor: COLORS.iconsNormalClr,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            zIndex: 10,
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            backgroundColor: COLORS.iconsNormalClr,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            padding: 20,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 24,
              borderBottomColor: COLORS.borderClr,
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
          >
            <Pressable onPress={() => setType('shirt')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: isType === 'shirt' ? COLORS.iconsHighlightClr : COLORS.textTertiaryClr,
                }}
              >
                Shirt
              </Text>
            </Pressable>
            <Pressable onPress={() => setType('t-shirt')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: isType === 't-shirt' ? COLORS.iconsHighlightClr : COLORS.textTertiaryClr,
                }}
              >
                T-Shirt
              </Text>
            </Pressable>
          </View>
          {isType === 'shirt' ? (
            <View
              style={{
                padding: 16,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 75,
                  paddingBottom: 10,
                }}
              >
                {StyleShirtData.slice(0, 3).map((data, index) => (
                  <Pressable key={index} onPress={() => setSelectedStyle(data.Title)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color:
                          isSelectedStyle === data.Title
                            ? COLORS.textSecondaryClr
                            : COLORS.textTertiaryClr,
                      }}
                    >
                      {data.Title}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 94,
                  paddingRight: 30,
                  paddingBottom: 10,
                }}
              >
                {StyleShirtData.slice(3, 6).map((data, index) => (
                  <Pressable key={index} onPress={() => setSelectedStyle(data.Title)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color:
                          isSelectedStyle === data.Title
                            ? COLORS.textSecondaryClr
                            : COLORS.textTertiaryClr,
                      }}
                    >
                      {data.Title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : (
            <View
              style={{
                padding: 16,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 75,
                  paddingBottom: 10,
                }}
              >
                {StyleTShirtData.slice(0, 3).map((data, index) => (
                  <Pressable key={index} onPress={() => setSelectedStyle(data.Title)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color:
                          isSelectedStyle === data.Title
                            ? COLORS.textSecondaryClr
                            : COLORS.textTertiaryClr,
                      }}
                    >
                      {data.Title}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  gap: 128,
                  paddingRight: 30,
                  paddingBottom: 10,
                }}
              >
                {StyleTShirtData.slice(3, 6).map((data, index) => (
                  <Pressable key={index} onPress={() => setSelectedStyle(data.Title)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color:
                          isSelectedStyle === data.Title
                            ? COLORS.textSecondaryClr
                            : COLORS.textTertiaryClr,
                      }}
                    >
                      {data.Title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
        >
          <Pressable
            onPress={animate}
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
        </View>
      </Animated.View>

      <View style={styles.selectStyleTShirt}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.selectStyle360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>
    </View>
  )
}

const SelectText = styled.Text`
  font-size: 12px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

export default SelectStyle

const styles = StyleSheet.create({
  selectStyleContainer: {
    flex: 1,
    // paddingVertical: 10,
    backgroundColor: '#FFEFFF',
  },

  selectStyleNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 16,
  },
  selectStyleDropdown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectStyleTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 64,
  },
  selectStyle360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
