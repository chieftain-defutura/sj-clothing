import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../../styles/theme'
import Animated, { FadeInUp, FadeOut, SlideInRight, SlideOutRight } from 'react-native-reanimated'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import FaqPlusIcon from '../../../../assets/icons/AccountPageIcon/PlusIcon'
import MinusIcon from '../../../../assets/icons/AccountPageIcon/MinusIcon'
import { FAQData } from '../../../../utils/data/FAQData'
import { useTranslation } from 'react-i18next'

interface IFAQ {
  navigation: any
}

const FAQ: React.FC<IFAQ> = ({ navigation }) => {
  const { t } = useTranslation('account')
  const [expandedFAQIndex, setExpandedFAQIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    if (expandedFAQIndex === index) {
      setExpandedFAQIndex(null)
    } else {
      setExpandedFAQIndex(index)
    }
  }

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
              <CartText allowFontScaling={false}>{t('Help & FAQ')}</CartText>
            </GoBackArrowContent>
            {FAQData.map((f, index) => (
              <View key={index} style={{ marginHorizontal: 16 }}>
                <FAQBox onPress={() => toggleFAQ(index)}>
                  <FAQHead allowFontScaling={false}>{f.heading}</FAQHead>
                  {expandedFAQIndex === index ? (
                    <MinusIcon width={14} height={14} />
                  ) : (
                    <FaqPlusIcon width={14} height={14} />
                  )}
                </FAQBox>
                {expandedFAQIndex === index && (
                  <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOut}>
                    <FAQParaBox>
                      <FlexBox>
                        <FAQHead allowFontScaling={false}>{f.title}</FAQHead>
                      </FlexBox>
                      <Paragraph allowFontScaling={false}>{f.description}</Paragraph>
                    </FAQParaBox>
                  </Animated.View>
                )}
              </View>
            ))}
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
  margin-bottom: 14px;
`
const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

const FAQHead = styled.Text`
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  font-size: 12px;
`

const Paragraph = styled.Text`
  font-size: 12px;
  line-height: 18px;
  color: ${COLORS.SecondaryTwo};
  font-family: ${FONT_FAMILY.GilroyRegular};
`

const FlexBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const FAQBox = styled.Pressable`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
  padding-horizontal: 16px;
  border-radius: 5px;
  background: ${COLORS.iconsNormalClr};
  elevation: 6;
  margin-bottom: 16px;
`

const FAQParaBox = styled.View`
  border-color: ${COLORS.iconsNormalClr};
  border-width: 1px;
  padding-vertical: 12px;
  padding-horizontal: 16px;
  border-radius: 5px;
  margin-bottom: 16px;
`

export default FAQ
