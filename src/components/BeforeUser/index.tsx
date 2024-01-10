import { View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../Button'
import Languages from '../../pages/Navigation/StackNavigation/Languages'
import Currency from '../../pages/Navigation/StackNavigation/Currency'
import { userStore } from '../../store/userStore'
import Skintone from '../Medium/Avatar/Skintone'
import Gender from '../Medium/Avatar/Gender'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { tooltipDisableStore } from '../../store/TooltipDisable'

const { width } = Dimensions.get('window')

const BeforeUser: React.FC = () => {
  const slideValue = useSharedValue(0)
  const updateConfirmDetails = userStore((state) => state.updateConfirmDetails)
  const avatar = userStore((store) => store.avatar)
  const updateAnimation = userStore((store) => store.updateAnimation)
  const createAvatarAnimationFinished = userStore((store) => store.createAvatarAnimationFinished)
  const [steps, setSteps] = useState(0)
  const disable = tooltipDisableStore((state) => state.disable)

  const slideX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideValue.value * 400 }], // Slide 400 units (assuming a screen width of 400)
    }
  })
  const handleDecreaseSteps = () => {
    if (steps >= 0) {
      setSteps(steps - 1)
      slideValue.value = withSequence(
        withTiming(-1, { duration: 400 }), // Slide out
        withTiming(0, { duration: 400 }),
      )
    }
  }
  const handleIncreaseSteps = () => {
    if (steps <= 3) {
      setSteps(steps + 1)
      slideValue.value = withSequence(
        withTiming(1, { duration: 400 }), // Slide out
        withTiming(0, { duration: 400 }), // Slide back to original state
      )
    }
  }

  return (
    <Animated.View style={[slideX, { flex: 1 }]}>
      {steps === 0 && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            padding: 24,
            flex: 1,
          }}
        >
          <Gender />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              padding: 24,
            }}
          >
            {/* <CustomButton style={{ width: 180 }} text='Previous' onPress={() => setSteps(0)} /> */}
            <CustomButton
              disabled={!avatar?.gender}
              style={{ width: width / 1.3 }}
              text='Next'
              onPress={handleIncreaseSteps}
            />
          </View>
        </View>
      )}
      {steps === 1 && (
        <>
          <Skintone />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              padding: 24,
              marginTop: -10,
            }}
          >
            <CustomButton
              style={{ width: width / 2.4 }}
              text='Previous'
              onPress={() => {
                updateAnimation(false)
                handleDecreaseSteps()
              }}
              disabled={!disable}
            />
            <CustomButton
              style={{ width: width / 2.4 }}
              disabled={!createAvatarAnimationFinished}
              text='Next'
              onPress={handleIncreaseSteps}
            />
          </View>
        </>
      )}

      {steps === 2 && (
        <>
          <Languages />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              padding: 24,
            }}
          >
            <CustomButton
              style={{ width: width / 2.4 }}
              text='Previous'
              onPress={handleDecreaseSteps}
              disabled={!disable}
            />
            <CustomButton
              style={{ width: width / 2.4 }}
              text='Next'
              onPress={handleIncreaseSteps}
              disabled={!disable}
            />
          </View>
        </>
      )}
      {steps === 3 && (
        <>
          <Currency />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              padding: 24,
            }}
          >
            <CustomButton
              style={{ width: width / 2.4 }}
              text='Previous'
              onPress={handleDecreaseSteps}
              disabled={!disable}
            />
            <CustomButton
              style={{ width: width / 2.4 }}
              text='Confirm'
              onPress={() => updateConfirmDetails(true)}
              disabled={!disable}
            />
          </View>
        </>
      )}
    </Animated.View>
  )
}

export default BeforeUser
