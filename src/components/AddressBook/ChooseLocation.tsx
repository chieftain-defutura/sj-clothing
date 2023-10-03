import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
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

interface ChooseLocationProps {
  onSavePress: () => void
}
const validationSchema = yup.object({
  fullAddress: yup.string().required('please enter full address'),
  floor: yup.string().required('Please enter your floor'),
  landmark: yup.string().required('Please enter landmark'),
  displayName: yup.string().required('Enter a display name'),
})

const ChooseLocation: React.FC<ChooseLocationProps> = ({ onSavePress }) => {
  const [onText, setOnSearchChange] = React.useState<string>()
  const [checked, setChecked] = React.useState('first')
  const onSubmit = () => {
    console.log('submitted')
  }

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
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              />
              {formik.errors.fullAddress && <ErrorText>{formik.errors.fullAddress}</ErrorText>}
            </View>
            <View>
              <Input
                placeholder='Floor'
                value={formik.values.floor}
                onChangeText={formik.handleChange('floor')}
                onBlur={formik.handleBlur('floor')}
              />
              {formik.errors.floor && <ErrorText>{formik.errors.floor}</ErrorText>}
            </View>
            <View>
              <Input
                placeholder='Landmark'
                value={formik.values.landmark}
                onChangeText={formik.handleChange('landmark')}
                onBlur={formik.handleBlur('landmark')}
              />
              {formik.errors.landmark && <ErrorText>{formik.errors.landmark}</ErrorText>}
            </View>
            <View>
              <Input
                placeholder='Save as (Home)'
                value={formik.values.displayName}
                onChangeText={formik.handleChange('displayName')}
                onBlur={formik.handleBlur('displayName')}
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
    </TouchableWithoutFeedback>
  )
}

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`

const AddAddressBtn = styled.View`
  border-color: #db00ff;
  border-width: 1px;
  padding-horizontal: 14px;
  padding-vertical: 12px;
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  width: 165px;
`
const BtnText = styled.Text`
  font-size: 12px;
  font-family: Arvo-Regular;
  color: #db00ff;
`

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

const currentLocation = styled.View`
  border-width: 1px;
  border-color: ${COLORS.strokeClr};
  border-radius: 10px;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-vertical: 8px;
`
const ErrorText = styled.Text`
  font-size: 12px;
  color: ${COLORS.errorClr};
`

export default ChooseLocation

const styles = StyleSheet.create({
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
})
