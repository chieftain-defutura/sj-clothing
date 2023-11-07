import React from 'react'
import { View } from 'react-native'
import { CartComponentProps } from '../constant/types'
import styled from 'styled-components/native'
import { COLORS } from '../styles/theme'
import CircleClose from '../assets/icons/CircleClose'

const CartCard: React.FC<CartComponentProps> = ({ cartData, closedItems, handleClose }) => {
  return (
    <CartPageContent>
      <View>
        <CartPageContainer>
          <View>
            <TShirtImage source={{ uri: cartData.productImage }} />
          </View>
          <View>
            <ProductWrapper>
              <View style={{ marginBottom: 16 }}>
                <ProductText>Product</ProductText>
                <ProductShirtText>{cartData.productName}</ProductShirtText>
              </View>
              {/* <Pressable onPress={() => handleClose(index)}>
                        <CircleClose width={20} height={20} />
                      </Pressable> */}
            </ProductWrapper>
            {/* <ProductSizes> */}
            {/* <ProductStyle> */}
            {/* <ProductText>Size</ProductText> */}
            {/* <ProductShirtText>
                  {size} - {measurement}
                </ProductShirtText> */}
            {/* </ProductStyle> */}
            {/* <ProductStyle>
                        <ProductText>{item.style}</ProductText>
                        <ProductShirtText>{item.styleName}</ProductShirtText>
                      </ProductStyle> */}
            {/* </ProductSizes> */}

            <ProductStyle style={{ marginTop: 6 }}>
              <ProductText>Price</ProductText>
              <ProductShirtText>
                {cartData.normalPrice}
                {cartData.offerPrice} INR
              </ProductShirtText>
            </ProductStyle>
            {/* </ProductSizes> */}
          </View>
        </CartPageContainer>
      </View>
    </CartPageContent>
  )
}

const CartPageContent = styled.View`
  padding-horizontal: 24px;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: -120px;
`

const ProductStyle = styled.View``

const CartPageContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  padding-vertical: 16px;
`

const TShirtImage = styled.Image`
  width: 140px;
  height: 120px;
  flex-shrink: 0;
  object-fit: contain;
`

const ProductWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 88px;
`

const ProductSizes = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`

const ProductText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
  font-size: 12px;
  text-transform: uppercase;
`

const ProductShirtText = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

export default CartCard
