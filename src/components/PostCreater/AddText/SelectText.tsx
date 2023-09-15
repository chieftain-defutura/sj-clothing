import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import LeftArrow from '../../../assets/icons/LeftArrow'

interface ISelectText {
  navigation: any
}

const Data = [
  { content: 'Aa', fontFamily: 'Arvo-Regular' },
  { content: 'Bb', fontFamily: 'Gilroy-Regular' },
  { content: 'Cc', fontFamily: 'Montserrat-Regular' },
  { content: 'Dd', fontFamily: 'Arvo-Regular' },
]
const SelectText: React.FC<ISelectText> = ({ navigation }) => {
  const [isFont, setFont] = useState('Aa')
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
        <Pressable onPress={() => navigation.navigate('AddText')}>
          <LeftArrow width={24} height={24} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ProductAndCaption')}>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Done</Text>
        </Pressable>
      </View>
      <View
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 64 }}
      >
        <Image source={require('../../../assets/images/text-tshirt.png')} />
      </View>
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
            onPress={() => setFont(font.content)}
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

const styles = StyleSheet.create({})
