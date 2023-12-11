import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../../styles/theme'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import { useTranslation } from 'react-i18next'

interface IAboutUs {
  navigation: any
}

const { width } = Dimensions.get('window')

const AboutUs: React.FC<IAboutUs> = ({ navigation }) => {
  const { t } = useTranslation('account')
  return (
    <LinearGradient colors={gradientOpacityColors}>
      <Animated.View
        entering={SlideInRight.duration(500).delay(200)}
        exiting={SlideOutRight.duration(500).delay(200)}
      >
        <ScrollViewContent style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          <View>
            <GoBackArrowContent
              onPress={() => {
                navigation.goBack()
              }}
            >
              <LeftArrow width={24} height={24} />
              <CartText allowFontScaling={false}>{t('About us')}</CartText>
            </GoBackArrowContent>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../../../assets/images/AccountImage/aboutusImg.png')}
                style={{ width: width - 32, height: 218, resizeMode: 'cover', borderRadius: 10 }}
                alt='aboutus-img'
              />
            </View>
            <View style={{ padding: 16 }}>
              <Paragraph allowFontScaling={false}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris.
              </Paragraph>
              <Paragraph allowFontScaling={false} style={{ marginVertical: 8 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Paragraph>
              <Paragraph allowFontScaling={false}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris.
              </Paragraph>
            </View>
          </View>
        </ScrollViewContent>
      </Animated.View>
    </LinearGradient>
  )
}

const ScrollViewContent = styled.ScrollView`
  height: 100%;
  padding-horizontal: 6px;
`
const GoBackArrowContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
  margin-bottom: 14px;
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

const Paragraph = styled.Text`
  font-family: ${FONT_FAMILY.GilroyRegular};
  color: ${COLORS.SecondaryTwo};
  font-size: 12px;
  line-height: 18px;
`

export default AboutUs
