import React, { useState } from 'react'
import { View, Modal, StyleSheet, Pressable } from 'react-native'
import styled from 'styled-components/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { COLORS } from '../styles/theme'
import CloseIcon from '../assets/icons/Close'
import CustomButton from '../components/Button'
import EyeIcon from '../assets/icons/EyeIcon'
import EyeHideIcon from '../assets/icons/EyeIconHide'

interface LoginModalProps {
  isVisible?: boolean
  onClose?: () => void
  onSignClick: () => void
}

const initialValues = { email: '', password: '' }

const ValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Please enter your email address'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    ),
})

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, onClose, onSignClick }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isSignUpModel, setSignupMoodel] = React.useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const closeSignUpModel = () => {
    setSignupMoodel(false)
  }

  const onSignUpClick = () => {
    setSignupMoodel(true)
  }

  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <LoginWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, errors, touched, handleChange, isValid, handleSubmit, handleBlur }) => (
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
                  />
                  <VerifyText>Verify</VerifyText>
                </InputBorder>
                {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
              </View>
              <View>
                <LabelText>Password</LabelText>
                <InputBorder style={{ marginBottom: 16 }}>
                  <InputStyle
                    secureTextEntry={!showPassword}
                    placeholder='Enter password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => handleBlur('password')}
                    placeholderTextColor={COLORS.SecondaryTwo}
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
              {/* <Pressable>
                <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
              </Pressable> */}

              <CustomButton
                variant='primary'
                text='Log in'
                onPress={() => handleSubmit()}
                disabled={!isValid}
                buttonStyle={[styles.submitBtn]}
              />

              <AccountView>
                <AccountViewText>Don’t have an account?</AccountViewText>
                <Pressable onPress={() => onSignClick()}>
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

const VerifyText = styled.Text`
  font-size: 12px;
  color: ${COLORS.textSecondaryClr};
  font-family: Gilroy-Regular;
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
