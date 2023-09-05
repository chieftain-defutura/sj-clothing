import React from 'react'
import { View, Text, TextInput, Modal, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../styles/theme'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CloseIcon from '../assets/icons/Close'
import CustomButton from '../components/Button'

interface LoginModalProps {
  isVisible: boolean
  onClose: () => void
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter your email address'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    ),
})

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
            <View style={styles.loginWrapper}>
              <View style={styles.loginHead}>
                <Text
                  style={{
                    fontSize: 20,
                    letterSpacing: -0.4,
                  }}
                >
                  Log in
                </Text>
                <Pressable onPress={onClose}>
                  <CloseIcon width={24} height={24} />
                </Pressable>
              </View>
              <View>
                <Text style={styles.labelText}>E-mail</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder='Enter your e-mail'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorTxt}>{errors.email}</Text>
                )}
              </View>
              <View>
                <Text style={styles.labelText}>Password</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder='Enter password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorTxt}>{errors.password}</Text>
                )}
              </View>
              <Text
                style={{
                  fontFamily: 'Gilroy',
                  color: COLORS.textSecondaryClr,
                  fontSize: 14,
                  marginTop: 8,
                  marginBottom: 16,
                }}
              >
                Forgot Password
              </Text>
              <Pressable onPress={() => handleSubmit()} disabled={!isValid}>
                <CustomButton
                  text='Login'
                  buttonStyle={[styles.submitBtn, { backgroundColor: isValid ? '#DB00FF' : 'red' }]}
                />
              </Pressable>

              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
              >
                <Text>Don’t have an account?</Text>
                <Text
                  style={{ color: COLORS.textSecondaryClr, fontSize: 14, fontFamily: 'Gilroy' }}
                >
                  Sign up
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  )
}

export default LoginModal

const styles = StyleSheet.create({
  loginWrapper: {
    backgroundColor: COLORS.iconsNormalClr,
    padding: 20,
    borderRadius: 10,
    width: 328,
  },
  loginHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputStyle: {
    borderColor: COLORS.strokeClr,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingLeft: 14,
  },
  labelText: {
    fontSize: 14,
    letterSpacing: -0.28,
    color: COLORS.textClr,
    fontFamily: 'Gilroy',
    marginTop: 16,
    marginBottom: 8,
  },
  errorTxt: {
    fontSize: 12,
    color: '#ff0d10',
  },
  submitBtn: {
    borderRadius: 15,
    justifyContent: 'center',
    marginBottom: 16,
  },
})
