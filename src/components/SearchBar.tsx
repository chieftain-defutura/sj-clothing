import React from 'react'
import { View, Pressable, ViewStyle, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '../styles/theme'

interface SearchBarProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  placeholder?: string
  onChangeText?: (text: string) => void
  onClear?: () => void
  value?: string
  placeholderTextColor?: string
  allowFontScaling?: boolean
  style?: ViewStyle
}

const { width } = Dimensions.get('window')

const SearchBar: React.FC<SearchBarProps> = ({
  leftIcon,
  rightIcon,
  placeholder,
  onChangeText,
  onClear,
  value,
  placeholderTextColor,
  allowFontScaling,
  style,
}) => {
  const handleClearPress = () => {
    if (onClear) {
      onClear()
    }
  }

  return (
    <SearchContainer style={{ width: width / 1.3 }}>
      {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
      <InputText
        allowFontScaling={allowFontScaling !== undefined ? allowFontScaling : false}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={placeholderTextColor}
        style={style}
      />
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
