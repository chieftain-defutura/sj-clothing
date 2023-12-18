import axios from 'axios'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import CurrencyGrayIcon from '../../../assets/icons/AccountPageIcon/CurrencyGrayIcon'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { CURRENCY_API_KEY } from '../../../utils/config'
import CurrencyTooltip from '../../../components/Tooltips/CurrencyTooltip'

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
  const [toolTip, showToolTip] = useState(false)
  const navigation = useNavigation()

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showCurrencyTooltip')

      if (data !== '14') {
        AsyncStorage.setItem('showCurrencyTooltip', '14')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  const toggleDropdownSizes = () => {
    setIsDropdownSizesOpen((prevState) => !prevState)
  }

  const getCurrency = useCallback(async () => {
    try {
      const apiKey = CURRENCY_API_KEY
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
          <Text allowFontScaling={false} style={styles.title}>
            Choose Your Currency
          </Text>
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
                <Text allowFontScaling={false} style={styles.selectText}>
                  {currency ? currency.abrive : ''}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={(styles.selectText, { fontSize: 20, color: `${COLORS.textSecondaryClr}` })}
                >
                  {currency ? currency.symbol : ''}
                </Text>
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
                        <Text allowFontScaling={false} style={styles.selectListText}>
                          {f.abrive}
                        </Text>
                        <Text allowFontScaling={false} style={styles.selectListText}>
                          {f.symbol}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </SelectDropDownList>
              </Animated.View>
            )}
          </View>
          <CurrencyTooltip
            isVisible={toolTip}
            onClose={() => {
              showToolTip(false)
            }}
          />
        </View>
      ) : (
        <LinearGradient
          colors={gradientOpacityColors}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              flexDirection: 'row',
              marginTop: 10,
              marginLeft: 26,
              gap: 8,
            }}
          >
            <GoBackArrowContent
              onPress={() => {
                navigation.goBack()
              }}
              activeOpacity={0.6}
              underlayColor='rgba(70, 45, 133, 0.2)'
              style={{ borderRadius: 100 }}
            >
              <IconHoverClr>
                <IconHoverPressable>
                  <LeftArrow width={24} height={24} style={{ marginBottom: -44 }} />
                </IconHoverPressable>
              </IconHoverClr>
            </GoBackArrowContent>
            <Text allowFontScaling={false} style={[styles.title, { fontSize: 28 }]}>
              Choose Your Currency
            </Text>
          </View>
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
                <Text
                  allowFontScaling={false}
                  style={(styles.selectText, { fontSize: 20, color: `${COLORS.textSecondaryClr}` })}
                >
                  {currency ? currency.symbol : ''}
                </Text>
                <Text allowFontScaling={false} style={styles.selectText}>
                  {currency ? currency.abrive : ''}
                </Text>
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
                        <Text allowFontScaling={false} style={styles.selectListText}>
                          {f.abrive}
                        </Text>
                        <Text allowFontScaling={false} style={styles.selectListText}>
                          {f.symbol}
                        </Text>
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
    fontSize: 36,
    color: COLORS.textClr,
    fontFamily: FONT_FAMILY.ArvoRegular,
    textAlign: 'center',
    paddingBottom: 24,
    marginTop: 8,
  },
  selectText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.ArvoRegular,
    color: COLORS.textSecondaryClr,
  },
  selectListText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.ArvoRegular,
    color: COLORS.SecondaryTwo,
    paddingVertical: 7,
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

const GoBackArrowContent = styled.TouchableHighlight`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-left: -8px;
`
const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

const IconHoverClr = styled.View`
  width: 50px;
  height: 50px;
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`
