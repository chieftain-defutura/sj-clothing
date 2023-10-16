import { KeyboardAvoidingView, Pressable } from 'react-native'
// import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import Search from '../../assets/icons/SearchIcon'
import TickIcon from '../../assets/icons/TickIcon'
import CustomButton from '../Button'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import CurrentLocationIcon from '../../assets/icons/CurrentLocationIcon'
import ChevronLeft from '../../assets/icons/ChevronLeft'
import Input from '../Input'
import { useFormik } from 'formik'
import * as yup from 'yup'

interface IAddAddress {
  onSavePress: () => void
}
const validationSchema = yup.object({
  fullAddress: yup.string().required('please enter full address'),
  floor: yup.string().required('Please enter your floor'),
  landmark: yup.string().required('Please enter landmark'),
  displayName: yup.string().required('Enter a display name'),
})

// const AddAddress: React.FC<IAddAddress> = ({ onSavePress }) => {
//   const [onText, setOnSearchChange] = React.useState<string>()
//   const [keyboardStatus, setKeyboardStatus] = React.useState('')
//   const [checked, setChecked] = React.useState('first')
//   const onSubmit = () => {
//     console.log('submitted')
//   }

//   useEffect(() => {
//     const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
//       setKeyboardStatus('Keyboard Shown')
//     })
//     const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
//       setKeyboardStatus('Keyboard Hidden')
//     })

//     return () => {
//       showSubscription.remove()
//       hideSubscription.remove()
//     }
//   }, [])

//   const formik = useFormik({
//     initialValues: {
//       fullAddress: '',
//       floor: '',
//       landmark: '',
//       displayName: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: onSubmit,
//   })

//   const handleSearchText = (text: string) => {
//     setOnSearchChange(text)
//   }
//   return (
//     <KeyboardAvoidingView style={styles.flexBox} enabled={true} behavior={'padding'}>
//       <TouchableWithoutFeedback style={styles.flexBox} onPress={() => Keyboard.dismiss()}>
//         <View>
//           <View style={styles.searchInputBox}>
//             <Search width={16} height={16} />
//             <TextInput
//               placeholder='Search for area, street name'
//               onChangeText={(text) => handleSearchText(text)}
//               value={onText}
//               style={styles.inputBox}
//               placeholderTextColor={COLORS.SecondaryTwo}
//             />
//           </View>
//           <View>
//             <View style={styles.currentLocation}>
//               <View
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: 16,
//                 }}
//               >
//                 <CurrentLocationIcon width={16} height={16} />
//                 <View
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <View style={styles.RadioTitle}>
//                     <HeaderStyle>Use current location</HeaderStyle>
//                   </View>
//                   <DescriptionText>
//                     Madras Christian College, East Tambaram, Chennai - 600 059.
//                   </DescriptionText>
//                 </View>
//               </View>

//               <Pressable style={styles.editStyle}>
//                 <ChevronLeft width={16} height={16} />
//               </Pressable>
//             </View>
//             <View style={styles.inputContainer}>
//               <Text style={styles.header}>Add Address</Text>
//               <View>
//                 <Input
//                   placeholder='Full address'
//                   value={formik.values.fullAddress}
//                   onChangeText={formik.handleChange('fullAddress')}
//                   onBlur={formik.handleBlur('fullAddress')}
//                   onSubmitEditing={Keyboard.dismiss}
//                 />
//                 {formik.errors.fullAddress && <ErrorText>{formik.errors.fullAddress}</ErrorText>}
//               </View>
//               <View>
//                 <Input
//                   placeholder='Floor'
//                   value={formik.values.floor}
//                   onChangeText={formik.handleChange('floor')}
//                   onBlur={formik.handleBlur('floor')}
//                   onSubmitEditing={Keyboard.dismiss}
//                 />
//                 {formik.errors.floor && <ErrorText>{formik.errors.floor}</ErrorText>}
//               </View>
//               <View>
//                 <Input
//                   placeholder='Landmark'
//                   value={formik.values.landmark}
//                   onChangeText={formik.handleChange('landmark')}
//                   onBlur={formik.handleBlur('landmark')}
//                   onSubmitEditing={Keyboard.dismiss}
//                 />
//                 {formik.errors.landmark && <ErrorText>{formik.errors.landmark}</ErrorText>}
//               </View>
//               <View>
//                 <Input
//                   placeholder='Save as (Home)'
//                   value={formik.values.displayName}
//                   onChangeText={formik.handleChange('displayName')}
//                   onBlur={formik.handleBlur('displayName')}
//                   onSubmitEditing={Keyboard.dismiss}
//                 />
//                 {formik.errors.displayName && <ErrorText>{formik.errors.displayName}</ErrorText>}
//               </View>

//               <CustomButton
//                 variant='primary'
//                 text='Save Address'
//                 leftIcon={<TickIcon width={16} height={16} />}
//                 onPress={onSavePress}
//               />
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   )
// }

const HeaderStyle = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

const DescriptionText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-size: 12px;
  font-family: Gilroy-Regular;
  line-height: 18px;
  width: 225px;
`

const ErrorText = styled.Text`
  font-size: 12px;
  color: ${COLORS.errorClr};
