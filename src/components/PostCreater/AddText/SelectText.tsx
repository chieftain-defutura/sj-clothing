import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { PostCreationStore } from '../../../store/postCreationStore'

interface ISelectText {
  navigation: any
  isFont: string
  isTextColor: string
  isSelect: string
  fontFamily: string
  setTextAdded: React.Dispatch<React.SetStateAction<boolean>>
  setFont: React.Dispatch<React.SetStateAction<string>>
  setTextColor: React.Dispatch<React.SetStateAction<string>>
  setFontFamily: React.Dispatch<React.SetStateAction<string>>

  setPostCreationSteps: React.Dispatch<React.SetStateAction<number>>
}

const Data = [
  { content: 'Aa', fontFamily: 'Arvo-Regular' },
  { content: 'Bb', fontFamily: 'Gilroy-Regular' },
  { content: 'Cc', fontFamily: 'Montserrat-Regular' },
  { content: 'Dd', fontFamily: 'Arvo-Regular' },
]
const SelectText: React.FC<ISelectText> = ({
  navigation,
  setTextAdded,
  isFont,
  isTextColor,
  isSelect,
  fontFamily,
  setFont,
  setTextColor,
  setFontFamily,

  setPostCreationSteps,
}) => {
  const { setText } = PostCreationStore()
  return (
    <View style={{ flex: 1, backgroundColor: '#FFEFFF' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 18,
          paddingHorizontal: 16,
        }}
      >
        <Pressable onPress={() => setTextAdded(false)}>
          <LeftArrow width={24} height={24} />
        </Pressable>
        <Pressable
          onPress={() => {
            setPostCreationSteps(4),
              setText({
                title: isSelect,
                design: { color: isTextColor, font: fontFamily },
              })
          }}
        >
          <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Done</Text>
        </Pressable>
      </View>
      <View
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 64 }}
      >
        <Image source={require('../../../assets/images/text-tshirt.png')} />
      </View>
      {/* <View style={styles.container}>
        <MultiColorRangeSlider />
      </View> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
          padding: 24,
        }}
      >
        {Data.map((font, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setFont(font.content), setFontFamily(font.fontFamily)
            }}
            style={{
              borderRadius: 50,
              padding: 20,
              backgroundColor:
                isFont === font.content ? COLORS.fontBackgroundClr : COLORS.backgroundSecondaryClr,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                color: isFont === font.content ? COLORS.textSecondaryClr : COLORS.textClr,
                fontFamily: font.fontFamily,
              }}
            >
              {font.content}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SelectText

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
