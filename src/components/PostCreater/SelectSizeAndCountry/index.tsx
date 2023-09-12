import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'

interface ISelectSizeAndColor {
  navigation: any
}
const SelectSizeAndColor: React.FC<ISelectSizeAndColor> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 64 }}
      >
        <Image source={require('../../../assets/images/imaged-tshirt.png')} />
      </View>
      <View style={styles.SelectSizeAndColor360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>
    </View>
  )
}

export default SelectSizeAndColor

const styles = StyleSheet.create({
  SelectSizeAndColor360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
