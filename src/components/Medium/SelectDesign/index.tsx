import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import { IDesigns } from '../../../constant/types'
import { useTranslation } from 'react-i18next'
import { userStore } from '../../../store/userStore'

interface ISelectDesign {
  color: string
  isDone: boolean
  designs: IDesigns[]
  isImageOrText: {
    title: string
    position: string
    rate: number
    designs: {
      hashtag: string
      image: string
      originalImage: string
    }
  }
  setDone: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
  setImageOrText: React.Dispatch<
    React.SetStateAction<{
      title: string
      position: string
      rate: number
      designs: {
        hashtag: string
        image: string
        originalImage: string
      }
    }>
  >
}
const { width } = Dimensions.get('window')
const SelectDesign: React.FC<ISelectDesign> = ({
  designs,
  isImageOrText,
  setOpenDesign,
  setImageOrText,
  setDone,
  color,
}) => {
  const { t } = useTranslation('midlevel')
  const rate = userStore((state) => state.rate)
  const currency = userStore((state) => state.currency)

  const uniqueArr = [...new Map(designs?.map((v) => [v.hashTag, v])).values()]
  console.log('uniqueArr', uniqueArr)

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
          <Text
            allowFontScaling={false}
            style={{ fontSize: 16, color: COLORS.textClr, fontFamily: 'Arvo-Regular' }}
          >
            {t('Select Design')}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setOpenDesign(false)}>
          <CloseIcon width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 14, color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}
        >
          {isImageOrText.position} position costs
        </Text>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 14, color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}
        >
          {isImageOrText.position === 'Front' || 'Back'
            ? (
                Number(
                  FilteredData[0]?.imagePrices ? FilteredData[0]?.imagePrices?.FrontAndBack : '0',
                ) * (rate as number)
              ).toFixed(2)
            : (
                Number(
                  FilteredData[0]?.imagePrices ? FilteredData[0]?.imagePrices?.LeftAndRight : '0',
                ) * (rate as number)
              ).toFixed(2)}
        </Text>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 14, color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}
        >
          {currency.symbol}
        </Text>
      </View>
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
                  designs: {
                    hashtag: item.hashTag,
                    image: isImageOrText.designs.image,
                    originalImage: isImageOrText.designs.originalImage,
                  },
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
                allowFontScaling={false}
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
      {FilteredData.length ? (
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
                    rate:
                      isImageOrText.position === 'Front' || 'Back'
                        ? Number(item?.imagePrices?.FrontAndBack)
                        : Number(item?.imagePrices?.LeftAndRight),
                    designs: {
                      hashtag: item.hashTag,
                      image: item.Images,
                      originalImage: item.originalImages.filter((f) => f.colorCode === color)?.[0]
                        .url,
                    },
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
                  alt='select-img'
                />
              </Pressable>
            </View>
          )}
        />
      ) : (
        <Text
          allowFontScaling={false}
          style={{
            color: COLORS.textClr,
            fontFamily: 'Gilroy-Regular',
            width: 'auto',
            textAlign: 'center',
            paddingTop: 20,
          }}
        >
          No designs available right now
        </Text>
      )}
    </Animated.View>
  )
}

export default SelectDesign

const styles = StyleSheet.create({})
