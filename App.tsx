import React from 'react'
// import { Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigationRoutes from './src/pages/Navigation/StackNavigation'
import { useFonts } from 'expo-font'

// const windowWidth = Dimensions.get('window').width
// const windowHeight = Dimensions.get('window').height

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Arvo-Regular': require('./src/assets/fonts/Arvo-Regular.ttf'), //400
    'Gilroy-Medium': require('./src/assets/fonts/Gilroy-Medium.ttf'), //500
    'Gilroy-Regular': require('./src/assets/fonts/Gilroy-Regular.ttf'), //400
    'Gilroy-SemiBold': require('./src/assets/fonts/Gilroy-SemiBold.ttf'), //600
    'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'), //400
    'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'), //500
    'Montserrat-SemiBold': require('./src/assets/fonts/Montserrat-SemiBold.ttf'), //600
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
