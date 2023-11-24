import axios from 'axios'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { ScrollView } from 'react-native-gesture-handler'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

import { db } from '../../../../firebase'
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
  const rate = userStore((state) => state.rate)
  const user = userStore((state) => state.user)
  const currency = userStore((state) => state.currency)
  const updateRate = userStore((state) => state.updateRate)
  const confirmDetails = userStore((state) => state.confirmDetails)
  const updateCurrency = userStore((state) => state.updateCurrency)
  const [isDropdownSizesOpen, setIsDropdownSizesOpen] = useState<boolean>(false)

  console.log('rate', rate)
  const toggleDropdownSizes = () => {
    setIsDropdownSizesOpen((prevState) => !prevState)
  }

  const getCurrency = useCallback(async () => {
    try {
      const apiKey = '0a1c782fc9edf98309831bad'
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`)
      const data = response.data
      const rates = data.conversion_rates
      updateRate(rates[currency.currency as string])
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          rate: rates[currency.currency as string],
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [currency, user])
  useEffect(() => {
    getCurrency()
  }, [getCurrency])

  const handleCurrency = async (currency: { symbol: string; currency: string; abrive: string }) => {
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
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        currency: storeCurrency,
      })
    }

    toggleDropdownSizes()
  }
  return (
    <>
      {!confirmDetails ? (
        <View
          // colors={gradientOpacityColors}
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
          <View style={{ width: 238, paddingTop: 14 }}>
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
                <SelectText style={{ fontSize: 20 }}>{currency ? currency.symbol : ''}</SelectText>
                <SelectText>{currency ? currency.abrive : ''}</SelectText>
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
                  <ScrollView style={{ height: 240 }}>
                    {CurrencyData.filter(
                      (f) => f.currency !== (currency ? currency.currency : ''),
                    ).map((f: any, i: number) => (
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
                    ))}
                  </ScrollView>
                </SelectDropDownList>
              </Animated.View>
            )}
          </View>
        </View>
      ) : (
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
          <View style={{ width: 238, paddingTop: 14 }}>
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
                <SelectText style={{ fontSize: 20 }}>{currency ? currency.symbol : ''}</SelectText>
                <SelectText>{currency ? currency.abrive : ''}</SelectText>
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
                  <ScrollView style={{ height: 240 }}>
                    {CurrencyData.filter(
                      (f) => f.currency !== (currency ? currency.currency : ''),
                    ).map((f: any, i: number) => (
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
                    ))}
                  </ScrollView>
                </SelectDropDownList>
              </Animated.View>
            )}
          </View>
        </LinearGradient>
      )}
    </>
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
