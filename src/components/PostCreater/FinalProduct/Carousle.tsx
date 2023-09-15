import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import Slick from 'react-native-slick'
import UndrawGiftBox from '../../../assets/icons/Undraw-gift-box'
import { COLORS } from '../../../styles/theme'

const Carousle = () => {
  return (
    <Slick
      style={styles.wrapper}
      showsButtons={false}
      dotStyle={{ width: 4, height: 4, backgroundColor: COLORS.slickDotClr }}
      activeDotStyle={{ backgroundColor: COLORS.textSecondaryClr, width: 12, height: 4 }}
    >
      <View style={styles.slide1}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.slide2}>
        <Image
          style={{ objectFit: 'cover', width: 400, height: 400 }}
          source={require('../../../assets/images/monkey-nft.png')}
        />
      </View>
      <View style={styles.slide3}>
        <UndrawGiftBox width={248} height={200} />
        <View style={{ paddingVertical: 16 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontFamily: 'Arvo-Regular',
              color: COLORS.textClr,
            }}
          >
            Upload Your
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontFamily: 'Arvo-Regular',
              color: COLORS.textSecondaryClr,
            }}
          >
            Gift unboxing video
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontFamily: 'Arvo-Regular',
              color: COLORS.textClr,
            }}
          >
            here!
          </Text>
        </View>
        <Pressable style={styles.button}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'Gilroy-Regular',
              color: COLORS.textSecondaryClr,
            }}
          >
            Upload
          </Text>
        </Pressable>
      </View>
    </Slick>
  )
}

export default Carousle

const styles = StyleSheet.create({
  wrapper: {
    height: 500,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    borderColor: COLORS.textSecondaryClr,
    borderWidth: 1,
    borderRadius: 50,
    width: 250,
    paddingVertical: 12,
    opacity: 0.4,
  },
})
