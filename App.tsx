import { useFonts } from 'expo-font'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import { StatusBar } from 'expo-status-bar'
import { Platform, SafeAreaView, View, Dimensions, Text, Button } from 'react-native'
import { I18nextProvider } from 'react-i18next'
import * as Device from 'expo-device'
import * as SplashScreen from 'expo-splash-screen'
import { doc, getDoc } from 'firebase/firestore/lite'
import { onAuthStateChanged } from 'firebase/auth'
import { StripeProvider } from '@stripe/stripe-react-native'
import { NavigationContainer } from '@react-navigation/native'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from './i18n'
import { auth, db } from './firebase'
import { userStore } from './src/store/userStore'
import StackNavigationRoutes from './src/pages/Navigation/StackNavigation'
import { MidlevelStore } from './src/store/midlevelStore'
import { PUBLISHABLE_KEY } from './src/utils/config'
import * as Notifications from 'expo-notifications'
import { generalStore } from './src/store/generalStore'
import { tooltipDisableStore } from './src/store/TooltipDisable'
import { PostStore } from './src/store/postCreationStore'
import NetInfo from '@react-native-community/netinfo'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from './src/styles/theme'
import styled from 'styled-components/native'
import WifiIcon from './src/assets/icons/AddressIcon/WifiIcon'

const { width, height } = Dimensions.get('window')

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

async function registerForPushNotificationsAsync() {
  try {
    let expoAndroidToken, fcmToken, expoIosToken, apnToken, token

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        sound: 'mySoundFile.wav',
        vibrationPattern: [0, 250, 250, 250],
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        try {
          const { status } = await Notifications.requestPermissionsAsync({
            ios: {
              allowAlert: true,
              allowBadge: true,
              allowSound: true,
              allowAnnouncements: true,
            },
          })
          finalStatus = status
        } catch (error) {
          console.log('error', error)
        }
      }

      if (finalStatus !== 'granted') {
        return null
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas.projectId,
      })
      if (Platform.OS === 'android') {
        expoAndroidToken = (await Notifications.getExpoPushTokenAsync()).data
        fcmToken = (await Notifications.getDevicePushTokenAsync()).data
      } else if (Platform.OS === 'ios') {
        expoIosToken = (await Notifications.getExpoPushTokenAsync()).data
        apnToken = (await Notifications.getDevicePushTokenAsync()).data
      }

      await AsyncStorage.setItem(
        'expotokens',
        JSON.stringify({
          expoAndroidToken: expoAndroidToken ? expoAndroidToken : null,
          fcmToken: fcmToken ? fcmToken : null,
          apnToken: apnToken ? apnToken : null,
          expoIosToken: expoIosToken ? expoIosToken : null,
        }),
      )
    } else {
      alert('Must use a physical device for Push Notifications')
    }

    return token?.data
  } catch (error) {
    console.log('Error:', error)
    return null // or handle as needed in your app
  }
}
SplashScreen.preventAutoHideAsync()

