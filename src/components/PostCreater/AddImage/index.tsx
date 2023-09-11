import { StyleSheet, Text, View, Image, Touchable, Pressable } from 'react-native'
import React from 'react'
import { COLORS } from '../../../styles/theme'

interface IAddImage {
  navigation: any
}

const AddImage: React.FC<IAddImage> = ({ navigation }) => {
  return (
    <View style={styles.AddImageContainer}>
      <View style={styles.AddImageNavigator}>
        <Pressable onPress={() => navigation.navigate('Color')}>
          <Image source={require('../../../assets/images/arrow-circle-left.png')} />
        </Pressable>
        <View style={styles.AddImageDropdown}>
          <Text>Add Image</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('AddText')}>
          <Image source={require('../../../assets/images/arrow-circle-right.png')} />
        </Pressable>
      </View>
      <View style={styles.AddImageTShirt}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.AddImage360Degree}>
        <Image source={require('../../../assets/images/360-degree.png')} />
      </View>
    </View>
  )
}

export default AddImage

const styles = StyleSheet.create({
  AddImageContainer: {
    padding: 16,
  },
  AddImageNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AddImageDropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  AddImageTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 64,
  },
  AddImage360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
