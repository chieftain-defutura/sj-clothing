import { Text, View, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
import { COLORS, dropDownGradient } from '../../../styles/theme'
import { FlatList } from 'react-native-gesture-handler'
import { IMidlevel } from '../../../constant/types'
import { userStore } from '../../../store/userStore'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

interface ISelectedCountry {
  isSize: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
      quantity: string
    }[]
  }
  data: IMidlevel
  setSize: React.Dispatch<
    React.SetStateAction<{
      country: string
      sizeVarient: {
        size: string
        measurement: string
        quantity: string
      }[]
    }>
  >
  handleIncreaseSteps: () => void
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
}
const SelectCountry: React.FC<ISelectedCountry> = ({ setSize, isSize, data, setDropDown }) => {
  const { t } = useTranslation('midlevel')
  const avatar = userStore((state) => state.avatar)
  const [country, setCountry] = useState<
    {
      country: string
      gender: string
      sizeVarients: {
        measurement: string
        quantity: number
        show: boolean
        size: string
      }[]
    }[]
  >([])

  useEffect(() => {
    const filteredData = data.sizes
      .filter((f) => f.gender.toLowerCase() === avatar.gender?.toLowerCase())
      .map((f) => f)
    setCountry(filteredData)
  }, [data, avatar])

  const handleSelectCountry = (item: string) => {
    setSize((prevState) => ({
      ...prevState,
      country: item,
    }))
    setDropDown(false)
  }
  return (
    <LinearGradient
      colors={dropDownGradient}
      style={{ borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}
    >
      <Animated.View
        entering={FlipInXDown}
        exiting={FlipOutXDown.duration(400)}
        style={{
          backgroundColor: 'rgba(191, 148, 228, 0.1)',
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 24,
            paddingTop: 15,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              textAlign: 'center',
              color: COLORS.iconsHighlightClr,
            }}
          >
            {t('Select Country')}
          </Text>
        </View>
        <View
          style={{
            padding: 16,
          }}
        >
          {country.length <= 3 ? (
            <FlatList
              data={country}
              columnWrapperStyle={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 65,
                paddingVertical: 8,
              }}
              numColumns={3}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => handleSelectCountry(item.country)}
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.2)'
                  style={{
                    padding: 4,
                  }}
                >
                  <View>
                    <Text
                      allowFontScaling={false}
                      style={{
                        textAlign: 'left',
                        fontFamily: 'Gilroy-Medium',
                        color:
                          isSize.country === item.country
                            ? COLORS.textSecondaryClr
                            : COLORS.iconsNormalClr,
                      }}
                    >
                      {item.country}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            />
          ) : (
            <FlatList
              data={country}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 38,
                paddingVertical: 8,
              }}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => handleSelectCountry(item.country)}
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.2)'
                  style={{
                    padding: 4,
                  }}
                >
                  <View>
                    <Text
                      allowFontScaling={false}
                      style={{
                        textAlign: 'left',
                        fontFamily: 'Gilroy-Medium',
                        color:
                          isSize.country === item.country
                            ? COLORS.textSecondaryClr
                            : COLORS.iconsNormalClr,
                      }}
                    >
                      {item.country}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            />
          )}
        </View>
      </Animated.View>
    </LinearGradient>
  )
}

export default SelectCountry
