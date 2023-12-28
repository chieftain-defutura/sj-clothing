import styled from 'styled-components/native'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import TickIcon from '../../assets/icons/TickIcon'
import CustomButton from '../Button'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import Input from '../Input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { StyleSheet, View, ScrollView, Keyboard, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animated, { FadeInUp, FadeOutUp, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { doc, updateDoc, getDoc } from 'firebase/firestore/lite'
import { userStore } from '../../store/userStore'
import { db } from '../../../firebase'
import * as Location from 'expo-location'
import CurrentLocationIcon from '../../assets/icons/CurrentLocationIcon'
import ChevronLeft from '../../assets/icons/ChevronLeft'
import CountryCode from '../CountryCode'
import { useNavigation } from '@react-navigation/native'
import LeftArrow from '../../assets/icons/LeftArrow'
import * as Animatable from 'react-native-animatable'
import DownArrow from '../../assets/icons/DownArrow'

interface IAddAddress {
  location?: string
  saveAddress?: (data: any) => void
  setDisplay?: React.Dispatch<React.SetStateAction<number>>
  onText?: string | null
  setOnSearchChange?: React.Dispatch<React.SetStateAction<string | null>>
  setOpenEdit?: React.Dispatch<React.SetStateAction<boolean>>
  EditAddress?: {
    name: string
    addressOne: string
    addressTwo: string
    city: string
    state: string
    pinCode: string
    country: string
    floor: string
    phoneNo: string
    saveAddressAs: string
    countryCode: string
    isSelected: boolean
  }
}

const dropdownItems = ['Home', 'Work', 'Others']

const { width } = Dimensions.get('window')

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
  phoneNo: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('*Please enter your phone number'),
  saveAddressAs: yup.string(),
})

