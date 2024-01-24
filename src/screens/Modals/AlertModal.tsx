import { COLORS } from '../../styles/theme'
import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { userStore } from '../../store/userStore'
import AlertIcon from '../../assets/icons/Alert'
import CloseIcon from '../../assets/icons/Close'

const { width } = Dimensions.get('window')

interface IAlertModal {
  children: string
  close: () => void
}
const AlertModal: React.FC<IAlertModal> = ({ children, close }) => {
  return (
    <Modal animationType='fade' transparent={true}>
      <View style={styles.VerificationContainer}>
        <View style={styles.VerificationWrapper}>
          <TouchableOpacity onPress={close} style={{ position: 'absolute', top: 18, right: -8 }}>
            <CloseIcon width={50} height={50} />
          </TouchableOpacity>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <AlertIcon width={130} height={130} />
          </View>

          <Text allowFontScaling={false} style={styles.description}>
            {children}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'relative',
    backgroundColor: `${COLORS.borderClr}`,
    padding: 20,
    borderRadius: 12,
    width: width / 1.3,
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
