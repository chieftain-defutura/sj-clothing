import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '../../../firebase'
import { COLORS } from '../../styles/theme'
import { userStore } from '../../store/userStore'
import CustomButton from '../../components/Button'
import CloseIcon from '../../assets/icons/Close'

interface IEmailVerification {
  closeModal?: () => void
  errorMessage?: string | null
  // setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
  setShowVerificationModal: React.Dispatch<React.SetStateAction<boolean>>
}
const EmailVerification: React.FC<IEmailVerification> = ({
  closeModal,
  // setIsCreated,
  errorMessage,
  setShowVerificationModal,
}) => {
  const user = userStore((store) => store.user)
  const updateUser = userStore((store) => store.updateUser)
  const [isSendVerifyMail, setSendVerifyMail] = useState(false)

  const handleClose = async () => {
    await auth.currentUser?.reload()
    const currentUser = auth.currentUser
    updateUser(user)
    if (currentUser?.emailVerified) {
      setShowVerificationModal(false)
      // setIsCreated(true)
    }
  }

  useEffect(() => {
    if (isSendVerifyMail) {
      const timer = setTimeout(() => {
        setSendVerifyMail(false)
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
    <View style={styles.VerificationContainer}>
      <View style={styles.VerificationWrapper}>
        <Pressable
          onPress={closeModal}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingBottom: 10,
          }}
        >
          <CloseIcon width={24} height={24} />
        </Pressable>
        <Text allowFontScaling={false} style={styles.header}>
          Verify Your Mail
        </Text>
        <Text allowFontScaling={false} style={styles.description}>
          Hi {user?.displayName}, Please verify your email address by clicking the link send to{' '}
          {user?.email}
        </Text>
        {errorMessage && (
          <Text
            allowFontScaling={false}
            style={{ fontSize: 12, color: `${COLORS.errorClr}`, fontFamily: `Gilroy-Regular` }}
          >
            {errorMessage}
          </Text>
        )}
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
          <CustomButton
            text='Resend '
            disabled={isSendVerifyMail}
            onPress={resendMailVerification}
            style={{ width: 100 }}
          />

          <CustomButton
            text='Verify'
            disabled={isSendVerifyMail}
            onPress={handleClose}
            style={{ width: 100 }}
          />
        </View>
      </View>
    </View>
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