const AddressAdd: React.FC<IAddAddress> = ({
  location,
  saveAddress,
  setDisplay,
  onText,
  EditAddress,
  setOpenEdit,
}) => {
  const scrollRed = useRef<ScrollView>(null)
  const [keyboardStatus, setKeyboardStatus] = React.useState('')
  const [Addr, setAddr] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation('Address')
  const [countryCode, setCountryCode] = useState(
    EditAddress?.countryCode ? EditAddress.countryCode : '+91',
  )
  const [show, setShow] = useState(false)
  const [padding, setPadding] = useState(0)
  const navigation = useNavigation()
  const user = userStore((state) => state.user)
  const [selectYourOther, setSelectYourOther] = useState<string | null>(
    EditAddress?.saveAddressAs ? EditAddress.saveAddressAs : 'Home',
  )
  const [showOthersOption, setShowOthersOption] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
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
      setIsLoading(true)
      console.log(selectYourOther)
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
          countryCode: countryCode,
          phoneNo: formik.values.phoneNo,
          saveAddressAs: selectYourOther ? selectYourOther : formik.values.saveAddressAs,
          isSelected: EditAddress?.isSelected ? EditAddress.isSelected : false,
        },
      ]
      const newAddress = {
        name: formik.values.name,
        addressOne: formik.values.addressOne,
        addressTwo: formik.values.addressTwo,
        city: formik.values.city,
        state: formik.values.state,
        pinCode: formik.values.pinCode,
        country: formik.values.country,
        floor: formik.values.floor,
        phoneNo: formik.values.phoneNo,
        countryCode: countryCode,
        saveAddressAs: selectYourOther ? selectYourOther : formik.values.saveAddressAs,
        isSelected: EditAddress?.isSelected ? EditAddress.isSelected : false,
      }

      saveAddress?.(addressArray)

      if (!user) return
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()

      if (!userData) return

      if (!EditAddress?.name) {
        userData.address.push(newAddress)
        setDisplay?.(0)
      } else {
        const indexToUpdate = userData.address.findIndex(
          (address: { name: string }) => address.name === EditAddress.name,
        )

        if (indexToUpdate !== -1) {
          userData.address[indexToUpdate] = newAddress
          setOpenEdit?.(false)
        } else {
          console.log('Address not found for editing')
          return
        }
      }

      // Update the user document in Firestore
      await updateDoc(userDocRef, userData)
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
      name: EditAddress?.name ? EditAddress.name : '',
      addressOne: EditAddress?.name
        ? EditAddress.addressOne
        : !onText
        ? addressOne
        : onText.split(',')[0],
      addressTwo: EditAddress?.name
        ? EditAddress.addressTwo
        : !onText
        ? addressTwo
        : onText.split(',')[1],
      city: EditAddress?.name ? EditAddress.city : !onText ? city : onText.split(',').reverse()[3],
      state: EditAddress?.name
        ? EditAddress.state
        : !onText
        ? state
        : onText.split(',').reverse()[2],
      pinCode: EditAddress?.name
        ? EditAddress.pinCode
        : !onText
        ? pinCode
        : onText.split(',').reverse()[1],
      country: EditAddress?.name
        ? EditAddress.country
        : !onText
        ? country
        : onText.split(',').reverse()[0],
      floor: EditAddress?.name ? EditAddress.floor : '',
      phoneNo: EditAddress?.name ? EditAddress.phoneNo : '',
      saveAddressAs: EditAddress?.name ? EditAddress.saveAddressAs : '',
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState)
  }

  const handleSelect = (item: string) => {
    setSelectYourOther(item)
    if (item === 'Others') {
      setShowOthersOption(true)
      setSelectYourOther('')
    } else {
      setShowOthersOption(false)
    }
    setIsDropdownOpen(false)
  }

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
          <CartText allowFontScaling={false}>{t('Add Address')}</CartText>
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
                  placeholder='Floor/HouseNo'
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
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <CountryCode
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    setShow={setShow}
                    show={show}
                  />
                  <Input
                    placeholder='Phone No'
                    value={formik.values.phoneNo}
                    onChangeText={formik.handleChange('phoneNo')}
                    onBlur={formik.handleBlur('phoneNo')}
                    keyboardType='numeric'
                    style={{ width: width / 1.4 }}
                  />
                </View>
                {formik.errors.phoneNo && formik.touched.phoneNo && (
                  <ErrorText allowFontScaling={false}>{formik.errors.phoneNo}</ErrorText>
                )}
                {/* {(formik.values.phoneNo === undefined || formik.values.phoneNo.length === 0) &&
                  formik.touched.phoneNo && (
                    <ErrorText allowFontScaling={false}>*Please enter phoneNo</ErrorText>
                  )} */}
              </View>

              <View>
                <DropDownContainer>
                  <View style={{ width: width - 51 }}>
                    <SelectContent onPress={toggleDropdown}>
                      <SelectText allowFontScaling={false}>{selectYourOther}</SelectText>
                      <Animatable.View
                        animation={isDropdownOpen ? 'rotate' : ''}
                        duration={500}
                        easing='ease-out'
                      >
                        <DownArrow width={16} height={16} />
                      </Animatable.View>
                    </SelectContent>
                    {isDropdownOpen && (
                      <Animated.View
                        entering={FadeInUp.duration(800).delay(200)}
                        exiting={FadeOutUp}
                      >
                        <SelectDropDownList>
                          {dropdownItems.map((item, index) => (
                            <Pressable key={index} onPress={() => handleSelect(item)}>
                              <SelectListText allowFontScaling={false}>{item}</SelectListText>
                            </Pressable>
                          ))}
                        </SelectDropDownList>
                      </Animated.View>
                    )}
                  </View>
                </DropDownContainer>
                <View style={{ marginVertical: 20 }}>
                  {showOthersOption && (
                    <View>
                      <Input
                        placeholder='Save as '
                        value={formik.values.saveAddressAs}
                        onChangeText={formik.handleChange('saveAddressAs')}
                        onBlur={formik.handleBlur('saveAddressAs')}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                      {formik.errors.saveAddressAs && formik.touched.saveAddressAs && (
                        <ErrorText allowFontScaling={false}>
                          {formik.errors.saveAddressAs}
                        </ErrorText>
                      )}
                    </View>
                  )}
                </View>
              </View>

              <CustomButton
                variant='primary'
                style={{ marginBottom: 20 }}
                text={
                  isLoading
                    ? EditAddress?.name
                      ? 'Editing Address'
                      : 'Saving Address...'
                    : EditAddress?.name
                    ? 'Edit Address'
                    : 'Save Address'
                }
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

const SelectContent = styled.Pressable`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const SelectText = styled.Text`
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  font-family: ${FONT_FAMILY.GilroyMedium};
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`
const SelectListText = styled.Text`
  font-size: 14px;
  color: ${COLORS.iconsHighlightClr};
  font-family: ${FONT_FAMILY.GilroyMedium};
  padding-horizontal: 12px;
  padding-vertical: 7px;
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
  margin-bottom: 8px;
`
const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
  line-height: 28px;
`

const DropDownContainer = styled.View`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
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
