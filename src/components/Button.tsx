import React from 'react'
import { StyleProp, ViewStyle, View } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../styles/theme'

type Props = {
  text: string
  variant?: 'primary' | 'secondary'
  backgroundColor?: string
  buttonStyle?: StyleProp<ViewStyle>
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const CustomButton: React.FC<Props> = ({
  text,
  backgroundColor,
  buttonStyle,
  leftIcon,
  rightIcon,
  variant,
}: Props) => {
  return (
    <LinearGradient
      colors={[COLORS.textClr, COLORS.textSecondaryClr]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          backgroundColor: backgroundColor ? backgroundColor : 'transparent',
        },
        buttonStyle,
        {
          borderRadius: 50,
        },
      ]}
    >
      <TouchableOpacityBtn>
        {leftIcon && <View>{leftIcon}</View>}
        <ButtonText variant={variant}>{text}</ButtonText>
        {rightIcon && <View>{rightIcon}</View>}
      </TouchableOpacityBtn>
    </LinearGradient>
  )
}

const TouchableOpacityBtn = styled.TouchableOpacity`
  padding: 16px;
`

const ButtonText = styled.Text<{ variant: 'primary' | 'secondary' | undefined }>`
  font-size: 14px;
  text-align: center;
  color: white;
  background: ${(p) => (p.variant === 'primary' ? 'transparent' : COLORS.textSecondaryClr)};
`

export default CustomButton
