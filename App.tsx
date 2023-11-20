import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StripeProvider } from '@stripe/stripe-react-native'
import StackNavigationRoutes from './src/pages/Navigation/StackNavigation'
import { useFonts } from 'expo-font'
import { userStore } from './src/store/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase'
import { Image, SafeAreaView, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import AppLoading from 'expo-app-loading'
import { doc, getDoc } from 'firebase/firestore/lite'

const PUBLISHABLE_KEY =
  'pk_test_51O6p0wSGEesR2xZcTMeDvXgwTJgLfsOMehC1tZcDo7bphTUPo65HjeJJUcKIRYTqA115nRZi3CbzYH2GsuY69Htf00ewXq6Z7m'
const { height, width } = Dimensions.get('window')
const App: React.FC = () => {
  const {
    updateUser,
    updateLanguage,
    user,
    avatar,
    confirmDetails,
    currency,
    language,
    updateCurrency,
    updateRate,
    updateProfile,
    updatePhoneNo,
    updateName,
    updateAddress,
    updateAvatar,
    updateConfirmDetails,
  } = userStore()
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    return onAuthStateChanged(auth, (data) => {
      if (data) {
        updateUser(data)
      }
    })
  }, [])
  // console.log(user)

  const fetchDataFromFirestore = useCallback(async () => {
    try {
      console.log(1)
      if (!user) return
      console.log(2)
      setLoading(true)
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
    } catch (error) {
      console.error('Error fetching data from Firestore:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchDataFromFirestore()
  }, [fetchDataFromFirestore])

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

  // if (isLoading) {
  //   // If the app is not ready, display the loading screen
  //   return <Text> loading</Text>
  // }

  // console.log(avatar)
  // console.log(confirmDetails)
  // console.log(language)
  // console.log('currency', currency)
  const [fontsLoaded] = useFonts({
    'Arvo-Regular': require('./src/assets/fonts/timesbold.ttf'), //font-weight 400
    'Gilroy-Medium': require('./src/assets/fonts/times.ttf'), //font-weight 500
    'Gilroy-Regular': require('./src/assets/fonts/times.ttf'), //font-weight 400
    'Gilroy-SemiBold': require('./src/assets/fonts/timesbold.ttf'), //font-weight 600
    'Montserrat-Regular': require('./src/assets/fonts/times.ttf'), //font-weight 400
    'Montserrat-Medium': require('./src/assets/fonts/times.ttf'), //font-weight 500
    'Montserrat-SemiBold': require('./src/assets/fonts/timesbold.ttf'), //font-weight 600
  })

  if (!fontsLoaded) {
    return null
  }
  return (
    <Fragment>
      <StripeProvider publishableKey={PUBLISHABLE_KEY}>
        <I18nextProvider i18n={i18n}>
          <SafeAreaView style={{ flex: 0, backgroundColor: 'rgba(191, 148, 228, 0.8)' }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(145, 177, 225, 0.85)' }}>
            <NavigationContainer>
              <StatusBar
                animated={true}
                backgroundColor='rgba(191, 148, 228, 0.1)'
                // barStyle={'dark-content'}
                style='dark'
              />
              {isLoading ? (
                <Image
                  style={{ width: width, height: height, objectFit: 'cover' }}
                  source={require('./assets/iPhone.png')}
                />
              ) : (
                <StackNavigationRoutes />
              )}
            </NavigationContainer>
          </SafeAreaView>
        </I18nextProvider>
      </StripeProvider>
    </Fragment>
  )
}

export default App
