import { ScrollView, StyleSheet, Text, Dimensions, View } from 'react-native'
import React from 'react'
import { COLORS, FONT_FAMILY } from '../../../styles/theme'
import CustomButton from '../../Button'
import styled from 'styled-components/native'
import { Svg, Circle } from 'react-native-svg'
import { IMidlevel } from '../../../constant/types'
import { userStore } from '../../../store/userStore'
import AuthNavigate from '../../../screens/AuthNavigate'
import { useTranslation } from 'react-i18next'

interface IFinalView {
  style: string
  color: string
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
  focus: boolean
  data: IMidlevel
  handleSubmit: () => Promise<void>
  setSize: React.Dispatch<
    React.SetStateAction<{
      country: string
      sizeVarient: {
        size: string
        measurement: string
        quantity: string
      }[]
    }>
  >
  setFocus: React.Dispatch<React.SetStateAction<boolean>>
}

const { height, width } = Dimensions.get('window')

const FinalView: React.FC<IFinalView> = ({
  handleSubmit,
  isSize,
  style,
  color,
  setFocus,
  focus,
  data,
  isImageOrText,
}) => {
  const { avatar } = userStore()
  const { t } = useTranslation('midlevel')
  const { currency, rate } = userStore()

  const onClose = () => {
    setFocus(false)
  }

  const Description = data.description.split(',')

  return (
    <AuthNavigate focus={focus} onClose={onClose}>
      <ScrollView style={styles.finalViewContainer}>
        <View>
          <CustomButton
            variant='primary'
            text={`${t('Buy now')}`}
            fontFamily='Arvo-Regular'
            fontSize={16}
            onPress={handleSubmit}
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
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                {isSize.sizeVarient.map((f, index) => (
                  <Text
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
                width: 155,
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
                Text/Image
              </Text>

              <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
                {isImageOrText.designs.hashtag ? isImageOrText.designs.hashtag : '-'}
                {isImageOrText.rate !== 0 && Number(isImageOrText.rate) * (rate as number)}
                {isImageOrText.rate !== 0 && currency.symbol}
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
                    <ProductText>price</ProductText>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <ProductName>
                        {(
                          Number(data.normalPrice ? data.normalPrice : 0) * (rate as number)
                        ).toFixed(2)}
                      </ProductName>
                      <ProductName>{currency.symbol}</ProductName>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View>
                      <ProductText>price</ProductText>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <OldPriceText>
                          {(Number(data.normalPrice) * (rate as number)).toFixed(2)}
                        </OldPriceText>
                        <OldPriceText> {currency.symbol}</OldPriceText>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <ProductName>
                          {(Number(data.offerPrice) * (rate as number)).toFixed(2)}
                        </ProductName>
                        <ProductName>{currency.symbol}</ProductName>
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
                width: 97,
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
                Gender
              </Text>
              <Text
                style={{
                  color: COLORS.textClr,
                  fontFamily: 'Arvo-Regular',
                  fontSize: 14,
                  textTransform: 'capitalize',
                }}
              >
                {avatar.gender}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 155,
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
        </View>
      </ScrollView>
    </AuthNavigate>
  )
}

export default FinalView

const styles = StyleSheet.create({
  finalViewContainer: {
    // flex: 1,
    padding: 16,
    // height: height,
  },
  submitBtn: {
    marginVertical: 1,
    fontFamily: 'Arvo-Regular',
  },
})

const AddSubButton = styled.Pressable`
  border-radius: 5px;
  background: ${COLORS.addSubButtonBackgroundColor};
  padding: 11px;
`
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
  font-size: 12px;
  font-family: ${FONT_FAMILY.MontserratRegular};
  color: ${COLORS.SecondaryTwo};
`

const InputBorder = styled.View`
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  width: 20%;
`

const InputStyle = styled.TextInput`
  font-family: Gilroy-Medium;
  width: 100%;
  font-size: 12px;
  color: ${COLORS.iconsHighlightClr};
`

const DropDownContainer = styled.View`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 16px;
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`

const SelectText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
`
const SelectListText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  padding-horizontal: 12px;
  padding-vertical: 7px;
`
