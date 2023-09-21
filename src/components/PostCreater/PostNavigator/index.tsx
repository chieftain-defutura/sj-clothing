import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../../../styles/theme'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import { IPostCreationData } from '../../../store/postCreationStore'

interface IPostNavigator {
  title?: string
  navigation?: any
  nextStep?: number
  previousStep?: number
  setPostCreationSteps?: React.Dispatch<React.SetStateAction<number>> | any
  setDropDown?: React.Dispatch<React.SetStateAction<boolean>> | any
}

const PostNavigator: React.FC<IPostNavigator> = ({
  setDropDown,
  setPostCreationSteps,
  navigation,
  title,
  nextStep,
  previousStep,
}) => {
  return (
    <View style={styles.Navigator}>
      <Pressable
        onPress={() =>
          nextStep === 1
            ? navigation.navigate('Stack')
            : setPostCreationSteps(previousStep as number)
        }
      >
        <ArrowCircleLeft width={24} height={24} />
      </Pressable>
      {title && (
        <View>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Pressable onPress={() => setDropDown(true)} style={styles.Dropdown}>
              <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>{title}</Text>
              <DropDownArrowIcon />
            </Pressable>
          </Animated.View>
        </View>
      )}

      <Pressable
        onPress={() => {
          setPostCreationSteps(nextStep as number)
        }}
      >
        <View>
          <ArrowCircleRight width={24} height={24} />
        </View>
      </Pressable>
    </View>
  )
}

export default PostNavigator

const styles = StyleSheet.create({
  Navigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: -1,
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
