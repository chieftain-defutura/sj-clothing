import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../styles/theme'
import { userStore } from '../../store/userStore'
import CustomButton from '../../components/Button'
import AlertIcon from '../../assets/icons/Alert'
import { getAuth, deleteUser } from 'firebase/auth'
import { doc, deleteDoc } from 'firebase/firestore/lite'
import styled from 'styled-components/native'
import { db } from '../../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IDelectAccount {
  closeModal?: () => void
  errorMessage?: string | null
}

const DelectAccount: React.FC<IDelectAccount> = ({ closeModal, errorMessage }) => {
  const user = userStore((store) => store.user)
  const updateUser = userStore((store) => store.updateUser)
  const [isSendVerifyMail, setSendVerifyMail] = useState(false)

  const handleDelete = async () => {
    try {
      if (!user) return
      const auth = getAuth()
      const currentUser = auth.currentUser

      if (currentUser) {
        const userDocRef = doc(db, 'users', user.uid)
        await deleteDoc(userDocRef)
        await deleteUser(currentUser)
        await auth.signOut()
        closeModal?.()
        const data = await AsyncStorage.getItem('mail')
        await AsyncStorage.removeItem('mail')
        updateUser(null)
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
          <Text style={styles.header} allowFontScaling={false}>
            Are you sure want to Delete account ?
          </Text>
          {/* <Text style={styles.description}>
            Hi {user?.displayName}, Are you sure you want to delete your account?
          </Text> */}
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
            {/* <CustomButton
              text='No'
              disabled={isSendVerifyMail}
              onPress={closeModal}
              style={{ width: 100 }}
            /> */}
            <TouchableOpacity
              onPress={closeModal}
              style={{ borderRadius: 50, borderColor: '#462D85', borderWidth: 2 }}
            >
              <StyledView>
                <Text style={styles.btnText}>No</Text>
              </StyledView>
            </TouchableOpacity>
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

const StyledView = styled.View`
  padding: 13px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 90px;
`

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
    marginBottom: 28,
    lineHeight: 32,
  },
  btnText: {
    fontSize: 14,
    color: '#462d85',
  },
  description: {
    fontSize: 15,
    fontFamily: 'Arvo-Regular',
    color: `${COLORS.textRGBAClr}`,
    textAlign: 'center',
    paddingVertical: 15,
  },
})
