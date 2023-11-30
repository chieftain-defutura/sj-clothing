import React from 'react'
import { View, Text, Image, Modal, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../../styles/theme'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CloseIcon from '../../assets/icons/Close'
import CustomButton from '../../components/Button'
import CloseRedIcon from '../../assets/icons/CloseRedIcon'

interface SubscriptionModalProps {
  isVisible: boolean
  onClose: () => void
  navigation: any
}

const ValidationSchema = Yup.object().shape({})

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isVisible,
  onClose,
  navigation,
}) => {
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
          initialValues={{}}
          validationSchema={ValidationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({}) => (
            <View style={styles.SubscriptionWrapper}>
              <View style={styles.SubscriptionHead}>
                <Text
                  style={{
                    fontSize: 20,
                    letterSpacing: -0.4,
                    fontFamily: 'Arvo-Regular',
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
                      source={require('../../assets/images/diamond.png')}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 16, fontFamily: 'Gilroy-Medium', color: COLORS.textClr }}
                    >
                      PREMIUM
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Gilroy-Regular',
                        color: COLORS.textSecondaryClr,
                      }}
                    >
                      Membership
                    </Text>
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'Montserrat-SemiBold',
                      color: COLORS.textClr,
                    }}
                  >
                    790
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontFamily: 'Gilroy-Medium', color: COLORS.textClr }}
                  >
                    INR/month
                  </Text>
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
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      color: COLORS.textClr,
                      fontFamily: 'Gilroy-Medium',
                    }}
                  >
                    FEATURES
                  </Text>
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderTopWidth: 1,
                      borderTopColor: '#E5CEF5',
                      color: COLORS.textClr,
                      fontFamily: 'Gilroy-Medium',
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
                    <Text
                      style={{
                        textAlign: 'center',
                        color: COLORS.textClr,
                        fontFamily: 'Gilroy-Medium',
                      }}
                    >
                      STANDARD
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: COLORS.textClr,
                        fontFamily: 'Gilroy-Medium',
                      }}
                    >
                      Membership
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderTopWidth: 1,
                      borderTopColor: '#E5CEF5',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CloseRedIcon />
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        color: COLORS.textClr,
                        fontFamily: 'Gilroy-Medium',
                      }}
                    >
                      PREMIUM
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: COLORS.textClr,
                        fontFamily: 'Gilroy-Medium',
                      }}
                    >
                      Membership
                    </Text>
                  </View>
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderTopWidth: 1,
                      borderTopColor: '#E5CEF5',
                      color: '#119D05',
                      fontFamily: 'Gilroy-Medium',
                      width: 80,
                      textAlign: 'center',
                    }}
                  >
                    Unlimited posts
                  </Text>
                </View>
              </View>
              <View style={styles.totalContainer}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.textClr,
                    fontFamily: 'Gilroy-Medium',
                  }}
                >
                  Total
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLORS.textClr,
                      fontFamily: 'Montserrat-SemiBold',
                    }}
                  >
                    790
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{ textAlign: 'center', color: COLORS.textClr }}
                  >
                    INR
                  </Text>
                </View>
              </View>
              <CustomButton
                variant='primary'
                text='Pay now'
                onPress={() => {
                  navigation.navigate('PostCreation'), onClose()
                }}
                fontFamily='Arvo-Regular'
                buttonStyle={[styles.submitBtn]}
              />
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  )
}

export default SubscriptionModal

const styles = StyleSheet.create({
  SubscriptionWrapper: {
    backgroundColor: COLORS.iconsNormalClr,
    padding: 20,
    borderRadius: 10,
    width: 328,
  },
  SubscriptionHead: {
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
