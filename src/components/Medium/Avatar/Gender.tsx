import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'
import { useTranslation } from 'react-i18next'

interface IGender {
  isGender: string
  setGender: React.Dispatch<React.SetStateAction<string>>
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const { width } = Dimensions.get('window')
const GenderData = ['male', 'female']

const Gender: React.FC<IGender> = ({ setToggle, isGender, setGender }) => {
  const { t } = useTranslation('avatar')
  return (
    <View style={styles.genderContainer}>
      <View style={styles.bottomWrapper}>
        <Text style={styles.bottomTitle}>1.{t('select your gender')}.</Text>
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
                {t(gender)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <CustomButton
          text={`${t('next')}`}
          variant='primary'
          fontFamily='Arvo-Regular'
          fontSize={16}
          onPress={() => setToggle(true)}
          style={{ width: width, paddingHorizontal: 24 }}
        />
      </View>
    </View>
  )
}

export default Gender

const styles = StyleSheet.create({
  genderContainer: {
    // flex: 1,
  },

  bottomWrapper: {
    // padding: 24,
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
    // marginTop: 12,
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