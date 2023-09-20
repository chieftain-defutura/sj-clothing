import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { PostCreationStore } from '../../../store/postCreationStore'

const MostSearchData = ['Bluebee', 'Round neck', 'Gold', 'Sleeve', 'V-neck', 'Polo']
const NftImage = [
  require('../../../assets/images/monkey-nft.png'),
  require('../../../assets/images/monkey-nft-1.png'),
  require('../../../assets/images/monkey-nft-2.png'),
  require('../../../assets/images/monkey-nft-3.png'),
  require('../../../assets/images/monkey-nft-4.png'),
  require('../../../assets/images/monkey-nft-5.png'),
]
interface ISelectDesign {
  navigation: any
  isStyleName: string
  isNftImage: number
  isSelect: string
  setImageAdded: React.Dispatch<React.SetStateAction<boolean>>
  setPostCreationSteps: React.Dispatch<React.SetStateAction<number>>
  setStyleName: React.Dispatch<React.SetStateAction<string>>
  setNftImage: React.Dispatch<React.SetStateAction<number>>
}
const SelectDesign: React.FC<ISelectDesign> = ({
  navigation,
  isNftImage,
  isStyleName,
  isSelect,
  setImageAdded,
  setPostCreationSteps,
  setNftImage,
  setStyleName,
}) => {
  const [isOpen, setOpen] = useState(false)
  const { setImage } = PostCreationStore()
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
        {isOpen ? (
          <>
            <Pressable onPress={() => setOpen(false)}>
              <LeftArrow width={24} height={24} />
            </Pressable>
            <Pressable
              onPress={() => {
                setPostCreationSteps(3),
                  setImage({ title: isSelect, design: { image: 0, name: isStyleName } })
              }}
            >
              <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}>Done</Text>
            </Pressable>
          </>
        ) : (
          <Pressable onPress={() => setImageAdded(false)}>
            <LeftArrow width={24} height={24} />
          </Pressable>
        )}
      </View>
      <View
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 64 }}
      >
        <Image source={require('../../../assets/images/added-image-shirt.png')} />
      </View>
      {!isOpen && (
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
            <Pressable onPress={() => setOpen(true)}>
              <CloseIcon width={20} height={20} />
            </Pressable>
          </View>

          <Text style={{ fontSize: 10, color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}>
            MOST SEARCHES
          </Text>
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
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setStyleName(item)}
                  style={{
                    borderColor:
                      isStyleName === item ? COLORS.textSecondaryClr : COLORS.textTertiaryClr,
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    borderRadius: 50,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color:
                        isStyleName === item ? COLORS.textSecondaryClr : COLORS.textTertiaryClr,
                      fontFamily: 'Gilroy-Regular',
                      width: 89,
                      textAlign: 'center',
                    }}
                  >
                    #{item}
                  </Text>
                </Pressable>
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
            data={NftImage}
            horizontal
            renderItem={(item) => (
              <Pressable
                onPress={() => {
                  setOpen(true), setNftImage(item.index)
                }}
                style={{
                  backgroundColor: COLORS.cardClr,
                  padding: 5,
                  borderRadius: 5,
                  borderColor: isNftImage === item.index ? COLORS.textSecondaryClr : 'red',
                  borderWidth: isNftImage === item.index ? 1 : 0,
                }}
              >
                <Image style={{ width: 100, height: 100 }} source={item.item} />
              </Pressable>
            )}
          />
        </Animated.View>
      )}
    </View>
  )
}

export default SelectDesign

const styles = StyleSheet.create({})
