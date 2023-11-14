import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { userStore } from '../../store/userStore'
import CustomButton from '../../components/Button'
import { sendEmailVerification } from 'firebase/auth'
import { COLORS } from '../../styles/theme'

interface IEmailVerification {
  isVisible?: boolean
  onClose?: () => void
  errorMessage: string | null
}
const EmailVerification: React.FC<IEmailVerification> = ({ isVisible, onClose, errorMessage }) => {
  const { user } = userStore()
  const [isSendVerifyMail, setSendVerifyMail] = useState(false)
  useEffect(() => {
    if (isSendVerifyMail) {
      const timer = setTimeout(() => {
        setSendVerifyMail(false)
        onClose?.()
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isSendVerifyMail])

  const resendMailVerification = async () => {
    if (!user) return
    await sendEmailVerification(user)
    setSendVerifyMail(true)
  }

  return (
    <Modal visible={isVisible} onLayout={onClose} animationType='fade' transparent={true}>
      <View style={styles.VerificationContainer}>
        <View style={styles.VerificationWrapper}>
          <Text style={styles.header}>Verify Your Mail</Text>
          <Text style={styles.description}>
            Hi {user?.displayName}, Please verify your email address by clicking the link send to
            {user?.email}
          </Text>
          {errorMessage && (
            <Text
              style={{ fontSize: 12, color: `${COLORS.errorClr}`, fontFamily: `Gilroy-Regular` }}
            >
              {errorMessage}
            </Text>
          )}
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <CustomButton
              text='Resend Verification Email'
              disabled={isSendVerifyMail}
              onPress={resendMailVerification}
            />

            <CustomButton
              text='verify'
              disabled={isSendVerifyMail}
              onPress={() => onClose?.()}
              style={{ width: 80 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default EmailVerification

const styles = StyleSheet.create({
  VerificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLORS.backgroundBlurClr}`,
  },
  VerificationWrapper: {
    backgroundColor: `${COLORS.iconsNormalClr}`,
    padding: 20,
    borderRadius: 12,
    width: 328,
  },
  header: {
    fontSize: 25,
    fontFamily: 'Arvo-Regular',
    color: `${COLORS.textClr}`,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    fontFamily: 'Arvo-Regular',
    color: `${COLORS.textRGBAClr}`,
    textAlign: 'center',
    paddingVertical: 15,
  },
})
