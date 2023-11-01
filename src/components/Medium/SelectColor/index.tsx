import React from 'react'
import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'

import { IMidlevel } from '../../../constant/types'
import { COLORS, dropDownGradient } from '../../../styles/theme'

interface ISelectColor {
  isDropDown: boolean
  isColor: string
  data: IMidlevel
  handleIncreaseSteps: () => void
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setColor: React.Dispatch<React.SetStateAction<string>>
}

const SelectColor: React.FC<ISelectColor> = ({
  isDropDown,
  data,
  setDropDown,
  setColor,
  handleIncreaseSteps,
}) => {
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
              style={{
                textAlign: 'center',
                fontFamily: 'Gilroy-Medium',
                paddingVertical: 8,
                color: COLORS.textClr,
              }}
            >
              Colors
            </Text>
            <FlatList
              data={data.colors}
              horizontal
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 28,
                paddingVertical: 18,
              }}
              // columnWrapperStyle={{
              //   display: 'flex',
              //   flexDirection: 'row',
              //   justifyContent: 'space-between',
              //   // alignItems: 'center',
              //   columnGap: 8,
              // }}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => {
                    setColor(item), setDropDown(false)
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
                        backgroundColor: `${item}`,
                        borderRadius: 100,
                        padding: 23,
                      }}
                    ></View>
                  </View>
                </Pressable>
              )}
            />
          </Animated.View>
        </Animated.View>
      )}
    </LinearGradient>
  )
}

export default SelectColor

const styles = StyleSheet.create({
  selectColorContainer: {},
})
