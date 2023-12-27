import * as Yup from 'yup'
import { Formik } from 'formik'
import { Pressable, Text } from 'react-native'
import styled from 'styled-components/native'
import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase'
import { COLORS } from '../../styles/theme'
import CustomButton from '../../components/Button'
import CountryCode from '../../components/CountryCode'
import CloseIcon from '../../assets/icons/Close'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { userStore } from '../../store/userStore'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import GreenTick from '../../assets/icons/GreenTick'

interface IPhoneVerification {
  closeModal?: () => void
  setOpenCheckout?: React.Dispatch<React.SetStateAction<boolean>>
}

const initialValues = { phoneNumber: '' }
const OTPInitialValues = { otp: '' }
const ValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid',
    )
    .required('Please enter your phone number'),
})
const OTPValidationSchema = Yup.object({
  otp: Yup.string().required('Please enter your OTP'),
})

const PhoneVerification: React.FC<IPhoneVerification> = ({ closeModal, setOpenCheckout }) => {
  const user = userStore((state) => state.user)
  const updatePhoneNo = userStore((state) => state.updatePhoneNo)
  const [isCreated, setIsCreated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [verificationId, setVerificationId] = useState<string | null>(null)
  const [countryCode, setCountryCode] = useState('+91')
  const [isLoading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  useEffect(() => {
    if (isCreated) {
      const timer = setTimeout(() => {
        setIsCreated(false)
        closeModal?.()
      }, 3500)

      return () => clearTimeout(timer)
    }
  }, [isCreated])

  const handleSubmit = async (values: any) => {
    try {
      if (!user) return
      setLoading(true)
      if (values.otp === verificationId) {
        await updateDoc(doc(db, 'users', user.uid), {
          phoneNo: values.phoneNumber,
        })
        updatePhoneNo(Number(countryCode + values.phoneNumber))
        setIsCreated(true)
        setOpenCheckout?.(true)
      }

      if (values.otp !== verificationId) {
        setErrorMessage('Invalid Verification Code')
      }
    } catch (error) {
      console.log('verification error', error)
      setErrorMessage('Invalid Verification Code')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const generateVerificationCode = () => {
    const codeLength = 6
    const minDigit = Math.pow(10, codeLength - 1)
    const maxDigit = Math.pow(10, codeLength) - 1
    return Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit
  }

  const handleSendCode = async (values: any) => {
    try {
      const verificationCode = generateVerificationCode()
      setVerificationId(verificationCode.toString())
      const response = await axios.post(`${API_URL}/send-otp`, {
        phoneNumber: countryCode + values.phoneNumber,
        otp: verificationCode,
      })
      setPhoneNumber(values.phoneNumber)
      console.log('response', response)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(isCreated)
  return (
    <SignUpWrapper>
      {!isCreated ? (
        <>
          {!verificationId ? (
            <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={handleSendCode}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <SignUpContainer>
                  <SignUpHead>
                    <SignUpHeading allowFontScaling={false}>Phone Verification</SignUpHeading>
                    <Pressable onPress={closeModal}>
                      <CloseIcon width={24} height={24} />
                    </Pressable>
                  </SignUpHead>

                  <View>
                    <LabelText allowFontScaling={false}>Phone Number</LabelText>
                    <InputBorder style={{ paddingVertical: 0 }}>
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
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
                          allowFontScaling={false}
                        />
                      </View>
                      {/* <Pressable
                  style={{ opacity: verificationId ? 0 : 1 }}
                  onPress={() => handleSendCode(values.phoneNumber)}
                >
                  <VerifyText allowFontScaling={false}>Send</VerifyText>
                </Pressable> */}
                    </InputBorder>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <ErrorText allowFontScaling={false}>{errors.phoneNumber}</ErrorText>
                    )}
                  </View>

                  {errorMessage && <ErrorText allowFontScaling={false}>{errorMessage}</ErrorText>}

                  <CustomButton
                    variant='primary'
                    onPress={() => {
                      handleSubmit()
                    }}
                    disabled={isLoading}
                    text={isLoading ? 'Sending...' : 'Send OTP'}
                    fontFamily='Arvo-Regular'
                    fontSize={14}
                    buttonStyle={[styles.submitBtn]}
                  />
                </SignUpContainer>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={OTPInitialValues}
              validationSchema={OTPValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <SignUpContainer>
                  <SignUpHead>
                    <SignUpHeading allowFontScaling={false}>Phone Verification</SignUpHeading>
                    <Pressable onPress={closeModal}>
                      <CloseIcon width={24} height={24} />
                    </Pressable>
                  </SignUpHead>

                  <View>
                    <LabelText allowFontScaling={false}>Verify OTP</LabelText>
                    <InputBorder>
                      <InputStyle
                        placeholder='Enter Your OTP'
                        value={values.otp}
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        placeholderTextColor={COLORS.SecondaryTwo}
                        autoCorrect={false}
                        allowFontScaling={false}
                      />
                      <Pressable
                        style={{ opacity: verificationId ? 1 : 0 }}
                        onPress={() => handleSendCode(phoneNumber)}
                      >
                        <VerifyText>Resend</VerifyText>
                      </Pressable>
                    </InputBorder>
                    {touched.otp && errors.otp && (
                      <ErrorText allowFontScaling={false}>{errors.otp}</ErrorText>
                    )}
                  </View>

                  {errorMessage && <ErrorText allowFontScaling={false}>{errorMessage}</ErrorText>}

                  <CustomButton
                    variant='primary'
                    onPress={() => {
                      handleSubmit()
                    }}
                    disabled={isLoading}
                    text={isLoading ? 'Verifing...' : 'Verify'}
                    fontFamily='Arvo-Regular'
                    fontSize={14}
                    buttonStyle={[styles.submitBtn]}
                  />
                </SignUpContainer>
              )}
            </Formik>
          )}
        </>
      ) : (
        <CreatedAccount>
          <GreenTick width={100} height={100} />
          <Text
            allowFontScaling={false}
            style={{ fontSize: 20, color: COLORS.textRGBAClr, fontFamily: 'Gilroy-Medium' }}
          >
            Account Created
          </Text>
        </CreatedAccount>
      )}
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
