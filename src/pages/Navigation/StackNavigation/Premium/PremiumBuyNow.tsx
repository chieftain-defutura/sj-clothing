import React from 'react'
import { Pressable, Share, View, Image } from 'react-native'
import styled from 'styled-components/native'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import ShareArrow from '../../../../assets/icons/ShareArrow'
import { COLORS, FONT_FAMILY } from '../../../../styles/theme'
import CustomButton from '../../../../components/Button'
import { PremiumBuynowData } from '../../../../utils/data/premiumBuynow'

interface IPremiumBuyNow {
  navigation: any
}

const PremiumBuyNow: React.FC<IPremiumBuyNow> = ({ navigation }) => {
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
    <PremiumBuyNowWrapper>
      <FlexContent>
        <Pressable
          onPress={() => {
            navigation.goBack()
          }}
        >
          <LeftArrow width={24} height={24} />
        </Pressable>
        <Pressable onPress={share}>
          <ShareArrow width={24} height={24} />
        </Pressable>
      </FlexContent>
      {PremiumBuynowData.map((f, index) => {
        return (
          <View key={index}>
            <ImageCenterPosition>
              <Image source={f.image} style={{ resizeMode: 'cover' }} />
            </ImageCenterPosition>
            <View style={{ padding: 16 }}>
              <RowContainer>
                <View>
                  <ProductText>{f.product}</ProductText>
                  <ProductName>{f.productName}</ProductName>
                </View>
                <View>
                  <ProductText>{f.style}</ProductText>
                  <ProductName>{f.styleName}</ProductName>
                </View>
                <View>
                  <ProductText>{f.quantity}</ProductText>
                  <ProductName>{f.quantityPrice}</ProductName>
                </View>
              </RowContainer>
              <RowContainer style={{ paddingVertical: 16 }}>
                <View>
                  <ProductText>{f.material}</ProductText>
                  <ProductName>{f.materialWool}</ProductName>
                  <ProductName>{f.materialMohair}</ProductName>
                </View>
                <View>
                  <ProductText>{f.lining}</ProductText>
                  <ProductName>{f.liningSilk}</ProductName>
                </View>
                <View>
                  <ProductText>{f.priceHeading}</ProductText>
                  <ProductName>
                    {f.price} {f.inr}
                  </ProductName>
                </View>
              </RowContainer>
              <CustomButton
                text='Buy Now'
                fontFamily='Arvo-Regular'
                fontSize={16}
                style={{ marginTop: 6 }}
              />
            </View>
          </View>
        )
      })}
    </PremiumBuyNowWrapper>
  )
}

const PremiumBuyNowWrapper = styled.ScrollView`
  background: ${COLORS.backgroundClr};
  padding: 16px;
`

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ImageCenterPosition = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ProductText = styled.Text`
  font-family: ${FONT_FAMILY.MontserratRegular};
  font-size: 10px;
  color: ${COLORS.SecondaryTwo};
`

const ProductName = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-top: 4px;
`

export default PremiumBuyNow
