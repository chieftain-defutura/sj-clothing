import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'

interface ICountryCode {
  countryCode: string
  show: boolean
  setCountryCode: React.Dispatch<React.SetStateAction<string>>
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const CountryCode: React.FC<ICountryCode> = ({ countryCode, setCountryCode, setShow, show }) => {
  return (
    <View>
      <Pressable
        onPress={() => setShow(true)}
        style={{
          borderColor: 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          borderRadius: 6,
          paddingHorizontal: 14,
          paddingVertical: 16,
          marginRight: 8,
        }}
      >
        <Text
          style={{
            color: '#8C73CB',
            fontSize: 14,
          }}
          allowFontScaling={false}
        >
          {countryCode}
        </Text>
        <CountryPicker
          show={show}
          lang='en'
          pickerButtonOnPress={(item: any) => {
            console.log(item)
            setCountryCode(item.dial_code)
            setShow(false)
          }}
        />
      </Pressable>
    </View>
  )
}

export default CountryCode

const styles = StyleSheet.create({})
