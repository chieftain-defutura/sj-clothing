import React from 'react'
import { View, Image, Dimensions, Pressable } from 'react-native'
import { IAccessory } from '../../constant/types'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import { SharedElement } from 'react-navigation-shared-element'
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated'
import { userStore } from '../../store/userStore'

const { width, height } = Dimensions.get('window')

interface IAccessoryCard {
  data: IAccessory
  setProductId: React.Dispatch<React.SetStateAction<string>>
  setOpenCard: React.Dispatch<React.SetStateAction<boolean>>
}

const AccessIAccessoryCard: React.FC<IAccessoryCard> = ({ data, setOpenCard, setProductId }) => {
  const rate = userStore((state) => state.rate)
  const currency = userStore((state) => state.currency)

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: width / 2.2,
        height: height / 3.2,
        marginLeft: 8,
        marginBottom: 18,
      }}
    >
      <View style={{ marginTop: 10 }}>
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
                    style={{ width: width / 2.6, height: height / 4, resizeMode: 'contain' }}
                    alt={data.productName}
                  />
                </ImageContainer>
              </SharedElement>
            </Animated.View>
          </Pressable>
          <View style={{ alignItems: 'center', marginTop: 14 }}>
            <ProductText allowFontScaling={false}>{data.productName}</ProductText>
            <FlexContent>
              <PriceText allowFontScaling={false}>
                {rate ? (Number(data.normalPrice) * (rate as number)).toFixed(2) : data.normalPrice}
              </PriceText>
              <PriceText allowFontScaling={false}>{currency ? currency.symbol : '₹'}</PriceText>
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

export default AccessIAccessoryCard
