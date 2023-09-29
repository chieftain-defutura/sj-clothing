import React, { useState } from 'react'
import { StyleSheet, Pressable, Share, Image, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { PremiumDetailsData } from '../../utils/data/premiumDetailsData'
import LeftArrow from '../../assets/icons/LeftArrow'
import ShareArrow from '../../assets/icons/ShareArrow'
import { COLORS, FONT_FAMILY, gradientColors } from '../../styles/theme'
import PlayCircleIcon from '../../assets/icons/PremiumPageIcon/PlayCircle'
import { Svg, Circle } from 'react-native-svg'
import CustomButton from '../Button'
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated'

interface IPremiumDetails {
  navigation: any
}

const PremiumDetails: React.FC<IPremiumDetails> = ({ navigation }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const url = 'https://www.youtube.com/watch?v=lTxn2BuqyzU'
  const share = async () => {
    try {
      const result = await Share.share({ message: 'Bug:' + `\n` + url })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with active type', result.activityType)
        } else {
          console.log('shared')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#FFEFFF', '#FFF']}
      // colors={gradientColors}
      style={styles.linearGradient}
    >
      <FlexContent>
        <Pressable
          onPress={() => {
            navigation.goBack()
          }}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          {() => (
            <IconHoverClr
              style={{ backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.5)' : 'transparent' }}
            >
              <IconHoverPressable>
                <LeftArrow width={24} height={24} />
              </IconHoverPressable>
            </IconHoverClr>
          )}
        </Pressable>
        <Pressable onPress={share}>
          <ShareArrow width={24} height={24} />
        </Pressable>
      </FlexContent>
      {PremiumDetailsData.map((f, index) => {
        return (
          <PremiumDetailsWrapper key={index}>
            <PremiumDetailsContent>
              <Animated.View entering={FadeInLeft.duration(800).delay(200)} exiting={FadeOutLeft}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PremiumThreeSixtyDegreePage')}
                >
                  <Image
                    source={f.image}
                    style={{ width: 196, height: 320, resizeMode: 'cover' }}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View entering={FadeInRight.duration(800).delay(200)} exiting={FadeOutRight}>
                <View>
                  <ProductText>{f.product}</ProductText>
                  <ProductName>{f.productName}</ProductName>
                  <View style={{ marginVertical: 16 }}>
                    <ProductText>{f.size}</ProductText>
                    <ProductName>{f.productSize}</ProductName>
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <ProductText>{f.material}</ProductText>
                    <ProductName>{f.wool}</ProductName>
                    <ProductName>{f.mohair}</ProductName>
                  </View>
                  <ProductText>{f.price}</ProductText>
                  <View
                    style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}
                  >
                    <OldPriceText>
                      {f.oldPrice} {f.inr}
                    </OldPriceText>
                    <View>
                      <ProductName>
                        {f.newPrice} {f.inr}
                      </ProductName>
                    </View>
                  </View>
                  <WatchVideoBorder>
                    <PlayCircleIcon width={12} height={12} />
                    <WatchVideoText>Watch video</WatchVideoText>
                  </WatchVideoBorder>
                </View>
              </Animated.View>
            </PremiumDetailsContent>
            {/* <CustomButton
              text='Add more'
              fontFamily='Arvo-Regular'
              fontSize={12}
              onPress={() => navigation.navigate('PremiumThreeSixtyDegreePage')}
              style={{ marginBottom: 30 }}
            /> */}

            {showDetails && (
              <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOut}>
                <View>
                  <DetailsHeading>Detailed features</DetailsHeading>
                  {f.detailsPara.map((para, paraIndex) => (
                    <View
                      key={paraIndex}
                      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
                    >
                      <Svg width={8} height={8}>
                        <Circle cx={3} cy={3} r={3} fill='rgba(70, 45, 133, 0.6)' />
                      </Svg>
                      <DetailsParaText style={{ marginLeft: 8 }}>{para}</DetailsParaText>
                    </View>
                  ))}
                </View>
              </Animated.View>
            )}
          </PremiumDetailsWrapper>
        )
      })}
      <Animated.View entering={FadeInUp.duration(2000)} exiting={FadeOut}>
        <Btns>
          {showDetails ? (
            <HideDetailsBorder onPress={() => setShowDetails(false)}>
              <HideDetailsText>Hide details</HideDetailsText>
            </HideDetailsBorder>
          ) : (
            <HideDetailsBorder onPress={() => setShowDetails(true)}>
              <HideDetailsText>View details</HideDetailsText>
            </HideDetailsBorder>
          )}
          <CustomButton
            text='Buy Now'
            fontFamily='Arvo-Regular'
            fontSize={13}
            style={{ width: 170 }}
            onPress={() => navigation.navigate('Checkout')}
          />
        </Btns>
      </Animated.View>
    </LinearGradient>
  )
}

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

const IconHoverClr = styled.View`
  border-radius: 20px;
  width: 32px;
  height: 32px;
`

const Btns = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 4px;
`

const DetailsHeading = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-bottom: 8px;
`

const PremiumDetailsWrapper = styled.View``

const PremiumDetailsContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`

const DetailsParaText = styled.Text`
  font-size: 12px;
  color: rgba(70, 45, 133, 0.6);
  letter-spacing: -0.24px;
  line-height: 16px;
  font-family: ${FONT_FAMILY.GilroyRegular};
`

const ProductText = styled.Text`
  font-size: 10px;
  font-family: ${FONT_FAMILY.MontserratRegular};
  color: ${COLORS.SecondaryTwo};
`

const WatchVideoBorder = styled.Pressable`
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.textSecondaryClr};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding-vertical: 8px;
  margin-top: 16px;
`

const HideDetailsBorder = styled.TouchableOpacity`
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.textSecondaryClr};
  padding-vertical: 12px;
  padding-horizontal: 20px;
  width: 170px;
`

const ProductName = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-top: 4px;
`
const WatchVideoText = styled.Text`
  font-size: 10px;
  color: ${COLORS.textSecondaryClr};
`

const HideDetailsText = styled.Text`
  color: ${COLORS.textSecondaryClr};
  font-size: 13px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  text-align: center;
`

const OldPriceText = styled.Text`
  font-size: 13px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.SecondaryTwo};
  text-decoration-line: line-through;
  margin-top: 4px;
`

export default PremiumDetails

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
  },
})
