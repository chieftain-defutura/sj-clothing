import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
// import { CountryPicker } from 'react-native-country-codes-picker'
import { COLORS, FONT_FAMILY } from '../../../../styles/theme'
import Input from '../../../../components/Input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Animated, { FadeInUp, FadeOutUp, SlideInRight, SlideOutRight } from 'react-native-reanimated'
import CustomButton from '../../../../components/Button'
import DownArrow from '../../../../assets/icons/DownArrow'
import { userStore } from '../../../../store/userStore'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../../../firebase'

interface ILocationAddAddress {
  saveAddress: (data: any) => void
  onSavePress: () => void
}

const regionData = [
  'Asia',
  'Europe',
  'Africa',
  'North America',
  'South America',
  'Australia',
  'Antarctica',
]

const validationSchema = yup.object({
  name: yup.string().required('*Please enter your name'),
  mobile: yup.string().required('*Please enter your mobile no'),
  email: yup.string().required('*Please enter your e-mail address'),
  addressLineOne: yup.string().required('*Please enter your address line 1'),
  addressLineTwo: yup.string().required('*Please enter your address line 2'),
  city: yup.string().required('*Please enter your city'),
  pinCode: yup.string().required('*Please enter your pinCode'),
})

const LocationAddAddress: React.FC<ILocationAddAddress> = ({ saveAddress, onSavePress }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const { user } = userStore()
  //   const [show, setShow] = useState(false)
  //   const [countryCode, setCountryCode] = useState('')

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState)
  }

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)
  }

  const onSubmit = async () => {
    try {
      console.log('Formik Data:', formik.values)
      const addressArray = [
        {
          name: formik.values.name,
          mobile: formik.values.mobile,
          email: formik.values.email,
          addressLineOne: formik.values.addressLineOne,
          addressLineTwo: formik.values.addressLineTwo,
          city: formik.values.city,
          region: selectedCountry,
          pinCode: formik.values.pinCode,
        },
      ]

      saveAddress(addressArray)

      if (!user) return
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()
      console.log('userdaaaaa', userData)

      if (!userData) return

      userData.address.push(...addressArray)
      await updateDoc(userDocRef, userData)
      onSavePress()
    } catch (error) {
      console.error('Save Address Error:', error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      email: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      pinCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <Animated.View
      entering={SlideInRight.duration(500).delay(200)}
      exiting={SlideOutRight.duration(500).delay(200)}
    >
      <View style={{ paddingBottom: 80 }}>
        <InputContainer>
          <Header>Add Address</Header>
          {/* <View>
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  style={{
                    width: '100%',
                    height: 60,
                    borderColor: 'red',
                    borderWidth: 1,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                    }}
                  >
                    {countryCode}
                  </Text>
                  <CountryPicker
                    show={show}
                    lang='en'
                    pickerButtonOnPress={(item) => {
                      setCountryCode(item.dial_code)
                      setShow(false)
                      console.log('item', item)
                    }}
                  />
                </TouchableOpacity>
              </View> */}
          <View>
            <Input
              placeholder='Name'
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
            />
            {formik.errors.name && <ErrorText>{formik.errors.name}</ErrorText>}
          </View>

          <View>
            <Input
              placeholder='Mobile'
              value={formik.values.mobile}
              onChangeText={formik.handleChange('mobile')}
              onBlur={formik.handleBlur('mobile')}
            />
            {formik.errors.mobile && <ErrorText>{formik.errors.mobile}</ErrorText>}
          </View>
          <View>
            <Input
              placeholder='E-mail address'
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
            {formik.errors.email && <ErrorText>{formik.errors.email}</ErrorText>}
          </View>
          <View>
            <Input
              placeholder='Address Line 1'
              value={formik.values.addressLineOne}
              onChangeText={formik.handleChange('addressLineOne')}
              onBlur={formik.handleBlur('addressLineOne')}
            />
            {formik.errors.addressLineOne && <ErrorText>{formik.errors.addressLineOne}</ErrorText>}
          </View>
          <View>
            <Input
              placeholder='Address Line 2'
              value={formik.values.addressLineTwo}
              onChangeText={formik.handleChange('addressLineTwo')}
              onBlur={formik.handleBlur('addressLineTwo')}
            />
            {formik.errors.addressLineTwo && <ErrorText>{formik.errors.addressLineTwo}</ErrorText>}
          </View>
          <View>
            <Input
              placeholder='City'
              value={formik.values.city}
              onChangeText={formik.handleChange('city')}
              onBlur={formik.handleBlur('city')}
            />
            {formik.errors.city && <ErrorText>{formik.errors.city}</ErrorText>}
          </View>
          {/* <DropDownContainer>
                <View style={{ width: '100%' }}>
                  <SelectContent onPress={toggleDropdown}>
                    <SelectText>{selectedCountry || 'Select a country'}</SelectText>
                    <Animatable.View
                      animation={isDropdownOpen ? 'rotate' : ''}
                      duration={500}
                      easing='ease-out'
                    >
                      <DownArrow width={16} height={16} />
                    </Animatable.View>
                  </SelectContent>
                  {isDropdownOpen && (
                    <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
                      <SelectDropDownList>
                        {regionData.map((f, index) => (
                          <Pressable key={index} onPress={() => handleSelectCountry(f)}>
                            <SelectListText>{f}</SelectListText>
                          </Pressable>
                        ))}
                      </SelectDropDownList>
                    </Animated.View>
                  )}
                </View>
              </DropDownContainer> */}

          <DropDownContainer>
            <View style={{ width: '100%' }}>
              <SelectContent onPress={toggleDropdown}>
                <SelectText>{selectedCountry || 'Select a country'}</SelectText>
                <Animatable.View
                  animation={isDropdownOpen ? 'rotate' : ''}
                  duration={500}
                  easing='ease-out'
                >
                  <DownArrow width={16} height={16} />
                </Animatable.View>
              </SelectContent>
              {isDropdownOpen && (
                <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
                  <SelectDropDownList>
                    {regionData.map((f, index) => (
                      <Pressable key={index} onPress={() => handleSelectCountry(f)}>
                        <SelectListText>{f}</SelectListText>
                      </Pressable>
                    ))}
                  </SelectDropDownList>
                </Animated.View>
              )}
            </View>
          </DropDownContainer>

          <View>
            <Input
              placeholder='Pincode'
              value={formik.values.pinCode}
              onChangeText={formik.handleChange('pinCode')}
              onBlur={formik.handleBlur('pinCode')}
            />
            {formik.errors.pinCode && <ErrorText>{formik.errors.pinCode}</ErrorText>}
          </View>
        </InputContainer>
      </View>
      <CustomButton
        variant='primary'
        text='Save Address'
        fontFamily='Arvo-Regular'
        onPress={() => {
          formik.handleSubmit()
        }}
        fontSize={16}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          padding: 16,
        }}
      />
    </Animated.View>
  )
}

const ScrollViewContent = styled.ScrollView`
  height: 100%;
`

const InputContainer = styled.View`
  gap: 16px;
  padding-vertical: 22px;
  padding-horizontal: 22px;
`
const Header = styled.Text`
  font-family: ${FONT_FAMILY.GilroySemiBold};
  font-size: 18px;
  color: ${COLORS.iconsHighlightClr};
`
const ErrorText = styled.Text`
  font-size: 12px;
  color: ${COLORS.errorClr};
`
const DropDownContainer = styled.View`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
`

const SelectContent = styled.Pressable`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  padding-vertical: 16px;
  padding-horizontal: 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`
const SelectListText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.iconsHighlightClr};
  padding-horizontal: 12px;
  padding-vertical: 7px;
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`

const SelectText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.iconsHighlightClr};
`

export default LocationAddAddress