`

// export default AddAddress

import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animate, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

const Home: React.FC<IAddAddress> = ({ onSavePress }) => {
  const height = useSharedValue(0)

  const textRef1 = useRef<Text>(null)
  const textRef2 = useRef<Text>(null)
  const textRef3 = useRef<Text>(null)
  const textRef4 = useRef<Text>(null)
  const textRef5 = useRef<Text>(null)
  const textRef6 = useRef<Text>(null)
  const textRef7 = useRef<Text>(null)
  const textRef8 = useRef<Text>(null)
  const textRef9 = useRef<Text>(null)
  const textRef10 = useRef<Text>(null)
  const textRef11 = useRef<Text>(null)
  const textRef12 = useRef<Text>(null)
  const textRef13 = useRef<Text>(null)
  const scrollRed = useRef<ScrollView>(null)
  const [onText, setOnSearchChange] = React.useState<string>()
  const [keyboardStatus, setKeyboardStatus] = React.useState('')
  const [checked, setChecked] = React.useState('first')
  const [padding, setPadding] = useState(0)
  const onSubmit = () => {
    console.log('submitted')
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown')
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden')
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      fullAddress: '',
      floor: '',
      landmark: '',
      displayName: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  const handleSearchText = (text: string) => {
    setOnSearchChange(text)
  }

  useEffect(() => {
    // Add event listeners for keyboard events
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const _keyboardDidShow = (event: any) => {
    console.log('Keyboard did show with height', event.endCoordinates.height)
    setPadding(event.endCoordinates.height - 100)
  }

  const _keyboardDidHide = () => {
    console.log('Keyboard did hide')
    setPadding(0)
  }

  const updateValues = (newHeight: number, newWidth: number) => {
    height.value = withTiming(newHeight)
    console.log(height)
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
    }
  })

  const handlePress = () => {
    scrollRed.current?.scrollTo({ x: 0, y: 200, animated: true })
  }

  useEffect(() => {
    height.value = withTiming(500)
  })

  return (
    <View>
      <Animated.View style={[styles.curve, animatedStyles]}>
        <ScrollView
          ref={scrollRed}
          contentContainerStyle={{ paddingBottom: padding }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.searchInputBox}>
              <Search width={16} height={16} />
              <TextInput
                placeholder='Search for area, street name'
                onChangeText={(text) => handleSearchText(text)}
                value={onText}
                style={styles.inputBox}
                placeholderTextColor={COLORS.SecondaryTwo}
              />
            </View>
            <View>
              <View style={styles.currentLocation}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <CurrentLocationIcon width={16} height={16} />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={styles.RadioTitle}>
                      <HeaderStyle>Use current location</HeaderStyle>
                    </View>
                    <DescriptionText>
                      Madras Christian College, East Tambaram, Chennai - 600 059.
                    </DescriptionText>
                  </View>
                </View>

                <Pressable style={styles.editStyle}>
                  <ChevronLeft width={16} height={16} />
                </Pressable>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.header}>Add Address</Text>
                <View>
                  <Input
                    placeholder='Full address'
                    value={formik.values.fullAddress}
                    onChangeText={formik.handleChange('fullAddress')}
                    onBlur={formik.handleBlur('fullAddress')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.fullAddress && <ErrorText>{formik.errors.fullAddress}</ErrorText>}
                </View>
                <View>
                  <Input
                    placeholder='Floor'
                    value={formik.values.floor}
                    onChangeText={formik.handleChange('floor')}
                    onBlur={formik.handleBlur('floor')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.floor && <ErrorText>{formik.errors.floor}</ErrorText>}
                </View>
                <View>
                  <Input
                    placeholder='Landmark'
                    value={formik.values.landmark}
                    onChangeText={formik.handleChange('landmark')}
                    onBlur={formik.handleBlur('landmark')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.landmark && <ErrorText>{formik.errors.landmark}</ErrorText>}
                </View>
                <View>
                  <Input
                    placeholder='Save as (Home)'
                    value={formik.values.displayName}
                    onChangeText={formik.handleChange('displayName')}
                    onBlur={formik.handleBlur('displayName')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.displayName && <ErrorText>{formik.errors.displayName}</ErrorText>}
                </View>

                <CustomButton
                  variant='primary'
                  text='Save Address'
                  leftIcon={<TickIcon width={16} height={16} />}
                  onPress={onSavePress}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  curve: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 40,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
  },
  searchInputBox: {
    borderColor: '#efcef5',
    borderWidth: 1,
    borderRadius: 36,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 2,
    marginVertical: 8,
    gap: 8,
  },
  inputBox: {
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    marginVertical: 8,
  },
  currentLocation: {
    borderWidth: 1,
    borderColor: '#efcef5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  RadioTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  editStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  editText: {
    color: '#DB00FF',
    fontSize: 14,
  },
  inputContainer: {
    gap: 16,
  },
  header: {
    fontFamily: FONT_FAMILY.GilroySemiBold,
    fontSize: 16,
    color: COLORS.iconsHighlightClr,
  },
  flexBox: {
    flex: 1,
  },
})
