import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatList } from 'react-native-gesture-handler'
import { Text, View, TouchableHighlight } from 'react-native'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
import { IMidlevel } from '../../../constant/types'
import { COLORS, dropDownGradient } from '../../../styles/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'
import { userStore } from '../../../store/userStore'
import SelectStyleTooltip from '../../Tooltips/MidLevel/SelectStyle'

interface ISelectStyle {
  isSelectedStyle: string
  data: IMidlevel[]
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedStyle: React.Dispatch<React.SetStateAction<string>>
}

const SelectStyle: React.FC<ISelectStyle> = ({
  data,
  setDropDown,
  isSelectedStyle,
  setSelectedStyle,
}) => {
  const { t } = useTranslation('midlevel')
  const avatar = userStore((state) => state.avatar)
  const [toolTip, showToolTip] = useState(false)

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showSelectStyleTooltip')

      if (data !== '5') {
        AsyncStorage.setItem('showSelectStyleTooltip', '5')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  const handleSelect = (title: string) => {
    if (title === 'There is no styles available right now') {
      setSelectedStyle('')
      setDropDown(false)
    } else {
      setSelectedStyle(title)
      setDropDown(false)
    }
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
            {t('Styles')}
          </Text>
        </View>
        <View
          style={{
            padding: 16,
          }}
        >
          {data.filter((f) => f.gender.toLowerCase() === avatar.gender?.toLowerCase()).length <=
          3 ? (
            <FlatList
              data={data.filter((f) => f.gender.toLowerCase() === avatar.gender?.toLowerCase())}
              columnWrapperStyle={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 65,
                paddingVertical: 8,
              }}
              numColumns={3}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => handleSelect(item.styles)}
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.2)'
                  style={{
                    padding: 4,
                  }}
                >
                  <View>
                    {item.styles ? (
                      <Text
                        allowFontScaling={false}
                        style={{
                          textAlign: 'left',
                          fontFamily: 'Gilroy-Medium',
                          color:
                            isSelectedStyle === item.styles
                              ? COLORS.textSecondaryClr
                              : COLORS.iconsNormalClr,
                        }}
                      >
                        {item.styles}
                      </Text>
                    ) : (
                      <Text
                        allowFontScaling={false}
                        style={{
                          textAlign: 'left',
                          fontFamily: 'Gilroy-Medium',
                          color: COLORS.textSecondaryClr,
                        }}
                      >
                        There is no styles available right now
                      </Text>
                    )}
                  </View>
                </TouchableHighlight>
              )}
            />
          ) : (
            <FlatList
              data={data.filter((f) => f.gender.toLowerCase() === avatar.gender?.toLowerCase())}
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
                  onPress={() => handleSelect(item.styles)}
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.2)'
                  style={{
                    padding: 4,
                  }}
                >
                  {item.styles ? (
                    <Text
                      allowFontScaling={false}
                      style={{
                        textAlign: 'left',
                        fontFamily: 'Gilroy-Medium',
                        color:
                          isSelectedStyle === item.styles
                            ? COLORS.textSecondaryClr
                            : COLORS.iconsNormalClr,
                      }}
                    >
                      {item.styles}
                    </Text>
                  ) : (
                    <Text
                      allowFontScaling={false}
                      style={{
                        textAlign: 'left',
                        fontFamily: 'Gilroy-Medium',
                        color: COLORS.textSecondaryClr,
                      }}
                    >
                      There is no styles available right now
                    </Text>
                  )}
                </TouchableHighlight>
              )}
            />
          )}
        </View>
      </Animated.View>
      <SelectStyleTooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
    </LinearGradient>
  )
}

export default SelectStyle
