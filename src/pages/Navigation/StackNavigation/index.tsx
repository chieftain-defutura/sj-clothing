import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../../../components/Header'
import TabNavigationRoutes from '../TabNavigation'
import CartPage from './Cart'

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
    </Stack.Navigator>
  )
}

export default StackNavigationRoutes
