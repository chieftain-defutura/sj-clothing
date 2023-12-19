import React from 'react'
import { View, Image, Dimensions, Pressable } from 'react-native'
import { IPremiumData } from '../../constant/types'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import { SharedElement } from 'react-navigation-shared-element'
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated'
import { userStore } from '../../store/userStore'

const { width, height } = Dimensions.get('window')

interface IPremiumCard {
  data: IPremiumData
  setSize: React.Dispatch<
    React.SetStateAction<{
      country: string
      sizeVarient: {
        quantity: number
        size: string
        measurement: string
      }
    }>
  >
  setProductId: React.Dispatch<React.SetStateAction<string>>
  setOpenCard: React.Dispatch<React.SetStateAction<boolean>>
}

const PremiumCard: React.FC<IPremiumCard> = ({ data, setOpenCard, setProductId, setSize }) => {
  const rate = userStore((state) => state.rate)
  const currency = userStore((state) => state.currency)

  return (
    <View
      style={{
        width: width / 1,
        height: height / 3.1,
        marginVertical: 18,
      }}
    >
      <View>
        <Pressable
          onPress={() => {
            setOpenCard(true),
              setProductId(data.id),
              setSize((prevState) => ({
                ...prevState,
                country: '',
              }))
          }}
        >
          <Animated.View entering={FadeInLeft.duration(800).delay(200)} exiting={FadeOutLeft}>
            <SharedElement id={`test${data.productImage}`}>
              <ImageContainer>
                <Image
                  source={{
                    uri: data.productImage,
                  }}
                  style={{ width: width / 2.6, height: height / 4, resizeMode: 'cover' }}
                  alt={data.productName}
                />
              </ImageContainer>
            </SharedElement>
          </Animated.View>
        </Pressable>
        <View style={{ alignItems: 'center', marginTop: 14 }}>
          <ProductText
            allowFontScaling={false}
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              width: width / 2.3,
              textAlign: 'center',
              paddingHorizontal: 4,
            }}
          >
            {data.productName}
          </ProductText>
          <FlexContent>
            <PriceText allowFontScaling={false}>
              {rate ? (Number(data.normalPrice) * (rate as number)).toFixed(2) : data.normalPrice}
            </PriceText>
            <PriceText allowFontScaling={false}>{currency ? currency.symbol : '₹'}</PriceText>
          </FlexContent>
        </View>
      </View>
    </View>
  )
}

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1px;
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
  font-size: 14px;
  font-family: ${FONT_FAMILY.GilroySemiBold};
`

export default PremiumCard
