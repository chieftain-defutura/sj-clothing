import axios from 'axios'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Svg, { Path, Defs, G, Rect, ClipPath } from 'react-native-svg'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

import { userStore } from '../../../store/userStore'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import CurrencyGrayIcon from '../../../assets/icons/AccountPageIcon/CurrencyGrayIcon'

const CurrencyData = [
  {
    symbol: 'A$',
    currency: 'AUD',
    abrive: 'Australian dollar',
  },
  {
    symbol: '¥',
    currency: 'CNY',
    abrive: 'YUAN',
  },
  {
    symbol: '€',
    currency: 'EUR',
    abrive: 'EUR',
  },
  {
    symbol: 'HK$',
    currency: 'HKD',
    abrive: 'Hong Kong dollar',
  },
  {
    symbol: '¥',
    currency: 'JPY',
    abrive: 'YEN',
  },
  {
    symbol: '₩',
    currency: 'KRW',
    abrive: 'WON',
  },
  {
    symbol: 'د.ك',
    currency: 'KWD',
    abrive: 'DINAR',
  },
  {
    symbol: '₣',
    currency: 'CHF',
    abrive: 'SWIZ',
  },
  {
    symbol: '£',
    currency: 'GBP',
    abrive: 'POUND',
  },
  {
    symbol: '$',
    currency: 'USD',
    abrive: 'Dollor(US)',
  },
]

const Currency = () => {
  const { currency, updateCurrency, updateRate, rate } = userStore()
  const [isDropdownSizesOpen, setIsDropdownSizesOpen] = useState<boolean>(false)
  const toggleDropdownSizes = () => {
    setIsDropdownSizesOpen((prevState) => !prevState)
  }

  const getCurrency = useCallback(async () => {
    try {
      const apiKey = '1f5274c351a83d698e52d92b'
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`)
      const data = response.data
      const rates = data.conversion_rates
      updateRate(rates[currency.currency as string])
      AsyncStorage.setItem('rate', rates[currency.currency as string].toString())
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getCurrency()
  }, [getCurrency])

  const handleCurrency = async (currency: { symbol: null; currency: string; abrive: string }) => {
    updateCurrency({
      abrive: currency.abrive,
      currency: currency.currency,
      symbol: currency.symbol,
    })

    const storeCurrency = {
      abrive: currency.abrive,
      currency: currency.currency,
      symbol: currency.symbol,
    }

    const dataString = JSON.stringify(storeCurrency)
    AsyncStorage.setItem('currency', dataString)
    toggleDropdownSizes()
  }
  return (
    <LinearGradient
      colors={gradientOpacityColors}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
      }}
    >
      <Text style={styles.title}>Choose your Currency</Text>
      <CurrencyGrayIcon width={190} height={190} />
      <View style={{ width: 238, paddingTop: 64 }}>
        <SelectContent onPress={toggleDropdownSizes}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <SelectText style={{ fontSize: 20 }}>{currency.symbol}</SelectText>
            <SelectText>{currency.abrive}</SelectText>
          </View>
          <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <Path
              d='M5 7.5L10 12.5L15 7.5'
              stroke='#DB00FF'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </Svg>
        </SelectContent>
        {isDropdownSizesOpen && (
          <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
            <SelectDropDownList>
              {CurrencyData.filter((f) => f.currency !== currency.currency).map(
                (f: any, i: number) => (
                  <Pressable
                    key={i}
                    onPress={() => handleCurrency(f)}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      paddingHorizontal: 12,
                    }}
                  >
                    <SelectListText>{f.symbol}</SelectListText>
                    <SelectListText>{f.abrive}</SelectListText>
                  </Pressable>
                ),
              )}
            </SelectDropDownList>
          </Animated.View>
        )}
      </View>

      {/* <View>
        <TextInput
          placeholder='Enter amount'
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType='numeric'
        />
        <Text>From Currency:</Text>
        <TextInput value={fromCurrency} onChangeText={(text) => setFromCurrency(text)} />
        <Text>To Currency:</Text>
        <TextInput value={toCurrency} onChangeText={(text) => setToCurrency(text)} />
        <Button title='Convert' onPress={() => convertAmount()} />
        {convertedAmount && <Text>Converted Amount: {convertedAmount}</Text>}
      </View> */}
    </LinearGradient>
  )
}

export default Currency

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: COLORS.textClr,
    fontFamily: FONT_FAMILY.ArvoRegular,
    textAlign: 'center',
    paddingBottom: 24,
  },
})

const SelectContent = styled.Pressable`
  border-color: ${COLORS.textSecondaryClr};
  border-width: 1px;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`

const SelectText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.textSecondaryClr};
`
const SelectListText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.SecondaryTwo};
  padding-vertical: 7px;
`
