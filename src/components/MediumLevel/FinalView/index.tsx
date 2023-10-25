import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONT_FAMILY } from '../../../styles/theme'
import CustomButton from '../../Button'
import * as Animatable from 'react-native-animatable'
import styled from 'styled-components/native'
import PlusIcon from '../../../assets/icons/MidlevelIcon/PlusIcon'
import MinusIcon from '../../../assets/icons/MidlevelIcon/MinusIcon'
import { Checkbox } from 'react-native-paper'
import { Svg, Circle } from 'react-native-svg'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import ChevronLeft from '../../../assets/icons/ChevronLeft'
import { IMidlevel } from '../../../constant/types'

interface IFinalView {
  Data: string
  price: string
  offerPrice: string
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
}

const FinalView: React.FC<IFinalView> = ({
  Data,
  data,
  handleSubmit,
  isSize,
  style,
  price,
  color,
  offerPrice,
  setSize,
}) => {
  const handleQuantityChange = (value: string, index: string | number) => {
    const newSizeVariant = [...isSize.sizeVarient]
    newSizeVariant[index as any].quantity = value
    setSize({ ...isSize, sizeVarient: newSizeVariant })
  }

  const addSizeVariant = () => {
    const newSizeVariant = [...isSize.sizeVarient, { size: '', measurement: '', quantity: '' }]
    setSize({ ...isSize, sizeVarient: newSizeVariant })
  }

  const removeSizeVariant = (index: number) => {
    const newSizeVariants = [...isSize.sizeVarient]
    newSizeVariants.splice(index, 1)
    setSize({ ...isSize, sizeVarient: newSizeVariants })
  }

  const updateSizeVariant = (
    newSizeVariant: { size: string; measurement: string; quantity: string },
    index: string | number,
  ) => {
    const newSizeVariants = [...isSize.sizeVarient]
    newSizeVariants[index as any] = newSizeVariant
    setSize({ ...isSize, sizeVarient: newSizeVariants })
  }

  const Description = Data.split(',')

  return (
    <View style={styles.finalViewContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 8,
          paddingBottom: 10,
        }}
      >
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
        <AddSubButton onPress={addSizeVariant}>
          <PlusIcon width={24} height={24} />
        </AddSubButton>
      </View>

      {isSize.sizeVarient.map((variant, index) => (
        <View
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
            paddingBottom: 3,
          }}
        >
          <InputBorder>
            <InputStyle
              placeholderTextColor={COLORS.SecondaryTwo}
              value={variant.quantity}
              onChangeText={(text) => handleQuantityChange(text, index)}
              placeholder={` ${index + 1}`}
            />
          </InputBorder>
          <DropdownContainer
            index={index}
            updateSizeVariant={updateSizeVariant}
            data={data}
            isSize={isSize}
          />

          <AddSubButton onPress={() => removeSizeVariant(index)}>
            <MinusIcon width={24} height={24} />
          </AddSubButton>
        </View>
      ))}

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
                {f.size.length - 1 ? '' : ','}
              </Text>
            ))}
          </View>
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
            {isSize.sizeVarient.length}
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
        onPress={handleSubmit}
        buttonStyle={[styles.submitBtn]}
      />
    </View>
  )
}

export default FinalView

interface DropDownContainer {
  updateSizeVariant: (
    newSizeVariant: {
      size: string
      measurement: string
      quantity: string
    },
    index: string | number,
  ) => void

  isSize: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
      quantity: string
    }[]
  }
  data: IMidlevel
  index: string | number
}

const DropdownContainer: React.FC<DropDownContainer> = ({
  updateSizeVariant,
  data,
  isSize,
  index,
}) => {
  const [isDropdownSizesOpen, setIsDropdownSizesOpen] = useState<boolean>(false)
  const [selectedSizes, setSelectedSizes] = useState({ measurement: '', size: '' })
  const toggleDropdownSizes = () => {
    setIsDropdownSizesOpen((prevState) => !prevState)
  }

  const handleSelectSize = (
    newSizeVariant: { size: string; measurement: string; quantity: string },
    index: string | number,
  ) => {
    // Call the updateSizeVariant function from the parent component
    updateSizeVariant(newSizeVariant, index)
  }

  const Sizes = data?.sizes
    .filter((f: any) => f.country === isSize.country)
    .map((f: any) => f.sizeVarients)

  const stringIndex = Number(index) + 1

  return (
    <View style={{ width: 108 }}>
      <SelectContent onPress={toggleDropdownSizes}>
        <SelectText>
          {selectedSizes.size}-{selectedSizes.measurement}
        </SelectText>
      </SelectContent>
      {isDropdownSizesOpen && (
        <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
          <SelectDropDownList>
            <View>
              {Sizes[0].map((f: any, i: number) => (
                <Pressable
                  key={i}
                  onPress={() => {
                    handleSelectSize(
                      {
                        measurement: f.measurement,
                        size: f.size,
                        quantity: stringIndex.toString(),
                      },
                      index,
                    ),
                      setSelectedSizes({ measurement: f.measurement, size: f.size }),
                      toggleDropdownSizes()
                  }}
                >
                  <SelectListText>
                    {f.size} - {f.measurement}
                  </SelectListText>
                </Pressable>
              ))}
            </View>
          </SelectDropDownList>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  finalViewContainer: {
    flex: 1,
    padding: 16,
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 20,
  },
})

const SelectContent = styled.Pressable`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

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
