import * as Yup from 'yup'
import { Formik } from 'formik'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

import { auth } from '../../../firebase'
import { COLORS } from '../../styles/theme'
import CustomButton from '../../components/Button'
import CountryCode from '../../components/CountryCode'

interface IPhoneVerification {
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
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

const PhoneVerification: React.FC<IPhoneVerification> = ({ setIsCreated }) => {
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
  const handleSendCode = async (phoneNumber: any) => {
    console.log(phoneNumber)
    try {
      const phoneProvider = new PhoneAuthProvider(auth)
      const data = phoneProvider
        .verifyPhoneNumber(countryCode + phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId)
      console.log('data', data)
      setErrorMessage(' Verification Code sent')
    } catch (error) {
      console.log('sendcode error', error)
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
              {/* <Pressable onPress={onClose}>
                  <CloseIcon width={24} height={24} />
                </Pressable> */}
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
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={{
                apiKey: 'AIzaSyDaXYPmyl86Pttlc6z6jBjoir2ejsPAx2g',
                authDomain: 'sj-clothing-app-e38ad.firebaseapp.com',
                projectId: 'sj-clothing-app-e38ad',
                storageBucket: 'sj-clothing-app-e38ad.appspot.com',
                messagingSenderId: '529299213781',
                appId: '1:529299213781:web:038dc9c1795f0b5361c15c',
                measurementId: 'G-5643DV97N4',
              }}
            />
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
