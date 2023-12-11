import React from 'react'
import { Image, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../../styles/theme'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import { RoyaltiesData } from '../../../../utils/data/RoyaltiesData'

interface IRoyalties {
  navigation: any
}

const Royalties: React.FC<IRoyalties> = ({ navigation }) => {
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
              <CartText allowFontScaling={false}>Royalties</CartText>
            </GoBackArrowContent>
          </View>
          <View>
            <RoyaltiesContent>
              <Paragraph allowFontScaling={false}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </Paragraph>
              <FlexContent>
                <View>
                  <RoyalHead allowFontScaling={false}>TOTAL EARNED ROYALTIES</RoyalHead>
                  <RoyalInr allowFontScaling={false}>3600 INR</RoyalInr>
                </View>
                <View>
                  <RoyalHead allowFontScaling={false}>TOTAL EARNED ROYALTIES</RoyalHead>
                  <RoyalInr allowFontScaling={false}>5%</RoyalInr>
                </View>
              </FlexContent>
            </RoyaltiesContent>
            <RoyaltiesContainer>
              {RoyaltiesData.map((f, index) => (
                <FlexBox key={index}>
                  <View>
                    <TShirtImg source={f.image} alt={f.product} />
                  </View>
                  <View>
                    <View>
                      <RoyalHead allowFontScaling={false}>{f.product}</RoyalHead>
                      <RoyalInr allowFontScaling={false}>
                        {f.productPrice} {f.inr}
                      </RoyalInr>
                    </View>
                    <View style={{ marginTop: 16 }}>
                      <RoyalHead allowFontScaling={false}>{f.royalties}</RoyalHead>
                      <RoyalInr allowFontScaling={false}>{f.royaltiesPercentage}</RoyalInr>
                    </View>
                  </View>
                  <View>
                    <View>
                      <RoyalHead allowFontScaling={false}>{f.totalSale}</RoyalHead>
                      <RoyalInr allowFontScaling={false}>{f.total}</RoyalInr>
                    </View>
                    <View style={{ marginTop: 16 }}>
                      <RoyalHead allowFontScaling={false}>{f.royaltiesInr}</RoyalHead>
                      <RoyalInr allowFontScaling={false}>
                        {f.royaltiesPrice} {f.inr}
                      </RoyalInr>
                    </View>
                  </View>
                </FlexBox>
              ))}
            </RoyaltiesContainer>
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

const RoyaltiesContainer = styled.View`
  margin-top: 24px;
  padding-horizontal: 16px;
`

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`
const RoyalInr = styled.Text`
  color: ${COLORS.iconsHighlightClr};
  font-family: ${FONT_FAMILY.GilroyMedium};
  font-size: 14px;
  margin-top: 4px;
`

const FlexBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  padding-vertical: 16px;
`

const TShirtImg = styled.Image`
  width: 78px;
  height: 78px;
`

const RoyalHead = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  color: ${COLORS.SecondaryTwo};
  font-family: ${FONT_FAMILY.GilroyRegular};
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

const RoyaltiesContent = styled.View`
  background-color: rgba(70, 45, 133, 0.1);
  padding-vertical: 12px;
  padding-horizontal: 16px;
  border-radius: 5px;
  margin-horizontal: 16px;
`

const Paragraph = styled.Text`
  font-family: ${FONT_FAMILY.GilroyRegular};
  color: ${COLORS.SecondaryTwo};
  font-size: 12px;
  line-height: 18px;
`

export default Royalties
