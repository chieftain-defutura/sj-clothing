import { StyleSheet, Text, View, Pressable, FlatList, Dimensions } from 'react-native'
import React from 'react'
import CloseIcon from '../../../assets/icons/Close'
import { COLORS } from '../../../styles/theme'
import Animated, {
  BounceInUp,
  BounceOutUp,
  FlipInXDown,
  FlipOutXDown,
} from 'react-native-reanimated'

interface ISelectStyle {
  isType: string
  isDropDown: boolean
  isSelectedStyle: string
  data?: {
    title: string
    type: {
      name: string
      value: string
    }[]
  }
  handleIncreaseSteps: () => void
  setType: React.Dispatch<React.SetStateAction<string>>
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedStyle: React.Dispatch<React.SetStateAction<string>>
}

const StyleShirtData = [
  {
    Title: 'Half sleeve',
    Image: '../../../assets/images/plain-shirt.png',
  },
  {
    Title: 'Round neck',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Sleeveless',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Full sleeve',
    Image: '../../../assets/images/plain-shirt.png',
  },
  {
    Title: 'V neck',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Polo',
    Image: '../../../assets/images/plain-shirt.png',
  },
]
const StyleTShirtData = [
  {
    Title: 'Half sleeve',
    Image: '../../../assets/images/plain-shirt.png',
  },
  {
    Title: 'Sleeveless',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Round neck',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Full sleeve',
    Image: '../../../assets/images/plain-shirt.png',
  },
  {
    Title: 'V neck',
    Image: '../../../assets/images/t-shirt.png',
  },
  {
    Title: 'Polo',
    Image: '../../../assets/images/plain-shirt.png',
  },
]

const { width } = Dimensions.get('window')

const SelectStyle: React.FC<ISelectStyle> = ({
  isDropDown,
  isSelectedStyle,
  isType,
  handleIncreaseSteps,
  setSelectedStyle,
  setDropDown,
  setType,
  data,
}) => {
  const handleSelect = (title: string) => {
    setSelectedStyle(title)
    handleIncreaseSteps()
  }
  return (
    <View style={styles.selectStyleContainer}>
      {isDropDown && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              top: 0,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
            },
          ]}
        >
          <Animated.View
            entering={FlipInXDown}
            exiting={FlipOutXDown.duration(400)}
            style={{
              backgroundColor: COLORS.iconsNormalClr,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 24,
                borderBottomColor: COLORS.borderClr,
                borderBottomWidth: 1,
                paddingBottom: 25,
                paddingTop: 15,
              }}
            >
              <Pressable onPress={() => setType('shirt')}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: isType === 'shirt' ? COLORS.iconsHighlightClr : COLORS.textTertiaryClr,
                  }}
                >
                  Shirt
                </Text>
              </Pressable>
              <Pressable onPress={() => setType('t-shirt')}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: isType === 't-shirt' ? COLORS.iconsHighlightClr : COLORS.textTertiaryClr,
                  }}
                >
                  T-Shirt
                </Text>
              </Pressable>
            </View>
            {isType === 'shirt' ? (
              <View
                style={{
                  padding: 16,
                }}
              >
                <FlatList
                  data={StyleShirtData}
                  numColumns={3}
                  columnWrapperStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexGrow: 1,
                    gap: 5,
                    paddingVertical: 5,
                  }}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => handleSelect(item.Title)}
                      style={{
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'left',
                          fontFamily: 'Gilroy-Medium',
                          color:
                            isSelectedStyle === item.Title
                              ? COLORS.textSecondaryClr
                              : COLORS.textTertiaryClr,
                        }}
                      >
                        {item.Title}
                      </Text>
                    </Pressable>
                  )}
                />
              </View>
            ) : (
              <View
                style={{
                  padding: 16,
                }}
              >
                <FlatList
                  data={StyleTShirtData}
                  numColumns={3}
                  columnWrapperStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexGrow: 1,
                    gap: 5,
                    paddingVertical: 5,
                  }}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => handleSelect(item.Title)}
                      style={{
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'left',
                          fontFamily: 'Gilroy-Medium',
                          color:
                            isSelectedStyle === item.Title
                              ? COLORS.textSecondaryClr
                              : COLORS.textTertiaryClr,
                        }}
                      >
                        {item.Title}
                      </Text>
                    </Pressable>
                  )}
                />
              </View>
            )}
          </Animated.View>
          <Animated.View
            entering={BounceInUp.duration(800)}
            exiting={BounceOutUp.duration(700)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
              zIndex: 10,
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

export default SelectStyle

const styles = StyleSheet.create({
  selectStyleContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: width,
    zIndex: 10,
  },
})
