import React from 'react'
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, View } from 'react-native'

type Props = {
  text: string
  backgroundColor?: string
  buttonStyle?: StyleProp<ViewStyle>
}

const CustomButton: React.FC<Props> = ({ text, backgroundColor, buttonStyle }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: backgroundColor ? backgroundColor : '#DB00FF',
        },
        buttonStyle,
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
})

export default CustomButton
