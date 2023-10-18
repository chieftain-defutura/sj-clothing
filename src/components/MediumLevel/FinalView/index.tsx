import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT_FAMILY } from '../../../styles/theme'
import CustomButton from '../../Button'
import styled from 'styled-components/native'
import PlusIcon from '../../../assets/icons/MidlevelIcon/PlusIcon'
import MinusIcon from '../../../assets/icons/MidlevelIcon/MinusIcon'
import { Checkbox } from 'react-native-paper'
import { Svg, Circle } from 'react-native-svg'

interface IFinalView {
  Data: string
  price: string
  offerPrice: string
  size: string
  style: string
  color: string
  quantity: string
  approved: boolean
  handleSubmit: () => Promise<void>
  setQuantity: React.Dispatch<React.SetStateAction<string>>
  setApproved: React.Dispatch<React.SetStateAction<boolean>>
}

const FinalView: React.FC<IFinalView> = ({
  Data,
  setQuantity,
  quantity,
  handleSubmit,
  setApproved,
  approved,
  size,
  style,
  price,
  color,
  offerPrice,
}) => {
  const number = Number(quantity)
  const handleIncrease = () => {
    if (number < 10) {
      setQuantity((number + 1).toString())
    }
  }
  const handleDecrease = () => {
    if (number !== 0) {
      setQuantity((number - 1).toString())
    }
  }
  const Description = Data.split(',')
  return (
    <View style={styles.finalViewContainer}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Checkbox
          status={approved ? 'checked' : 'unchecked'}
          onPress={() => setApproved((m) => !m)}
        />
        <Text
          style={{
            color: COLORS.textSecondaryClr,
            fontFamily: 'Gilroy-Medium',
            fontSize: 14,
            paddingVertical: 8,
          }}
        >
          I’ve reviewed and approved my design.
        </Text>
      </View>
      <Text
        style={{
          color: COLORS.textClr,
          fontFamily: 'Gilroy-Medium',
          fontSize: 14,
          paddingVertical: 8,
        }}
      >
        Quantity
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <InputBorder>
          <InputStyle
            placeholder='Quantity'
            placeholderTextColor={COLORS.SecondaryTwo}
            keyboardType='numeric'
            value={quantity}
            onChangeText={(e) => setQuantity(e)}
          />
        </InputBorder>
        <AddSubButton onPress={handleIncrease}>
          <PlusIcon width={24} height={24} />
        </AddSubButton>
        <AddSubButton onPress={handleDecrease}>
          <MinusIcon width={24} height={24} />
        </AddSubButton>
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
            {quantity ? quantity : 0}
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
        text='Buy now'
        fontFamily='Arvo-Regular'
        fontSize={16}
        disabled={!approved}
        onPress={handleSubmit}
        buttonStyle={[styles.submitBtn]}
      />
    </View>
  )
}

export default FinalView

const styles = StyleSheet.create({
  finalViewContainer: {
    flex: 1,
    padding: 16,
    marginTop: -80,
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 100,
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
  width: 70%;
`

const InputStyle = styled.TextInput`
  font-family: Gilroy-Medium;
  width: 100%;
  font-size: 12px;
`
