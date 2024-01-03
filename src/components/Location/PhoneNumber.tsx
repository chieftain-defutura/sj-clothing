import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native'
import countryPhoneNumber from '../../utils/CountryPhoneNumber/countryPhoneNumber.json'

interface Country {
  country: string
}

const PhoneNumber: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    setModalVisible(false)
    setPhoneNumber('')
  }

  const handlePhoneNumberChange = (number: string) => {
    setPhoneNumber(number)
  }

  const handleSubmit = () => {
    const selectedCountryData = countryPhoneNumber.find(
      (country) => country.country === selectedCountry,
    )

    if (selectedCountryData) {
      const expectedLength = selectedCountryData.phoneNumberLengthByCountry_phLength
      if (phoneNumber.length !== expectedLength) {
        alert(`Invalid phone number length for ${selectedCountry}`)
      } else {
        alert(`Valid phone number: ${phoneNumber}`)
      }
    }
  }

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}
      onPress={() => handleCountryChange(item.country)}
    >
      <Text>{item.country}</Text>
    </TouchableOpacity>
  )

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>Select Country:</Text>

        <TouchableOpacity
          style={{
            backgroundColor: 'lightgrey',
            padding: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text>{selectedCountry || 'Select Country'}</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType='slide'>
          <View style={{ flex: 1, paddingTop: 40 }}>
            <FlatList
              data={countryPhoneNumber}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.country}_${index}`}
            />
            <Button title='Close' onPress={() => setModalVisible(false)} />
          </View>
        </Modal>

        <View>
          <Text style={{ fontSize: 18, color: 'red' }}>Phone Number for {selectedCountry}:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 8,
              marginBottom: 10,
            }}
            value={phoneNumber}
            onChangeText={(text) => handlePhoneNumberChange(text)}
            keyboardType='numeric'
            placeholder='Phone No'
          />
          <Button title='Submit' onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  )
}

export default PhoneNumber
