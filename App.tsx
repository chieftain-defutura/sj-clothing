import React, { useEffect } from 'react'
// import { Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigationRoutes from './src/pages/Navigation/StackNavigation'
import { useFonts } from 'expo-font'
import { userStore } from './src/store/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

// const windowWidth = Dimensions.get('window').width
// const windowHeight = Dimensions.get('window').height

const App: React.FC = () => {
  const updateUser = userStore((store) => store.updateUser)
  useEffect(() => {
    return onAuthStateChanged(auth, (data) => {
      // console.log('user', data)
      if (data) {
        updateUser(data)
      } else {
        // no user
      }
    })
  }, [])

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
    <NavigationContainer>
      <StackNavigationRoutes />
    </NavigationContainer>
  )
}

export default App
