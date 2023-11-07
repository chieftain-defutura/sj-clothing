import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatList } from 'react-native-gesture-handler'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'

import { IMidlevel } from '../../../constant/types'
import { COLORS, dropDownGradient } from '../../../styles/theme'
import { useTranslation } from 'react-i18next'

interface ISelectStyle {
  isSelectedStyle: string
  data: IMidlevel[]
  handleIncreaseSteps: () => void
  setSelectedStyle: React.Dispatch<React.SetStateAction<string>>
}

const SelectStyle: React.FC<ISelectStyle> = ({
  data,
  handleIncreaseSteps,
  isSelectedStyle,
  setSelectedStyle,
}) => {
  const { t } = useTranslation('midlevel')
  const handleSelect = (title: string) => {
    setSelectedStyle(title)
  }
  useEffect(() => {
    if (isSelectedStyle) {
      handleIncreaseSteps()
    }
  }, [isSelectedStyle])
  console.log(isSelectedStyle)
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
            data={data}
            numColumns={3}
            columnWrapperStyle={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
              gap: 65,
              paddingVertical: 5,
            }}
            renderItem={({ item, index }) => (
              <Pressable
                key={index}
                onPress={() => handleSelect(item.styles)}
                style={{
                  paddingVertical: 4,
                }}
              >
                <Text
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

const styles = StyleSheet.create({})