import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { auth } from '../../../firebase'
import { COLORS } from '../../styles/theme'
import { userStore } from '../../store/userStore'
import CustomButton from '../../components/Button'
import CloseIcon from '../../assets/icons/Close'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AlertIcon from '../../assets/icons/Alert'

interface ILogOut {
  closeModal?: () => void
  errorMessage?: string | null
}
const LogOut: React.FC<ILogOut> = ({ closeModal, errorMessage }) => {
  const user = userStore((store) => store.user)
  const updateUser = userStore((store) => store.updateUser)
  const [isSendVerifyMail, setSendVerifyMail] = useState(false)

  const handleClose = async () => {
    try {
      await auth.signOut()
      const data = await AsyncStorage.getItem('mail')
      await AsyncStorage.removeItem('mail')
      closeModal?.()
      if (!data) {
        updateUser(null)
      }
    } catch (error) {
      console.log(error)
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

  return (
    <Modal animationType='fade' transparent={true}>
      <View style={styles.VerificationContainer}>
        <View style={styles.VerificationWrapper}>
          {/* <Pressable
            onPress={closeModal}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingBottom: 10,
            }}
          >
            <CloseIcon width={24} height={24} />
          </Pressable> */}
          <AlertIcon width={130} height={130} />
          <Text allowFontScaling={false} style={styles.header}>
            Are You Leaving
          </Text>
          <Text allowFontScaling={false} style={styles.description}>
            Hi {user?.displayName}, Are you sure, want to logout?
          </Text>
          {errorMessage && (
            <Text
              allowFontScaling={false}
              style={{ fontSize: 12, color: `${COLORS.errorClr}`, fontFamily: `Gilroy-Regular` }}
            >
              {errorMessage}
            </Text>
          )}
          <View
            style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}
          >
            <CustomButton
              text='No'
              disabled={isSendVerifyMail}
              onPress={closeModal}
              style={{ width: 100 }}
            />
            <CustomButton
              text='Yes'
              disabled={isSendVerifyMail}
              onPress={handleClose}
              style={{ width: 100 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default LogOut

const styles = StyleSheet.create({
  VerificationContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLORS.backgroundBlurClr}`,
  },
  VerificationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
