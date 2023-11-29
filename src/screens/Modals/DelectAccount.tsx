import React, { useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../styles/theme'
import { userStore } from '../../store/userStore'
import CustomButton from '../../components/Button'
import AlertIcon from '../../assets/icons/Alert'
import { useNavigation } from '@react-navigation/native'
import { getAuth, deleteUser } from 'firebase/auth'

interface IDelectAccount {
  closeModal?: () => void
  errorMessage?: string | null
}
const DelectAccount: React.FC<IDelectAccount> = ({ closeModal, errorMessage }) => {
  const user = userStore((store) => store.user)
  const updateUser = userStore((store) => store.updateUser)
  const [isSendVerifyMail, setSendVerifyMail] = useState(false)
  const navigation = useNavigation()

  const handleDelete = async () => {
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser

      if (currentUser) {
        await deleteUser(currentUser)
        closeModal?.()
        navigation.navigate('MidLevel')
        console.log('User account successfully deleted.')
      } else {
        console.error('No authenticated user found.')
      }
    } catch (error) {
      console.error('Error deleting user account:', error)
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
          <AlertIcon width={130} height={130} />
          <Text style={styles.header}>Are you sure!</Text>
          <Text style={styles.description}>
            Hi {user?.displayName}, Are you sure you want to delete your account?
          </Text>
          {errorMessage && (
            <Text
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
              onPress={handleDelete}
              style={{ width: 100 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DelectAccount

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
