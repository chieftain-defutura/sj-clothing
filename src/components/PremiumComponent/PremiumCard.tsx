import React from 'react'
import { View, Image, Dimensions, StyleSheet, Pressable } from 'react-native'
import { PremiumCardProps } from '../../constant/types'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { SharedElement } from 'react-navigation-shared-element'
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated'

interface IPremiumCard {
  navigation: any
}

const { width, height } = Dimensions.get('window')

const cardWidth = width / 2
const cardHeight = (height - 180) / 2

const PremiumCard: React.FC<PremiumCardProps & IPremiumCard> = ({
  image,
  productName,
  price,
  inr,
  navigation,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#FFEFFF', '#FFF']}
      // colors={gradientColors}
      style={styles.linearGradient}
    >
      <View style={{ width: cardWidth, height: cardHeight }}>
        <Pressable onPress={() => navigation.navigate('PremiumDetailsCard', { image })}>
          <Animated.View entering={FadeInLeft.duration(800).delay(200)} exiting={FadeOutLeft}>
            <SharedElement id={`test${image}`}>
              <ImageContainer>
                <Image
                  source={image}
                  style={{
                    resizeMode: 'cover',
                    flex: 1,
                    alignSelf: 'center',
                  }}
                />
              </ImageContainer>
            </SharedElement>
          </Animated.View>
        </Pressable>
        <View style={{ alignItems: 'center', marginTop: 14 }}>
          <ProductText>{productName}</ProductText>
          <FlexContent>
            <PriceText>{price}</PriceText>
            <PriceText>{inr}</PriceText>
          </FlexContent>
        </View>
      </View>
    </LinearGradient>
  )
}

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
`

const ImageContainer = styled.View`
  aspect-ratio: 1/1.2;
  overflow: hidden;
`

const ProductText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
`

const PriceText = styled.Text`
  color: ${COLORS.premiumTextClr};
  font-size: 12px;
  font-family: ${FONT_FAMILY.GilroyMedium};
`

export default PremiumCard

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 40,
  },
})
