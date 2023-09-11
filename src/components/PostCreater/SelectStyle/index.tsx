import { StyleSheet, Text, View, Image, Touchable, Pressable } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../styles/theme'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import CloseIcon from '../../../assets/icons/Close'

const StyleData = [
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

interface ISelectStyle {
  navigation: any
}

const SelectStyle: React.FC<ISelectStyle> = ({ navigation }) => {
  const [isStyle, setStyle] = useState(false)
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
        <View
          style={{
            height: 'auto',
          }}
        >
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 20,
              borderBottomColor: COLORS.strokeClr,
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}
          >
            <Text>Shirt</Text>
            <Text>T-shirt</Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
            >
              {StyleData.splice(0, 3).map((f) => (
                <Text>{f.Title}</Text>
              ))}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              {StyleData.splice(0, 3).map((f) => (
                <Text style={{ textAlign: 'center' }}>{f.Title}</Text>
              ))}
            </View>
          </View>
          <Pressable onPress={() => setStyle(false)}>
            <CloseIcon />
          </Pressable> */}
        </View>
      )}
      <View style={styles.selectStyleTShirt}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.selectStyle360Degree}>
        <Image source={require('../../../assets/images/360-degree.png')} />
      </View>
    </View>
  )
}

export default SelectStyle

const styles = StyleSheet.create({
  selectStyleContainer: {
    paddingVertical: 10,
    backgroundColor: 'white',
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
