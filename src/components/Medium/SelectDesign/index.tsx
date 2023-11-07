import { FlatList, Pressable, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import { IDesigns } from '../../../constant/types'
import { useTranslation } from 'react-i18next'

interface ISelectDesign {
  isDone: boolean
  designs: IDesigns[]
  isImageOrText: {
    title: string
    position: string
    designs: {
      hashtag: string
      image: string
    }
  }
  setDone: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
  setImageOrText: React.Dispatch<
    React.SetStateAction<{
      title: string
      position: string
      designs: {
        hashtag: string
        image: string
      }
    }>
  >
}
const { height, width } = Dimensions.get('window')
const SelectDesign: React.FC<ISelectDesign> = ({
  designs,
  isImageOrText,
  isDone,
  setOpenDesign,
  setImageOrText,
  setDone,
}) => {
  const { t } = useTranslation('midlevel')
  const uniqueArr = [...new Map(designs?.map((v) => [v.hashTag, v])).values()]
  const FilteredData =
    isImageOrText.designs.hashtag === ''
      ? designs
      : designs?.filter((design) => design.hashTag === isImageOrText.designs.hashtag)
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
        zIndex: 10,
        flex: 1,
        width: width,
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
            {t('Select Design')}
          </Text>
        </View>
        <Pressable onPress={() => setOpenDesign(false)}>
          <CloseIcon width={20} height={20} />
        </Pressable>
      </View>

      {/* <Text style={{ fontSize: 10, color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}>
        MOST SEARCHES
      </Text> */}
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
              onPress={() =>
                setImageOrText((prevState) => ({
                  ...prevState,
                  designs: { hashtag: item.hashTag, image: isImageOrText.designs.image },
                }))
              }
              style={{
                borderColor:
                  isImageOrText.designs.hashtag === item.hashTag
                    ? COLORS.textSecondaryClr
                    : COLORS.textTertiaryClr,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 50,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  color:
                    isImageOrText.designs.hashtag === item.hashTag
                      ? COLORS.textSecondaryClr
                      : COLORS.textTertiaryClr,
                  fontFamily: 'Gilroy-Regular',
                  width: 'auto',
                  textAlign: 'center',
                }}
              >
                {item.hashTag}
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
        data={FilteredData?.filter((f) => f.activePost === true)}
        horizontal
        renderItem={({ item, index }) => (
          <View key={index}>
            <Pressable
              onPress={() => {
                setImageOrText((prevState) => ({
                  ...prevState,
                  designs: { hashtag: isImageOrText.designs.hashtag, image: item.Images },
                })),
                  setDone(true)
              }}
              style={{
                backgroundColor: COLORS.cardClr,
                padding: 5,
                borderRadius: 5,
                borderColor:
                  isImageOrText.designs.image === item.Images ? COLORS.textSecondaryClr : 'red',
                borderWidth: isImageOrText.designs.image === item.Images ? 1 : 0,
              }}
            >
              <Image
                style={{ width: 100, height: 100, objectFit: 'cover' }}
                source={{ uri: item.Images }}
              />
            </Pressable>
          </View>
        )}
      />
    </Animated.View>
  )
}

export default SelectDesign

const styles = StyleSheet.create({})
