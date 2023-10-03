import { StyleSheet, Text, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import Gender from './Gender'
import Skintone from './Skintone'
import { COLORS, gradientColors } from '../../../styles/theme'
import Animated, { FadeInUp, FadeOut, FadeOutDown } from 'react-native-reanimated'

interface IAvatart {
  setToggleAvatar: React.Dispatch<React.SetStateAction<boolean>>
}
const Avatar: React.FC<IAvatart> = ({ setToggleAvatar }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <ScrollView style={styles.avatarContainer}>
      <LinearGradient colors={gradientColors} style={styles.genderWrapper}>
        <Animated.View
          entering={FadeInUp.duration(800)}
          exiting={FadeOut}
          style={styles.genderWrapper}
        >
          <Text style={styles.title}>Create your avatar.</Text>
          <Image style={styles.image} source={require('../../../assets/images/girl-modal.png')} />
        </Animated.View>
      </LinearGradient>

      {toggle && (
        <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
          <Skintone setToggle={setToggle} setToggleAvatar={setToggleAvatar} />
        </Animated.View>
      )}

      {!toggle && (
        <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
          <Gender setToggle={setToggle} />
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
