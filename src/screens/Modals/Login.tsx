import * as Yup from 'yup'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { View, Modal, StyleSheet, Pressable, Platform, TouchableOpacity } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase'
import { COLORS } from '../../styles/theme'
import { FirebaseError } from 'firebase/app'
import CloseIcon from '../../assets/icons/Close'
import EyeIcon from '../../assets/icons/EyeIcon'
import CustomButton from '../../components/Button'
import EyeHideIcon from '../../assets/icons/EyeIconHide'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, doc, getDocs, query, updateDoc, where, getDoc } from 'firebase/firestore/lite'

interface LoginModalProps {
  isVisible?: boolean
  onClose?: () => void
  onSignClick?: () => void
  onForgotClick?: () => void
  setOpenCheckout?: React.Dispatch<React.SetStateAction<boolean>>
}

const initialValues = { email: '', password: '' }

const ValidationSchema = Yup.object({
  email: Yup.string()
    .transform((value, originalValue) => originalValue.toLowerCase().trim())
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

const LoginModal: React.FC<LoginModalProps> = ({
  isVisible,
  onClose,
  onSignClick,
  onForgotClick,
  setOpenCheckout,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const checkUserExists = async (email: string) => {
    const q = query(collection(db, 'users'), where('email', '==', email))
    const docs = await getDocs(q)

    return docs.size > 0
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true)

      const isUserExist = await checkUserExists(values.email)

      if (!isUserExist) {
        setErrorMessage('User not found')
        return
      }

      const { user } = await signInWithEmailAndPassword(auth, values.email, values.password)

      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()
      console.log(userData)

      if (!userData) return
      for (let pushToken of userData.tokens) {
        const expotokens = await AsyncStorage.getItem('expotokens')
        const parseExpoTokens = [JSON.parse(expotokens as string)]
        onClose?.()
        setOpenCheckout?.(true)
        if (
          pushToken.expoAndroidToken !== parseExpoTokens[0].expoAndroidToken ||
          pushToken.expoIosToken !== parseExpoTokens[0].expoIosToken
        ) {
          userData.tokens.push(...parseExpoTokens)
          await updateDoc(userDocRef, userData)
        }
        onClose?.()
      }

      console.log('User logged in successfully')
    } catch (error) {
      console.log('error', error)
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-email') {
          setErrorMessage('invalid email')
        } else if (error.code === 'auth/invalid-login-credentials') {
          setErrorMessage('Incorrect Password')
        } else if (error.code === 'auth/user-not-found') {
          setErrorMessage('User not found')
        } else if (error.code === 'auth/network-request-failed') {
          setErrorMessage('Network Error')
        } else if (error.code === 'auth/too-many-requests') {
          setErrorMessage('Too many request slow down')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <LoginWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
            <LoginContainer>
              <LoginHead>
                <LoginHeading allowFontScaling={false}>Log in</LoginHeading>
                <Pressable onPress={onClose}>
                  <CloseIcon width={24} height={24} />
                </Pressable>
              </LoginHead>

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
                </InputBorder>
                {touched.email && errors.email && (
                  <ErrorText allowFontScaling={false}>{errors.email}</ErrorText>
                )}
              </View>
              <View>
                <LabelText allowFontScaling={false}>Password</LabelText>
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
                    onPress={(event) => {
                      togglePasswordVisibility()
                      event.stopPropagation()
                    }}
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
              <Pressable onPress={onForgotClick}>
                <ForgotPasswordText allowFontScaling={false}>Forgot Password?</ForgotPasswordText>
              </Pressable>

              {errorMessage && (
                <ErrorText allowFontScaling={false} style={{ marginBottom: 12 }}>
                  {errorMessage}
                </ErrorText>
              )}

              <CustomButton
                variant='primary'
                text={isLoading ? 'Logging in...' : 'Login'}
                onPress={() => {
                  handleSubmit()
                }}
                disabled={isLoading}
                fontFamily='Arvo-Regular'
                fontSize={14}
                buttonStyle={[styles.submitBtn]}
              />

              <AccountView>
                <AccountViewText allowFontScaling={false}>Don’t have an account?</AccountViewText>
                <Pressable onPress={() => onSignClick?.()}>
                  <SignUpLink allowFontScaling={false}>Create Account</SignUpLink>
                </Pressable>
              </AccountView>
            </LoginContainer>
          )}
        </Formik>
      </LoginWrapper>
    </Modal>
  )
}

const LoginWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundBlurClr};
`

const LoginContainer = styled.View`
  background-color: ${COLORS.iconsNormalClr};
  padding: 20px;
  border-radius: 10px;
  width: 328px;
`

const LoginHead = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LoginHeading = styled.Text`
  font-size: 20px;
  letter-spacing: -0.4px;
  font-family: Arvo-Regular;
  color: ${COLORS.textClr};
`

const LabelText = styled.Text`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: ${COLORS.textClr};
  font-family: Gilroy-Medium;
  margin-top: 16px;
  margin-bottom: 8px;
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

const ForgotPasswordText = styled.Text`
  font-family: Gilroy-Regular;
  color: ${COLORS.textSecondaryClr};
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 16px;
`

const AccountView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`

const AccountViewText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
`

const SignUpLink = styled.Text`
  color: ${COLORS.textSecondaryClr};
  font-size: 14px;
  font-family: Gilroy-Medium;
`

export default LoginModal

const styles = StyleSheet.create({
  submitBtn: {
    marginBottom: 16,
    fontFamily: 'Montserrat-Medium',
  },
  input: {
    ...Platform.select({
      ios: {
        paddingVertical: 12,
      },
    }),
  },
})
