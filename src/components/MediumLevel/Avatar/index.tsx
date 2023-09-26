import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import Gender from './Gender'
import Skintone from './Skintone'
import { COLORS } from '../../../styles/theme'

interface IAvatart {
  setToggleAvatar: React.Dispatch<React.SetStateAction<boolean>>
}
const Avatar: React.FC<IAvatart> = ({ setToggleAvatar }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.genderWrapper}>
        <View>
          <Text style={styles.title}>Create your avatar.</Text>
          <Image style={styles.image} source={require('../../../assets/images/girl-modal.png')} />
        </View>
      </View>
      {!toggle ? (
        <Gender setToggle={setToggle} />
      ) : (
        <Skintone setToggle={setToggle} setToggleAvatar={setToggleAvatar} />
      )}
    </View>
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
