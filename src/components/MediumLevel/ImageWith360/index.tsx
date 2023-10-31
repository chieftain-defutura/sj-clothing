import React from 'react'
import Animated from 'react-native-reanimated'
import { StyleSheet, Image, View } from 'react-native'
// import ThreeSixtyDegree from '../../../assets/icons/360-degree'

const ImageWithThreeSixty = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <View style={[styles.tShirt]}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      {/* <View style={styles.threeSixtyDegree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View> */}
    </View>
  )
}

export default ImageWithThreeSixty

const styles = StyleSheet.create({
  tShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: -1,
  },
  threeSixtyDegree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
