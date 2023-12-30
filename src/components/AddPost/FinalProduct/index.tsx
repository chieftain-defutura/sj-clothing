import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY } from '../../../styles/theme'
import { Svg, Circle } from 'react-native-svg'
import Carousle from './Carousle'
import CustomButton from '../../Button'

interface IFinalProduct {
  isGiftVideo: any
  setGiftVideo: React.Dispatch<any>
  Data: string
  handleSubmit: () => Promise<void>
}

const FinalProduct: React.FC<IFinalProduct> = ({
  isGiftVideo,
  setGiftVideo,
  Data,
  handleSubmit,
}) => {
  const Description = Data.split(',')
  return (
    <ScrollView style={styles.selectContainer}>
      <View style={styles.selectColorTShirt}>
        <Carousle isGiftVideo={isGiftVideo} setGiftVideo={setGiftVideo} />
      </View>

      <View style={{ paddingVertical: 8, display: 'flex', gap: 4 }}>
        <Text
          allowFontScaling={false}
          style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}
        >
          Product
        </Text>
        <Text
          allowFontScaling={false}
          style={{ color: COLORS.textTertiaryClr, fontFamily: 'Gilroy-Regular' }}
        >
          Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend
          tellus augue lec.
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
            allowFontScaling={false}
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Style
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
          >
            color
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
            allowFontScaling={false}
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Size
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
          >
            s {/* {size} */}
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
            allowFontScaling={false}
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Quantity
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
          >
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
            allowFontScaling={false}
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Price
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
          >
            price
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
            allowFontScaling={false}
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Offer Price
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}
          >
            offerPrice
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
            allowFontScaling={false}
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
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
              marginTop: -4,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.textClr,
                fontFamily: 'Arvo-Regular',
                fontSize: 18,
                backgroundColor: 'red',
                width: 11,
                height: 11,
                marginTop: 6,
              }}
            ></Text>
            <Text style={styles.colorNameText} numberOfLines={1} ellipsizeMode='tail'>
              Red
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 14 }}>
        <DetailsHeading allowFontScaling={false}>Detailed features</DetailsHeading>
        {Description.map((f, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Svg width={8} height={8}>
              <Circle cx={3} cy={3} r={3} fill='rgba(70, 45, 133, 0.6)' />
            </Svg>

            <DetailsParaText allowFontScaling={false} key={index} style={{ marginLeft: 8 }}>
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
        fontFamily='Arvo-Regular'
        fontSize={16}
      />
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
