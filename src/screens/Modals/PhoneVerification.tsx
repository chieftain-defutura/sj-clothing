import * as Yup from 'yup'
import axios from 'axios'
import { Formik } from 'formik'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth'

import { auth } from '../../../firebase'
import { COLORS } from '../../styles/theme'
import CustomButton from '../../components/Button'
import CountryCode from '../../components/CountryCode'
import CloseIcon from '../../assets/icons/Close'

interface IPhoneVerification {
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
  closeModal?: () => void
}

const initialValues = { phoneNumber: '', verifyCode: '' }

const ValidationSchema = Yup.object({
  verifyCode: Yup.string(),
  phoneNumber: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid',
    )
    .required('Please enter your phone number'),
})

const PhoneVerification: React.FC<IPhoneVerification> = ({ setIsCreated, closeModal }) => {
  const recaptchaVerifier = React.useRef<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [verificationId, setVerificationId] = useState<string | null>(null)
  const [countryCode, setCountryCode] = useState('+91')
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const handleSubmit = async (values: any) => {
    try {
      const credentials = PhoneAuthProvider.credential(verificationId as string, values.verifyCode)

      await signInWithCredential(auth, credentials)
      setIsCreated(true)
    } catch (error) {
      console.log('verification error', error)
      setErrorMessage('Invalid Verification Code')
    }
  }
  // const handleSendCode = async (phoneNumber: any) => {
  //   console.log(phoneNumber)
  //   try {
  //     const phoneProvider = new PhoneAuthProvider(auth)
  //     const data = phoneProvider
  //       .verifyPhoneNumber(countryCode + phoneNumber, recaptchaVerifier.current)
  //       .then(setVerificationId)
  //     console.log('data', data)
  //     setErrorMessage(' Verification Code sent')
  //   } catch (error) {
  //     console.log('sendcode error', error)
  //   }
  // }

  const handleSendCode = async (phoneNumber: any) => {
    try {
      // const axios = require('axios')

      // const options = {
      //   method: 'GET',
      //   url: 'https://d7-verify.p.rapidapi.com/messages/v1/balance',
      //   headers: {
      //     Token: '<REQUIRED>',
      //     'X-RapidAPI-Key': '170cad104amsh154e32444b61484p104324jsn8696eb46d7bb',
      //     'X-RapidAPI-Host': 'd7-verify.p.rapidapi.com',
      //   },
      // }

      const { data } = await axios.post(
        'https://d7-verify.p.rapidapi.com/verify/v1/otp/send-otp',
        {
          originator: 'SignOTP',
          recipient: '+916385126861',
          content: 'Greetings from D7 API, your mobile verification code is: {}',
          expiry: '600',
          data_coding: 'text',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiYzc4MWU1ZTAtYmFlNy00ZGRhLWI2OGYtNzJjZmE1YzFkYjNiIn0.6mEiOHi2jlJVnxai1WtATKIri_AClQvnz_k4m_giJoc',
            'X-RapidAPI-Key': '266b2c0a6fmshe08360bc073287ep10e695jsna63fcbdf866d',
            'X-RapidAPI-Host': 'd7-verify.p.rapidapi.com',
          },
        },
      )

      console.log('data', data)
    } catch (error) {
      console.log('error', Object.keys(error as any))
      console.log('error', Object.values(error as any))
    }
  }

  return (
    <SignUpWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
          <SignUpContainer>
            <SignUpHead>
              <SignUpHeading>Phone Verification</SignUpHeading>
              <Pressable onPress={closeModal}>
                <CloseIcon width={24} height={24} />
              </Pressable>
            </SignUpHead>

            <View>
              <LabelText>Phone Number</LabelText>
              <InputBorder>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                  <CountryCode
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    setShow={setShow}
                    show={show}
                  />
                  <InputStyle
                    placeholder='Enter your phone number'
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    placeholderTextColor={COLORS.SecondaryTwo}
                    autoCorrect={false}
                  />
                </View>
                <Pressable onPress={() => handleSendCode(values.phoneNumber)}>
                  <VerifyText>Send</VerifyText>
                </Pressable>
              </InputBorder>
              {touched.phoneNumber && errors.phoneNumber && (
                <ErrorText>{errors.phoneNumber}</ErrorText>
              )}
            </View>
            <View>
              <LabelText>Verify Code</LabelText>
              <InputBorder>
                <InputStyle
                  placeholder='Enter your verifyCode'
                  value={values.verifyCode}
                  onChangeText={handleChange('verifyCode')}
                  onBlur={handleBlur('verifyCode')}
                  placeholderTextColor={COLORS.SecondaryTwo}
                  autoCorrect={false}
                />
                {/* <Pressable onPress={() => handleVerifyCode(values.verifyCode)}>
                    <VerifyText>Verify</VerifyText>
                  </Pressable> */}
              </InputBorder>
              {touched.verifyCode && errors.verifyCode && (
                <ErrorText>{errors.verifyCode}</ErrorText>
              )}
            </View>

            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

            <CustomButton
              variant='primary'
              onPress={() => {
                handleSubmit()
              }}
              text='Verify'
              fontFamily='Arvo-Regular'
              fontSize={14}
              buttonStyle={[styles.submitBtn]}
            />
          </SignUpContainer>
        )}
      </Formik>
    </SignUpWrapper>
  )
}

export default PhoneVerification

const SignUpWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundBlurClr};
`

const SignUpContainer = styled.View`
  background-color: ${COLORS.iconsNormalClr};
  padding: 20px;
  border-radius: 10px;
  width: 328px;
`

const SignUpHead = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SignUpHeading = styled.Text`
  font-size: 20px;
  letter-spacing: -0.4px;
  font-family: Arvo-Regular;
  color: ${COLORS.iconsHighlightClr};
`

const LabelText = styled.Text`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: ${COLORS.textClr};
  font-family: Gilroy-Medium;
  margin-top: 16px;
  margin-bottom: 8px;
`

const AccountViewText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
`

const InputBorder = styled.View`
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  padding-vertical: 8px;
  padding-horizontal: 30px;
`

const VerifyText = styled.Text`
  font-size: 12px;
  color: ${COLORS.textSecondaryClr};
  font-family: Gilroy-Regular;
`

const InputStyle = styled.TextInput`
  font-family: Gilroy-Medium;
  width: 100%;
  font-size: 12px;
`

const ErrorText = styled.Text`
  font-size: 12px;
  color: ${COLORS.errorClr};
`

const AccountView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`

const LoginLink = styled.Text`
  color: ${COLORS.textSecondaryClr};
  font-size: 14px;
  font-family: Gilroy-Medium;
`

const CreatedAccount = styled.View`
  background-color: ${COLORS.iconsNormalClr};
  padding: 60px;
  border-radius: 10px;
  display: flex;
  flext-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

const styles = StyleSheet.create({
  submitBtn: {
    marginVertical: 16,
  },
})

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const PhoneVerification = () => {
//   return (
//     <View>
//       <Text>PhoneVerification</Text>
//     </View>
//   )
// }

// export default PhoneVerification

// const styles = StyleSheet.create({})
