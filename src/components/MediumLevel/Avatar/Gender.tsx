import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'

const GenderData = ['Male', 'Female']
interface IGender {
  isGender: string
  setGender: React.Dispatch<React.SetStateAction<string>>
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}
const Gender: React.FC<IGender> = ({ setToggle, isGender, setGender }) => {
  return (
    <View style={styles.genderContainer}>
      <View style={styles.bottomWrapper}>
        <Text style={styles.bottomTitle}>1.Select Your Gender.</Text>
        <View style={styles.genderButtonWrapper}>
          {GenderData.map((gender, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setGender(gender)}
              style={[
                styles.genderButton,
                {
                  borderColor: isGender === gender ? COLORS.textSecondaryClr : COLORS.textRGBAClr,
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: isGender === gender ? COLORS.textSecondaryClr : COLORS.textRGBAClr },
                ]}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <CustomButton
          text='Next'
          variant='primary'
          fontFamily='Arvo-Regular'
          fontSize={16}
          style={{ paddingTop: 32 }}
          onPress={() => setToggle(true)}
        />
      </View>
    </View>
  )
}

export default Gender

const styles = StyleSheet.create({
  genderContainer: { flex: 1 },

  bottomWrapper: {
    padding: 24,
  },
  bottomTitle: {
    color: COLORS.textClr,
    fontSize: 20,
    textAlign: 'center',
  },
  genderButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 12,
    gap: 8,
  },
  genderButton: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: 110,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Arvo-Regular',
  },
})
