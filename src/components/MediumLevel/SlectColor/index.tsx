import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
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
  isSelectedColor: string
  handleIncreaseSteps: () => void
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>
}
const Colors = ['white', 'violet', 'blue', 'red', 'orange', 'green']
const { width } = Dimensions.get('window')
const SelectColor: React.FC<ISelectColor> = ({
  isDropDown,
  isSelectedColor,
  setDropDown,
  setSelectedColor,
  handleIncreaseSteps,
}) => {
  const navigation = useNavigation()
  const [isOpenModal, setOpenModal] = useState(false)

  console.log(isOpenModal)

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
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 15,
                  paddingVertical: 20,
                }}
              >
                {Colors.map((color, index) => (
                  <Pressable
                    onPress={() => {
                      setSelectedColor(color), setOpenModal(true)
                    }}
                    key={index}
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
                          backgroundColor: `${color}`,
                          // width: 40,
                          // height: 40,
                          borderRadius: 50,
                          padding: 23,
                        }}
                      ></View>
                    </View>
                    <Text
                      style={{
                        color:
                          isSelectedColor === color
                            ? COLORS.textSecondaryClr
                            : COLORS.textTertiaryClr,
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        fontFamily: 'Gilroy-Regular',
                      }}
                    >
                      {color}
                    </Text>
                  </Pressable>
                ))}
              </View>
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
