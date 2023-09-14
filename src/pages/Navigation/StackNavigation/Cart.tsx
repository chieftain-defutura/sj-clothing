import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ScrollView, View, Pressable } from 'react-native'
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
    image: require('../../../assets/images/t-shirt-two.png'),
    product: 'Product',
    productName: 'Formal plain shirt',
    size: 'size',
    sizeCm: 'L-40cm',
    style: 'style',
    styleName: 'Half sleeve',
    price: 'price',
    priceInr: '900 INR',
  },
  {
    image: require('../../../assets/images/t-shirt-two.png'),
    product: 'Product',
    productName: 'Formal plain shirt',
    size: 'size',
    sizeCm: 'L-40cm',
    style: 'style',
    styleName: 'Half sleeve',
    price: 'price',
    priceInr: '900 INR',
  },
  {
    image: require('../../../assets/images/t-shirt-two.png'),
    product: 'Product',
    productName: 'Formal plain shirt',
    size: 'size',
    sizeCm: 'L-40cm',
    style: 'style',
    styleName: 'Half sleeve',
    price: 'price',
    priceInr: '900 INR',
  },
  {
    image: require('../../../assets/images/t-shirt-two.png'),
    product: 'Product',
    productName: 'Formal plain shirt',
    size: 'size',
    sizeCm: 'L-40cm',
    style: 'style',
    styleName: 'Half sleeve',
    price: 'price',
    priceInr: '900 INR',
  },
  {
    image: require('../../../assets/images/t-shirt-two.png'),
    product: 'Product',
    productName: 'Formal plain shirt',
    size: 'size',
    sizeCm: 'L-40cm',
    style: 'style',
    styleName: 'Half sleeve',
    price: 'price',
    priceInr: '900 INR',
  },
  {
    image: require('../../../assets/images/t-shirt-two.png'),
    product: 'Product',
    productName: 'Formal plain shirt',
    size: 'size',
    sizeCm: 'L-40cm',
    style: 'style',
    styleName: 'Half sleeve',
    price: 'price',
    priceInr: '900 INR',
  },
]

interface ICartPage {
  navigation: any
}

const CartPage: React.FC<ICartPage> = ({ navigation }) => {
  const [closedItems, setClosedItems] = useState<number[]>([])

  const handleClose = (index: number) => {
    setClosedItems([...closedItems, index])
  }

  return (
    <View style={{ height: '100%' }}>
      <ScrollViewContent style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
        <View>
          <GoBackArrowContent
            onPress={() => {
              navigation.goBack()
            }}
          >
            <LeftArrow width={24} height={24} />
            <CartText>Cart</CartText>
          </GoBackArrowContent>
          <CartPageContent>
            <ScrollView showsVerticalScrollIndicator={false}>
              {data.map((f, index) => {
                const isItemClosed = closedItems.includes(index)
                return (
                  <View key={index}>
                    {!isItemClosed && (
                      <CartPageContainer>
                        <View>
                          <TShirtImage source={f.image} />
                        </View>
                        <View>
                          <ProductWrapper>
                            <View style={{ marginBottom: 16 }}>
                              <ProductText>{f.product}</ProductText>
                              <ProductShirtText>{f.productName}</ProductShirtText>
                            </View>
                            <Pressable onPress={() => handleClose(index)}>
                              <CircleClose width={20} height={20} />
                            </Pressable>
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
                            <ProductStyle style={{ marginTop: 16 }}>
                              <ProductText>{f.price}</ProductText>
                              <ProductShirtText>{f.priceInr}</ProductShirtText>
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
        </View>
      </ScrollViewContent>
      <CustomButton
        variant='primary'
        text='Check out'
        fontFamily='Arvo-Regular'
        fontSize={16}
        onPress={() => navigation.navigate('Checkout')}
        style={{ position: 'absolute', bottom: 32, width: '90%', alignSelf: 'center' }}
      />
    </View>
  )
}

const ScrollViewContent = styled.ScrollView`
  background: ${COLORS.backgroundClr};
  height: 100%;
  position: absolute;
`

const CustomBtn = styled.View`
  margin-top: 80px;
`

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
  padding-horizontal: 24px;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const ProductSizes = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`

const ProductStyle = styled.View``

const ProductWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 90px;
`

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
