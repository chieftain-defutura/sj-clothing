import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Gender from './Gender'
import Skintone from './Skintone'
import { COLORS } from '../../../styles/theme'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

interface IAvatart {
  setToggleAvatar: React.Dispatch<React.SetStateAction<boolean>>
}
const Avatar: React.FC<IAvatart> = ({ setToggleAvatar }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <ScrollView style={styles.avatarContainer}>
      <Animated.View
        entering={FadeIn.duration(8000)}
        exiting={FadeOut}
        style={styles.genderWrapper}
      >
        <View>
          <Text style={styles.title}>Create your avatar.</Text>
          <Image style={styles.image} source={require('../../../assets/images/girl-modal.png')} />
        </View>
      </Animated.View>
      {!toggle ? (
        <Gender setToggle={setToggle} />
      ) : (
        <Skintone setToggle={setToggle} setToggleAvatar={setToggleAvatar} />
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
    backgroundColor: COLORS.backgroundClr,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: COLORS.textClr,
    paddingHorizontal: 76,
    paddingBottom: 16,
  },
  image: {
    paddingTop: 16,
  },
})
