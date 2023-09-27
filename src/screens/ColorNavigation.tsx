import React from 'react'
import { View, Modal, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../styles/theme'
import CloseIcon from '../assets/icons/Close'
import CustomButton from '../components/Button'
import Animated, { PinwheelIn } from 'react-native-reanimated'

interface ColorNavigationProps {
  isVisible: boolean
  onClose: () => void
  handleIncreaseSteps: () => void
  navigation: any
}

const ColorNavigation: React.FC<ColorNavigationProps> = ({
  isVisible,
  onClose,
  navigation,
  handleIncreaseSteps,
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
        <Animated.View entering={PinwheelIn.duration(800)} style={[styles.SubscriptionWrapper]}>
          <View style={styles.SubscriptionHead}>
            <Pressable onPress={onClose}>
              <CloseIcon width={24} height={24} />
            </Pressable>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 30,
            }}
          >
            <CustomButton
              variant='primary'
              text='Buy now'
              onPress={() => {
                navigation.navigate('Checkout'), onClose()
              }}
              fontFamily='Arvo-Regular'
              buttonStyle={[styles.submitBtn]}
            />

            <CustomButton
              variant='primary'
              text='Continue'
              onPress={() => {
                handleIncreaseSteps(), onClose()
              }}
              fontFamily='Arvo-Regular'
              buttonStyle={[styles.submitBtn]}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default ColorNavigation

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
    justifyContent: 'flex-end',
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
    width: 130,
  },
})
