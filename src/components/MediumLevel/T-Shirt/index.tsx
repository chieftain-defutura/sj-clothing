import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'

const TShirt: React.FC = () => {
  return (
    <View>
      <View style={[styles.selectSizeTShirt]}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.selectSize360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>
    </View>
  )
}

export default TShirt

const styles = StyleSheet.create({
  selectSizeTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: -100,
  },
  selectSize360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