const App: React.FC = () => {
  const loadedRef = useRef(false)
  const [loading, setLoading] = useState(true)
  const confirmDetails = userStore((state) => state.confirmDetails)
  const language = userStore((state) => state.language)
  const updateAccessory = generalStore((state) => state.updateAccessory)
  const updatePremiumText = generalStore((state) => state.updatePremiumText)
  const updateDisable = tooltipDisableStore((state) => state.updateDisable)
  const updateMidlevelData = MidlevelStore((state) => state.updateMidlevel)
  const updatePostData = PostStore((state) => state.updatepost)
  const signupUpdate = userStore((state) => state.signupUpdate)
  const user = userStore((state) => state.user)
  const updateRate = userStore((state) => state.updateRate)
  const updateUser = userStore((state) => state.updateUser)
  const updateName = userStore((state) => state.updateName)
  const updateAvatar = userStore((state) => state.updateAvatar)
  const updatePhoneNo = userStore((state) => state.updatePhoneNo)
  const updateAddress = userStore((state) => state.updateAddress)
  const updateCurrency = userStore((state) => state.updateCurrency)
  const updateLanguage = userStore((state) => state.updateLanguage)
  const updateProfile = userStore((state) => state.updateProfile)
  const updateSaveAddressAs = userStore((state) => state.updatSaveAddressAs)

  const updateConfirmDetails = userStore((state) => state.updateConfirmDetails)
  const logoVideo = generalStore((state) => state.logoVideo)
  const [expoPushToken, setExpoPushToken] = useState('')
  const [netInfo, setNetInfo] = useState<{ type: string; isConnected: boolean }>({
    type: '',
    isConnected: false,
  })

  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token as string))
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Notifications.Subscription,
      )
      Notifications.removeNotificationSubscription(
        responseListener.current as Notifications.Subscription,
      )
    }
  }, [])

  const fetchDataFromFirestore = useCallback(async () => {
    try {
      if (signupUpdate === 'INVALID') {
        return
      }
      if (user) {
        const q = doc(db, 'users', user.uid)
        const querySnapshot = await getDoc(q)
        const fetchData = querySnapshot.data()

        updateProfile(fetchData?.profile)
        updateName(fetchData?.name)
        updateAddress(fetchData?.address)
        updateAvatar(fetchData?.avatar)
        updatePhoneNo(fetchData?.phoneNo)
        updateLanguage(fetchData?.language)
        updateCurrency(fetchData?.currency)
        updateRate(fetchData?.rate)
        updateConfirmDetails(fetchData?.confirmDetails)

        const data = fetchData?.address.find((f: { isSelected: boolean }) => f.isSelected === true)
        updateSaveAddressAs(data.saveAddressAs)

        if (!loadedRef.current) {
          loadedRef.current = true
        }
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error)
    }
  }, [signupUpdate, user])

  useEffect(() => {
    fetchDataFromFirestore()
  }, [fetchDataFromFirestore])

  useEffect(() => {
    return onAuthStateChanged(auth, (data) => {
      if (data) {
        updateUser(data)
      } else {
        setLoading(false)
      }
    })
  }, [])

  const handleAppLoading = useCallback(async () => {
    if (!loading && netInfo.isConnected) {
      await SplashScreen.hideAsync()
    }
  }, [loading, netInfo.isConnected])

  useEffect(() => {
    handleAppLoading()
  }, [handleAppLoading])

  useEffect(() => {
    const data = NetInfo.addEventListener((state) => {
      setNetInfo({
        type: state.type,
        isConnected: state.isConnected !== null ? state.isConnected : false,
      })
    })
    return () => {
      data()
    }
  }, [])

  const getLanguage = useCallback(async () => {
    if (language) {
      updateLanguage(language)
      i18n.changeLanguage(language as string)
    }
    const expotokens = await AsyncStorage.getItem('expotokens')
  }, [language])

  useEffect(() => {
    getLanguage()
  }, [getLanguage])

  const getMidlevelData = useCallback(async () => {
    const MidSteps = await AsyncStorage.getItem('mid-steps')
    const parseData = JSON.parse(MidSteps as string)

    if (!parseData) return

    if (parseData.isSteps === '5') {
      updateMidlevelData({
        isColor: parseData.isColor,
        isColorName: parseData.isColorName,
        isImageOrText: parseData.isImageOrText,
        isSelectedStyle: parseData.isSelectedStyle,
        isSize: parseData.isSize,
        isSteps: parseData.isSteps,
        tempIsImageOrText: parseData.tempIsImageOrText,
        uid: parseData.uid,
      })
    }
  }, [])
  useEffect(() => {
    getMidlevelData()
  }, [getMidlevelData])

  const getConfirmDetails = useCallback(async () => {
    const confirmDetails = await AsyncStorage.getItem('confirmDetails')
    const parseData = JSON.parse(confirmDetails as string)
    if (!parseData) return
    if (parseData.confirmDetails === true) {
      updateConfirmDetails(true)
      updateAvatar(parseData.avatar)
      updateLanguage(parseData.language)
      updateCurrency(parseData.currency)
    }
  }, [])

  useEffect(() => {
    getConfirmDetails()
  }, [getConfirmDetails])
  const getPostData = useCallback(async () => {
    const postSteps = await AsyncStorage.getItem('post-steps')
    const parseData = JSON.parse(postSteps as string)

    if (!parseData) return

    if (parseData.isSteps === '5') {
      updatePostData({
        isColor: parseData.isColor,
        isColorName: parseData.isColorName,
        isImageOrText: parseData.isImageOrText,
        isSelectedStyle: parseData.isSelectedStyle,
        isSize: parseData.isSize,
        isSteps: parseData.isSteps,
        tempIsImageOrText: parseData.tempIsImageOrText,
        uid: parseData.uid,
        caption: parseData.caption,
        product: parseData.product,
      })
    }
  }, [])
  useEffect(() => {
    getPostData()
  }, [getPostData])

  const getTooltip = useCallback(async () => {
    const MidSteps = await AsyncStorage.getItem('showSkinToneTooltip')
    if (MidSteps === '11') {
      updateDisable(true)
    }
  }, [])
  useEffect(() => {
    getTooltip()
  }, [getTooltip])

  const getGeneralSettings = useCallback(async () => {
    try {
      const q = doc(db, 'Settings', 'GeneralSettings')
      const querySnapshot = await getDoc(q)
      const fetchData = querySnapshot.data()
      updatePremiumText(fetchData?.premiumComingSoonText)
      updateAccessory(fetchData?.showAccessoryPage)
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    getGeneralSettings()
  }, [getGeneralSettings])

  // const validatePhoneNumber = () => {
  //   try {
  //     const number = PhoneNumber('+1234567890', 'US')
  //     if (number?.isValid()) {
  //       return true // Phone number is valid.
  //     } else {
  //       return false // Phone number is not valid.
  //     }
  //   } catch (e) {
  //     // Handle parsing errors, such as an invalid phone number.
  //     return false
  //   }
  // }

  const [fontsLoaded] = useFonts({
    'Arvo-Regular': require('./src/assets/fonts/timesbold.ttf'), //font-weight 400
    'Gilroy-Medium': require('./src/assets/fonts/times.ttf'), //font-weight 500
    'Gilroy-Regular': require('./src/assets/fonts/times.ttf'), //font-weight 400
    'Gilroy-SemiBold': require('./src/assets/fonts/timesbold.ttf'), //font-weight 600
    'Montserrat-Regular': require('./src/assets/fonts/times.ttf'), //font-weight 400
    'Montserrat-Medium': require('./src/assets/fonts/times.ttf'), //font-weight 500
    'Montserrat-SemiBold': require('./src/assets/fonts/timesbold.ttf'), //font-weight 600
  })

  const getAppUrlScheme = () => {
    return Constants.appOwnership === 'expo' ? Linking.createURL('/--/') : Linking.createURL('/')
  }

  // if (!fontsLoaded) {
  //   return null
  // }

  if (!fontsLoaded || !netInfo.isConnected) {
    return (
      <Fragment>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LinearGradient
            colors={gradientOpacityColors}
            style={{ width: width, position: 'relative', height: height }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -10,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                }}
              >
                <TShirtImg
                  source={require('./src/assets/logo/logo-img-1.png')}
                  alt='logo'
                  style={{ width: width / 2 }}
                />
              </View>
              <View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginBottom: 12,
                  }}
                >
                  <WifiIcon width={64} height={64} />
                </View>

                <ProductText style={{ width: width / 1.5 }}>
                  {!netInfo.isConnected
                    ? 'No internet connection. Please connect to a network.'
                    : 'Loading...'}
                </ProductText>
              </View>
            </View>
          </LinearGradient>
        </SafeAreaView>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <StripeProvider
        publishableKey={PUBLISHABLE_KEY}
        urlScheme={getAppUrlScheme()}
        merchantIdentifier='merchant.com.sjclothing'
      >
        <I18nextProvider i18n={i18n}>
          <SafeAreaView
            style={{
              flex: 0,
              backgroundColor: !logoVideo ? 'rgba(191, 148, 228, 1)' : 'rgba(191, 148, 228, 0.86)',
            }}
          />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: !logoVideo ? 'rgba(145, 177, 225,.7 )' : 'rgba(145, 177, 225, 0.9)',
            }}
          >
            <NavigationContainer>
              <StatusBar animated={true} backgroundColor='rgba(199, 148, 228, 0.0)' style='dark' />
              <StackNavigationRoutes />
            </NavigationContainer>
          </SafeAreaView>
        </I18nextProvider>
      </StripeProvider>
    </Fragment>
  )
}

export default App

const TShirtImg = styled.Image`
  object-fit: contain;
`

const ProductText = styled.Text`
  font-size: 22px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  text-align: center;
`
