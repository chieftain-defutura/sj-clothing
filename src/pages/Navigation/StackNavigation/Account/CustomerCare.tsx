import React from 'react'
import { View, TouchableOpacity, Linking, Text } from 'react-native'

const Customer: React.FC = () => {
  const phoneNumber = '7358947141'

  const handleCall = () => {
    const url = `tel:${phoneNumber}`
    Linking.openURL(url)
  }

  return (
    <View>
      <TouchableOpacity onPress={handleCall}>
        <View>
          <Text allowFontScaling={false}>Customer Care</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Customer
