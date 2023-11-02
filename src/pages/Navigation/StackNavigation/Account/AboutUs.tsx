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
              <CartText>{t('About us')}</CartText>
            </GoBackArrowContent>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../../../assets/images/AccountImage/aboutusImg.png')}
                style={{ width: width - 32, height: 218, resizeMode: 'cover', borderRadius: 10 }}
              />
            </View>
            <View style={{ padding: 16 }}>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris.
              </Paragraph>
              <Paragraph style={{ marginVertical: 8 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Paragraph>
              <Paragraph>
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
`
const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
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
  text-align: justify;
`

export default AboutUs
