import React from 'react'
import { View, ScrollView, Pressable } from 'react-native'
import { CartComponentProps } from '../constant/types'
import styled from 'styled-components/native'
import { COLORS } from '../styles/theme'
import CircleClose from '../assets/icons/CircleClose'

const CartCard: React.FC<CartComponentProps> = ({ cartData, closedItems, handleClose }) => {
  return (
    <CartPageContent>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cartData.map((item, index) => {
          const isItemClosed = closedItems.includes(index)
          return (
            <View key={index}>
              {!isItemClosed && (
                <CartPageContainer>
                  <View>
                    <TShirtImage source={item.image} />
                  </View>
                  <View>
                    <ProductWrapper>
                      <View style={{ marginBottom: 16 }}>
                        <ProductText>{item.product}</ProductText>
                        <ProductShirtText>{item.productName}</ProductShirtText>
                      </View>
                      <Pressable onPress={() => handleClose(index)}>
                        <CircleClose width={20} height={20} />
                      </Pressable>
                    </ProductWrapper>
                    <ProductSizes>
                      <ProductStyle>
                        <ProductText>{item.size}</ProductText>
                        <ProductShirtText>{item.sizeCm}</ProductShirtText>
                      </ProductStyle>
                      <ProductStyle>
                        <ProductText>{item.style}</ProductText>
                        <ProductShirtText>{item.styleName}</ProductShirtText>
                      </ProductStyle>
                    </ProductSizes>
                    <ProductSizes>
                      <ProductStyle style={{ marginTop: 16 }}>
                        <ProductText>{item.price}</ProductText>
                        <ProductShirtText>{item.priceInr}</ProductShirtText>
                      </ProductStyle>
                    </ProductSizes>
                  </View>
                </CartPageContainer>
              )}
            </View>
          )
        })}
      </ScrollView>
    </CartPageContent>
  )
}

const CartPageContent = styled.View`
  padding-horizontal: 24px;
  flex: 1;
  justify-content: center;
  align-items: center;
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
  width: 80px;
  height: 80px;
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
