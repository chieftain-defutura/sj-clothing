import { COLORS } from '../../styles/theme'
import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { userStore } from '../../store/userStore'
import AlertIcon from '../../assets/icons/Alert'
import CloseIcon from '../../assets/icons/Close'

const { width } = Dimensions.get('window')

interface IMidIntroModal {
  close: () => void
  isVisible: boolean
}
const MidIntroModal: React.FC<IMidIntroModal> = ({ isVisible, close }) => {
  return (
    <Modal animationType='fade' visible={isVisible} transparent={true} onRequestClose={close}>
      <View style={styles.VerificationContainer}>
        <View style={styles.VerificationWrapper}>
          <TouchableOpacity onPress={close} style={{ position: 'absolute', top: 18, right: -8 }}>
            <CloseIcon width={50} height={50} />
          </TouchableOpacity>

          <Text allowFontScaling={false} style={styles.description}>
            Two Colors
          </Text>
          <Text allowFontScaling={false} style={styles.description}>
            Too much variety
          </Text>
          <Text allowFontScaling={false} style={styles.description}>
            Too all
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default MidIntroModal
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
    fontSize: 20,
    fontFamily: 'Arvo-Regular',
    color: `${COLORS.textRGBAClr}`,
    textAlign: 'center',
    paddingVertical: 15,
  },
})
