import React, { useEffect, useState } from 'react'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native'
import { IMidlevel } from '../../../constant/types'
import { COLORS, dropDownGradient } from '../../../styles/theme'
import { useTranslation } from 'react-i18next'
import SelectColorTooltip from '../../Tooltips/MidLevel/SelectColor'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ISelectColor {
  isDropDown: boolean
  isColor: string
  isColorName: string
  data: IMidlevel
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setColor: React.Dispatch<React.SetStateAction<string>>
  setColorName: React.Dispatch<React.SetStateAction<string>>
}

const SelectColor: React.FC<ISelectColor> = ({
  isDropDown,
  data,
  setDropDown,
  setColor,
  setColorName,
}) => {
  const { t } = useTranslation('midlevel')
  const [toolTip, showToolTip] = useState(false)

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showSelectColorTooltip')

      if (data !== '8') {
        AsyncStorage.setItem('showSelectColorTooltip', '8')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  return (
    <LinearGradient
      colors={dropDownGradient}
      style={{ borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}
    >
      {isDropDown && (
        <Animated.View
          style={[
            {
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            },
          ]}
        >
          <Animated.View
            entering={FlipInXDown}
            exiting={FlipOutXDown.duration(400)}
            style={[
              {
                backgroundColor: 'rgba(191, 148, 228, 0.1)',
                borderBottomRightRadius: 50,
                borderBottomLeftRadius: 50,
                paddingHorizontal: 15,
              },
            ]}
          >
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                fontFamily: 'Gilroy-Medium',
                paddingVertical: 8,
                color: COLORS.textClr,
              }}
            >
              {t('Colors')}
            </Text>
            {data.colors.length <= 3 ? (
              <FlatList
                data={data.colors}
                columnWrapperStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                  paddingVertical: 8,
                  paddingBottom: 28,
                }}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <TouchableHighlight
                    key={index}
                    onPress={() => {
                      setColor(item.color), setDropDown(false), setColorName(item.colorName)
                    }}
                    activeOpacity={0.6}
                    underlayColor='rgba(70, 45, 133, 0.2)'
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 8,
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          borderColor: COLORS.textTertiaryClr,
                          borderWidth: 1,
                          padding: 1,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: `${item.color}`,
                            borderRadius: 100,
                            padding: 23,
                          }}
                        ></View>
                      </View>

                      <Text style={styles.ellipsisText} numberOfLines={1} ellipsizeMode='tail'>
                        {item.colorName}
                      </Text>
                    </View>
                  </TouchableHighlight>
                )}
              />
            ) : (
              <FlatList
                data={data.colors}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 38,
                  paddingVertical: 20,
                  paddingBottom: 28,
                }}
                renderItem={({ item, index }) => (
                  <TouchableHighlight
                    key={index}
                    onPress={() => {
                      setColor(item.color), setDropDown(false), setColorName(item.colorName)
                    }}
                    activeOpacity={0.6}
                    underlayColor='rgba(70, 45, 133, 0.2)'
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 8,
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          borderColor: COLORS.textTertiaryClr,
                          borderWidth: 1,
                          padding: 1,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: `${item.color}`,
                            borderRadius: 100,
                            padding: 23,
                          }}
                        ></View>
                      </View>
                      <Text style={styles.ellipsisText} numberOfLines={1} ellipsizeMode='tail'>
                        {item.colorName}
                      </Text>
                    </View>
                  </TouchableHighlight>
                )}
              />
            )}
          </Animated.View>
        </Animated.View>
      )}
      <SelectColorTooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
    </LinearGradient>
  )
}

export default SelectColor

const styles = StyleSheet.create({
  ellipsisText: {
    fontSize: 13,
    color: COLORS.textClr,
    marginTop: 6,
    textTransform: 'capitalize',
    fontFamily: 'Gilroy-Medium',
  },
})
