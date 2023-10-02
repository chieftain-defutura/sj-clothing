import React from 'react'
import { TextInputProps, View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY } from '../styles/theme'

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
}

const Input: React.FC<InputProps> = ({
  placeholder,
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  ...rest
}) => {
  return (
    <InputContainer>
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
  border-color: ${COLORS.strokeClr};
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
  width: 90%;
`

export default Input
