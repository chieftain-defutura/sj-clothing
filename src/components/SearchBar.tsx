import React from 'react'
import { View, Pressable } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '../styles/theme'

interface SearchBarProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  placeholder?: string
  onChangeText?: (text: string) => void
  onClear?: () => void
  value?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  leftIcon,
  rightIcon,
  placeholder,
  onChangeText,
  onClear,
  value,
}) => {
  const handleClearPress = () => {
    if (onClear) {
      onClear()
    }
  }

  return (
    <SearchContainer>
      {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
      <InputText placeholder={placeholder} onChangeText={onChangeText} value={value} />
      <Pressable onPress={handleClearPress}>{rightIcon && <View>{rightIcon}</View>}</Pressable>
    </SearchContainer>
  )
}

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.iconsNormalClr};
  border-radius: 10px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  border-radius: 40px;
`

const LeftIcon = styled.View`
  margin-top: 4px;
  padding-right: 8px;
`

const InputText = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  font-family: Gilroy-Medium;
`

export default SearchBar
