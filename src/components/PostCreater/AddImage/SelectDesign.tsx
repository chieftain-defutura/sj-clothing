import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import LeftArrow from '../../../assets/icons/LeftArrow'

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
}
const SelectDesign: React.FC<ISelectDesign> = ({ navigation }) => {
  const [isOpen, setOpen] = useState(false)
  const [isNftImage, setNftImage] = useState(0)
  const [isStyleName, setStyleName] = useState('Bluebee')

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
        {isOpen ? (
          <>
            <Pressable onPress={() => setOpen(false)}>
              <LeftArrow width={24} height={24} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('AddText')}>
              <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}>Done</Text>
            </Pressable>
          </>
        ) : (
          <Pressable onPress={() => navigation.navigate('AddImage')}>
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
        <View
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
            <Pressable>
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
                      width: 100,
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
                onPress={() => setOpen(true)}
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
        </View>
      )}
    </View>
  )
}

export default SelectDesign

const styles = StyleSheet.create({})
