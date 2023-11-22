import styled from 'styled-components/native'
import axios from 'axios'
import TickIcon from '../../assets/icons/TickIcon'
import CustomButton from '../Button'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import Input from '../Input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { StyleSheet, Text, View, ScrollView, Keyboard, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { doc, updateDoc, getDoc } from 'firebase/firestore/lite'
import { userStore } from '../../store/userStore'
import { db } from '../../../firebase'
import * as Location from 'expo-location'
import CurrentLocationIcon from '../../assets/icons/CurrentLocationIcon'
import ChevronLeft from '../../assets/icons/ChevronLeft'

interface IAddAddress {
  onSavePress: () => void
  location: string
  saveAddress: (data: any) => void
  setDisplay: React.Dispatch<React.SetStateAction<number>>
  onText: string | null
}

const validationSchema = yup.object({
  fullAddress: yup.string().required('*Please enter addressOne'),
  addressOne: yup.string().required('*Please enter addressOne'),
  addressTwo: yup.string().required('*Please enter addressTwo'),
  city: yup.string().required('*Please enter city'),
  state: yup.string().required('*Please enter your state'),
  pinCode: yup.string().required('*Please enter your pinCode'),
  country: yup.string().required('*Please enter your country'),
  floor: yup.string().required('*Please enter your floor'),
  phoneNo: yup.string().required('*Please enter your phoneNo no'),
  saveAddressAs: yup.string().required('*Please enter save address'),
})

