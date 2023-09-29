import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import BuyNow from './BuyNow'
import CartPage from './Cart'
import Checkout from './Checkout'
import MyOrders from './MyOrders'
import TrackOrder from './TrackOrder'
import GiftOptions from './GiftOptions'
import AddressBook from './AddressBook'
import MostSearches from './MostSearches'
import LoginModal from '../../../screens/Modals/Login'
import SignupModal from '../../../screens/Modals/Signup'
import ForgotModal from '../../../screens/Forgot'
import NotificationPage from './NotificationPage'
import TabNavigationRoutes from '../TabNavigation'
import OrderPlaced from '../../../screens/OrderPlaced'
import PostCreation from '../../../components/PostCreater'
import { HeaderLeft, HeaderRight } from '../../../components/Header'
import PremiumThreeSixtyDegree from './Premium/PremiumThreeSixtyDegree'
import PremiumBuyNow from './Premium/PremiumBuyNow'
import Premium from '../TabNavigation/Premium'
import PremiumDetailsCard from './Premium/PremiumDetailsCard'

const Stack = createStackNavigator()

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
      <Stack.Screen
        name='Stack'
        component={TabNavigationRoutes}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
      />
      <Stack.Screen
        name='AddressBook'
        component={AddressBook}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
      />
      <Stack.Screen
        name='Buynow'
        component={BuyNow}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
      />
      <Stack.Screen
        name='PostCreation'
        component={PostCreation}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
      />
      <Stack.Screen
        name='Cart'
        component={CartPage}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
      />
      <Stack.Screen
        name='Checkout'
        component={Checkout}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
      />
      <Stack.Screen name='MyOrders' component={MyOrders} />
      <Stack.Screen name='TrackOrder' component={TrackOrder} />
      <Stack.Screen name='GiftOptions' component={GiftOptions} />
      <Stack.Screen name='Notification' component={NotificationPage} />
      <Stack.Screen name='Premiumm' component={Premium} />
      <Stack.Screen name='PremiumDetailsCard' component={PremiumDetailsCard} />
      {/* <Stack.Screen name='PremiumNavigation' component={PremiumNavigation} /> */}
      <Stack.Screen name='PremiumThreeSixtyDegreePage' component={PremiumThreeSixtyDegree} />
      <Stack.Screen name='PremiumBuynow' component={PremiumBuyNow} />
      <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginModal} />
      <Stack.Screen name='Signup' options={{ headerShown: false }} component={SignupModal} />
      <Stack.Screen name='Forgot' options={{ headerShown: false }} component={ForgotModal} />
      <Stack.Screen name='OrderPlaced' options={{ headerShown: false }} component={OrderPlaced} />
      <Stack.Screen name='Search' component={MostSearches} />
    </Stack.Navigator>
  )
}

export default StackNavigationRoutes
