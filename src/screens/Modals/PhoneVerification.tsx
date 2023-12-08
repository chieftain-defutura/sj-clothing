import * as Yup from 'yup'
import axios from 'axios'
import { Formik } from 'formik'
import { Pressable } from 'react-native'
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

interface IPhoneVerification {
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
  closeModal?: () => void
  setOpenCheckout?: React.Dispatch<React.SetStateAction<boolean>>
}

const initialValues = { phoneNumber: '', verifyCode: '' }

const ValidationSchema = Yup.object({
  // verifyCode: Yup.string().required('Enter your OTP'),
  verifyCode: Yup.string(),

  phoneNumber: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid',
    )
    .required('Please enter your phone number'),
})

const PhoneVerification: React.FC<IPhoneVerification> = ({
  setIsCreated,
  closeModal,
  setOpenCheckout,
}) => {
  const user = userStore((state) => state.user)
  const updatePhoneNo = userStore((state) => state.updatePhoneNo)
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

  const handleSubmit = async (values: any) => {
    try {
      if (!user) return
      setLoading(true)
      // if (values.verifyCode === verificationId) {
      //   await updateDoc(doc(db, 'users', user.uid), {
      //     phoneNo: values.phoneNumber,
      //   })
      //   updatePhoneNo(Number(countryCode + values.phoneNumber))
      //   setIsCreated(true)
      //   closeModal?.()
      // }
      await updateDoc(doc(db, 'users', user.uid), {
        phoneNo: values.phoneNumber,
      })
      updatePhoneNo(Number(countryCode + values.phoneNumber))
      setIsCreated(true)
      closeModal?.()
      setLoading(false)
      setOpenCheckout?.(true)
      // if (values.verifyCode !== verificationId) {
      //   setErrorMessage('Invalid Verification Code')
      // }
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
  // const handleSendCode = () => {
  //   const verificationCode = generateVerificationCode()
  //   setVerificationId(verificationCode.toString())
  // }

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
              <SignUpHeading allowFontScaling={false}>Phone Verification</SignUpHeading>
              <Pressable onPress={closeModal}>
                <CloseIcon width={24} height={24} />
              </Pressable>
            </SignUpHead>

            <View>
              <LabelText allowFontScaling={false}>Phone Number</LabelText>
              <InputBorder>
                <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 10 }}>
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
                  onPress={() => handleSendCode()}
                >
                  <VerifyText allowFontScaling={false}>Send</VerifyText>
                </Pressable> */}
              </InputBorder>
              {touched.phoneNumber && errors.phoneNumber && (
                <ErrorText allowFontScaling={false}>{errors.phoneNumber}</ErrorText>
              )}
            </View>
            {/* <View>
              <LabelText allowFontScaling={false}>Verify OTP</LabelText>
              <InputBorder>
                <InputStyle
                  placeholder='Enter your verifyCode'
                  value={values.verifyCode}
                  onChangeText={handleChange('verifyCode')}
                  onBlur={handleBlur('verifyCode')}
                  placeholderTextColor={COLORS.SecondaryTwo}
                  autoCorrect={false}
                  allowFontScaling={false}
                />
                <Pressable
                  style={{ opacity: verificationId ? 1 : 0 }}
                  onPress={() => handleSendCode()}
                >
                  <VerifyText>Resend</VerifyText>
                </Pressable>
              </InputBorder>
              {touched.verifyCode && errors.verifyCode && (
                <ErrorText allowFontScaling={false}>{errors.verifyCode}</ErrorText>
              )}
            </View>

            {errorMessage && <ErrorText allowFontScaling={false}>{errorMessage}</ErrorText>} */}

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
