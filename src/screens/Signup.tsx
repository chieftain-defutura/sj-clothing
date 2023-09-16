import React from 'react'
import { View, Modal, StyleSheet, Pressable } from 'react-native'
import styled from 'styled-components/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { COLORS } from '../styles/theme'
import CloseIcon from '../assets/icons/Close'
import CustomButton from '../components/Button'

interface SignupModalProps {
  isVisible?: boolean
  onClose?: () => void
  onLoginClick: () => void
}

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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
})

const SignupModal: React.FC<SignupModalProps> = ({ isVisible, onClose, onLoginClick }) => {
  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <SignUpWrapper>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values) => console.log(values)}
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
                <InputStyle
                  placeholder='Enter your name'
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholderTextColor={COLORS.SecondaryTwo}
                />
                {touched.name && errors.name && <ErrorText>{errors.name}</ErrorText>}
              </View>
              <View>
                <LabelText>E-mail</LabelText>
                <InputStyle
                  placeholder='Enter your e-mail'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholderTextColor={COLORS.SecondaryTwo}
                />
                {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
              </View>
              <View>
                <LabelText>Password</LabelText>
                <InputStyle
                  placeholder='Enter password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => handleBlur('password')}
                  placeholderTextColor={COLORS.SecondaryTwo}
                />
                {touched.password && errors.password && <ErrorText>{errors.password}</ErrorText>}
              </View>
              <View>
                <LabelText>Confirm password</LabelText>
                <InputStyle
                  placeholder='Enter confirm password'
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholderTextColor={COLORS.SecondaryTwo}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <ErrorText>{errors.confirmPassword}</ErrorText>
                )}
              </View>

              <CustomButton
                variant='primary'
                text='Sign up'
                onPress={() => handleSubmit()}
                disabled={!isValid}
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

const InputStyle = styled.TextInput`
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-radius: 5px;
  padding-vertical: 8px;
  padding-horizontal: 14px;
  font-family: Gilroy-Medium;
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
