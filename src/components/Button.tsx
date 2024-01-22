import React from 'react'
import { StyleProp, ViewStyle, View, TouchableOpacity } from 'react-native'
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
  onPress?: () => void
  disabled?: boolean
  disabledBackgroundColor?: string
  fontFamily?: string
  fontSize?: number
  style?: ViewStyle
}

const CustomButton: React.FC<Props> = ({
  text,
  backgroundColor,
  buttonStyle,
  leftIcon,
  rightIcon,
  variant,
  onPress,
  disabled,
  disabledBackgroundColor,
  fontFamily,
  fontSize,
  style,
}: Props) => {
  return (
    <TouchableOpacity onPress={disabled ? undefined : onPress} disabled={disabled} style={style}>
      <LinearGradient
        colors={
          disabled && disabledBackgroundColor
            ? [disabledBackgroundColor, disabledBackgroundColor]
            : [COLORS.textClr, COLORS.textSecondaryClr]
        }
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 0 }}

        style={[
          {
            backgroundColor: backgroundColor ? backgroundColor : 'transparent',
            opacity: disabled ? 0.7 : 1,
          },
          buttonStyle,

          {
            borderRadius: 50,
          },
        ]}
      >
        <StyledView>
          {leftIcon && <View>{leftIcon}</View>}
          <ButtonText
            allowFontScaling={false}
            variant={variant}
            style={{ fontFamily: fontFamily, fontSize: fontSize }}
          >
            {text}
          </ButtonText>
          {rightIcon && <View>{rightIcon}</View>}
        </StyledView>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const StyledView = styled.View`
  padding: 13px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`

const ButtonText = styled.Text<{ variant: 'primary' | 'secondary' | undefined }>`
  font-size: 14px;
  text-align: center;
  color: white;
  background: ${(p) => (p.variant === 'primary' ? 'transparent' : 'transparent')};
  line-height: 20px;
  padding-horizontal: 18px;
`

export default CustomButton
