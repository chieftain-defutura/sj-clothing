import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
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
import { PostCreationStore } from '../../../store/postCreationStore'

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
  setPostCreationSteps: React.Dispatch<React.SetStateAction<number>>
}

const SelectStyle: React.FC<ISelectStyle> = ({ navigation, setPostCreationSteps }) => {
  const [isType, setType] = useState('shirt')
  const height = useSharedValue(0)
  const display = useSharedValue<'none' | 'flex'>('none')
  const [isSelectedStyle, setSelectedStyle] = useState('Half sleeve')
  const { setStyle } = PostCreationStore()
  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    display: display.value,
  }))
  const animate = () => {
    if (height.value === 0) {
      display.value = 'flex' as 'none' | 'flex'
      height.value = withSpring(105)
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
          <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Select Style</Text>
          <DropDownArrowIcon />
        </Pressable>
        <Pressable
          onPress={() => {
            setPostCreationSteps(1), setStyle({ title: isType, type: isSelectedStyle })
          }}
        >
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
            paddingVertical: 5,
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            backgroundColor: COLORS.iconsNormalClr,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            paddingHorizontal: 20,
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
              paddingBottom: 25,
              paddingTop: 15,
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
              <FlatList
                data={StyleShirtData}
                numColumns={3}
                columnWrapperStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexGrow: 1,
                  gap: 5,
                  paddingVertical: 5,
                }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => setSelectedStyle(item.Title)}
                    style={{
                      paddingVertical: 4,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'left',
                        fontFamily: 'Gilroy-Medium',
                        color:
                          isSelectedStyle === item.Title
                            ? COLORS.textSecondaryClr
                            : COLORS.textTertiaryClr,
                      }}
                    >
                      {item.Title}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                padding: 16,
              }}
            >
              <FlatList
                data={StyleTShirtData}
                numColumns={3}
                columnWrapperStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexGrow: 1,
                  gap: 5,
                  paddingVertical: 5,
                }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => setSelectedStyle(item.Title)}
                    style={{
                      paddingVertical: 4,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'left',
                        fontFamily: 'Gilroy-Medium',
                        color:
                          isSelectedStyle === item.Title
                            ? COLORS.textSecondaryClr
                            : COLORS.textTertiaryClr,
                      }}
                    >
                      {item.Title}
                    </Text>
                  </Pressable>
                )}
              />
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

export default SelectStyle

const styles = StyleSheet.create({
  selectStyleContainer: {
    flex: 1,
    backgroundColor: '#FFEFFF',
  },
  selectStyleNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
