import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatList } from 'react-native-gesture-handler'
import { Pressable, Text, View } from 'react-native'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
import { IMidlevel } from '../../../constant/types'
import { COLORS, dropDownGradient } from '../../../styles/theme'
import { useTranslation } from 'react-i18next'
import { userStore } from '../../../store/userStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MidLevelTooltip from '../../Tooltips/MidLevelTooltip'

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
  const [toolTip, showToolTip] = useState(false)
  const avatar = userStore((state) => state.avatar)
  const handleSelect = (title: string) => {
    if (title === 'There is no styles available right now') {
      setSelectedStyle('')
      setDropDown(false)
    } else {
      setSelectedStyle(title)
      setDropDown(false)
    }
  }

  const isShowToolTip = async () => {
    const data = await AsyncStorage.getItem('showMidLevelToolTip')

    console.log('showMidLevelToolTip', data)
    if (data !== '0') {
      AsyncStorage.setItem('showMidLevelToolTip', '0')
      showToolTip(true)
    }
    // await AsyncStorage.removeItem('mail')
  }

  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

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
            // borderBottomColor: COLORS.borderClr,
            // borderBottomWidth: 1,
            // paddingBottom: 25,
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
                <Pressable
                  key={index}
                  onPress={() => handleSelect(item.styles)}
                  style={{
                    paddingVertical: 4,
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
                </Pressable>
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
                <Pressable
                  key={index}
                  onPress={() => handleSelect(item.styles)}
                  style={{
                    paddingVertical: 4,
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
                </Pressable>
              )}
            />
          )}
        </View>
      </Animated.View>
      {/* <Animated.View
        entering={BounceInUp.duration(800)}
        exiting={BounceOutUp.duration(700)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 10,
        }}
      >
        <Pressable
          onPress={() => setDropDown(false)}
          style={{
            backgroundColor: COLORS.iconsNormalClr,
            width: 42,
            height: 42,
            borderRadius: 50,
            padding: 10,
          }}
        >
          <CloseIcon />
        </Pressable>
      </Animated.View> */}
      <MidLevelTooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
    </LinearGradient>
  )
}

export default SelectStyle
