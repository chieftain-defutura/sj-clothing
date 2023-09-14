import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'

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
            <ArrowCircleLeft width={24} height={24} />
          </Pressable>
          <Pressable onPress={() => setStyle(true)} style={styles.selectStyleDropdown}>
            <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Select Style</Text>
            <DropDownArrowIcon />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Color')}>
            <ArrowCircleRight width={24} height={24} />
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
                    fontFamily: 'Gilroy-Medium',
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
                    fontFamily: 'Gilroy-Medium',
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
  selectStyleContainer: {},
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
