import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY } from '../../../styles/theme'
import { Svg, Circle } from 'react-native-svg'
import Carousle from './Carousle'
import CustomButton from '../../Button'
import { ScrollView, StyleSheet, Text, Dimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { userStore } from '../../../store/userStore'
import { useTranslation } from 'react-i18next'
import { IMidlevel } from '../../../constant/types'

interface IFinalProduct {
  style: string
  color: string
  colorName: string
  isSize: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
      quantity: string
    }[]
  }
  isImageOrText: {
    title: string
    position: string
    rate: number
    designs: {
      hashtag: string
      image: string
    }
  }
  data: IMidlevel
  isGiftVideo: any
  setGiftVideo: React.Dispatch<any>

  handleSubmit: () => Promise<void>
}

const { width } = Dimensions.get('window')

const FinalProduct: React.FC<IFinalProduct> = ({
  isGiftVideo,
  setGiftVideo,
  handleSubmit,
  color,
  colorName,
  data,
  isImageOrText,
  isSize,
  style,
}) => {
  const { t } = useTranslation('midlevel')
  const avatar = userStore((state) => state.avatar)
  const currency = userStore((state) => state.currency)
  const rate = userStore((state) => state.rate)
  const [toolTip, showToolTip] = useState(false)
  const Description = data.description.split(',')
  return (
    <ScrollView style={styles.selectContainer}>
      <View style={styles.selectColorTShirt}>
        <Carousle isGiftVideo={isGiftVideo} setGiftVideo={setGiftVideo} />
      </View>

      <View style={{ paddingHorizontal: 15 }}>
        <CustomButton
          variant='primary'
          text={`${t('Post')}`}
          fontFamily='Arvo-Regular'
          fontSize={16}
          onPress={() => handleSubmit()}
          buttonStyle={[styles.submitBtn]}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 37,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: width / 4,
              paddingTop: 16,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.textClr,
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              Style
            </Text>
            <Text
              allowFontScaling={false}
              style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
            >
              {style}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: width / 4,
              paddingTop: 16,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.textClr,
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              Size
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              {isSize.sizeVarient.map((f, index) => (
                <Text
                  allowFontScaling={false}
                  key={index}
                  style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
                >
                  {f.size}
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: width / 4,
              paddingTop: 16,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.textClr,
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              Text/Image
            </Text>

            <Text
              allowFontScaling={false}
              style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
            >
              {isImageOrText.designs.hashtag ? isImageOrText.designs.hashtag : '-'}{' '}
              {/* {isNaN(isImageOrText.rate)
                  ? '0 '
                  : isImageOrText.rate !== 0 &&
                    (Number(isImageOrText.rate) * (rate as number)).toFixed(2)}
                {isImageOrText.rate !== 0 && currency.symbol} */}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 37,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: width / 4,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 6,
                alignItems: 'center',
              }}
            >
              {!data.offerPrice ? (
                <View>
                  <ProductText allowFontScaling={false} style={{ color: COLORS.textClr }}>
                    price
                  </ProductText>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <ProductName allowFontScaling={false}>
                      {(Number(data.normalPrice ? data.normalPrice : 0) * (rate as number)).toFixed(
                        2,
                      )}
                    </ProductName>
                    <ProductName allowFontScaling={false}>{currency.symbol}</ProductName>
                  </View>
                </View>
              ) : (
                <View>
                  <View>
                    <ProductText
                      allowFontScaling={false}
                      style={{ fontSize: 14, color: COLORS.textClr }}
                    >
                      price
                    </ProductText>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <OldPriceText allowFontScaling={false}>
                        {(Number(data.normalPrice) * (rate as number)).toFixed(2)}
                      </OldPriceText>
                      <OldPriceText allowFontScaling={false}> {currency.symbol}</OldPriceText>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <ProductName allowFontScaling={false}>
                        {(Number(data.offerPrice) * (rate as number)).toFixed(2)}
                      </ProductName>
                      <ProductName allowFontScaling={false}>{currency.symbol}</ProductName>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: width / 4,
              paddingTop: 16,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.textClr,
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}
            >
              Gender
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.textClr,
                fontFamily: 'Arvo-Regular',
                fontSize: 14,
                textTransform: 'capitalize',
                paddingTop: 7,
              }}
            >
              {avatar?.gender}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: width / 4,
              paddingTop: 16,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.textClr,
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}
            >
              Color
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: COLORS.textClr,
                  fontFamily: 'Arvo-Regular',
                  fontSize: 18,
                  backgroundColor: color,
                  width: 11,
                  height: 11,
                  marginTop: 6,
                }}
              ></Text>
              <Text style={styles.colorNameText} numberOfLines={1} ellipsizeMode='tail'>
                {colorName}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <DetailsHeading allowFontScaling={false}>Detailed features</DetailsHeading>
          {Description.map((f, index) => (
            <View
              key={index}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
            >
              <Svg width={8} height={8}>
                <Circle cx={3} cy={3} r={3} fill='rgba(70, 45, 133, 0.6)' />
              </Svg>
              <DetailsParaText allowFontScaling={false} key={index} style={{ marginLeft: 8 }}>
                {f}
              </DetailsParaText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const DetailsParaText = styled.Text`
  font-size: 12px;
  color: rgba(70, 45, 133, 0.6);
  letter-spacing: -0.24px;
  line-height: 16px;
  text-transform: capitalize;
  font-family: ${FONT_FAMILY.GilroyRegular};
`

const DetailsHeading = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-bottom: 8px;
`
const ProductName = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-top: 4px;
`
const OldPriceText = styled.Text`
  font-size: 13px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.SecondaryTwo};
  text-decoration-line: line-through;
  margin-top: 4px;
`
const ProductText = styled.Text`
  font-size: 13px;
  font-family: ${FONT_FAMILY.MontserratRegular};
  color: ${COLORS.SecondaryTwo};
  margin-bottom: 4px;
`
export default FinalProduct

const styles = StyleSheet.create({
  selectContainer: {
    padding: 16,
  },
  selectNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  selectColorTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectColor360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 54,
  },
  colorNameText: {
    fontFamily: FONT_FAMILY.GilroySemiBold,
    fontSize: 14,
    marginTop: 6,
    color: COLORS.iconsHighlightClr,
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
})
