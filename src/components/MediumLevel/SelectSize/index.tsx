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
  isSize: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
    }
  }
  isGender: string
  data: any
  handleIncreaseSteps: () => void
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setSize: React.Dispatch<
    React.SetStateAction<{
      country: string
      sizeVarient: {
        size: string
        measurement: string
      }
    }>
  >
}

const SelectSize: React.FC<ISelectSize> = ({
  isDropDown,
  isSize,
  data,
  isGender,
  setDropDown,
  setSize,
  handleIncreaseSteps,
}) => {
  const filteredData = data[0].sizes
    .filter((f: { gender: string }) => f.gender.toLowerCase() === isGender.toLowerCase())
    .map((f: any) => f)

  const sizesData = filteredData
    .filter(
      (f: any) => f.gender.toLowerCase() === isGender.toLowerCase() && f.country === isSize.country,
    )
    .map((f: any) => f.sizeVarients)

  const handleSelect = (size: string, measurement: string) => {
    setSize((prevState) => ({
      ...prevState,
      sizeVarient: {
        measurement: measurement,
        size: size,
        unit: 'cm',
      },
    }))
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
                data={filteredData}
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
                  <Pressable
                    onPress={() =>
                      setSize((prevState) => ({
                        ...prevState,
                        country: item.country,
                      }))
                    }
                    key={index}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        color:
                          isSize.country === item.country
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
              {isSize.country && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    columnGap: 65,
                    rowGap: 16,
                  }}
                >
                  {sizesData[0].map((item: any, index: number) => (
                    <View key={index}>
                      {item.show && (
                        <Pressable
                          onPress={() => handleSelect(item.size, item.measurement)}
                          key={index}
                        >
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 12,
                              color:
                                isSize.sizeVarient.size === item.size
                                  ? COLORS.textSecondaryClr
                                  : COLORS.SecondaryTwo,
                            }}
                          >
                            {item.size} - {item.measurement} cm
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  ))}
                </View>
              )}
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
    zIndex: 1000,
  },
})
