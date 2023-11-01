import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import styled from 'styled-components/native'
import LanguageGrayIcon from '../../../assets/icons/AccountPageIcon/LanguageGrayIcon'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import { userStore } from '../../../store/userStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

// const LanguagesData = ['Japanese', 'Chinese', 'Italian', 'Spanish', 'French', 'German', 'English']
const LanguagesData = [
  { language: 'Japanese', lang: 'ja' },
  { language: 'Chinese', lang: 'zh' },
  { language: 'Italian', lang: 'it' },
  { language: 'Spanish', lang: 'es' },
  { language: 'French', lang: 'fr' },
  { language: 'German', lang: 'de' },
  { language: 'English', lang: 'en' },
]

const Languages = () => {
  const { i18n } = useTranslation()
  const { language, updateLanguage } = userStore()
  const { t } = useTranslation('language')
  const [isDropdownSizesOpen, setIsDropdownSizesOpen] = useState<boolean>(false)
  const toggleDropdownSizes = () => {
    setIsDropdownSizesOpen((prevState) => !prevState)
  }
  const changeLanguage = async (lng: string) => {
    await AsyncStorage.setItem('language', lng)
    const getLanguage = await AsyncStorage.getItem('language')
    if (!getLanguage) {
      i18n.changeLanguage('en')
    }
    i18n.changeLanguage(getLanguage as string)
  }

  return (
    <LinearGradient
      colors={gradientOpacityColors}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
      }}
    >
      <Text style={styles.title}>{t('Choose Your Language')}</Text>
      <LanguageGrayIcon width={190} height={190} />
      <View style={{ width: 208, paddingTop: 64 }}>
        <SelectContent onPress={toggleDropdownSizes}>
          <SelectText> {LanguagesData.find((f) => f.lang === language)?.language}</SelectText>
          <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <Path
              d='M5 7.5L10 12.5L15 7.5'
              stroke='#DB00FF'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </Svg>
        </SelectContent>
        {isDropdownSizesOpen && (
          <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
            <SelectDropDownList>
              <View>
                {LanguagesData.filter((f) => f.lang !== language).map((f: any, i: number) => (
                  <Pressable
                    key={i}
                    onPress={() => [
                      updateLanguage(f.lang),
                      toggleDropdownSizes(),
                      changeLanguage(f.lang),
                    ]}
                  >
                    <SelectListText>{f.language}</SelectListText>
                  </Pressable>
                ))}
              </View>
            </SelectDropDownList>
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  )
}

export default Languages

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: COLORS.textClr,
    fontFamily: FONT_FAMILY.ArvoRegular,
    textAlign: 'center',
    paddingBottom: 24,
  },
})

const SelectContent = styled.Pressable`
  border-color: ${COLORS.textSecondaryClr};
  border-width: 1px;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`

const SelectText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.textSecondaryClr};
`
const SelectListText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.textTertiaryClr};
  padding-horizontal: 12px;
  padding-vertical: 7px;
`
