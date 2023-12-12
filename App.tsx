import { useFonts } from 'expo-font'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import { I18nextProvider } from 'react-i18next'
import * as SplashScreen from 'expo-splash-screen'
import { doc, getDoc } from 'firebase/firestore/lite'
import { onAuthStateChanged } from 'firebase/auth'
import { StripeProvider } from '@stripe/stripe-react-native'
import { NavigationContainer } from '@react-navigation/native'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import i18n from './i18n'
import { auth, db } from './firebase'
import { userStore } from './src/store/userStore'
import StackNavigationRoutes from './src/pages/Navigation/StackNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MidlevelStore } from './src/store/midlevelStore'
import { PUBLISHABLE_KEY } from './src/utils/config'

SplashScreen.preventAutoHideAsync()

const App: React.FC = () => {
  const loadedRef = useRef(false)
  const [loading, setLoading] = useState(true)
  const rate = userStore((state) => state.rate)
  const currency = userStore((state) => state.currency)
  const language = userStore((state) => state.language)
  const updateMidlevelData = MidlevelStore((state) => state.updateMidlevel)
  const signupUpdate = userStore((state) => state.signupUpdate)
  const user = userStore((state) => state.user)
  const steps = MidlevelStore((state) => state.midlevel)
  const updateRate = userStore((state) => state.updateRate)
  const updateUser = userStore((state) => state.updateUser)
  const updateName = userStore((state) => state.updateName)
  const updateAvatar = userStore((state) => state.updateAvatar)
  const updatePhoneNo = userStore((state) => state.updatePhoneNo)
  const updateAddress = userStore((state) => state.updateAddress)
  const updateCurrency = userStore((state) => state.updateCurrency)
  const updateLanguage = userStore((state) => state.updateLanguage)
  const updateProfile = userStore((state) => state.updateProfile)
  const updateConfirmDetails = userStore((state) => state.updateConfirmDetails)

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
    if (!loading) {
      await SplashScreen.hideAsync()
    }
  }, [loading])

  useEffect(() => {
    handleAppLoading()
  }, [handleAppLoading])

  const getLanguage = useCallback(async () => {
    if (language) {
      updateLanguage(language)
      i18n.changeLanguage(language as string)
    }
  }, [])

  useEffect(() => {
    getLanguage()
  }, [getLanguage])

  const getCurrency = useCallback(async () => {
    if (currency) {
      updateCurrency({
        currency: currency.currency as string,
        abrive: currency.abrive as string,
        symbol: currency.symbol as string,
      })
    }
  }, [])

  useEffect(() => {
    getCurrency()
  }, [getCurrency])

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

  console.log('steps.isSteps', steps.isSteps)

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

  if (!fontsLoaded) {
    return null
  }

  return (
    <Fragment>
      <StripeProvider
        publishableKey={PUBLISHABLE_KEY}
        urlScheme={getAppUrlScheme()}
        merchantIdentifier='merchant.com.sjclothing'
      >
        <I18nextProvider i18n={i18n}>
          <SafeAreaView style={{ flex: 0, backgroundColor: 'rgba(191, 148, 228, 0.86)' }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(145, 177, 225, 0.9)' }}>
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
