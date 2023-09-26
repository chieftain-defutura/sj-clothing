import { StyleSheet, Text, View, Image, Pressable, FlatList, Dimensions } from 'react-native'
import React from 'react'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import CloseIcon from '../../../assets/icons/Close'
import { COLORS } from '../../../styles/theme'
import Animated, {
  BounceInUp,
  BounceOutUp,
  FlipInXDown,
  FlipOutXDown,
} from 'react-native-reanimated'

const Sizes = [
  {
    country: 'India',
    sizeVariant: [
      { size: 'M', measurement: '40', unit: 'cm' },
      { size: 'L', measurement: '42', unit: 'cm' },
      { size: 'XL', measurement: '44', unit: 'cm' },
      { size: 'XXL', measurement: '46', unit: 'cm' },
    ],
  },
  {
    country: 'America',
    sizeVariant: [
      { size: 'S', measurement: '38', unit: 'cm' },
      { size: 'M', measurement: '40', unit: 'cm' },
      { size: 'XL', measurement: '44', unit: 'cm' },
      { size: 'XXL', measurement: '46', unit: 'cm' },
    ],
  },
  {
    country: 'Russia',
    sizeVariant: [
      { size: 'S', measurement: '38', unit: 'cm' },
      { size: 'M', measurement: '40', unit: 'cm' },
      { size: 'L', measurement: '42', unit: 'cm' },
      { size: 'XXL', measurement: '46', unit: 'cm' },
    ],
  },
  {
    country: 'Japan',
    sizeVariant: [
      { size: 'M', measurement: '40', unit: 'cm' },
      { size: 'L', measurement: '42', unit: 'cm' },
      { size: 'XL', measurement: '44', unit: 'cm' },
      { size: 'XXL', measurement: '46', unit: 'cm' },
    ],
  },
  {
    country: 'China',
    sizeVariant: [
      { size: 'S', measurement: '38', unit: 'cm' },
      { size: 'M', measurement: '40', unit: 'cm' },
      { size: 'XXL', measurement: '46', unit: 'cm' },
    ],
  },
  {
    country: 'Sri Lanka',
    sizeVariant: [
      { size: 'S', measurement: '38', unit: 'cm' },
      { size: 'M', measurement: '40', unit: 'cm' },
      { size: 'L', measurement: '42', unit: 'cm' },
      { size: 'XL', measurement: '44', unit: 'cm' },
      { size: 'XXL', measurement: '46', unit: 'cm' },
    ],
  },
]

const { width } = Dimensions.get('window')

interface ISelectSize {
  isDropDown: boolean
  isSelectedSize: string
  // data?: {
  //   title: string
  //   type: {
  //     name: string
  //     value: string
  //   }[]
  // }
  isSelectCountry: string
  handleIncreaseSteps: () => void
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>
  setSelectCountry: React.Dispatch<React.SetStateAction<string>>
}

const SelectSize: React.FC<ISelectSize> = ({
  isDropDown,
  isSelectedSize,
  isSelectCountry,
  setDropDown,
  setSelectedSize,
  setSelectCountry,
  handleIncreaseSteps,
}) => {
  const handleSelect = (size: string) => {
    setSelectedSize(size)
    handleIncreaseSteps()
  }
  return (
    <View style={styles.selectSizeContainer}>
      {isDropDown && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            },
          ]}
        >
          <Animated.View
            entering={FlipInXDown}
            exiting={FlipOutXDown.duration(400)}
            style={[
              {
                backgroundColor: COLORS.iconsNormalClr,
                borderBottomRightRadius: 50,
                borderBottomLeftRadius: 50,
                paddingHorizontal: 15,
              },
            ]}
          >
            <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
              <Text style={{ paddingBottom: 16, fontSize: 14, color: COLORS.textClr }}>
                Select Country
              </Text>
              <FlatList
                data={Sizes}
                contentContainerStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                columnWrapperStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 5,
                  paddingVertical: 8,
                }}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <Pressable onPress={() => setSelectCountry(item.country)} key={index}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        color:
                          isSelectCountry === item.country
                            ? COLORS.textSecondaryClr
                            : COLORS.SecondaryTwo,
                      }}
                    >
                      {item.country}
                    </Text>
                  </Pressable>
                )}
              />

              <View
                style={{ borderWidth: 1, borderColor: COLORS.borderClr, marginVertical: 8 }}
              ></View>
              <Text
                style={{ paddingTop: 8, paddingBottom: 16, fontSize: 14, color: COLORS.textClr }}
              >
                Select Size
              </Text>
              {Sizes.filter(
                (country) => country.country.toLowerCase() === isSelectCountry.toLowerCase(),
              ).map((item, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    columnGap: 65,
                    rowGap: 16,
                  }}
                >
                  {item.sizeVariant?.map((sizes, index) => (
                    <Pressable onPress={() => handleSelect(sizes.size)} key={index}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          color:
                            isSelectedSize === sizes.size
                              ? COLORS.textSecondaryClr
                              : COLORS.SecondaryTwo,
                        }}
                      >
                        {sizes.size} - {sizes.measurement}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          </Animated.View>
          <Animated.View
            entering={BounceInUp.duration(800)}
            exiting={BounceOutUp.duration(500)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Pressable
              onPress={() => setDropDown(false)}
              style={{
                backgroundColor: COLORS.iconsNormalClr,
                width: 42,
                height: 42,
                borderRadius: 50,
                padding: 10,
                zIndex: 10,
              }}
            >
              <CloseIcon />
            </Pressable>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  )
}

export default SelectSize

const styles = StyleSheet.create({
  selectSizeContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: width,
  },
})
