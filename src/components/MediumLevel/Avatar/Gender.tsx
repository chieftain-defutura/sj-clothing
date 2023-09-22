import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'

const GenderData = ['Male', 'Female', 'Other']
interface IGender {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}
const Gender: React.FC<IGender> = ({ setToggle }) => {
  const [isGender, setGender] = useState('Male')
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
                  borderColor:
                    isGender === gender ? COLORS.textSecondaryClr : COLORS.backgroundSecondaryClr,
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: isGender === gender ? COLORS.textSecondaryClr : COLORS.slickDotClr },
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
          style={{ paddingTop: 56 }}
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
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  genderButton: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: 120,
  },
  buttonText: {
    textAlign: 'center',
  },
})
