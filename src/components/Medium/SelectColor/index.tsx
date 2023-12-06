import React from 'react'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import { IMidlevel } from '../../../constant/types'
import { COLORS, dropDownGradient } from '../../../styles/theme'
import { useTranslation } from 'react-i18next'

interface ISelectColor {
  isDropDown: boolean
  isColor: string
  data: IMidlevel
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setColor: React.Dispatch<React.SetStateAction<string>>
}

const SelectColor: React.FC<ISelectColor> = ({ isDropDown, data, setDropDown, setColor }) => {
  const { t } = useTranslation('midlevel')
  console.log('data', data.colors)
  console.log('fulldata', data)

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
                  gap: 40,
                  paddingVertical: 8,
                  paddingBottom: 28,
                }}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => {
                      setColor(item.color), setDropDown(false)
                    }}
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
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
                    <View>
                      <Text style={styles.ellipsisText} numberOfLines={1} ellipsizeMode='tail'>
                        {item.colorName}
                      </Text>
                    </View>
                  </Pressable>
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
                  <Pressable
                    onPress={() => {
                      setColor(item.color), setDropDown(false)
                    }}
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
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
                    <View>
                      <Text style={styles.ellipsisText} numberOfLines={1} ellipsizeMode='tail'>
                        {item.colorName}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            )}
          </Animated.View>
        </Animated.View>
      )}
    </LinearGradient>
  )
}

export default SelectColor

const styles = StyleSheet.create({
  ellipsisText: {
    width: 50,
    fontSize: 12,
    color: '#462D85',
    marginTop: 6,
    marginRight: -18,
  },
})