const AddAddress: React.FC<IAddAddress> = ({
  onSavePress,
  location,
  saveAddress,
  setDisplay,
  onText,
}) => {
  const height = useSharedValue(0)
  const scrollRed = useRef<ScrollView>(null)
  // const [onText, setOnSearchChange] = React.useState<string>()
  const [keyboardStatus, setKeyboardStatus] = React.useState('')
  const [Addr, setAddr] = useState<string | null>(null)
  const [padding, setPadding] = useState(0)
  const { user } = userStore()

  const getPermissions = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        console.log('Please grant location permissions')
        return
      }

      let currentLocation = await Location.getCurrentPositionAsync({})
      const loc = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      }

      // Call the reverseGeocode function with a callback
      reverseGeocode(loc.latitude, loc.longitude, (data) => {
        formik.setValues({ ...formik.values, ...data })
        console.log('Current Location Address:', data)
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function reverseGeocode(latitude: number, longitude: number, success: (data: any) => void) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`

    try {
      const response = await axios.get(url)
      const data = response.data

      if (data.display_name) {
        setAddr(data.display_name)

        formik.setValues({ ...formik.values, fullAddress: data.display_name })
        success(data.display_name)
        return data.display_name
      } else {
        setAddr('')
        return 'Address not found'
      }
    } catch (error) {
      console.error('Error:', error)
      return 'Failed to retrieve address'
    }
  }

  const onSubmit = async () => {
    try {
      const addressArray = [
        {
          addressOne: formik.values.addressOne,
          addressTwo: formik.values.addressTwo,
          city: formik.values.city,
          state: formik.values.state,
          pinCode: formik.values.pinCode,
          country: formik.values.country,
          floor: formik.values.floor,
          phoneNo: formik.values.phoneNo,
          saveAddressAs: formik.values.saveAddressAs,
          isSelected: false,
        },
      ]

      saveAddress(addressArray)

      if (!user) return
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()

      if (!userData) return

      userData.address.push(...addressArray)
      await updateDoc(userDocRef, userData)
      setDisplay(0)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getLocationOn = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Please grant location permissions')
        return
      }

      let currentLocation = await Location.getCurrentPositionAsync({})
      const loc = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      }
      return loc
    } catch (error) {
      console.error('An error occurred while getting the location:', error)
      return null
    }
  }

  useEffect(() => {
    getLocationOn().then((loc) => {
      if (loc?.longitude && loc.latitude)
        reverseGeocode(loc.latitude, loc.longitude, (data) => setAddr(data))
    })
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
      fullAddress: location ? location : '',
      addressOne: onText?.split(',')[0],
      addressTwo: onText?.split(',')[1],
      city: '',
      state: onText?.split(',')[2],
      pinCode: onText?.split(',')[3],
      country: onText?.split(',')[4],
      floor: '',
      phoneNo: '',
      saveAddressAs: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  // const handleSearchText = (text: string) => {
  //   setOnSearchChange(text)
  // }

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
    height.value = withTiming(950)
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.curve, animatedStyles]}>
        <ScrollView
          ref={scrollRed}
          contentContainerStyle={{ paddingBottom: padding }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View>
              <Text style={styles.header}>Add Address</Text>
              <View style={styles.currentLocation}>
                <Pressable
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                  }}
                  onPress={() => {
                    getPermissions()
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
                    {Addr && <DescriptionText>{Addr}</DescriptionText>}
                  </View>
                </Pressable>

                <Pressable style={styles.editStyle}>
                  <ChevronLeft width={16} height={16} />
                </Pressable>
              </View>
              <View style={styles.inputContainer}>
                {/* <View>
                  <Input
                    placeholder='Full Address'
                    value={formik.values.fullAddress}
                    onChangeText={formik.handleChange('fullAddress')}
                    onBlur={formik.handleBlur('fullAddress')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.fullAddress && <ErrorText>{formik.errors.fullAddress}</ErrorText>}
                </View> */}
                <View>
                  <Input
                    placeholder='Address One'
                    value={formik.values.addressOne}
                    onChangeText={formik.handleChange('addressOne')}
                    onBlur={formik.handleBlur('addressOne')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.addressOne && <ErrorText>{formik.errors.addressOne}</ErrorText>}
                </View>
                <View>
                  <Input
                    placeholder='Address Two'
                    value={formik.values.addressTwo}
                    onChangeText={formik.handleChange('addressTwo')}
                    onBlur={formik.handleBlur('addressTwo')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.addressTwo && <ErrorText>{formik.errors.addressTwo}</ErrorText>}
                </View>
                <View>
                  <Input
                    placeholder='City'
                    value={formik.values.city}
                    onChangeText={formik.handleChange('city')}
                    onBlur={formik.handleBlur('city')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.city && <ErrorText>{formik.errors.city}</ErrorText>}
                </View>
                <View>
                  <Input
                    placeholder='State'
                    value={formik.values.state}
                    onChangeText={formik.handleChange('state')}
                    onBlur={formik.handleBlur('state')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.state && <ErrorText>{formik.errors.state}</ErrorText>}
                </View>

                <View>
                  <Input
                    placeholder='PinCode'
                    value={formik.values.pinCode}
                    onChangeText={formik.handleChange('pinCode')}
                    onBlur={formik.handleBlur('pinCode')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.pinCode && <ErrorText>{formik.errors.pinCode}</ErrorText>}
                </View>
                <View>
                  <Input
                    placeholder='Country'
                    value={formik.values.country}
                    onChangeText={formik.handleChange('country')}
                    onBlur={formik.handleBlur('country')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {formik.errors.country && <ErrorText>{formik.errors.country}</ErrorText>}
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
                    leftContent={<Text></Text>}
                    placeholder='phoneNo'
                    value={formik.values.phoneNo}
                    onChangeText={formik.handleChange('phoneNo')}
                    onBlur={formik.handleBlur('phoneNo')}
                    keyboardType='numeric'
                  />
                  {formik.errors.phoneNo && <ErrorText>{formik.errors.phoneNo}</ErrorText>}
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
    </ScrollView>
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

export default AddAddress

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
    marginVertical: 14,
    justifyContent: 'space-between',
  },
  RadioTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
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
    fontSize: 18,
    color: COLORS.iconsHighlightClr,
  },
  flexBox: {
    flex: 1,
  },
})
