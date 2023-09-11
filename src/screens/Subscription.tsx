import React from 'react'
import { View, Text, Image, Modal, StyleSheet, Pressable } from 'react-native'
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

const SubscriptionModal: React.FC<LoginModalProps> = ({ isVisible, onClose }) => {
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
                    fontFamily: 'Gilroy',
                    color: '#462D85',
                  }}
                >
                  Subscription
                </Text>
                <Pressable onPress={onClose}>
                  <CloseIcon width={24} height={24} />
                </Pressable>
              </View>
              <View style={styles.premiumContainer}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    <Image
                      style={styles.diamond}
                      source={require('../assets/images/diamond.png')}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 16 }}>PREMIUM</Text>
                    <Text style={{ fontSize: 12 }}>Membership</Text>
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20 }}>790</Text>
                  <Text style={{ fontSize: 12 }}>INR/month</Text>
                </View>
              </View>
              <View style={styles.featureContainer}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: '#E5CEF5',
                    paddingRight: 10,
                  }}
                >
                  <Text style={{ paddingTop: 20, paddingBottom: 20 }}>FEATURES</Text>
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderTopWidth: 1,
                      borderTopColor: '#E5CEF5',
                    }}
                  >
                    Create post
                  </Text>
                </View>

                <View
                  style={{ borderRightWidth: 1, borderRightColor: '#E5CEF5', paddingRight: 10 }}
                >
                  <View
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>STANDARD</Text>
                    <Text>Membership</Text>
                  </View>
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderTopWidth: 1,
                      borderTopColor: '#E5CEF5',
                      textAlign: 'center',
                      color: '#D0342C',
                    }}
                  >
                    X
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>PREMIUM</Text>
                    <Text style={{ textAlign: 'center' }}>Membership</Text>
                  </View>
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderTopWidth: 1,
                      borderTopColor: '#E5CEF5',
                      color: '#119D05',
                    }}
                  >
                    Unlimited posts
                  </Text>
                </View>
              </View>
              <View style={styles.totalContainer}>
                <Text>Total</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={{ fontSize: 20 }}>790</Text>
                  <Text>INR</Text>
                </View>
              </View>
              <Pressable onPress={() => handleSubmit()} disabled={!isValid}>
                <CustomButton
                  text='Pay now'
                  buttonStyle={[styles.submitBtn, { backgroundColor: isValid ? '#DB00FF' : 'red' }]}
                />
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  )
}

export default SubscriptionModal

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
  featureContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.strokeClr,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    marginTop: 16,
    padding: 15,
  },
  labelText: {
    fontSize: 14,
    letterSpacing: -0.28,
    color: COLORS.textClr,
    fontFamily: 'Gilroy',
    marginTop: 16,
    marginBottom: 8,
  },

  premiumContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: COLORS.strokeClr,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    marginTop: 16,
    paddingRight: 20,
  },
  diamond: {
    width: 34,
    height: 34,
    flexShrink: 0,
    marginVertical: 30,
    marginHorizontal: 14,
  },
  errorTxt: {
    fontSize: 12,
    color: '#ff0d10',
  },
  submitBtn: {
    borderRadius: 50,
    justifyContent: 'center',
    marginBottom: 16,
  },
})
