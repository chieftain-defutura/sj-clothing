import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const buttons = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'Work' },
  { id: 3, label: 'Office' },
]

type btnGroup = {
  value: (lbl: string) => void
}

const ButtonGroup: React.FC<btnGroup> = ({ value }) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null)

  const handleButtonPress = (lbl: string) => {
    setSelectedButton(lbl)
    value(lbl)
  }

  return (
    <View style={styles.container}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.id}
          style={[styles.button, selectedButton === button.label && styles.selectedButton]}
          onPress={() => handleButtonPress(button.label)}
        >
          <Text style={styles.buttonText}>{button.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'black',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
})

export default ButtonGroup
