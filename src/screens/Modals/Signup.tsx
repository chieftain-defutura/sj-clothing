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
import { sendEmailVerification } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Modal, StyleSheet, Pressable, TouchableOpacity, Text } from 'react-native'

import { COLORS } from '../../styles/theme'
import { auth, db } from '../../../firebase'
import CloseIcon from '../../assets/icons/Close'
import EyeIcon from '../../assets/icons/EyeIcon'
import { userStore } from '../../store/userStore'
import CustomButton from '../../components/Button'
import PhoneVerification from './PhoneVerification'
import EmailVerification from './EmailVerification'
import GreenTick from '../../assets/icons/GreenTick'
import EyeHideIcon from '../../assets/icons/EyeIconHide'

interface SignupModalProps {
  isVisible?: boolean
  onClose?: () => void
  onLoginClick?: () => void
}

const initialValues = { name: '', email: '', password: '' }

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

const SignupModal: React.FC<SignupModalProps> = ({ isVisible, onClose, onLoginClick }) => {
  const navigation = useNavigation()
  const rate = userStore((state) => state.rate)
  const user = userStore((store) => store.user)
  const [isChecked, setChecked] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const avatar = userStore((state) => state.avatar)
  const currency = userStore((state) => state.currency)
  const language = userStore((state) => state.language)
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

  const handleSubmit = async (values: typeof initialValues) => {
    if (!user) {
      try {
        setIsLoading(true)
        const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password)
        await updateProfile(user, { displayName: values.name })
        await AsyncStorage.setItem('mail', values.email)
        await AsyncStorage.setItem('password', values.password)
        const userDocRef = doc(db, 'users', user.uid)
        updateUser(user)

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
        })
        await sendEmailVerification(user)
        setShowVerificationModal(true)
      } catch (error) {
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
  }

  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      {!user && (
        <SignUpWrapper>
          <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <SignUpContainer>
                <SignUpHead>
                  <SignUpHeading>Create Account</SignUpHeading>
                  <Pressable onPress={onClose}>
                    <CloseIcon width={24} height={24} />
                  </Pressable>
                </SignUpHead>
                <View>
                  <LabelText>Full name</LabelText>
                  <InputBorder>
                    <InputStyle
                      placeholder='Enter your name'
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      placeholderTextColor={COLORS.SecondaryTwo}
                      autoCorrect={false}
                    />
                  </InputBorder>
                  {touched.name && errors.name && <ErrorText>{errors.name}</ErrorText>}
                </View>
                <View>
                  <LabelText>E-mail</LabelText>
                  <InputBorder>
                    <InputStyle
                      placeholder='Enter your e-mail'
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholderTextColor={COLORS.SecondaryTwo}
                      autoCorrect={false}
                    />
                    {/* <Pressable onPress={handleVerify}>
                      <VerifyText>Verify</VerifyText>
                    </Pressable> */}
                  </InputBorder>
                  {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
                </View>
                <View>
                  <LabelText>Create Password</LabelText>
                  <InputBorder>
                    <InputStyle
                      secureTextEntry={!showPassword}
                      placeholder='Enter password'
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => handleBlur('password')}
                      placeholderTextColor={COLORS.SecondaryTwo}
                      autoCorrect={false}
                    />
                    <Pressable onPress={togglePasswordVisibility}>
                      {showPassword ? (
                        <EyeIcon width={14} height={14} />
                      ) : (
                        <EyeHideIcon width={14} height={14} />
                      )}
                    </Pressable>
                  </InputBorder>
                  {touched.password && errors.password && <ErrorText>{errors.password}</ErrorText>}
                </View>
                {/* <View>
                  <LabelText>Phone Number</LabelText>
                  <InputBorder>
                    <InputStyle
                      placeholder='Enter your phone number'
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      placeholderTextColor={COLORS.SecondaryTwo}
                      autoCorrect={false}
                    />
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
                    <Pressable onPress={() => handleVerifyCode(values.verifyCode)}>
                      <VerifyText>Verify</VerifyText>
                    </Pressable>
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
                /> */}
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
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
                  <AccountViewText>Accept all</AccountViewText>
                  <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')}>
                    <AccountViewText style={{ color: COLORS.textClr }}>
                      Terms and conditions
                    </AccountViewText>
                  </TouchableOpacity>
                </View>
                <CustomButton
                  variant='primary'
                  text={isLoading ? 'Create Account...' : 'Create Account'}
                  onPress={() => {
                    handleSubmit()
                  }}
                  disabled={!isChecked}
                  fontFamily='Arvo-Regular'
                  fontSize={14}
                  buttonStyle={[styles.submitBtn]}
                />

                <AccountView>
                  <AccountViewText>Already have an account?</AccountViewText>
                  <Pressable onPress={onLoginClick}>
                    <LoginLink>Log in</LoginLink>
                  </Pressable>
                </AccountView>
              </SignUpContainer>
            )}
          </Formik>
        </SignUpWrapper>
      )}

      {((user && !user.emailVerified) || showVerificationModal) && (
        <EmailVerification
          setIsCreated={setIsCreated}
          setShowVerificationModal={setShowVerificationModal}
          errorMessage={errorMessage}
          closeModal={onClose}
        />
      )}
      {/* {user && user.emailVerified && !user.phoneNumber && !isCreated && (
        <PhoneVerification setIsCreated={setIsCreated} closeModal={onClose} />
      )} */}

      {user && user.emailVerified && isCreated && (
        <SignUpWrapper>
          <CreatedAccount>
            <GreenTick width={100} height={100} />
            <Text style={{ fontSize: 20, color: COLORS.textRGBAClr, fontFamily: 'Gilroy-Medium' }}>
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
  justify-content: space-around;
  flex-direction: row;
  padding-vertical: 8px;
  padding-horizontal: 16px;
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

export default SignupModal

const styles = StyleSheet.create({
  submitBtn: {
    marginVertical: 16,
  },
})
