import { COLORS } from '../../styles/theme'
import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { userStore } from '../../store/userStore'
import AlertIcon from '../../assets/icons/Alert'

const AlertModal = () => {
  const user = userStore((store) => store.user)
  return (
    <Modal animationType='fade' transparent={true}>
      <View style={styles.VerificationContainer}>
        <View style={styles.VerificationWrapper}>
          <AlertIcon width={130} height={130} />
          <Text style={styles.header}>Are you sure!</Text>
          <Text style={styles.description}>
            Hi {user?.displayName}, Are you sure you want to delete your account?
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default AlertModal
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
