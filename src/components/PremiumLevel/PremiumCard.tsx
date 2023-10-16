import React from 'react'
import { View, Image, Dimensions, Pressable } from 'react-native'
import { IPremiumData } from '../../constant/types'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import { SharedElement } from 'react-navigation-shared-element'
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')

interface IPremiumCard {
  data: IPremiumData
  setProductId: React.Dispatch<React.SetStateAction<string>>
  setOpenCard: React.Dispatch<React.SetStateAction<boolean>>
}

const PremiumCard: React.FC<IPremiumCard> = ({ data, setOpenCard, setProductId }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: 'red',
        borderColor: '#E5CEF5',
        elevation: 3,
        shadowColor: '#52006A',
        // borderWidth: 1,
        width: width / 2.2,
        height: height / 3,
        marginLeft: 8,
        marginBottom: 18,
      }}
    >
      <View style={{ marginTop: 30 }}>
        <View>
          <Pressable
            onPress={() => {
              setOpenCard(true), setProductId(data.id)
            }}
          >
            <Animated.View entering={FadeInLeft.duration(800).delay(200)} exiting={FadeOutLeft}>
              <SharedElement id={`test${data.productImage}`}>
                <ImageContainer>
                  <Image
                    source={{
                      uri: data.productImage,
                    }}
                    style={{ width: width / 2.6, height: height - 640, resizeMode: 'cover' }}
                  />
                </ImageContainer>
              </SharedElement>
            </Animated.View>
          </Pressable>
          <View style={{ alignItems: 'center', marginTop: 14 }}>
            <ProductText>{data.productName}</ProductText>
            <FlexContent>
              <PriceText>{data.normalPrice}</PriceText>
              <PriceText>INR</PriceText>
            </FlexContent>
          </View>
        </View>
      </View>
    </View>
    //</LinearGradient>
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
