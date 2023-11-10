import { View, Pressable } from 'react-native'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Animated, { FadeInUp, FadeOutUp, SlideInRight, SlideOutRight } from 'react-native-reanimated'
import * as Animatable from 'react-native-animatable'
import { COLORS, FONT_FAMILY } from '../../../../styles/theme'
import Input from '../../../../components/Input'
import DownArrow from '../../../../assets/icons/DownArrow'
import { userStore } from '../../../../store/userStore'
import CustomButton from '../../../../components/Button'
import TickIcon from '../../../../assets/icons/TickIcon'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../../../firebase'

interface IEditAddress {
  onEditPress: () => void
  selectedAddress: AddressData
}

interface AddressData {
  name: string
  mobile: string
  email: string
  addressLineOne: string
  addressLineTwo: string
  city: string
  region: string
  pinCode: string
  saveAsAddress: string
  isSelected: boolean
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
  saveAsAddress: yup.string().required('*Please enter your save as address'),
})

const LocationEditAddress: React.FC<IEditAddress> = ({ onEditPress, selectedAddress }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = userStore()

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
      setIsLoading(true)
      if (!user) return
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
          saveAsAddress: formik.values.saveAsAddress,
        },
      ]
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()
      if (!userData) return
      const arr = userData.address.filter((element: AddressData) => {
        return element.email !== selectedAddress.email
      })
      console.log(arr)
      userData.address = [...arr, ...addressArray]
      await updateDoc(userDocRef, userData)
    } catch (error) {
      console.error('Edit Address Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: selectedAddress.name,
      mobile: selectedAddress.mobile,
      email: selectedAddress.email,
      addressLineOne: selectedAddress.addressLineOne,
      addressLineTwo: selectedAddress.addressLineTwo,
      city: selectedAddress.city,
      region: selectedCountry,
      pinCode: selectedAddress.pinCode,
      saveAsAddress: selectedAddress.saveAsAddress,
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
          <Header>Edit Address</Header>
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
          <View>
            <Input
              placeholder='Save As Address'
              value={formik.values.saveAsAddress}
              onChangeText={formik.handleChange('saveAsAddress')}
              onBlur={formik.handleBlur('saveAsAddress')}
            />
            {formik.errors.saveAsAddress && <ErrorText>{formik.errors.saveAsAddress}</ErrorText>}
          </View>
        </InputContainer>
      </View>
      <CustomButton
        variant='primary'
        text={isLoading ? 'Editing...' : 'Edit Address'}
        style={{ paddingHorizontal: 16, marginTop: -60 }}
        leftIcon={<TickIcon width={16} height={16} />}
        disabled={isLoading}
        onPress={() => {
          formik.handleSubmit()
          onEditPress()
        }}
      />
    </Animated.View>
  )
}

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

export default LocationEditAddress
