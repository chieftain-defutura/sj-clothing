import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View, NativeModules } from 'react-native'
import { auth } from '../../../firebase'
import { COLORS } from '../../styles/theme'
import { userStore } from '../../store/userStore'
import CustomButton from '../../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AlertIcon from '../../assets/icons/Alert'
import styled from 'styled-components/native'

interface ILogOut {
  closeModal?: () => void
  errorMessage?: string | null
}
const LogOut: React.FC<ILogOut> = ({ closeModal, errorMessage }) => {
  const user = userStore((store) => store.user)
  const updateUser = userStore((store) => store.updateUser)
  const [loading, setLoading] = useState(false)
  const [isSendVerifyMail, setSendVerifyMail] = useState(false)

  const handleClose = async () => {
    try {
      setLoading(true)
      await auth.signOut()
      await AsyncStorage.removeItem('mail')
      updateUser(null)
      closeModal?.()
      // NativeModules.DevSettings.reload()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <AlertIcon width={130} height={130} />
          </View>
          <Text allowFontScaling={false} style={styles.header}>
            Are You Leaving ?
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
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
            }}
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
              text={loading ? 'Loading...' : 'Yes'}
              disabled={isSendVerifyMail || loading}
              onPress={handleClose}
              style={{ width: '50%' }}
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
`

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
  },
  description: {
    fontSize: 15,
    fontFamily: 'Arvo-Regular',
    color: `${COLORS.textRGBAClr}`,
    textAlign: 'center',
    paddingVertical: 15,
  },
  btnText: {
    fontSize: 14,
    color: '#462d85',
    textAlign: 'center',
    width: 100,
  },
})
