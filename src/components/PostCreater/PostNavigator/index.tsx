// import React, { useCallback, useEffect } from 'react'
// import { Pressable, StyleSheet, Text, View, Share } from 'react-native'

// import { COLORS } from '../../../styles/theme'
// import LeftArrow from '../../../assets/icons/LeftArrow'
// import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
// import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
// import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
// import ShareArrow from '../../../assets/icons/ShareArrow'
// import Animated, {
//   BounceIn,
//   BounceOut,
//   SharedValue,
//   useAnimatedStyle,
// } from 'react-native-reanimated'

// interface IPostNavigator {
//   steps: number
//   isOpenDesign: boolean
//   isDone: boolean
//   data: any
//   slideValue: SharedValue<number>
//   handleIncreaseSteps: () => void
//   handleDecreaseSteps: () => void
//   setDropDown: React.Dispatch<React.SetStateAction<boolean>>
//   setImageOrText: React.Dispatch<
//     React.SetStateAction<{
//       title: string
//       image: string
//       position: string
//     }>
//   >
//   setDone: React.Dispatch<React.SetStateAction<boolean>>
//   setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
// }

// const PostNavigator: React.FC<IPostNavigator> = ({
//   steps,
//   handleDecreaseSteps,
//   handleIncreaseSteps,
//   setDropDown,
//   setImageOrText,
//   setOpenDesign,
//   isOpenDesign,
//   isDone,
//   slideValue,
//   setDone,
// }) => {
//   const url = 'https://www.youtube.com/watch?v=lTxn2BuqyzU'
//   const share = async () => {
//     try {
//       const result = await Share.share({ message: 'Bug:' + `\n` + url })
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           console.log('shared with active type', result.activityType)
//         } else {
//           console.log('shared')
//         }
//       } else if (result.action === Share.dismissedAction) {
//         console.log('dismissed')
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const slideX = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: slideValue.value * 400 }], // Slide 400 units (assuming a screen width of 400)
//     }
//   })
//   return (
//     <Animated.View style={[styles.PostNavigator, slideX]}>
//       {isOpenDesign && (
//         <Pressable onPress={() => (isDone ? setDone(false) : setOpenDesign(false))}>
//           <Animated.View>
//             <LeftArrow width={24} height={24} />
//           </Animated.View>
//         </Pressable>
//       )}

//       {!isOpenDesign && (
//         <Pressable onPress={handleDecreaseSteps}>
//           <Animated.View>
//             <ArrowCircleLeft width={24} height={24} />
//           </Animated.View>
//         </Pressable>
//       )}

//       {steps !== 6 && (
//         <>
//           {!isOpenDesign && steps !== 5 && (
//             <>
//               <View>
//                 <Pressable
//                   onPress={() => {
//                     setDropDown(true),
//                       setImageOrText((prevState) => ({
//                         ...prevState,
//                         title: 'image',
//                       }))
//                   }}
//                   style={styles.Dropdown}
//                 >
//                   {steps === 1 && (
//                     <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
//                       Select Style
//                     </Text>
//                   )}
//                   {steps === 2 && (
//                     <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
//                       Select Size
//                     </Text>
//                   )}
//                   {steps === 3 && (
//                     <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
//                       Select Color
//                     </Text>
//                   )}
//                   {steps === 4 && (
//                     <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
//                       Add Image
//                     </Text>
//                   )}

//                   <DropDownArrowIcon />
//                 </Pressable>
//               </View>
//               {steps === 4 && (
//                 <View>
//                   <Pressable
//                     onPress={() => {
//                       setDropDown(true),
//                         setImageOrText((prevState) => ({
//                           ...prevState,
//                           title: 'text image',
//                         }))
//                     }}
//                     style={styles.Dropdown}
//                   >
//                     <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
//                       Add Text
//                     </Text>
//                     <DropDownArrowIcon />
//                   </Pressable>
//                 </View>
//               )}
//             </>
//           )}

//           {!isOpenDesign && (
//             <Pressable onPress={handleIncreaseSteps}>
//               <View>
//                 <ArrowCircleRight width={24} height={24} />
//               </View>
//             </Pressable>
//           )}
//         </>
//       )}

//       {isDone && (
//         <Pressable onPress={handleIncreaseSteps}>
//           <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Regular' }}>Done</Text>
//         </Pressable>
//       )}

//       {steps === 6 && (
//         <Pressable onPress={share}>
//           <ShareArrow width={24} height={24} />
//         </Pressable>
//       )}
//     </Animated.View>
//   )
// }

// export default PostNavigator

// const styles = StyleSheet.create({
//   PostNavigator: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//   },
//   Dropdown: {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: 8,
//     borderWidth: 1,
//     borderColor: '#462D85',
//     borderRadius: 50,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
// })

import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import { COLORS } from '../../../styles/theme'
import DropDownArrowIcon from '../../../assets/icons/DropDownArrow'
import { useTranslation } from 'react-i18next'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'

interface IPostNavigation {
  steps: number
  warning: string
  handleIncreaseSteps: () => void
  handleDecreaseSteps: () => void
}

const PostNavigator: React.FC<IPostNavigation> = ({
  steps,
  warning,
  handleDecreaseSteps,
  handleIncreaseSteps,
}) => {
  const { t } = useTranslation('midlevel')
  return (
    <View
      style={[
        styles.Navigator,
        {
          justifyContent: steps === 6 ? 'flex-start' : 'space-between',
          alignItems: warning ? 'flex-start' : 'center',

          gap: steps === 6 ? 70 : 0,
        },
      ]}
    >
      <Pressable onPress={handleDecreaseSteps}>
        <Animated.View>
          <ArrowCircleLeft width={24} height={24} />
        </Animated.View>
      </Pressable>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Pressable onPress={() => handleIncreaseSteps()} style={styles.Dropdown}>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
            {steps === 1 && `${t('Select Style')}`}
            {steps === 2 && `${t('Select Country')}`}
            {steps === 3 && `${t('Select Size')}`}
            {steps === 4 && `${t('Select Color')}`}
            {steps === 5 && `${t('Add more')}`}
          </Text>

          {steps !== 5 && <DropDownArrowIcon />}
        </Pressable>
        {warning && (
          <Text
            style={{
              color: COLORS.textSecondaryClr,
              fontFamily: 'Gilroy-Medium',
              paddingTop: 3,
            }}
          >
            {t(warning)}
          </Text>
        )}
      </View>
      <Pressable onPress={handleIncreaseSteps}>
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
