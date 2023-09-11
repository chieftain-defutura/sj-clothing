import React from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, View } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CircleClose from '../../../assets/icons/CircleClose'
import CustomButton from '../../../components/Button'
import LeftArrow from '../../../assets/icons/LeftArrow'

const data = [
  {
    image: require('../../../assets/images/t-shirt.png'),
    product: 'Product',
    productName: 'purple ape t-shirt',
    size: 'size',
    sizeCm: 'L-40cm',
    style: 'style',
    styleName: 'Half sleeve',
    price: 'price',
    priceInr: '450 INR',
  },
  {
    image: require('../../../assets/images/t-shirt.png'),
    product: 'Product',
    productName: 'purple ape t-shirt',
    size: 'size',
    sizeCm: 'L-40cm',
    style: 'style',
    styleName: 'Half sleeve',
    price: 'price',
    priceInr: '450 INR',
  },
]

const CartPage: React.FC = () => {
  const navigation = useNavigation()
  return (
    <CartPageWrapper>
      <GoBackArrowContent
        onPress={() => {
          navigation.goBack()
        }}
      >
        <LeftArrow width={24} height={24} />
        <CartText>Cart</CartText>
      </GoBackArrowContent>
      <CartPageContent>
        <ScrollView>
          {data.map((f, index) => {
            return (
              <View key={index}>
                <CartPageContainer>
                  <View>
                    <TShirtImage source={f.image} />
                  </View>
                  <View>
                    <ProductWrapper>
                      <View>
                        <ProductText>{f.product}</ProductText>
                        <ProductShirtText>{f.productName}</ProductShirtText>
                      </View>
                      <View>
                        <CircleClose width={20} height={20} />
                      </View>
                    </ProductWrapper>
                    <ProductSizes>
                      <ProductStyle>
                        <ProductText>{f.size}</ProductText>
                        <ProductShirtText>{f.sizeCm}</ProductShirtText>
                      </ProductStyle>
                      <ProductStyle>
                        <ProductText>{f.style}</ProductText>
                        <ProductShirtText>{f.styleName}</ProductShirtText>
                      </ProductStyle>
                    </ProductSizes>
                    <ProductSizes>
                      <ProductStyle>
                        <ProductText>{f.price}</ProductText>
                        <ProductShirtText style={{ marginBottom: 16 }}>
                          {f.priceInr}
                        </ProductShirtText>
                      </ProductStyle>
                    </ProductSizes>
                  </View>
                </CartPageContainer>
              </View>
            )
          })}

          <CustomBtn>
            <CustomButton variant='primary' text='Check out' />
          </CustomBtn>
        </ScrollView>
      </CartPageContent>
    </CartPageWrapper>
  )
}

const CartPageWrapper = styled.View`
  background: ${COLORS.backgroundClr};
  height: 100%;
`

const CustomBtn = styled.View``

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

const CartPageContent = styled.View`
  padding-vertical: 16px;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const ProductSizes = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
`

const ProductStyle = styled.View``

const ProductWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 82px;
`

const CartPageContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 16px;
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  margin-bottom: 16px;

  &:last-child {
    border-bottom-width: 0;
  }
`

const TShirtImage = styled.Image`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
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

export default CartPage
