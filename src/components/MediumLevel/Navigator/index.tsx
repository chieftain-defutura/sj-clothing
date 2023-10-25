import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, Animated as ReactAnimated, StyleSheet, Text, View, Share } from 'react-native'
import { COLORS } from '../../../styles/theme'
import LeftArrow from '../../../assets/icons/LeftArrow'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import ShareArrow from '../../../assets/icons/ShareArrow'
import Animated, {
  BounceIn,
  BounceOut,
  SharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { IMidlevel } from '../../../constant/types'

interface INavigator {
  steps: number
  isOpenDesign: boolean
  isDone: boolean
  data: IMidlevel
  slideValue: SharedValue<number>
  handleIncreaseSteps: () => void
  handleDecreaseSteps: () => void
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setImageOrText: React.Dispatch<
    React.SetStateAction<{
      title: string
      position: string
      designs: {
        hashtag: string
        image: string
      }
    }>
  >
  setDone: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
}

const Navigator: React.FC<INavigator> = ({
  steps,
  data,
  handleDecreaseSteps,
  handleIncreaseSteps,
  setDropDown,
  setImageOrText,
  setOpenDesign,
  isOpenDesign,
  isDone,
  slideValue,
  setDone,
}) => {
  const url = 'https://www.youtube.com/watch?v=lTxn2BuqyzU'

  const slideX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideValue.value * 400 }], // Slide 400 units (assuming a screen width of 400)
    }
  })

  const share = async () => {
    try {
      const result = await Share.share({ message: 'Bug:' + `\n` + url })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with active type', result.activityType)
        } else {
          console.log('shared')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Animated.View style={[styles.Navigator, slideX]}>
      {isOpenDesign && (
        <Pressable
          disabled={steps === 1}
          onPress={() => (isDone ? setDone(false) : setOpenDesign(false))}
        >
          <Animated.View entering={BounceIn.duration(800)} exiting={BounceOut}>
            <LeftArrow width={24} height={24} />
          </Animated.View>
        </Pressable>
      )}

      {!isOpenDesign && (
        <Pressable onPress={handleDecreaseSteps}>
          <Animated.View>
            <ArrowCircleLeft width={24} height={24} />
          </Animated.View>
        </Pressable>
      )}

      {steps !== 5 && (
        <>
          {!isOpenDesign && (
            <>
              {steps !== 4 && (
                <View>
                  <Pressable
                    onPress={() => {
                      setDropDown(true),
                        setImageOrText((prevState) => ({
                          ...prevState,
                          title: 'design-images',
                        }))
                    }}
                    style={styles.Dropdown}
                  >
                    {steps === 1 && (
                      <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                        Select Style
                      </Text>
                    )}
                    {steps === 2 && (
                      <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                        Select Size
                      </Text>
                    )}
                    {steps === 3 && (
                      <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                        Select Color
                      </Text>
                    )}

                    <DropDownArrowIcon />
                  </Pressable>
                </View>
              )}
              {steps === 4 && data.showDesign && (
                <View>
                  <Pressable
                    onPress={() => {
                      setDropDown(true),
                        setImageOrText((prevState) => ({
                          ...prevState,
                          title: 'text-images',
                        }))
                    }}
                    style={styles.Dropdown}
                  >
                    <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                      Add Image
                    </Text>
                    <DropDownArrowIcon />
                  </Pressable>
                </View>
              )}
              {steps === 4 && data.showTextDesign && (
                <View>
                  <Pressable
                    onPress={() => {
                      setDropDown(true),
                        setImageOrText((prevState) => ({
                          ...prevState,
                          title: 'text-images',
                        }))
                    }}
                    style={styles.Dropdown}
                  >
                    <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                      Add Text
                    </Text>
                    <DropDownArrowIcon />
                  </Pressable>
                </View>
              )}
            </>
          )}

          {!isOpenDesign && (
            <Pressable onPress={handleIncreaseSteps}>
              <View>
                <ArrowCircleRight width={24} height={24} />
              </View>
            </Pressable>
          )}
        </>
      )}

      {isDone && (
        <Pressable onPress={handleIncreaseSteps}>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}>Done</Text>
        </Pressable>
      )}

      {steps === 5 && (
        <Pressable onPress={share}>
          <ShareArrow width={24} height={24} />
        </Pressable>
      )}
    </Animated.View>
  )
}

export default Navigator

const styles = StyleSheet.create({
  Navigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
