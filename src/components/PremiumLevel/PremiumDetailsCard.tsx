import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  TouchableOpacity,
  Share,
} from 'react-native'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../styles/theme'
import { LinearGradient } from 'expo-linear-gradient'
import LeftArrow from '../../assets/icons/LeftArrow'
import ShareArrow from '../../assets/icons/ShareArrow'
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated'
import PlayCircleIcon from '../../assets/icons/PremiumPageIcon/PlayCircle'
import { Svg, Circle } from 'react-native-svg'
import CustomButton from '../Button'
import { Text } from 'react-native'
import { IPremiumData } from '../../constant/types'
import PremiumVideo from '../../screens/PremiumVideo'

const { height, width } = Dimensions.get('window')

interface IPremiumDetailsCard {
  data: IPremiumData
  isSize: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
    }
  }
  setSize: React.Dispatch<
    React.SetStateAction<{
      country: string
      sizeVarient: {
        size: string
        measurement: string
      }
    }>
  >
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
  handleBack: () => void
}

const PremiumDetailsCard: React.FC<IPremiumDetailsCard> = ({
  data,
  handleBack,
  setSize,
  isSize,
  setOpenDetails,
}) => {
  const navigation = useNavigation()
  const [showDetails, setShowDetails] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [openModal, setOpenModal] = useState(false)

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

  const Sizes = data?.sizes
    .filter((f: any) => f.country === isSize.country)
    .map((f: any) => f.sizeVarients)

  const Description = data.description.split(',')
  return (
    <View style={{ flex: 1, width: width, zIndex: 6 }}>
      <ScrollView>
        <View style={styles.linearGradient}>
          <FlexContent>
            <Pressable
              onPress={handleBack}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              {() => (
                <IconHoverClr
                  style={{ backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.5)' : 'transparent' }}
                >
                  <IconHoverPressable>
                    <LeftArrow width={24} height={24} />
                  </IconHoverPressable>
                </IconHoverClr>
              )}
            </Pressable>
            <Pressable onPress={share}>
              <ShareArrow width={24} height={24} />
            </Pressable>
          </FlexContent>

          <PremiumDetailsWrapper>
            <PremiumDetailsContent>
              <Animated.View entering={FadeInLeft.duration(800).delay(200)} exiting={FadeOutLeft}>
                <TouchableOpacity onPress={() => setOpenDetails(true)}>
                  <Image
                    source={{ uri: data.productImage }}
                    style={{ width: width / 2, height: height * 0.5, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View entering={FadeInRight.duration(800).delay(200)} exiting={FadeOutRight}>
                <View>
                  <ProductText>product</ProductText>
                  <ProductName>{data.productName}</ProductName>
                  <View style={{ marginVertical: 16 }}>
                    {/* <ProductText>{f.size}</ProductText> */}
                    {/* <ProductName>{f.productSize}</ProductName> */}
                  </View>
                  {/* <View style={{ marginBottom: 16 }}>
                        <ProductText>{f.material}</ProductText>
                        <ProductName>{f.wool}</ProductName>
                        <ProductName>{f.mohair}</ProductName>
                      </View> */}
                  {/* <ProductText>{data.normalPrice}</ProductText> */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 6,
                      alignItems: 'center',
                    }}
                  >
                    {!data.offerPrice ? (
                      <>
                        <ProductText>price</ProductText>
                        <ProductName>{data.normalPrice}INR</ProductName>
                      </>
                    ) : (
                      <>
                        <OldPriceText>{data.normalPrice}INR</OldPriceText>
                        <View>
                          <ProductName>{data.offerPrice}INR</ProductName>
                        </View>
                      </>
                    )}
                  </View>
                  {data.productVideo && (
                    <WatchVideoBorder onPress={() => setOpenModal(true)}>
                      <PlayCircleIcon width={12} height={12} />
                      <WatchVideoText>Watch video</WatchVideoText>
                    </WatchVideoBorder>
                  )}
                  {openModal && (
                    <PremiumVideo
                      video={data.productVideo}
                      onClose={() => setOpenModal(false)}
                      isVisible={openModal}
                    />
                  )}
                </View>
              </Animated.View>
            </PremiumDetailsContent>

            <View>
              {data?.sizes.map((f: any, index: number) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    setSize((prevState) => ({
                      ...prevState,
                      country: f.country,
                    }))
                  }
                >
                  <Text>{f.country}</Text>
                </Pressable>
              ))}
            </View>

            {isSize.country ? (
              <View>
                {Sizes[0].map((f: any, index: number) => (
                  <Pressable
                    key={index}
                    onPress={() =>
                      setSize((prevState) => ({
                        ...prevState,
                        sizeVarient: {
                          measurement: f.measurement,
                          size: f.size,
                        },
                      }))
                    }
                  >
                    <Text>
                      {f.size}-{f.measurement}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : (
              <Text>Select region</Text>
            )}

            {showDetails && (
              <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOut}>
                <View>
                  <DetailsHeading>Detailed features</DetailsHeading>
                  {Description.map((f, index) => (
                    <View
                      key={index}
                      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
                    >
                      <Svg width={8} height={8}>
                        <Circle cx={3} cy={3} r={3} fill='rgba(70, 45, 133, 0.6)' />
                      </Svg>

                      <DetailsParaText key={index} style={{ marginLeft: 8 }}>
                        {f}
                      </DetailsParaText>
                    </View>
                  ))}
                </View>
              </Animated.View>
            )}
          </PremiumDetailsWrapper>

          <Animated.View entering={FadeInUp.duration(2000)} exiting={FadeOut}>
            <Btns>
              {showDetails ? (
                <HideDetailsBorder onPress={() => setShowDetails(false)}>
                  <HideDetailsText>Hide details</HideDetailsText>
                </HideDetailsBorder>
              ) : (
                <HideDetailsBorder onPress={() => setShowDetails(true)}>
                  <HideDetailsText>View details</HideDetailsText>
                </HideDetailsBorder>
              )}
              <CustomButton
                text='Buy Now'
                fontFamily='Arvo-Regular'
                fontSize={13}
                style={{ width: 170 }}
                onPress={() => navigation.navigate('Checkout')}
              />
            </Btns>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
  },
})

const CardPairContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

const IconHoverClr = styled.View`
  border-radius: 20px;
  width: 32px;
  height: 32px;
`

const Btns = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 4px;
`

const DetailsHeading = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-bottom: 8px;
`

const PremiumDetailsWrapper = styled.View``

const PremiumDetailsContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-top: -20px;
`

const DetailsParaText = styled.Text`
  font-size: 12px;
  color: rgba(70, 45, 133, 0.6);
  letter-spacing: -0.24px;
  line-height: 16px;
  font-family: ${FONT_FAMILY.GilroyRegular};
`

const ProductText = styled.Text`
  font-size: 10px;
  font-family: ${FONT_FAMILY.MontserratRegular};
  color: ${COLORS.SecondaryTwo};
`

const WatchVideoBorder = styled.Pressable`
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.textSecondaryClr};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding-vertical: 8px;
  margin-top: 16px;
`

const HideDetailsBorder = styled.TouchableOpacity`
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.textSecondaryClr};
  padding-vertical: 12px;
  padding-horizontal: 20px;
  width: 170px;
`

const ProductName = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-top: 4px;
`
const WatchVideoText = styled.Text`
  font-size: 10px;
  color: ${COLORS.textSecondaryClr};
`

const HideDetailsText = styled.Text`
  color: ${COLORS.textSecondaryClr};
  font-size: 13px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  text-align: center;
`

const OldPriceText = styled.Text`
  font-size: 13px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.SecondaryTwo};
  text-decoration-line: line-through;
  margin-top: 4px;
`

export default PremiumDetailsCard
