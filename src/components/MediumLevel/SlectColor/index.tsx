import { StyleSheet, Text, View, Pressable, Dimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import Animated, {
  BounceInUp,
  BounceOutUp,
  FlipInXDown,
  FlipOutXDown,
} from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ColorNavigation from '../../../screens/ColorNavigation'
import { useNavigation } from '@react-navigation/native'

interface ISelectColor {
  isDropDown: boolean
  isColor: string
  data: any
  handleIncreaseSteps: () => void
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setColor: React.Dispatch<React.SetStateAction<string>>
}
const Colors = [
  { colorName: 'PaleVioletRed', hexCode: '#D87093' },
  { colorName: 'MidnightBlue', hexCode: '#191970' },
  { colorName: 'Maroon', hexCode: '#800000' },
  { colorName: 'GoldenRod', hexCode: '#DAA520' },
  { colorName: 'DarkSlateGray', hexCode: '#2F4F4F' },
  { colorName: 'DarkKhaki', hexCode: '#BDB76B' },
]
const { width } = Dimensions.get('window')
const SelectColor: React.FC<ISelectColor> = ({
  isDropDown,
  isColor,
  data,
  setDropDown,
  setColor,
  handleIncreaseSteps,
}) => {
  const navigation = useNavigation()
  const [isOpenModal, setOpenModal] = useState(false)
  return (
    <View style={styles.selectColorContainer}>
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
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Gilroy-Medium',
                borderBottomColor: COLORS.borderClr,
                borderBottomWidth: 2,
                paddingVertical: 20,
                color: COLORS.textClr,
              }}
            >
              Colors
            </Text>
            <FlatList
              data={data[0].colors}
              numColumns={4}
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 8,
                paddingVertical: 16,
              }}
              columnWrapperStyle={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
                columnGap: 26,
              }}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => {
                    setColor(item), setOpenModal(true), setDropDown(false)
                  }}
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      borderColor: COLORS.textTertiaryClr,
                      borderWidth: 1,
                      padding: 1,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: `${item}`,
                        borderRadius: 100,
                        padding: 23,
                      }}
                    ></View>
                  </View>
                  {/* <Text
                    style={{
                      color:
                        isColor.hexCode === item.hexCode
                          ? COLORS.textSecondaryClr
                          : COLORS.textTertiaryClr,
                      textAlign: 'center',
                      textTransform: 'capitalize',
                      fontFamily: 'Gilroy-Regular',
                    }}
                  >
                    {item.colorName}
                  </Text> */}
                </Pressable>
              )}
            />
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
      <ColorNavigation
        isVisible={isOpenModal}
        navigation={navigation}
        onClose={() => setOpenModal(false)}
        handleIncreaseSteps={handleIncreaseSteps}
      />
    </View>
  )
}

export default SelectColor

const styles = StyleSheet.create({
  selectColorContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: width,
    zIndex: 10,
  },
})
