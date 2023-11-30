import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatList } from 'react-native-gesture-handler'
import { Pressable, Text, View } from 'react-native'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
import { IMidlevel } from '../../../constant/types'
import { COLORS, dropDownGradient } from '../../../styles/theme'
import { useTranslation } from 'react-i18next'
import { userStore } from '../../../store/userStore'

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
          <FlatList
            data={data.filter((f) => f.gender.toLowerCase() === avatar.gender?.toLowerCase())}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              gap: 38,
              paddingVertical: 8,
            }}
            // columnWrapperStyle={{
            //   display: 'flex',
            //   flexDirection: 'row',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   flexGrow: 1,
            //   gap: 65,
            //   paddingVertical: 5,
            // }}

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
    </LinearGradient>
  )
}

export default SelectStyle
