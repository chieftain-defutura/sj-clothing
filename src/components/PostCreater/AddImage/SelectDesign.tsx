import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import React from 'react'
import LeftArrow from '../../../assets/icons/LeftArrow'
import CloseIcon from '../../../assets/icons/Close'
import { COLORS } from '../../../styles/theme'

const MostSearchData = ['Bluebee', 'Round neck', 'Gold', 'Sleeve', 'V-neck', 'Polo']

const SelectDesign = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.iconsNormalClr,
        padding: 24,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 16 }}>Select Design</Text>
        </View>
        <Pressable>
          <CloseIcon width={20} height={20} />
        </Pressable>
      </View>

      <Text style={{ fontSize: 10 }}>MOST SEARCHES</Text>
      <View style={{ paddingVertical: 16 }}>
        <FlatList
          data={MostSearchData}
          numColumns={3}
          columnWrapperStyle={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 5,
            paddingVertical: 5,
          }}
          renderItem={(item) => (
            <View
              style={{
                borderColor: COLORS.textClr,
                borderWidth: 1,
                paddingHorizontal: 30,
                borderRadius: 50,
                paddingVertical: 4,
              }}
            >
              <Text>#{item.item}</Text>
            </View>
          )}
        />
      </View>

      <FlatList
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 16,
        }}
        data={MostSearchData}
        horizontal
        renderItem={(item) => (
          <View style={{ backgroundColor: COLORS.cardClr, padding: 5, borderRadius: 5 }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require('../../../assets/images/monkey-nft.png')}
            />
          </View>
        )}
      />
    </View>
  )
}

export default SelectDesign

const styles = StyleSheet.create({})
