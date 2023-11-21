import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'
import { useTranslation } from 'react-i18next'
import WebView from 'react-native-webview'
import { userStore } from '../../../store/userStore'

interface IGender {}

const { width, height } = Dimensions.get('window')

const GenderData = [
  { gender: 'male', image: `https://sj-threejs-development.netlify.app/male` },
  { gender: 'female', image: `https://sj-threejs-development.netlify.app/female` },
]

const Gender: React.FC<IGender> = ({}) => {
  const { t } = useTranslation('avatar')
  const { updateAvatar, avatar } = userStore()
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
                height: height / 3.8,

                marginVertical: 14,
              }}
            >
              <TouchableOpacity
                onPress={() => updateAvatar({ gender: gender.gender as string, skinTone: '' })}
                style={styles.genderButton}
              >
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* <Image
                    source={gender.image}
                    style={{ width: width / 1.8, height: height / 4.3 }}
                  /> */}
                  <View
                    style={{
                      width: width / 1.3,
                      height: height / 4,
                      borderColor:
                        avatar.gender === gender.gender ? COLORS.textSecondaryClr : '#FFF',
                      borderWidth: 1,
                      borderRadius: 30,
                      backgroundColor: 'transparent',
                      overflow: 'hidden',
                    }}
                  >
                    <WebView
                      style={{
                        backgroundColor: 'transparent',
                      }}
                      source={{
                        // uri: `http://localhost:5173/midlevel/?uid=${uid}`,
                        uri: gender.image,
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color:
                          avatar.gender === gender.gender
                            ? COLORS.textSecondaryClr
                            : COLORS.textRGBAClr,
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
    </View>
  )
}

export default Gender

const styles = StyleSheet.create({
  genderContainer: {
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    marginTop: 8,
    fontSize: 16,
  },
})
