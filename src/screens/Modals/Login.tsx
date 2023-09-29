import * as Yup from 'yup'
import { Formik } from 'formik'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Modal, StyleSheet, Pressable } from 'react-native'
import { AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'
import { COLORS } from '../../styles/theme'
import { FirebaseError } from 'firebase/app'
import CloseIcon from '../../assets/icons/Close'
import EyeIcon from '../../assets/icons/EyeIcon'
import CustomButton from '../../components/Button'
import EyeHideIcon from '../../assets/icons/EyeIconHide'

interface LoginModalProps {
  isVisible?: boolean
  onClose?: () => void
  onSignClick?: () => void
  onForgotClick?: () => void
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
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, values.email, values.password)
      console.log('User logged in successfully')
      onClose?.()
    } catch (error) {
      console.log(error)
      if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
          setErrorMessage('Invalid password')
        } else if (error.code === AuthErrorCodes.USER_DELETED) {
          setErrorMessage('User not found')
        } else if (error.code === AuthErrorCodes.NETWORK_REQUEST_FAILED) {
          setErrorMessage('Network Error')
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
                <LoginHeading>Log in</LoginHeading>
                <Pressable onPress={onClose}>
                  <CloseIcon width={24} height={24} />
                </Pressable>
              </LoginHead>

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
                    autoCorrect={false}
                  />
                  <Pressable
                    onPress={(event) => {
                      togglePasswordVisibility()
                      event.stopPropagation()
                    }}
                  >
                    {showPassword ? (
                      <EyeIcon width={14} height={14} />
                    ) : (
                      <EyeHideIcon width={14} height={14} />
                    )}
                  </Pressable>
                </InputBorder>
                {touched.password && errors.password && <ErrorText>{errors.password}</ErrorText>}
              </View>
              <Pressable onPress={onForgotClick}>
                <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
              </Pressable>

              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

              <CustomButton
                variant='primary'
                text={isLoading ? 'Logging in...' : 'Login'}
                onPress={() => {
                  handleSubmit()
                }}
                fontFamily='Arvo-Regular'
                fontSize={14}
                buttonStyle={[styles.submitBtn]}
              />

              <AccountView>
                <AccountViewText>Don’t have an account?</AccountViewText>
                <Pressable onPress={() => onSignClick?.()}>
                  <SignUpLink>Sign up</SignUpLink>
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
  justify-content: space-around;
  flex-direction: row;
  padding-vertical: 8px;
  padding-horizontal: 16px;
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
})
