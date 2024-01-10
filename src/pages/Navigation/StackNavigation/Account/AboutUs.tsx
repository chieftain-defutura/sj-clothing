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
                Welcome to Sprinkle Nader, where innovation meets flavor! At Sprinkle Nader, we
                believe in transforming ordinary moments into extraordinary experiences through our
                delectable creations. We are not just a company; we are the architects of sweetness,
                the maestros of taste, and the sprinkle enthusiasts that make every bite a
                celebration.
              </Paragraph>
              <Paragraph allowFontScaling={false} style={{ marginVertical: 8 }}>
                Sprinkle Nader was born out of a simple yet profound idea – to add a dash of joy to
                every day. From our humble beginnings, we've evolved into a brand that stands for
                quality, creativity, and a commitment to delighting taste buds around the world.
              </Paragraph>
              <Paragraph allowFontScaling={false}>
                At the heart of Sprinkle Nader is a mission to redefine the dessert experience. We
                strive to craft confections that not only satisfy cravings but also elevate your
                senses. With a passion for perfection and an unwavering dedication to using the
                finest ingredients, we aim to be the go-to source for those seeking a symphony of
                flavors in every bite.
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
