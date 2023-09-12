import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import LeftArrow from '../../../assets/icons/LeftArrow'

const MostSearchData = ['Bluebee', 'Round neck', 'Gold', 'Sleeve', 'V-neck', 'Polo']
interface ISelectDesign {
  navigation: any
}
const SelectDesign: React.FC<ISelectDesign> = ({ navigation }) => {
  const [isOpen, setOpen] = useState(false)
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
              <Text style={{ color: COLORS.textClr }}>Done</Text>
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
              <Text style={{ fontSize: 16, color: COLORS.textClr }}>Select Design</Text>
            </View>
            <Pressable>
              <CloseIcon width={20} height={20} />
            </Pressable>
          </View>

          <Text style={{ fontSize: 10, color: COLORS.textClr }}>MOST SEARCHES</Text>
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
                    borderColor: COLORS.textTertiaryClr,
                    borderWidth: 1,
                    paddingHorizontal: 30,
                    borderRadius: 50,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: COLORS.textTertiaryClr }}>#{item.item}</Text>
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
              <Pressable
                onPress={() => setOpen(true)}
                style={{ backgroundColor: COLORS.cardClr, padding: 5, borderRadius: 5 }}
              >
                <Image
                  style={{ width: 100, height: 100 }}
                  source={require('../../../assets/images/monkey-nft.png')}
                />
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
