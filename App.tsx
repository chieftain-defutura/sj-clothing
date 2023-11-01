import React, { Fragment, useCallback, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigationRoutes from './src/pages/Navigation/StackNavigation'
import { useFonts } from 'expo-font'
import { userStore } from './src/store/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18n from './i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App: React.FC = () => {
  const { updateUser, updateLanguage } = userStore()
  useEffect(() => {
    return onAuthStateChanged(auth, (data) => {
      if (data) {
        updateUser(data)
      } else {
        // no user
      }
    })
  }, [])

  const getLanguage = useCallback(async () => {
    const getLanguage = await AsyncStorage.getItem('language')
    if (!getLanguage) {
      updateLanguage('en')
    }
    if (getLanguage) {
      updateLanguage(getLanguage)
    }
  }, [])
  useEffect(() => {
    getLanguage()
  }, [getLanguage])

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
      <I18nextProvider i18n={i18n}>
        <SafeAreaView style={{ flex: 0, backgroundColor: 'rgba(191, 148, 228, 0.1)' }} />
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
    </Fragment>
  )
}

export default App
