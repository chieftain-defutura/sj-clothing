import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../../../components/Header'
import TabNavigationRoutes from '../TabNavigation'
import SelectStyle from '../../../components/PostCreater/SelectStyle'
import SelectColor from '../../../components/PostCreater/SelectColor'
import AddImage from '../../../components/PostCreater/AddImage'
import AddText from '../../../components/PostCreater/AddText'
import CartPage from './Cart'
import MostSearches from './MostSearches'
import LoginModal from '../../../screens/Login'
import SignupModal from '../../../screens/Signup'

const Stack = createNativeStackNavigator()

const StackNavigationRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Stack'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={TabNavigationRoutes}
      />
      <Stack.Screen
        name='Cart'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={CartPage}
      />
      <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginModal} />
      <Stack.Screen name='Signup' options={{ headerShown: false }} component={SignupModal} />

      <Stack.Screen
        name='Style'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={SelectStyle}
      />
      <Stack.Screen
        name='Color'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={SelectColor}
      />
      <Stack.Screen
        name='AddImage'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={AddImage}
      />
      <Stack.Screen
        name='AddText'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={AddText}
      />
      <Stack.Screen
        name='Search'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={MostSearches}
      />
    </Stack.Navigator>
  )
}

export default StackNavigationRoutes
