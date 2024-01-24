import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  Modal,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import * as StoreReview from 'expo-store-review'
import { Rating } from 'react-native-ratings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../../components/Button'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import CloseGrayIcon from '../../assets/icons/CloseGrayIcon'
import CloseIcon from '../../assets/icons/Close'
const { height, width } = Dimensions.get('window')

interface IAppRating {
  close: () => void
}
const AppRating: React.FC<IAppRating> = ({ close }) => {
  const handleRateApp = async () => {
    // Replace 'your-package-name' with your app's package name on the Play Store
    const packageName = 'com.dewallstreet.sprinklenadar'

    // Open the Google Play Store review page for the app
    Linking.openURL(`market://details?id=${packageName}`).catch((err) =>
      console.error('Error opening Play Store:', err),
    )
    await AsyncStorage.setItem('ratingApp', 'true')
    close()
  }

  return (
    <Modal animationType='fade' transparent={true}>
      <View style={styles.VerificationContainer}>
        <View style={styles.VerificationWrapper}>
          <TouchableOpacity onPress={close} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <CloseIcon width={20} height={20} />
          </TouchableOpacity>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/ratingStars.png')}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: FONT_FAMILY.ArvoRegular,
              textAlign: 'center',
              fontSize: 18,
              color: COLORS.textClr,
            }}
          >
            Like Using SprinkleNadar Clothing?
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: FONT_FAMILY.GilroyRegular,
              textAlign: 'center',
              fontSize: 16,
              paddingVertical: 10,
              paddingHorizontal: 20,
              color: COLORS.textClr,
            }}
          >
            Recommend us to others by rating us on Play Store
          </Text>
          {/* <Rating showRating onFinishRating={handleRateApp} style={{ paddingVertical: 10 }} /> */}
          <CustomButton text='Rate App' onPress={handleRateApp} style={{ paddingTop: 15 }} />
        </View>
      </View>
    </Modal>
  )
}

export default AppRating

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
