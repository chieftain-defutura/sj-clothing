import styled from 'styled-components/native'
import axios from 'axios'
import TickIcon from '../../assets/icons/TickIcon'
import CustomButton from '../Button'
import { COLORS } from '../../styles/theme'
import Input from '../Input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { StyleSheet, View, ScrollView, Keyboard, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SlideInDown, SlideOutDown, useSharedValue } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { doc, updateDoc, getDoc } from 'firebase/firestore/lite'
import { userStore } from '../../store/userStore'
import { db } from '../../../firebase'
import * as Location from 'expo-location'
import CurrentLocationIcon from '../../assets/icons/CurrentLocationIcon'
import ChevronLeft from '../../assets/icons/ChevronLeft'
import CountryCode from '../CountryCode'
import { useNavigation } from '@react-navigation/native'
import LeftArrow from '../../assets/icons/LeftArrow'

interface IAddAddress {
  location: string
  saveAddress: (data: any) => void
  setDisplay: React.Dispatch<React.SetStateAction<number>>
  onText: string | null
  setOnSearchChange: React.Dispatch<React.SetStateAction<string | null>>
}

const validationSchema = yup.object({
  fullAddress: yup.string(),
  name: yup.string().required('*Please enter name'),
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

const AddressAdd: React.FC<IAddAddress> = ({ location, saveAddress, setDisplay, onText }) => {
  const height = useSharedValue(0)
  const scrollRed = useRef<ScrollView>(null)
  const [keyboardStatus, setKeyboardStatus] = React.useState('')
  const [Addr, setAddr] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [countryCode, setCountryCode] = useState('+91')
  const [show, setShow] = useState(false)
  const [padding, setPadding] = useState(0)
  const navigation = useNavigation()
  const user = userStore((state) => state.user)
  const [address, setAddress] = useState({
    addressOne: '',
    addressTwo: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
  })

  const Addrs = Addr?.split(',')

  const Addrss = Addrs?.reverse()

  let addressOne = address.addressOne.split(',')[0]
  let addressTwo = address.addressTwo.split(',')[1]
  let country = ''
  let pinCode = ''
  let state = ''
  let city = ''
  if (Addrss && Addrss.length > 0) {
    country = Addrss[0].trim()
    if (Addrss.length > 1) {
      pinCode = Addrss[1].trim()
    }
    if (Addrss.length > 2) {
      state = Addrss[2].trim()
    }
    if (Addrss.length > 2) {
      city = Addrss[3].trim()
    }
  }

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
        // formik.setValues({ ...formik.values, ...data })
        formik.setValues({
          fullAddress: location ? location : '',
          name: '',
          addressOne: data.split(',')[0],
          addressTwo: data.split(',')[1],
          city: data.split(',').reverse()[3],
          state: data.split(',').reverse()[2],
          pinCode: data.split(',').reverse()[1],
          country: data.split(',').reverse()[0],
          floor: '',
          phoneNo: '',
          saveAddressAs: '',
        })

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
        console.log('setValue', data.display_name)

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
      console.log(1)
      setIsLoading(true)

      const addressArray = [
        {
          name: formik.values.name,
          addressOne: formik.values.addressOne,
          addressTwo: formik.values.addressTwo,
          city: formik.values.city,
          state: formik.values.state,
          pinCode: formik.values.pinCode,
          country: formik.values.country,
          floor: formik.values.floor,
          phoneNo: countryCode + formik.values.phoneNo,
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
    } finally {
      setIsLoading(false)
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

  useEffect(() => {
    if (onText) {
      setAddress({
        addressOne: onText,
        addressTwo: onText,
        state: onText,
        country: onText,
        pinCode: onText,
        city: onText,
      })
    } else if (Addr) {
      setAddress({
        addressOne: Addr,
        addressTwo: Addr,
        state: Addr,
        pinCode: Addr,
        city: Addr,
        country: Addr,
      })
    }
  }, [Addr])

  const formik = useFormik({
    initialValues: {
      fullAddress: location ? location : '',
      name: '',
      addressOne: !onText ? addressOne : onText.split(',')[0],
      addressTwo: !onText ? addressTwo : onText.split(',')[1],
      city: !onText ? city : onText.split(',').reverse()[3],
      state: !onText ? state : onText.split(',').reverse()[2],
      pinCode: !onText ? pinCode : onText.split(',').reverse()[1],
      country: !onText ? country : onText.split(',').reverse()[0],
      floor: '',
      phoneNo: '',
      saveAddressAs: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  })

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

  console.log(formik.errors)

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        ref={scrollRed}
        contentContainerStyle={{ paddingBottom: padding }}
        showsVerticalScrollIndicator={false}
      >
        <GoBackArrowContent
          onPress={() => {
            navigation.goBack()
          }}
        >
          <LeftArrow width={24} height={24} />
          <CartText allowFontScaling={false}>Add Address</CartText>
        </GoBackArrowContent>
        <View style={{ paddingHorizontal: 26 }}>
          <View>
            {/* <Text allowFontScaling={false} style={styles.header}>Add Address</Text> */}
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
                    <HeaderStyle allowFontScaling={false}>Use current location</HeaderStyle>
                  </View>
                  {Addr && <DescriptionText allowFontScaling={false}>{Addr}</DescriptionText>}
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
                  placeholder='Name'
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  onSubmitEditing={Keyboard.dismiss}
                />

                {(formik.values.name === undefined || formik.values.name.length === 0) &&
                  formik.touched.name && (
                    <ErrorText allowFontScaling={false}>*Please enter name</ErrorText>
                  )}
              </View>
              <View>
                <Input
                  placeholder='Address One'
                  value={formik.values.addressOne}
                  onChangeText={formik.handleChange('addressOne')}
                  onBlur={formik.handleBlur('addressOne')}
                  onSubmitEditing={Keyboard.dismiss}
                />

                {(formik.values.addressOne === undefined ||
                  formik.values.addressOne.length === 0) &&
                  formik.touched.addressOne && (
                    <ErrorText allowFontScaling={false}>*Please enter Address One</ErrorText>
                  )}
              </View>
              <View>
                <Input
                  placeholder='Address Two'
                  value={formik.values.addressTwo}
                  onChangeText={formik.handleChange('addressTwo')}
                  onBlur={formik.handleBlur('addressTwo')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {(formik.values.addressTwo === undefined ||
                  formik.values.addressTwo.length === 0) &&
                  formik.touched.addressTwo && (
                    <ErrorText allowFontScaling={false}>*Please enter Address Two</ErrorText>
                  )}
              </View>
              <View>
                <Input
                  placeholder='City'
                  value={formik.values.city}
                  onChangeText={formik.handleChange('city')}
                  onBlur={formik.handleBlur('city')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {(formik.values.city === undefined || formik.values.city.length === 0) &&
                  formik.touched.city && (
                    <ErrorText allowFontScaling={false}>*Please enter city</ErrorText>
                  )}
              </View>
              <View>
                <Input
                  placeholder='State'
                  value={formik.values.state}
                  onChangeText={formik.handleChange('state')}
                  onBlur={formik.handleBlur('state')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {(formik.values.state === undefined || formik.values.state.length === 0) &&
                  formik.touched.state && (
                    <ErrorText allowFontScaling={false}>*Please enter state</ErrorText>
                  )}
              </View>

              <View>
                <Input
                  placeholder='PinCode'
                  value={formik.values.pinCode}
                  onChangeText={formik.handleChange('pinCode')}
                  onBlur={formik.handleBlur('pinCode')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {(formik.values.pinCode === undefined || formik.values.pinCode.length === 0) &&
                  formik.touched.pinCode && (
                    <ErrorText allowFontScaling={false}>*Please enter pinCode</ErrorText>
                  )}
              </View>
              <View>
                <Input
                  placeholder='Country'
                  value={formik.values.country}
                  onChangeText={formik.handleChange('country')}
                  onBlur={formik.handleBlur('country')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {(formik.values.country === undefined || formik.values.country.length === 0) &&
                  formik.touched.country && (
                    <ErrorText allowFontScaling={false}>*Please enter country</ErrorText>
                  )}
              </View>
              <View>
                <Input
                  placeholder='Floor'
                  value={formik.values.floor}
                  onChangeText={formik.handleChange('floor')}
                  onBlur={formik.handleBlur('floor')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {(formik.values.floor === undefined || formik.values.floor.length === 0) &&
                  formik.touched.floor && (
                    <ErrorText allowFontScaling={false}>*Please enter floor</ErrorText>
                  )}
              </View>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <CountryCode
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    setShow={setShow}
                    show={show}
                  />
                  <Input
                    placeholder='phone No'
                    value={formik.values.phoneNo}
                    onChangeText={formik.handleChange('phoneNo')}
                    onBlur={formik.handleBlur('phoneNo')}
                    keyboardType='numeric'
                  />
                </View>
                {(formik.values.phoneNo === undefined || formik.values.phoneNo.length === 0) &&
                  formik.touched.phoneNo && (
                    <ErrorText allowFontScaling={false}>*Please enter phoneNo</ErrorText>
                  )}
              </View>

              <View>
                <Input
                  placeholder='Save as (Home)'
                  value={formik.values.saveAddressAs}
                  onChangeText={formik.handleChange('saveAddressAs')}
                  onBlur={formik.handleBlur('saveAddressAs')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {(formik.values.saveAddressAs === undefined ||
                  formik.values.saveAddressAs.length === 0) &&
                  formik.touched.saveAddressAs && (
                    <ErrorText allowFontScaling={false}>*Please enter saveAddressAs</ErrorText>
                  )}
                {/* {formik.errors.saveAddressAs && (
                    <ErrorText>{formik.errors.saveAddressAs}</ErrorText>
                  )} */}
              </View>

              <CustomButton
                variant='primary'
                style={{ marginBottom: 20 }}
                text={isLoading ? 'Saving Address...' : 'Save Address'}
                leftIcon={<TickIcon width={16} height={16} />}
                onPress={() => {
                  formik.handleSubmit()
                }}
                disabled={isLoading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
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
const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-left: 16px;
  padding-top: 16px;
`
const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

export default AddressAdd

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  curve: {
    backgroundColor: 'red',
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
  flexBox: {
    flex: 1,
  },
})
