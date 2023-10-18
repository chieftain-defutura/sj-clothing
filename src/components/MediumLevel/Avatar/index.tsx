import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import Gender from './Gender'
import Skintone from './Skintone'
import { COLORS, gradientOpacityColors } from '../../../styles/theme'
import Animated, { FadeInUp, FadeOut, FadeOutDown } from 'react-native-reanimated'
import { WebView } from 'react-native-webview'

const { height, width } = Dimensions.get('window')
const Avatar: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const [isGender, setGender] = useState('')
  return (
    <ScrollView style={styles.avatarContainer}>
      <LinearGradient colors={gradientOpacityColors} style={styles.genderWrapper}>
        <Animated.View
          entering={FadeInUp.duration(800)}
          exiting={FadeOut}
          style={styles.genderWrapper}
        >
          <Text style={styles.title}>Create your avatar.</Text>
          {/* <Image style={styles.image} source={require('../../../assets/images/girl-modal.png')} /> */}
          <View style={{ width: width / 1.1, height: height / 2 }}>
            <WebView
              source={{
                uri: 'https://sj-threejs-development.netlify.app/',
              }}
              style={{ flex: 1 }}
            />
          </View>
        </Animated.View>
      </LinearGradient>

      {toggle && (
        <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
          <Skintone isGender={isGender} setToggle={setToggle} />
        </Animated.View>
      )}

      {!toggle && (
        <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
          <Gender setToggle={setToggle} isGender={isGender} setGender={setGender} />
        </Animated.View>
      )}
    </ScrollView>
  )
}

export default Avatar

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    backgroundColor: COLORS.iconsNormalClr,
  },
  genderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: COLORS.textClr,
    paddingHorizontal: 76,
    paddingVertical: 16,
    fontFamily: 'Arvo-Regular',
  },
  image: {
    paddingTop: 16,
  },
})
