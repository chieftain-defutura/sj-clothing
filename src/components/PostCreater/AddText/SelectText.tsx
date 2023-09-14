import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import LeftArrow from '../../../assets/icons/LeftArrow'

interface ISelectText {
  navigation: any
}
const SelectText: React.FC<ISelectText> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
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
        <Pressable onPress={() => navigation.navigate('SelectSizeAndColor')}>
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
        <View
          style={{ borderRadius: 50, padding: 20, backgroundColor: COLORS.backgroundSecondaryClr }}
        >
          <Text style={{ fontSize: 32 }}>Aa</Text>
        </View>
        <View
          style={{ borderRadius: 50, padding: 20, backgroundColor: COLORS.backgroundSecondaryClr }}
        >
          <Text style={{ fontSize: 32 }}>Bb</Text>
        </View>
        <View
          style={{ borderRadius: 50, padding: 20, backgroundColor: COLORS.backgroundSecondaryClr }}
        >
          <Text style={{ fontSize: 32 }}>Cc</Text>
        </View>
        <View
          style={{ borderRadius: 50, padding: 20, backgroundColor: COLORS.backgroundSecondaryClr }}
        >
          <Text style={{ fontSize: 32 }}>Dd</Text>
        </View>
      </View>
    </View>
  )
}

export default SelectText

const styles = StyleSheet.create({})
