// import React, { useState } from 'react'
// import { View } from 'react-native'
// import styled from 'styled-components/native'
// import { LinearGradient } from 'expo-linear-gradient'
// import { COLORS, gradientOpacityColors } from '../../../../styles/theme'
// import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
// import LeftArrow from '../../../../assets/icons/LeftArrow'
// import CartCard from '../../../../components/CartCard'
// import { CheckoutData } from '../../../../utils/data/checkoutData'

// interface IAccessories {
//   navigation: any
// }

// const data = [
//   {
//     image: require('../../../../assets/images/t-shirt.png'),
//     product: 'Product',
//     productName: 'purple ape t-shirt',
//     price: 'price',
//     priceInr: '450 INR',
//   },
//   {
//     image: require('../../../../assets/images/t-shirt-two.png'),
//     product: 'Product',
//     productName: 'Formal plain shirt',
//     price: 'price',
//     priceInr: '450 INR',
//   },
// ]

// const Accessories: React.FC<IAccessories> = ({ navigation }) => {
//   const [closedItems, setClosedItems] = useState<number[]>([])

//   const handleClose = (index: number) => {
//     setClosedItems([...closedItems, index])
//   }

//   return (
//     <LinearGradient colors={gradientOpacityColors}>
//       <Animated.View
//         entering={SlideInRight.duration(500).delay(200)}
//         exiting={SlideOutRight.duration(500).delay(200)}
//       >
//         <ScrollViewContent style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
//           <View>
//             <GoBackArrowContent
//               onPress={() => {
//                 navigation.goBack()
//               }}
//             >
//               <LeftArrow width={24} height={24} />
//               <CartText>Accessories</CartText>
//             </GoBackArrowContent>

//             <CardWrapper>
//               {data.map((f, index) => {
//                 return (
//                   <AccessoriesContainer key={index}>
//                     <View>
//                       <TShirtImage source={f.image} />
//                     </View>
//                     <View>
//                       <ProductText>{f.product}</ProductText>
//                       <ProductShirtText>{f.productName}</ProductShirtText>
//                     </View>
//                     <View>
//                       <ProductText>{f.price}</ProductText>
//                       <ProductShirtText>{f.priceInr}</ProductShirtText>
//                     </View>
//                   </AccessoriesContainer>
//                 )
//               })}
//             </CardWrapper>
//           </View>
//         </ScrollViewContent>
//       </Animated.View>
//     </LinearGradient>
//   )
// }

// const ScrollViewContent = styled.ScrollView`
//   height: 100%;
// `
// const GoBackArrowContent = styled.Pressable`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   gap: 8px;
//   padding: 16px;
// `
// const CartText = styled.Text`
//   color: ${COLORS.textClr};
//   font-family: Arvo-Regular;
//   font-size: 20px;
//   letter-spacing: -0.4px;
// `
// const CardWrapper = styled.View``

// const AccessoriesContainer = styled.View`
//   display: flex;
//   align-item: center;
//   flex-direction: row;
//   justify-content: center;
//   gap: 42px;
//   padding-vertical: 18px;
// `

// const TShirtImage = styled.Image`
//   width: 80px;
//   height: 80px;
//   flex-shrink: 0;
//   object-fit: contain;
// `

// const ProductText = styled.Text`
//   color: ${COLORS.SecondaryTwo};
//   font-family: Gilroy-Regular;
//   font-size: 12px;
//   text-transform: uppercase;
// `
// const ProductShirtText = styled.Text`
//   font-size: 14px;
//   font-family: Gilroy-Medium;
//   color: ${COLORS.iconsHighlightClr};
// `

// export default Accessories

import React from 'react'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { View, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import { COLORS, gradientOpacityColors } from '../../../../styles/theme'
import ChevronLeft from '../../../../assets/icons/ChevronLeft'

interface IAccessories {
  navigation: any
}

const data = [
  {
    image: require('../../../../assets/images/t-shirt.png'),
    product: 'Product',
    productName: 'purple ape t-shirt',
    price: 'price',
    priceInr: '450 INR',
  },
  {
    image: require('../../../../assets/images/t-shirt-two.png'),
    product: 'Product',
    productName: 'Formal plain shirt',
    price: 'price',
    priceInr: '450 INR',
  },
]

const Accessories: React.FC<IAccessories> = ({ navigation }) => {
  return (
    <LinearGradient colors={gradientOpacityColors}>
      <Animated.View
        entering={SlideInRight.duration(500).delay(200)}
        exiting={SlideOutRight.duration(500).delay(200)}
      >
        <ScrollViewContent>
          <View>
            <GoBackArrowContent
              onPress={() => {
                navigation.goBack()
              }}
            >
              <LeftArrow width={24} height={24} />
              <CartText>Accessories</CartText>
            </GoBackArrowContent>
            <CartPageContent>
              {data.map((f, index) => {
                return (
                  <Pressable key={index} onPress={() => navigation.navigate('TrackOrder')}>
                    <CartPageContainer>
                      <View>
                        <TShirtImage source={f.image} />
                      </View>
                      <View>
                        <ProductWrapper>
                          <View>
                            <ProductText>{f.product}</ProductText>
                            <ProductShirtText>{f.productName}</ProductShirtText>
                            <StatusText>{f.price}</StatusText>
                            <ProductShirtText>{f.priceInr}</ProductShirtText>
                          </View>
                          <Pressable>
                            <ChevronLeft width={16} height={16} />
                          </Pressable>
                        </ProductWrapper>
                      </View>
                    </CartPageContainer>
                  </Pressable>
                )
              })}
            </CartPageContent>
          </View>
        </ScrollViewContent>
      </Animated.View>
    </LinearGradient>
  )
}

const ScrollViewContent = styled.ScrollView`
  height: 100%;
`

const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
`

const StatusText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 16px;
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

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

const ProductWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 95px;
`

const TShirtImage = styled.Image`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  object-fit: contain;
`

const CartPageContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 16px;
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  padding-vertical: 24px;
`

const CartPageContent = styled.View`
  padding-horizontal: 24px;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default Accessories
