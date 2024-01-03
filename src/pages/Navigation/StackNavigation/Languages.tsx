import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styled from 'styled-components/native'
import LanguageGrayIcon from '../../../assets/icons/AccountPageIcon/LanguageGrayIcon'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import { userStore } from '../../../store/userStore'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import LeftArrow from '../../../assets/icons/LeftArrow'
import LanguageTooltip from '../../../components/Tooltips/LanguageTooltip'
import { tooltipDisableStore } from '../../../store/TooltipDisable'

const { width } = Dimensions.get('window')

const LanguagesData = [
  { language: 'Chinese Mandarian', lang: 'ch', text: '中文普通话' },
  { language: 'Chinese yue', lang: 'zh', text: 'Çin yue' },
  { language: 'Danish', lang: 'da', text: 'dansk' },
  { language: 'Dutch', lang: 'du', text: 'Nederlands' },
  { language: 'English', lang: 'en', text: 'English' },
  { language: 'French', lang: 'fr', text: 'Français' },
  { language: 'German', lang: 'de', text: 'Deutsch' },
  { language: 'Greek', lang: 'ge', text: 'Ελληνικά' },
  { language: 'Indonesia', lang: 'in', text: 'Indonesia' },
  { language: 'Italian', lang: 'it', text: 'Italiana' },
  { language: 'Japanese', lang: 'ja', text: '日本語' },
  { language: 'Korean', lang: 'ko', text: '한국인' },
  { language: 'Latin', lang: 'la', text: 'Latinus' },
  { language: 'Polish', lang: 'po', text: 'Polski' },
  { language: 'Portuguese', lang: 'por', text: 'Português' },
  { language: 'Russian', lang: 'ru', text: 'Русский' },
  { language: 'Spanish', lang: 'es', text: 'Española' },
  { language: 'Standard Arabic', lang: 'ar', text: 'اللغة العربية الفصحى' },
  { language: 'Tamil', lang: 'ta', text: 'தமிழ்' },
  { language: 'Turkish', lang: 'tu', text: 'Türkçe' },
  { language: 'Ukrainian', lang: 'uk', text: 'українська' },
]

const Languages: React.FC = () => {
  const { i18n } = useTranslation()
  const { t } = useTranslation('language')
  const user = userStore((state) => state.user)
  const language = userStore((state) => state.language)
  const updateLanguage = userStore((state) => state.updateLanguage)
  const confirmDetails = userStore((state) => state.confirmDetails)
  const [isDropdownSizesOpen, setIsDropdownSizesOpen] = useState<boolean>(false)
  const navigation = useNavigation()
  const [toolTip, showToolTip] = useState(false)
  const updateDisable = tooltipDisableStore((state) => state.updateDisable)

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showLanguageTooltip')

      if (data !== '13') {
        updateDisable(false)
        setTimeout(() => {
          AsyncStorage.setItem('showLanguageTooltip', '13')
          updateDisable(true)
          showToolTip(true)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  const toggleDropdownSizes = () => {
    setIsDropdownSizesOpen((prevState) => !prevState)
  }
  const changeLanguage = async (lng: string) => {
    await AsyncStorage.setItem('language', lng)
    i18n.changeLanguage(lng as string)
    updateLanguage(lng as string)
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        language: lng,
      })
    }
  }

  return (
    <>
      {!confirmDetails ? (
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 25,
          }}
        >
          <Text allowFontScaling={false} style={styles.title}>
            {t('Choose Your Language')}
          </Text>
          <LanguageGrayIcon width={190} height={190} />
          <View style={{ width: 208, paddingTop: 14 }}>
            <SelectContent onPress={toggleDropdownSizes}>
              <Text allowFontScaling={false} style={styles.selectText}>
                {LanguagesData.find((f) => f.lang === language)?.text}
              </Text>

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
                  <ScrollView style={{ height: 200 }}>
                    {LanguagesData.filter((f) => f.lang !== language).map((f: any, i: number) => (
                      <Pressable
                        key={i}
                        onPress={() => [
                          updateLanguage(f.lang),
                          toggleDropdownSizes(),
                          changeLanguage(f.lang),
                        ]}
                      >
                        <Text allowFontScaling={false} style={styles.selectListText}>
                          {f.text}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </SelectDropDownList>
              </Animated.View>
            )}
          </View>
          {/* <LanguageTooltip
            isVisible={toolTip}
            onClose={() => {
              showToolTip(false)
            }}
          /> */}
        </View>
      ) : (
        <LinearGradient
          colors={gradientOpacityColors}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              flexDirection: 'row',
              marginTop: 10,
              marginLeft: 6,
              gap: 8,
            }}
          >
            <GoBackArrowContent
              onPress={() => {
                navigation.goBack()
              }}
              activeOpacity={0.6}
              underlayColor='rgba(70, 45, 133, 0.2)'
              style={{ borderRadius: 100 }}
            >
              <IconHoverClr>
                <IconHoverPressable>
                  <LeftArrow width={24} height={24} style={{ marginBottom: -44 }} />
                </IconHoverPressable>
              </IconHoverClr>
            </GoBackArrowContent>
            <Text
              allowFontScaling={false}
              style={[styles.title, { fontSize: 28, width: width / 1.3, textAlign: 'center' }]}
            >
              {t('Choose Your Language')}
            </Text>
          </View>
          <LanguageGrayIcon width={190} height={190} />
          <View style={{ width: 208, paddingTop: 14 }}>
            <SelectContent onPress={toggleDropdownSizes}>
              <Text allowFontScaling={false} style={styles.selectText}>
                {LanguagesData.find((f) => f.lang === language)?.text}
              </Text>
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
                  <ScrollView style={{ height: 240 }}>
                    {LanguagesData.filter((f) => f.lang !== language).map((f: any, i: number) => (
                      <Pressable
                        key={i}
                        onPress={() => [
                          updateLanguage(f.lang),
                          toggleDropdownSizes(),
                          changeLanguage(f.lang),
                        ]}
                      >
                        <Text allowFontScaling={false} style={styles.selectListText}>
                          {f.text}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </SelectDropDownList>
              </Animated.View>
            )}
          </View>
        </LinearGradient>
      )}
    </>
  )
}

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

const GoBackArrowContent = styled.TouchableHighlight`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-left: -8px;
`
const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

const IconHoverClr = styled.View`
  width: 50px;
  height: 50px;
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`

export default Languages

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    color: COLORS.textClr,
    fontFamily: FONT_FAMILY.ArvoRegular,
    paddingBottom: 24,
    marginTop: 8,
    textAlign: 'center',
  },
  selectText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.ArvoRegular,
    color: COLORS.textSecondaryClr,
    lineHeight: 18,
  },
  selectListText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.ArvoRegular,
    color: COLORS.textTertiaryClr,
    paddingHorizontal: 12,
    paddingVertical: 8,
    lineHeight: 18,
  },
})
