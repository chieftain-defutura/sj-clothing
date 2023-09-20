import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BuyNow from './BuyNow'
import CartPage from './Cart'
import Checkout from './Checkout'
import MyOrders from './MyOrders'
import TrackOrder from './TrackOrder'
import GiftOptions from './GiftOptions'
import AddressBook from './AddressBook'
import MostSearches from './MostSearches'
import LoginModal from '../../../screens/Login'
import SignupModal from '../../../screens/Signup'
import ForgotModal from '../../../screens/Forgot'
import NotificationPage from './NotificationPage'
import TabNavigationRoutes from '../TabNavigation'
import OrderPlaced from '../../../screens/OrderPlaced'
import PostCreation from '../../../components/PostCreater'
import { HeaderLeft, HeaderRight } from '../../../components/Header'

const Stack = createNativeStackNavigator()

const StackNavigationRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerLeft: HeaderLeft,
        headerRight: HeaderRight,
        headerTitle: '',
      }}
    >
      <Stack.Screen name='Stack' component={TabNavigationRoutes} />
      <Stack.Screen name='AddressBook' component={AddressBook} />
      <Stack.Screen name='Buynow' component={BuyNow} />
      <Stack.Screen name='PostCreation' component={PostCreation} />
      <Stack.Screen name='Cart' component={CartPage} />
      <Stack.Screen name='Checkout' component={Checkout} />
      <Stack.Screen name='MyOrders' component={MyOrders} />
      <Stack.Screen name='TrackOrder' component={TrackOrder} />
      <Stack.Screen name='GiftOptions' component={GiftOptions} />
      <Stack.Screen name='Notification' component={NotificationPage} />

      <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginModal} />
      <Stack.Screen name='Signup' options={{ headerShown: false }} component={SignupModal} />
      <Stack.Screen name='Forgot' options={{ headerShown: false }} component={ForgotModal} />
      <Stack.Screen name='OrderPlaced' options={{ headerShown: false }} component={OrderPlaced} />

      <Stack.Screen name='Search' component={MostSearches} />
    </Stack.Navigator>
  )
}

export default StackNavigationRoutes
