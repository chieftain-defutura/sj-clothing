import React, { useState } from 'react'
import { Pressable, Share, View, Text } from 'react-native'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import LeftArrow from '../../../../../assets/icons/LeftArrow'
import ShareArrow from '../../../../../assets/icons/ShareArrow'
import ThreeSixtyDegree from '../../../../../assets/icons/360-degree'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../../../styles/theme'
import CustomButton from '../../../../../components/Button'

interface IPostDetails {
  navigation: any
}

const ProductData = [
  {
    product: 'Product',
    productName: 'Black blazer',
  },
  {
    product: 'Style',
    productName: 'Round neck',
  },
  {
    product: 'Quantity',
    productName: 'x1',
  },
  {
    product: 'Material',
    productName: '70% Wool, 30% Mohair',
  },
  {
    product: 'Lining',
    productName: '100% Silk',
  },
  {
    product: 'Price',
    productName: '450 INR',
  },
]

const PostDetails: React.FC<IPostDetails> = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false)

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
    <LinearGradient colors={gradientOpacityColors}>
      <Animated.View
        entering={SlideInRight.duration(500).delay(200)}
        exiting={SlideOutRight.duration(500).delay(200)}
      >
        <ScrollViewContent>
          <View>
            <FlexContent>
              <GoBackArrowContent
                onPress={() => {
                  navigation.goBack()
                }}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
              >
                {() => (
                  <IconHoverClr
                    style={{
                      backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.5)' : 'transparent',
                    }}
                  >
                    <IconHoverPressable>
                      <LeftArrow width={24} height={24} />
                    </IconHoverPressable>
                  </IconHoverClr>
                )}
              </GoBackArrowContent>
              <Pressable onPress={share}>
                <ShareArrow />
              </Pressable>
            </FlexContent>
            <TShirtImageWrapper>
              <TShirtImage source={require('../../../../../assets/images/t-shirt.png')} />
              <ThreeSixtyDegreeImage>
                <ThreeSixtyDegree width={40} height={40} />
              </ThreeSixtyDegreeImage>
            </TShirtImageWrapper>
            <Content>
              <Head>#Round neck</Head>
              <Para>
                Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus ,
                eleifend tellus augue lec.
              </Para>

              <Container>
                <Row>
                  {ProductData.slice(0, 3).map((f, index) => (
                    <Column key={index}>
                      <ProductText>{f.product}</ProductText>
                      <ProductName>{f.productName}</ProductName>
                    </Column>
                  ))}
                </Row>

                <Row>
                  {ProductData.slice(3, 6).map((f, index) => (
                    <Column key={index}>
                      <ProductText>{f.product}</ProductText>
                      <ProductName>{f.productName}</ProductName>
                    </Column>
                  ))}
                </Row>
              </Container>
            </Content>
          </View>
        </ScrollViewContent>
        <CustomButton
          variant='primary'
          text='Buy now'
          fontFamily='Arvo-Regular'
          fontSize={16}
          onPress={() => navigation.navigate('Checkout')}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            backgroundColor: 'rgba(145, 177, 225, 0.2)',
            padding: 16,
          }}
        />
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
`
const FlexContent = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`
const TShirtImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const IconHoverClr = styled.View`
  border-radius: 20px;
  width: 32px;
  height: 32px;
`
const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 3px;
`

const TShirtImage = styled.Image`
  width: 350px;
  height: 350px;
  flex-shrink: 0;
  margin-top: 6px;
`
const ThreeSixtyDegreeImage = styled.View`
  margin-top: 18px;
  margin-bottom: 8px;
`
const Content = styled.View`
  padding: 16px;
  margin-bottom: 58px;
`

const Head = styled.Text`
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  letter-spacing: -0.28px;
  font-family: ${FONT_FAMILY.GilroySemiBold};
  margin-bottom: 4px;
`

const Para = styled.Text`
  color: rgba(70, 45, 133, 0.6);
  letter-spacing: -0.24px;
  font-family: ${FONT_FAMILY.GilroyRegular};
  line-height: 16px;
  font-size: 12px;
`
const Container = styled.View`
  flex-direction: column;
  align-items: center;
  margin-vertical: 16px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  gap: 32px;
`
const Column = styled.View`
  flex: 1;
`

const ProductText = styled.Text`
  text-align: left;
  font-size: 11px;
  font-family: ${FONT_FAMILY.MontserratRegular};
  color: ${COLORS.SecondaryTwo};
`
const ProductName = styled.Text`
  font-family: ${FONT_FAMILY.ArvoRegular};
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  margin-top: 4px;
`

export default PostDetails
