import React, { useState } from 'react'
import { Pressable, Share, View } from 'react-native'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../styles/theme'
import LeftArrow from '../../assets/icons/LeftArrow'
import ShareArrow from '../../assets/icons/ShareArrow'
import CustomButton from '../Button'
import { IPostData } from '../../constant/types'

interface IPostDetails {
  selectedPost: IPostData | null
  onClose: () => void
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

const PostDetails: React.FC<IPostDetails> = ({ selectedPost, onClose }) => {
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
                  onClose()
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
              <TShirtImage
                source={{ uri: selectedPost?.productImage }}
                alt='post-details-img'
                style={{ resizeMode: 'contain' }}
              />
              {/* <ThreeSixtyDegreeImage>
                <ThreeSixtyDegree width={40} height={40} />
              </ThreeSixtyDegreeImage> */}
            </TShirtImageWrapper>
            <Content>
              {/* <Head allowFontScaling={false}>#Round neck</Head>
              <Para allowFontScaling={false}>
                Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus ,
                eleifend tellus augue lec.
              </Para> */}

              <Head allowFontScaling={false}>{selectedPost?.style}</Head>
              <Para allowFontScaling={false}>{selectedPost?.description}</Para>

              <Container>
                <Row>
                  <Column>
                    <ProductText allowFontScaling={false}>Product</ProductText>
                    <ProductName allowFontScaling={false}>{selectedPost?.productName}</ProductName>
                  </Column>
                  <Column>
                    <ProductText allowFontScaling={false}>Style</ProductText>
                    <ProductName allowFontScaling={false}>{selectedPost?.style}</ProductName>
                  </Column>
                  <Column>
                    <ProductText allowFontScaling={false}>Quantity</ProductText>
                    <ProductName allowFontScaling={false}>{selectedPost?.productName}</ProductName>
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <ProductText allowFontScaling={false}>Gender</ProductText>
                    <ProductName allowFontScaling={false}>{selectedPost?.gender}</ProductName>
                  </Column>
                  <Column>
                    <ProductText allowFontScaling={false}>Size</ProductText>
                    {Array.isArray(selectedPost?.sizes?.sizeVarient) ? (
                      selectedPost?.sizes?.sizeVarient.map((sizeData, index) => (
                        <ProductName key={index} allowFontScaling={false}>
                          {sizeData.size}
                        </ProductName>
                      ))
                    ) : (
                      <ProductName allowFontScaling={false}>
                        {selectedPost?.sizes?.sizeVarient?.size || '-'}
                      </ProductName>
                    )}
                  </Column>
                  <Column>
                    <ProductText allowFontScaling={false}>Price</ProductText>
                    <ProductName allowFontScaling={false}>{selectedPost?.price}</ProductName>
                  </Column>
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
  text-transform: capitalize;
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
  text-transform: capitalize;
`

export default PostDetails
