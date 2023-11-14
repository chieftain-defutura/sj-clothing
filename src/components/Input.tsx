import React, { useState } from 'react'
import { TextInputProps, View, Text, Pressable } from 'react-native'
import styled from 'styled-components/native'
import { CountryPicker } from 'react-native-country-codes-picker'
import { COLORS, FONT_FAMILY } from '../styles/theme'

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  leftContent?: React.ReactNode
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
}

const Input: React.FC<InputProps> = ({
  placeholder,
  leftIcon,
  leftContent,
  rightIcon,
  value,
  onChangeText,
  ...rest
}) => {
  const [countryCode, setCountryCode] = useState('')
  const [show, setShow] = useState(false)
  return (
    <InputContainer>
      {leftContent && (
        <Pressable
          onPress={() => setShow(true)}
          style={{
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            borderRadius: 6,
            paddingHorizontal: 14,
            paddingVertical: 8,
            marginRight: 8,
          }}
        >
          <Text
            style={{
              color: '#8C73CB',
              fontSize: 16,
            }}
          >
            {countryCode}
          </Text>
          <CountryPicker
            show={show}
            lang='en'
            pickerButtonOnPress={(item: any) => {
              setCountryCode(item.dial_code)
              setShow(false)
              console.log('item', item)
            }}
          />
        </Pressable>
      )}

      {leftIcon && <View>{leftIcon}</View>}
      <StyledTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => {
          onChangeText?.(text)
        }}
        {...rest}
        placeholderTextColor={COLORS.SecondaryTwo}
      />
      {rightIcon && <View>{rightIcon}</View>}
    </InputContainer>
  )
}

const InputContainer = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  border-radius: 6px;
  padding-vertical: 10px;
  padding-horizontal: 16px;
`

const StyledTextInput = styled.TextInput`
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  font-family: ${FONT_FAMILY.GilroyMedium};
  width: 80%;
`

export default Input
