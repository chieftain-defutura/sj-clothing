import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../../styles/theme'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import FaqPlusIcon from '../../../../assets/icons/AccountPageIcon/PlusIcon'

interface IFAQ {
  navigation: any
}

const FAQ: React.FC<IFAQ> = ({ navigation }) => {
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
              <CartText>Help & FAQ</CartText>
            </GoBackArrowContent>
            <View>
              <FAQBox>
                <FAQHead>Lorem ipsum dolor sit amet, consectetur?</FAQHead>
                <FaqPlusIcon width={14} height={14} />
              </FAQBox>
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

const FAQHead = styled.Text`
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  font-size: 12px;
`

const FAQBox = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
  padding-horizontal: 16px;
  border-radius: 5px;
  background: #fff;
`

export default FAQ
