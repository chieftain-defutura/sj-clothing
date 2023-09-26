import * as Yup from 'yup'
import { Formik } from 'formik'
import styled from 'styled-components/native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Modal, StyleSheet, Pressable } from 'react-native'
import { sendEmailVerification } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../../firebase'
import { COLORS } from '../styles/theme'
import { FirebaseError } from 'firebase/app'
import CloseIcon from '../assets/icons/Close'
import EyeIcon from '../assets/icons/EyeIcon'
import { userStore } from '../store/userStore'
import CustomButton from '../components/Button'
import EyeHideIcon from '../assets/icons/EyeIconHide'

interface SignupModalProps {
  isVisible?: boolean
  onClose?: () => void
  onLoginClick?: () => void
}

const initialValues = { name: '', email: '', password: '' }

const ValidationSchema = Yup.object({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string().email('Invalid email').required('Please enter your email address'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    ),
})

const SignupModal: React.FC<SignupModalProps> = ({ isVisible, onClose, onLoginClick }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const updateUser = userStore((state) => state.updateUser)
  const user = userStore((state) => state.user)
  const updateFetching = userStore((state) => state.updateFetching)
  const { setMail } = userStore()
  const navigation = useNavigation()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleVerify = async () => {
    if (!user) {
      console.error('User is null. Cannot send email verification.')
      return
    }

    await sendEmailVerification(user)
    console.log('Verify')
  }

  useEffect(() => {
    return onAuthStateChanged(auth, (data) => {
      if (data) {
        updateUser(data)
        setTimeout(() => {
          updateFetching(false)
          isVisible = false
        }, 0)
      } else {
        setTimeout(() => {
          updateFetching(false)
          isVisible = false
        }, 0)
      }
    })
  }, [])

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true)
      const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password)
      await updateProfile(user, { displayName: values.name })
      await AsyncStorage.setItem('mail', values.email)
      await AsyncStorage.setItem('name', values.name)
      navigation.navigate('Post')
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          setErrorMessage('Email is already in use. Please choose a different email.')
        }
      }
    } finally {
      setIsLoading(false)
      onClose?.()
    }
  }

  const getData = useCallback(async () => {
    await AsyncStorage.getItem('mail')
    const data = await AsyncStorage.getItem('mail')
    setMail(data)
    console.log(data)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <SignUpWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, isValid, handleSubmit, handleBlur }) => (
            <SignUpContainer>
              <SignUpHead>
                <SignUpHeading>Sign up</SignUpHeading>
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
                  />
                  <Pressable onPress={handleVerify}>
                    <VerifyText>Verify</VerifyText>
                  </Pressable>
                </InputBorder>
                {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
              </View>
              <View>
                <LabelText>Password</LabelText>
                <InputBorder>
                  <InputStyle
                    secureTextEntry={!showPassword}
                    placeholder='Enter password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => handleBlur('password')}
                    placeholderTextColor={COLORS.SecondaryTwo}
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

              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

              <CustomButton
                variant='primary'
                text={isLoading ? 'Signing up...' : 'Sign up'}
                onPress={() => {
                  handleSubmit()
                }}
                disabled={!isValid || isLoading}
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

export default SignupModal

const styles = StyleSheet.create({
  submitBtn: {
    marginVertical: 16,
  },
})
