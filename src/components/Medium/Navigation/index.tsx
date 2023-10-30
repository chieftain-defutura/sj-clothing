import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LeftArrow from '../../../assets/icons/LeftArrow'
import Animated, {
  BounceIn,
  BounceOut,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import { COLORS } from '../../../styles/theme'

interface INavigation {
  steps: number
  slideValue: SharedValue<number>
  isOpenDesign: boolean

  handleIncreaseSteps: () => void
  handleDecreaseSteps: () => void
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
}

const Navigation: React.FC<INavigation> = ({
  steps,
  slideValue,
  isOpenDesign,
  setOpenDesign,
  handleIncreaseSteps,
  handleDecreaseSteps,
  setDropDown,
}) => {
  const slideX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideValue.value * 400 }], // Slide 400 units (assuming a screen width of 400)
    }
  })
  return (
    <Animated.View style={slideX}>
      {isOpenDesign && (
        <View style={styles.Navigator}>
          <Animated.View entering={BounceIn.duration(800)} exiting={BounceOut}>
            <LeftArrow width={24} height={24} />
          </Animated.View>
          <Pressable
            onPress={() => {
              setOpenDesign(false), handleDecreaseSteps()
            }}
          >
            <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}>Done</Text>
          </Pressable>
        </View>
      )}

      {!isOpenDesign && (
        <View
          style={[
            styles.Navigator,
            {
              justifyContent: steps === 5 ? 'flex-start' : 'space-between',
              gap: steps === 5 ? 70 : 0,
            },
          ]}
        >
          <Pressable onPress={handleDecreaseSteps}>
            <Animated.View>
              <ArrowCircleLeft width={24} height={24} />
            </Animated.View>
          </Pressable>
          {steps !== 5 && (
            <Pressable
              onPress={() => (steps !== 4 ? setDropDown(true) : handleIncreaseSteps())}
              style={styles.Dropdown}
            >
              <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                {steps === 1 && 'Select Style'}
                {steps === 2 && 'Select Size'}
                {steps === 3 && 'Select Color'}
                {steps === 4 && 'Add more'}
              </Text>

              {steps !== 4 && <DropDownArrowIcon />}
            </Pressable>
          )}
          {steps == 5 && (
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <Pressable onPress={handleIncreaseSteps} style={styles.Dropdown}>
                <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                  {steps === 5 && 'Add Image'}
                </Text>
              </Pressable>
              <Pressable onPress={handleIncreaseSteps} style={styles.Dropdown}>
                <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                  {steps === 5 && 'Add Text'}
                </Text>
              </Pressable>
            </View>
          )}
          {steps !== 4 && steps !== 5 && (
            <Pressable onPress={handleIncreaseSteps}>
              <View>
                <ArrowCircleRight width={24} height={24} />
              </View>
            </Pressable>
          )}
        </View>
      )}
    </Animated.View>
  )
}

export default Navigation

const styles = StyleSheet.create({
  Navigator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  Dropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
})
