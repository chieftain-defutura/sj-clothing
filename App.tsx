import React, { Fragment, useCallback, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StripeProvider } from '@stripe/stripe-react-native'
import StackNavigationRoutes from './src/pages/Navigation/StackNavigation'
import { useFonts } from 'expo-font'
import { userStore } from './src/store/userStore'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth, db } from './firebase'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18n from './i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Svg, { Path } from 'react-native-svg'
import axios from 'axios'
import { doc, getDoc } from 'firebase/firestore/lite'

const PUBLISHABLE_KEY =
  'pk_test_51O6p0wSGEesR2xZcTMeDvXgwTJgLfsOMehC1tZcDo7bphTUPo65HjeJJUcKIRYTqA115nRZi3CbzYH2GsuY69Htf00ewXq6Z7m'
const currencyData = {
  symbol: (
    <Svg width='14' height='16' viewBox='0 0 14 16' fill='none'>
      <Path
        d='M13.0445 12.7855C13.1025 12.8436 13.1486 12.9125 13.18 12.9883C13.2114 13.0642 13.2275 13.1454 13.2275 13.2275C13.2275 13.3096 13.2113 13.3909 13.1799 13.4667C13.1485 13.5425 13.1024 13.6114 13.0444 13.6694C12.208 14.5058 11.1514 15.0877 9.9974 15.3475C8.84341 15.6072 7.6394 15.5341 6.52529 15.1367C5.41118 14.7394 4.43271 14.034 3.70358 13.1026C2.97445 12.1711 2.52461 11.0519 2.40632 9.875H1.125C0.95924 9.875 0.800269 9.80915 0.683058 9.69194C0.565848 9.57473 0.5 9.41576 0.5 9.25C0.5 9.08424 0.565848 8.92527 0.683058 8.80806C0.800269 8.69085 0.95924 8.625 1.125 8.625H2.375V7.375H1.125C0.95924 7.375 0.800269 7.30915 0.683058 7.19194C0.565848 7.07473 0.5 6.91576 0.5 6.75C0.5 6.58424 0.565848 6.42527 0.683058 6.30806C0.800269 6.19085 0.95924 6.125 1.125 6.125H2.40632C2.52461 4.94807 2.97445 3.82887 3.70358 2.89745C4.43271 1.96603 5.41118 1.26065 6.52529 0.863261C7.6394 0.465875 8.84341 0.392804 9.9974 0.65254C11.1514 0.912276 12.208 1.49416 13.0444 2.33056C13.1025 2.38858 13.1486 2.45747 13.1801 2.53331C13.2115 2.60915 13.2277 2.69045 13.2278 2.77256C13.2278 2.85466 13.2117 2.93597 13.1803 3.01184C13.1489 3.0877 13.1028 3.15664 13.0448 3.2147C12.9867 3.27276 12.9178 3.31882 12.8419 3.35023C12.7661 3.38165 12.6848 3.39781 12.6026 3.39779C12.5205 3.39777 12.4392 3.38158 12.3634 3.35013C12.2875 3.31868 12.2186 3.27259 12.1606 3.2145C11.4991 2.55292 10.6653 2.09023 9.75393 1.87904C8.84254 1.66785 7.89019 1.71664 7.00516 2.01986C6.12012 2.32308 5.33794 2.86855 4.74754 3.59426C4.15714 4.31997 3.78223 5.19679 3.66544 6.125H8.625C8.79076 6.125 8.94973 6.19085 9.06694 6.30806C9.18415 6.42527 9.25 6.58424 9.25 6.75C9.25 6.91576 9.18415 7.07473 9.06694 7.19194C8.94973 7.30915 8.79076 7.375 8.625 7.375H3.625V8.625H7.375C7.54076 8.625 7.69973 8.69085 7.81694 8.80806C7.93415 8.92527 8 9.08424 8 9.25C8 9.41576 7.93415 9.57473 7.81694 9.69194C7.69973 9.80915 7.54076 9.875 7.375 9.875H3.66544C3.78223 10.8032 4.15714 11.68 4.74754 12.4057C5.33794 13.1314 6.12012 13.6769 7.00516 13.9801C7.89019 14.2834 8.84254 14.3321 9.75393 14.121C10.6653 13.9098 11.4991 13.4471 12.1606 12.7855C12.2778 12.6683 12.4368 12.6025 12.6026 12.6025C12.7683 12.6025 12.9273 12.6683 13.0445 12.7855Z'
        fill='#8C73CB'
      />
    </Svg>
  ),
  currency: 'EUR',
  abrive: 'EUR',
}
const App: React.FC = () => {
  const {
    updateUser,
    updateLanguage,
    user,
    updateCurrency,
    updateRate,
    updateProfile,
    updatePhoneNo,
    updateName,
    updateAddress,
    updateAvatar,
  } = userStore()
  useEffect(() => {
    return onAuthStateChanged(auth, (data) => {
      if (data) {
        updateUser(data)
      }
    })
  }, [])

  const fetchDataFromFirestore = useCallback(async () => {
    try {
      if (!user) return
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
    } catch (error) {
      console.error('Error fetching data from Firestore:', error)
    }
  }, [user])
  useEffect(() => {
    fetchDataFromFirestore()
  }, [fetchDataFromFirestore])
  const [fontsLoaded] = useFonts({
    'Arvo-Regular': require('./src/assets/fonts/Arvo-Regular.ttf'), //font-weight 400
    'Gilroy-Medium': require('./src/assets/fonts/Gilroy-Medium.ttf'), //font-weight 500
    'Gilroy-Regular': require('./src/assets/fonts/Gilroy-Regular.ttf'), //font-weight 400
    'Gilroy-SemiBold': require('./src/assets/fonts/Gilroy-SemiBold.ttf'), //font-weight 600
    'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
    'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
    'Montserrat-SemiBold': require('./src/assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
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
              <StackNavigationRoutes />
            </NavigationContainer>
          </SafeAreaView>
        </I18nextProvider>
      </StripeProvider>
    </Fragment>
  )
}

export default App
