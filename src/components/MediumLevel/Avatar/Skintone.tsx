import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'

import CustomButton from '../../Button'
import { COLORS } from '../../../styles/theme'

interface ISkintone {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  setToggleAvatar: React.Dispatch<React.SetStateAction<boolean>>
}
const Skintone: React.FC<ISkintone> = ({ setToggle, setToggleAvatar }) => {
  return (
    <View style={styles.SkintoneContainer}>
      <View style={styles.bottomWrapper}>
        <Text style={styles.bottomTitle}>1.Select Your Skintone.</Text>
        <View style={styles.SkintoneButtonWrapper}>
          <CustomButton
            text='Previous'
            variant='primary'
            style={{ paddingTop: 56, width: 180 }}
            onPress={() => setToggle(false)}
          />
          <CustomButton
            onPress={() => setToggleAvatar(true)}
            text='Done'
            variant='primary'
            style={{ paddingTop: 56, width: 180 }}
          />
        </View>
      </View>
    </View>
  )
}

export default Skintone

const styles = StyleSheet.create({
  SkintoneContainer: { flex: 1 },

  bottomWrapper: {
    padding: 24,
  },
  bottomTitle: {
    color: COLORS.textClr,
    fontSize: 20,
    textAlign: 'center',
  },
  SkintoneButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
})
