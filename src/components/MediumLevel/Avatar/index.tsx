import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import Gender from './Gender'
import Skintone from './Skintone'
import { COLORS, gradientOpacityColors } from '../../../styles/theme'
import Animated, { FadeInUp, FadeOut, FadeOutDown } from 'react-native-reanimated'
import { WebView } from 'react-native-webview'

const { height, width } = Dimensions.get('window')

interface IAvatar {
  path?: string
}
const Avatar: React.FC<IAvatar> = ({ path }) => {
  const [toggle, setToggle] = useState(false)
  const [isGender, setGender] = useState('')
  return (
    <LinearGradient colors={gradientOpacityColors} style={styles.genderWrapper}>
      <ScrollView>
        <View>
          <Animated.View
            entering={FadeInUp.duration(800)}
            exiting={FadeOut}
            style={styles.genderWrapper}
          >
            <Text style={styles.title}>Create your avatar.</Text>
            {/* <Image style={styles.image} source={require('../../../assets/images/girl-modal.png')} /> */}
            <View
              style={{
                width: width / 1,
                height: height / 2,
                paddingBottom: 1,
              }}
            >
              <WebView
                source={{
                  uri: 'https://sj-threejs-development.netlify.app/',
                }}
              />
            </View>
          </Animated.View>

          {toggle && (
            <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
              <Skintone path={path} isGender={isGender} setToggle={setToggle} />
            </Animated.View>
          )}

          {!toggle && (
            <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
              <Gender setToggle={setToggle} isGender={isGender} setGender={setGender} />
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Avatar

const styles = StyleSheet.create({
  genderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
