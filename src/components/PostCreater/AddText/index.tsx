import { StyleSheet, Text, View, Image, Touchable, Pressable } from 'react-native'
import React from 'react'
import { COLORS } from '../../../styles/theme'

interface IAddText {
  navigation: any
}

const AddText: React.FC<IAddText> = ({ navigation }) => {
  return (
    <View style={styles.AddTextContainer}>
      <View style={styles.AddTextNavigator}>
        <Pressable onPress={() => navigation.navigate('AddImage')}>
          <Image source={require('../../../assets/images/arrow-circle-left.png')} />
        </Pressable>
        <View style={styles.AddTextDropdown}>
          <Text>Add Text</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('AddText')}>
          <Image source={require('../../../assets/images/arrow-circle-right.png')} />
        </Pressable>
      </View>
      <View style={styles.AddTextTShirt}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.AddText360Degree}>
        <Image source={require('../../../assets/images/360-degree.png')} />
      </View>
    </View>
  )
}

export default AddText

const styles = StyleSheet.create({
  AddTextContainer: {
    padding: 16,
  },
  AddTextNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AddTextDropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  AddTextTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 64,
  },
  AddText360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
