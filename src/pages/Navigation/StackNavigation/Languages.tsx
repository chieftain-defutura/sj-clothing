import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY, gradientColors, gradientOpacityColors } from '../../../styles/theme'
import styled from 'styled-components/native'
import LanguageGrayIcon from '../../../assets/icons/AccountPageIcon/LanguageGrayIcon'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const LanguagesData = ['Japanese', 'Chinese', 'Italian', 'Spanish', 'French', 'German', 'English']

const Languages = () => {
  const [isDropdownSizesOpen, setIsDropdownSizesOpen] = useState<boolean>(false)
  const [language, setLanguage] = useState('English')
  const toggleDropdownSizes = () => {
    setIsDropdownSizesOpen((prevState) => !prevState)
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
      <Text style={styles.title}>Choose your language</Text>
      <LanguageGrayIcon width={190} height={190} />
      <View style={{ width: 208, paddingTop: 64 }}>
        <SelectContent onPress={toggleDropdownSizes}>
          <SelectText>{language}</SelectText>
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
                {LanguagesData.filter((f) => f !== language).map((f: any, i: number) => (
                  <Pressable key={i} onPress={() => [setLanguage(f), toggleDropdownSizes()]}>
                    <SelectListText>{f}</SelectListText>
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
