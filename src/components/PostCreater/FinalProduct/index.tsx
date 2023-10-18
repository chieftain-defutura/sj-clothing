import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { COLORS, FONT_FAMILY } from '../../../styles/theme'
import CustomButton from '../../Button'
import Carousle from './Carousle'
import { Svg, Circle } from 'react-native-svg'
import styled from 'styled-components/native'

interface IFinalProduct {
  isGiftVideo: any
  handleSubmit: () => Promise<void>
  setGiftVideo: React.Dispatch<any>
  price: string
  offerPrice: string
  size: string
  style: string
  caption: string
  color: string
  product: string
  Data: string
}
const FinalProduct: React.FC<IFinalProduct> = ({
  handleSubmit,
  setGiftVideo,
  isGiftVideo,
  size,
  style,
  price,
  offerPrice,
  caption,
  product,
  Data,
  color,
}) => {
  const Description = Data.split(',')
  return (
    <ScrollView style={styles.selectContainer}>
      <View style={styles.selectColorTShirt}>
        <Carousle isGiftVideo={isGiftVideo} setGiftVideo={setGiftVideo} />
      </View>

      <View style={{ paddingVertical: 8, display: 'flex', gap: 4 }}>
        <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>#{product}</Text>
        <Text style={{ color: COLORS.textTertiaryClr, fontFamily: 'Gilroy-Regular' }}>
          {caption === ''
            ? 'Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend tellus augue lec.'
            : caption}
        </Text>
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
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Style
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            {style}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Size
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            {size}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Quantity
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            x1
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
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Price
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            {price ? price : 0}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Offer Price
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            {offerPrice ? offerPrice : '-'}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Color
          </Text>
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Arvo-Regular',
              fontSize: 14,
              backgroundColor: color,
            }}
          ></Text>
        </View>
      </View>
      <View style={{ marginTop: 14 }}>
        <DetailsHeading>Detailed features</DetailsHeading>
        {Description.map((f, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Svg width={8} height={8}>
              <Circle cx={3} cy={3} r={3} fill='rgba(70, 45, 133, 0.6)' />
            </Svg>

            <DetailsParaText key={index} style={{ marginLeft: 8 }}>
              {f}
            </DetailsParaText>
          </View>
        ))}
      </View>
      <CustomButton
        variant='primary'
        text='Post'
        onPress={handleSubmit}
        buttonStyle={[styles.submitBtn]}
      />
    </ScrollView>
  )
}

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
})

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
