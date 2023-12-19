import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Checkbox from 'expo-checkbox'
import { FirebaseError } from 'firebase/app'
import styled from 'styled-components/native'
import React, { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore/lite'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Modal, StyleSheet, Pressable, TouchableOpacity, Text, Platform } from 'react-native'
import { COLORS } from '../../styles/theme'
import { auth, db } from '../../../firebase'
import CloseIcon from '../../assets/icons/Close'
import EyeIcon from '../../assets/icons/EyeIcon'
import { userStore } from '../../store/userStore'
import CustomButton from '../../components/Button'
import PhoneVerification from './PhoneVerification'
import GreenTick from '../../assets/icons/GreenTick'
import EyeHideIcon from '../../assets/icons/EyeIconHide'
import axios from 'axios'
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated'

interface SignupModalProps {
  isVisible?: boolean
  onClose?: () => void
  onLoginClick?: () => void
  setOpenCheckout?: React.Dispatch<React.SetStateAction<boolean>>
}

const initialValues = { name: '', email: '', password: '' }
const OTPInitialValues = { otp: '' }
const ValidationSchema = Yup.object({
  name: Yup.string()
    .required('Please enter your name')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  email: Yup.string()
    .transform((originalValue) => originalValue.toLowerCase().trim())
    .email('Enter a valid email')
    .required('Please enter your email address'),

  password: Yup.string()
    .min(8)
    .required('Please enter your password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    ),
})

const OTPValidationSchema = Yup.object({
  otp: Yup.string().required('Please enter your OTP'),
})
const SignupModal: React.FC<SignupModalProps> = ({
  isVisible,
  onClose,
  onLoginClick,
  setOpenCheckout,
}) => {
  const navigation = useNavigation()
  const rate = userStore((state) => state.rate)
  const user = userStore((store) => store.user)
  const [isChecked, setChecked] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerify, setVerify] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const avatar = userStore((state) => state.avatar)
  const currency = userStore((state) => state.currency)
  const language = userStore((state) => state.language)
  const updateSignupUpdate = userStore((state) => state.updateSignupUpdate)

  const updateUser = userStore((state) => state.updateUser)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const confirmDetails = userStore((state) => state.confirmDetails)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showVerificationModal, setShowVerificationModal] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  useEffect(() => {
    if (isCreated) {
      const timer = setTimeout(() => {
        setIsCreated(false)
        onClose?.()
      }, 3500)

      return () => clearTimeout(timer)
    }
  }, [isCreated])

  const generateVerificationCode = () => {
    const codeLength = 6
    const minDigit = Math.pow(10, codeLength - 1)
    const maxDigit = Math.pow(10, codeLength) - 1
    return Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit
  }

  const handleVerify = async (values: typeof initialValues) => {
    try {
      setIsLoading(true)

      const verificationCode = generateVerificationCode()
      const templateParams = {
        service_id: 'service_n32ytbw',
        template_id: 'template_y5cz23c',
        user_id: 'K-e_VO9kSsyCRevPa',
        template_params: {
          to_email: values.email,
          subject: 'verification code',
          message: `${verificationCode}`,
          to_name: name,
          from_name: 'SprinkleNadar',
        },
        accessToken: '6QdtVkNQ_KdK672G8cg_l',
      }
      const { data } = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        templateParams,
      )

      setEmail(values.email)
      setName(values.name)
      setPassword(values.password)
      setVerificationCode(verificationCode.toString())

      console.log(data)
      setIsLoading(false)
    } catch (error) {
      console.log('error', Object.values(error as any))
      setVerificationCode('')
      setErrorMessage('Invalid email')
      setIsLoading(false)
      if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          setErrorMessage('Email is a lready in use. Please choose a different email.')
        }
      } else {
        setErrorMessage('An error occurred while signing up. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (values: typeof OTPInitialValues) => {
    if (values.otp !== verificationCode) {
      setErrorMessage('Invalid OTP')
      return
    }
    if (!user) {
      try {
        setIsLoading(true)

        updateSignupUpdate('INVALID')

        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(user, { displayName: name })
        await AsyncStorage.setItem('mail', email)
        await AsyncStorage.setItem('password', password)
        const expotokens = await AsyncStorage.getItem('expotokens')
        const parseExpoTokens = JSON.parse(expotokens as string)

        const userDocRef = doc(db, 'users', user.uid)
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          address: [],
          profile: null,
          phoneNo: null,
          avatar: avatar,
          termsAndConditions: false,
          currency: currency,
          language: language,

          rate: rate,
          confirmDetails: confirmDetails,
          tokens: [parseExpoTokens],
        })

        updateUser(user)

        updateSignupUpdate('VALID')
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      {!user && (
        <SignUpWrapper>
          {!verificationCode && (
            <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={handleVerify}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <SignUpContainer>
                  <SignUpHead>
                    <SignUpHeading allowFontScaling={false}>Create Account</SignUpHeading>
                    <Pressable onPress={onClose}>
                      <CloseIcon width={24} height={24} />
                    </Pressable>
                  </SignUpHead>

                  <View>
                    <LabelText allowFontScaling={false}>Full name</LabelText>
                    <InputBorder>
                      <InputStyle
                        placeholder='Enter your name'
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        placeholderTextColor={COLORS.SecondaryTwo}
                        autoCorrect={false}
                        allowFontScaling={false}
                        style={styles.input}
                      />
                    </InputBorder>
                    {touched.name && errors.name && (
                      <ErrorText allowFontScaling={false}>{errors.name}</ErrorText>
                    )}
                  </View>
                  <View>
                    <LabelText allowFontScaling={false}>E-mail</LabelText>
                    <InputBorder>
                      <InputStyle
                        placeholder='Enter your e-mail'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholderTextColor={COLORS.SecondaryTwo}
                        autoCorrect={false}
                        allowFontScaling={false}
                        style={styles.input}
                      />
                      {/* <Pressable
                          style={{ opacity: verificationCode ? 0 : 1 }}
                          onPress={() => handleVerify(values.email, values.name)}
                        >
                          <VerifyText>Send OTP</VerifyText>
                        </Pressable> */}
                    </InputBorder>

                    {touched.email && errors.email && (
                      <ErrorText allowFontScaling={false}>{errors.email}</ErrorText>
                    )}
                  </View>
                  <View>
                    <LabelText allowFontScaling={false}>Create Password</LabelText>
                    <InputBorder>
                      <InputStyle
                        secureTextEntry={!showPassword}
                        placeholder='Enter password'
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={() => handleBlur('password')}
                        placeholderTextColor={COLORS.SecondaryTwo}
                        autoCorrect={false}
                        allowFontScaling={false}
                        style={[{ width: 240 }, styles.input]}
                      />
                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={{ paddingRight: 15 }}
                      >
                        {showPassword ? (
                          <EyeIcon width={14} height={14} />
                        ) : (
                          <EyeHideIcon width={14} height={14} />
                        )}
                      </TouchableOpacity>
                    </InputBorder>
                    {touched.password && errors.password && (
                      <ErrorText allowFontScaling={false}>{errors.password}</ErrorText>
                    )}
                  </View>
                  {errorMessage && <ErrorText allowFontScaling={false}>{errorMessage}</ErrorText>}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      paddingTop: 16,
                    }}
                  >
                    <Checkbox
                      // style={styles.checkbox}
                      value={isChecked}
                      onValueChange={setChecked}
                      color={isChecked ? COLORS.textSecondaryClr : undefined}
                    />
                    <AccountViewText allowFontScaling={false}>Accept all</AccountViewText>
                    <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')}>
                      <AccountViewText allowFontScaling={false} style={{ color: COLORS.textClr }}>
                        Terms and conditions
                      </AccountViewText>
                    </TouchableOpacity>
                  </View>
                  <CustomButton
                    variant='primary'
                    text={isLoading ? 'Sending...' : 'Send OTP'}
                    onPress={() => handleSubmit()}
                    fontFamily='Arvo-Regular'
                    disabled={!isChecked || isLoading}
                    fontSize={14}
                    buttonStyle={[styles.submitBtn]}
                  />
                  <AccountView>
                    <AccountViewText allowFontScaling={false}>
                      Already have an account?
                    </AccountViewText>
                    <Pressable onPress={onLoginClick}>
                      <LoginLink allowFontScaling={false}>Log in</LoginLink>
                    </Pressable>
                  </AccountView>
                </SignUpContainer>
              )}
            </Formik>
          )}

          {verificationCode && (
            <Formik
              initialValues={OTPInitialValues}
              validationSchema={OTPValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <SignUpContainer>
                  <SignUpHead>
                    <SignUpHeading allowFontScaling={false}>Create Account</SignUpHeading>
                    <Pressable onPress={onClose}>
                      <CloseIcon width={24} height={24} />
                    </Pressable>
                  </SignUpHead>

                  <Animated.View entering={FadeInUp.duration(500)} exiting={FadeOutDown}>
                    <LabelText allowFontScaling={false}>Verify Email OTP</LabelText>
                    <InputBorder>
                      <InputStyle
                        placeholder='Enter your OTP'
                        value={values.otp}
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        placeholderTextColor={COLORS.SecondaryTwo}
                        autoCorrect={false}
                        allowFontScaling={false}
                        style={[{ width: 200 }, styles.input]}
                      />
                      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <Pressable
                          style={{ opacity: isVerify ? 0 : 1 }}
                          disabled={isVerify}
                          // onPress={() => handleVerify()}
                        >
                          <VerifyText allowFontScaling={false}>Resend</VerifyText>
                        </Pressable>
                      </View>
                    </InputBorder>
                    {touched.otp && errors.otp && (
                      <ErrorText allowFontScaling={false}>{errors.otp}</ErrorText>
                    )}
                  </Animated.View>

                  {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

                  <CustomButton
                    variant='primary'
                    text={isLoading ? 'Create Account...' : 'Create Account'}
                    onPress={() => {
                      handleSubmit()
                    }}
                    fontFamily='Arvo-Regular'
                    fontSize={14}
                    disabled={isLoading}
                    buttonStyle={[styles.submitBtn]}
                  />
                </SignUpContainer>
              )}
            </Formik>
          )}
        </SignUpWrapper>
      )}

      {/* {((user && !user.emailVerified) || showVerificationModal) && (
        <EmailVerification
          // setIsCreated={setIsCreated}
          setShowVerificationModal={setShowVerificationModal}
          errorMessage={errorMessage}
          closeModal={onClose}
        />
      )} */}
      {user && !user.phoneNumber && !isCreated && (
        <PhoneVerification
          setIsCreated={setIsCreated}
          closeModal={onClose}
          setOpenCheckout={setOpenCheckout}
        />
      )}

      {user && user.phoneNumber && isCreated && (
        <SignUpWrapper>
          <CreatedAccount>
            <GreenTick width={100} height={100} />
            <Text
              allowFontScaling={false}
              style={{ fontSize: 20, color: COLORS.textRGBAClr, fontFamily: 'Gilroy-Medium' }}
            >
              Account Created
            </Text>
          </CreatedAccount>
        </SignUpWrapper>
      )}
    </Modal>
  )
}

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
  justify-content: space-between;
  flex-direction: row;
`

const VerifyText = styled.Text`
  font-size: 12px;
  color: ${COLORS.textSecondaryClr};
  font-family: Gilroy-Regular;
  padding-right: 12px;
`

const InputStyle = styled.TextInput`
  font-family: Gilroy-Medium;
  width: 100%;
  font-size: 12px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
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

export default SignupModal

const styles = StyleSheet.create({
  submitBtn: {
    marginVertical: 16,
  },
  input: {
    ...Platform.select({
      ios: {
        paddingVertical: 12,
      },
    }),
  },
})
