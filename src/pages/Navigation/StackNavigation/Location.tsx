import React, { useState } from 'react'
import { View, TextInput, FlatList, Text } from 'react-native'
import axios from 'axios'

const LocationSuggestion = () => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleInputChange = async (text: any) => {
    setInput(text)

    // Make a request to the Nominatim geocoding service to get location suggestions
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${text}`,
    )

    setSuggestions(response.data)
  }

  return (
    <View>
      <TextInput placeholder='Enter a location' onChangeText={handleInputChange} value={input} />
      <FlatList
        data={suggestions}
        renderItem={({ item }) => <Text>{item.display_name}</Text>}
        keyExtractor={(item) => item.place_id.toString()}
      />
    </View>
  )
}

export default LocationSuggestion
