import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
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

const Colors = ['white', 'violet', 'blue', 'red', 'orange', 'green']

interface ISelectColor {
  navigation: any
}

const SelectColor: React.FC<ISelectColor> = ({ navigation }) => {
  // const [isSelected, setSelected] = useState(false)
  const [isSelectedColor, setSelectedColor] = useState('white')
  const height = useSharedValue(0)
  const display = useSharedValue<'none' | 'flex'>('none')
  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    display: display.value,
  }))
  const animate = () => {
    if (height.value === 0) {
      display.value = 'flex' as 'none' | 'flex'
      height.value = withSpring(165)
    } else {
      height.value = withTiming(0, { duration: 200 })
      setTimeout(() => {
        display.value = 'none'
      }, 200)
    }
  }
  return (
    <View style={styles.selectColorContainer}>
      <View style={styles.selectColorNavigator}>
        <Pressable onPress={() => navigation.navigate('Style')}>
          <ArrowCircleLeft width={24} height={24} />
        </Pressable>
        <Pressable onPress={animate} style={styles.selectColorDropdown}>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Select Color</Text>
          <DropDownArrowIcon />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('AddImage')}>
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
            paddingHorizontal: 15,
          }}
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

      <View style={styles.selectColorTShirt}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.selectColor360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
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
