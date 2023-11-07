import { Pressable } from 'react-native'
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
import { StyleSheet, Text, View, ScrollView, Keyboard, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import firestore, { doc, updateDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite'
import { userStore } from '../../store/userStore'
import { db } from '../../../firebase'

interface IAddAddress {
  onSavePress: () => void
}

const validationSchema = yup.object({
  fullAddress: yup.string().required('Please enter full address'),
  floor: yup.string().required('Please enter your floor'),
  landmark: yup.string().required('Please enter landmark'),
  saveAddressAs: yup.string().required('Please enter save address'),
})

const Home: React.FC<IAddAddress> = ({ onSavePress }) => {
  const height = useSharedValue(0)
  const scrollRed = useRef<ScrollView>(null)
  const [onText, setOnSearchChange] = React.useState<string>()
  const [keyboardStatus, setKeyboardStatus] = React.useState('')
  const [padding, setPadding] = useState(0)
  const { user } = userStore()

  const onSubmit = async () => {
    console.log('Formik Data:', formik.values)
    const addressArray = [
      {
        fullAddress: formik.values.fullAddress,
        floor: formik.values.floor,
        landmark: formik.values.landmark,
        saveAddressAs: formik.values.saveAddressAs,
      },
    ]

    if (!user) return
    // await updateDoc(doc(db, 'users', user.uid), {
    //   address: addressArray,
    // })
    const userDocRef = doc(db, 'users', user.uid)
    await setDoc(userDocRef, { address: addressArray })
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
      saveAddressAs: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  const handleSearchText = (text: string) => {
    setOnSearchChange(text)
  }

  useEffect(() => {
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

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
    }
  })

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
                    value={formik.values.saveAddressAs}
                    onChangeText={formik.handleChange('saveAddressAs')}
                    onBlur={formik.handleBlur('saveAddressAs')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.saveAddressAs && (
                    <ErrorText>{formik.errors.saveAddressAs}</ErrorText>
                  )}
                </View>

                <CustomButton
                  variant='primary'
                  text='Save Address'
                  leftIcon={<TickIcon width={16} height={16} />}
                  onPress={() => {
                    formik.handleSubmit()
                    onSavePress()
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  )
}

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
