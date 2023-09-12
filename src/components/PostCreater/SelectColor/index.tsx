import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'

const Colors = ['white', 'violet', 'blue', 'red', 'orange', 'green']

interface ISelectColor {
  navigation: any
}

const SelectColor: React.FC<ISelectColor> = ({ navigation }) => {
  const [isSelected, setSelected] = useState(false)
  const [isSelectedColor, setSelectedColor] = useState('white')
  return (
    <View style={styles.selectColorContainer}>
      {!isSelected ? (
        <View style={styles.selectColorNavigator}>
          <Pressable onPress={() => navigation.navigate('Style')}>
            <Image source={require('../../../assets/images/arrow-circle-left.png')} />
          </Pressable>
          <Pressable onPress={() => setSelected(true)} style={styles.selectColorDropdown}>
            <Text>Select Color</Text>
            <DropDownArrowIcon />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('AddImage')}>
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
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
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
                  gap: 20,
                  paddingVertical: 20,
                }}
              >
                {Colors.map((color, index) => (
                  <Pressable onPress={() => setSelectedColor(color)} key={index}>
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 50,
                        borderColor: COLORS.borderClr,
                        borderWidth: 2,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: `${color}`,
                          width: 40,
                          height: 40,
                          borderRadius: 50,
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
              onPress={() => setSelected(false)}
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
    // padding: 16,
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
