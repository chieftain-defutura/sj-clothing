import { Text, View, FlatList, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, dropDownGradient } from '../../../styles/theme'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
import { IMidlevel } from '../../../constant/types'
import { userStore } from '../../../store/userStore'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import SelectSizeTooltip from '../../Tooltips/MidLevel/SelectSize'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ISelectSize {
  isDropDown: boolean
  isSize: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
      quantity: string
    }[]
  }
  data: IMidlevel
  handleIncreaseSteps: () => void
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
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
}

const SelectSize: React.FC<ISelectSize> = ({ isDropDown, isSize, data, setDropDown, setSize }) => {
  const avatar = userStore((state) => state.avatar)
  const { t } = useTranslation('midlevel')
  const [toolTip, showToolTip] = useState(false)
  const [sizeData, setSizeData] = useState<
    | {
        measurement: string
        quantity: number
        show: boolean
        size: string
      }[]
    | undefined
  >([])

  useEffect(() => {
    const sizesData = data.sizes.find(
      (f) =>
        f.country === isSize.country && f.gender.toLowerCase() === avatar.gender?.toLowerCase(),
    )?.sizeVarients
    setSizeData(sizesData)
  }, [])

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showSelectSizeTooltip')

      if (data !== '7') {
        AsyncStorage.setItem('showSelectSizeTooltip', '7')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  const handleSelect = (size: string, measurement: string) => {
    setSize({ ...isSize, sizeVarient: [{ size: size, measurement: measurement, quantity: '1' }] })
    setDropDown(false)
  }

  return (
    <LinearGradient
      colors={dropDownGradient}
      style={{ borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}
    >
      {isDropDown && (
        <Animated.View>
          <Animated.View
            entering={FlipInXDown}
            exiting={FlipOutXDown.duration(400)}
            style={[
              {
                backgroundColor: 'rgba(191, 148, 228, 0.1)',
                borderBottomRightRadius: 50,
                borderBottomLeftRadius: 50,
              },
            ]}
          >
            <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
              <Text
                allowFontScaling={false}
                style={{
                  paddingTop: 8,
                  paddingBottom: 16,
                  fontSize: 14,
                  color: COLORS.textClr,
                  textAlign: 'center',
                }}
              >
                {t('Sizes')}
              </Text>
              {isSize.country && (
                <>
                  {(sizeData?.length as number) <= 3 ? (
                    <FlatList
                      key='fourColumns'
                      data={sizeData?.filter((f) => f.show === true)}
                      columnWrapperStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 65,
                        paddingVertical: 8,
                        paddingBottom: 18,
                      }}
                      numColumns={3}
                      renderItem={({ item, index }) => (
                        <View key={index}>
                          <TouchableHighlight
                            onPress={() => handleSelect(item.size, item.measurement)}
                            activeOpacity={0.6}
                            underlayColor='rgba(70, 45, 133, 0.2)'
                          >
                            <View>
                              <Text
                                allowFontScaling={false}
                                style={{
                                  fontSize: 12,
                                  padding: 4,
                                  color:
                                    isSize.sizeVarient[0].size === item.size
                                      ? COLORS.textSecondaryClr
                                      : COLORS.iconsNormalClr,
                                }}
                              >
                                {item.size} - {item.measurement} cm
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                      )}
                    />
                  ) : (
                    <FlatList
                      data={sizeData?.filter((f) => f.show === true)}
                      key='horizontal'
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 38,
                        paddingVertical: 8,
                        paddingBottom: 18,
                      }}
                      renderItem={({ item, index }) => (
                        <View key={index}>
                          <TouchableHighlight
                            onPress={() => handleSelect(item.size, item.measurement)}
                            activeOpacity={0.6}
                            underlayColor='rgba(70, 45, 133, 0.2)'
                          >
                            <View>
                              <Text
                                allowFontScaling={false}
                                style={{
                                  fontSize: 12,
                                  padding: 4,
                                  color:
                                    isSize.sizeVarient[0].size === item.size
                                      ? COLORS.textSecondaryClr
                                      : COLORS.iconsNormalClr,
                                }}
                              >
                                {item.size} - {item.measurement} cm
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                      )}
                    />
                  )}
                </>
              )}
            </View>
          </Animated.View>
        </Animated.View>
      )}
      <SelectSizeTooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
    </LinearGradient>
  )
}

export default SelectSize
