import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import Animated, {
  BounceInUp,
  BounceOutUp,
  FlipInXDown,
  FlipOutXDown,
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
  const [isDropDown, setDropDown] = useState(false)
  const [isSelectedStyle, setSelectedStyle] = useState('Half sleeve')
  const { setStyle } = PostCreationStore()

  return (
    <View style={styles.selectStyleContainer}>
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
      <Animated.View style={styles.selectStyleNavigator}>
        <Pressable onPress={() => navigation.navigate('Stack')}>
          <ArrowCircleLeft width={24} height={24} />
        </Pressable>
        <Pressable onPress={() => setDropDown(true)} style={styles.selectStyleDropdown}>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Select Style</Text>
          <DropDownArrowIcon />
        </Pressable>
        <Pressable
          onPress={() => {
            setPostCreationSteps(1), setStyle({ title: isType, type: isSelectedStyle })
          }}
        >
          <View>
            <ArrowCircleRight width={24} height={24} />
          </View>
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
        <View style={[styles.selectStyleTShirt]}>
          <Image source={require('../../../assets/images/plain-shirt.png')} />
        </View>
        <View style={styles.selectStyle360Degree}>
          <ThreeSixtyDegree width={40} height={40} />
        </View>
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
    zIndex: -1,
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
    zIndex: -1,
  },
  selectStyle360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
