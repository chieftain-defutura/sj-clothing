import React from 'react'
// import { Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from '@use-expo/font'
import StackNavigationRoutes from './src/pages/Navigation/StackNavigation'

// const windowWidth = Dimensions.get('window').width
// const windowHeight = Dimensions.get('window').height

const customFonts = {
  Gilroy: require('./src/assets/fonts/Gilroy-Regular.ttf'),
}

const App: React.FC = () => {
  const [loaded] = useFonts(customFonts)

  if (!loaded) {
    return null
  }
  return (
    <NavigationContainer>
      <StackNavigationRoutes />
    </NavigationContainer>
  )
}

export default App
