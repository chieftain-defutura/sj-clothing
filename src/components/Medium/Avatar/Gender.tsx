import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'
import { useTranslation } from 'react-i18next'

interface IGender {
  isGender: string
  setGender: React.Dispatch<React.SetStateAction<string>>
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  data: { uid: string; animationFinished?: boolean } | null
}

const { width, height } = Dimensions.get('window')

const GenderData = [
  { gender: 'male', image: require('../../../assets/logo/boyImage.png') },
  { gender: 'female', image: require('../../../assets/logo/girlImage.png') },
]

const Gender: React.FC<IGender> = ({ setToggle, isGender, setGender, data }) => {
  const { t } = useTranslation('avatar')
  return (
    <View style={styles.genderContainer}>
      <Text style={styles.bottomTitle}>1.{t('select your gender')}.</Text>

      <View style={styles.bottomWrapper}>
        <View style={styles.genderButtonWrapper}>
          {GenderData.map((gender, index) => (
            <View
              key={index}
              style={{
                width: width / 1.2,
                height: height / 3.4,
                borderColor: isGender === gender.gender ? COLORS.textSecondaryClr : '#FFF',
                borderWidth: 1,
                borderRadius: 30,
                marginVertical: 14,
              }}
            >
              <TouchableOpacity
                onPress={() => setGender(gender.gender)}
                style={styles.genderButton}
              >
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={gender.image}
                    style={{ width: width / 1.8, height: height / 3.8 }}
                  />
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color:
                          isGender === gender.gender ? COLORS.textSecondaryClr : COLORS.textRGBAClr,
                      },
                    ]}
                  >
                    {t(gender.gender)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View>
        <CustomButton
          text={`${t('next')}`}
          variant='primary'
          fontFamily='Arvo-Regular'
          fontSize={16}
          // disabled={!data?.animationFinished}
          onPress={() => setToggle(true)}
          style={{ width: width, paddingHorizontal: 24, marginTop: 18 }}
        />
      </View>
    </View>
  )
}

export default Gender

const styles = StyleSheet.create({
  genderContainer: {
    flex: 1,
  },

  bottomWrapper: {
    // padding: 24,
  },
  bottomTitle: {
    color: COLORS.textClr,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Arvo-Regular',
  },
  genderButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  genderButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Arvo-Regular',
    marginTop: 28,
    fontSize: 16,
  },
})
