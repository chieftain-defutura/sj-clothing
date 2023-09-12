import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'

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
  const [isStyle, setStyle] = useState(false)
  const [isType, setType] = useState('shirt')
  const [isSelectedStyle, setSelectedStyle] = useState('Half sleeve')
  return (
    <View style={styles.selectStyleContainer}>
      {!isStyle ? (
        <View style={styles.selectStyleNavigator}>
          <Pressable onPress={() => navigation.navigate('Stack')}>
            <Image source={require('../../../assets/images/arrow-circle-left.png')} />
          </Pressable>
          <Pressable onPress={() => setStyle(true)} style={styles.selectStyleDropdown}>
            <Text>Select Style</Text>
            <DropDownArrowIcon />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Color')}>
            <Image source={require('../../../assets/images/arrow-circle-right.png')} />
          </Pressable>
        </View>
      ) : (
        <View>
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
                padding: 20,
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
                    justifyContent: 'space-around',
                    gap: 105,
                    paddingRight: 30,
                    paddingBottom: 10,
                  }}
                >
                  {StyleShirtData.slice(3, 6).map((data, index) => (
                    <Pressable onPress={() => setSelectedStyle(data.Title)}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color:
                            isSelectedStyle === data.Title
                              ? COLORS.textSecondaryClr
                              : COLORS.textTertiaryClr,
                        }}
                        key={index}
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
                    <Pressable onPress={() => setSelectedStyle(data.Title)}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color:
                            isSelectedStyle === data.Title
                              ? COLORS.textSecondaryClr
                              : COLORS.textTertiaryClr,
                        }}
                        key={index}
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
                    gap: 105,
                    paddingRight: 30,
                    paddingBottom: 10,
                  }}
                >
                  {StyleTShirtData.slice(3, 6).map((data, index) => (
                    <Pressable onPress={() => setSelectedStyle(data.Title)}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color:
                            isSelectedStyle === data.Title
                              ? COLORS.textSecondaryClr
                              : COLORS.textTertiaryClr,
                        }}
                        key={index}
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
              onPress={() => setStyle(false)}
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
        </View>
      )}
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
    // paddingVertical: 10,
    // backgroundColor: 'white',
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
