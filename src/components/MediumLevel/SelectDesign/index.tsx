import { FlatList, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'

interface ISelectDesign {
  designs: {
    hashTag: string
    image: any
  }[]
  isHashtag: string
  isImage: number
  isDone: boolean
  setDone: React.Dispatch<React.SetStateAction<boolean>>
  setImage: React.Dispatch<React.SetStateAction<number>>
  setHashtag: React.Dispatch<React.SetStateAction<string>>
  setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectDesign: React.FC<ISelectDesign> = ({
  designs,
  isHashtag,
  isImage,
  isDone,
  setOpenDesign,
  setHashtag,
  setImage,
  setDone,
}) => {
  const uniqueArr = [...new Map(designs.map((v) => [v.hashTag, v])).values()]
  const FilteredData =
    isHashtag === '' ? designs : designs.filter((design) => design.hashTag === isHashtag)
  return (
    <Animated.View
      entering={SlideInDown.duration(800)}
      exiting={SlideOutDown.duration(800)}
      style={{
        backgroundColor: COLORS.iconsNormalClr,
        padding: 24,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'absolute',
        bottom: 0,
        flex: 1,
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
          <Text style={{ fontSize: 16, color: COLORS.textClr, fontFamily: 'Arvo-Regular' }}>
            Select Design
          </Text>
        </View>
        <Pressable onPress={() => setDone(true)}>
          <CloseIcon width={20} height={20} />
        </Pressable>
      </View>

      <Text style={{ fontSize: 10, color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}>
        MOST SEARCHES
      </Text>
      <View style={{ paddingVertical: 16 }}>
        <FlatList
          data={uniqueArr}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 15,
            // paddingVertical: 5,
          }}
          horizontal
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setHashtag(item.hashTag), setImage(0)
              }}
              style={{
                borderColor:
                  isHashtag === item.hashTag ? COLORS.textSecondaryClr : COLORS.textTertiaryClr,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 50,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  color:
                    isHashtag === item.hashTag ? COLORS.textSecondaryClr : COLORS.textTertiaryClr,
                  fontFamily: 'Gilroy-Regular',
                  width: 'auto',
                  textAlign: 'center',
                }}
              >
                #{item.hashTag}
              </Text>
            </Pressable>
          )}
        />
      </View>
      <View style={{ borderWidth: 1, borderColor: COLORS.borderClr }}></View>
      <FlatList
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 16,
        }}
        data={FilteredData}
        horizontal
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              setImage(index), setDone(true)
            }}
            style={{
              backgroundColor: COLORS.cardClr,
              padding: 5,
              borderRadius: 5,
              borderColor: isImage === index ? COLORS.textSecondaryClr : 'red',
              borderWidth: isImage === index ? 1 : 0,
            }}
          >
            <Image style={{ width: 100, height: 100 }} source={{ uri: item.image }} />
          </Pressable>
        )}
      />
    </Animated.View>
  )
}

export default SelectDesign

const styles = StyleSheet.create({})
