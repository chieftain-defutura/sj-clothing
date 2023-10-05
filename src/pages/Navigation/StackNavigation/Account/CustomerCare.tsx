import React from 'react'
import { View, TouchableOpacity, Linking, Text } from 'react-native'

const Customer: React.FC = () => {
  const phoneNumber = '123456789' // Replace with the actual phone number

  const handleCall = () => {
    const url = `tel:${phoneNumber}`
    Linking.openURL(url)
  }

  return (
    <View>
      <TouchableOpacity onPress={handleCall}>
        <View>
          {/* Your "Customer Care" view */}
          <Text>Customer Care</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Customer
