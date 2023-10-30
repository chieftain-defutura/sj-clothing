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
import PremiumBuyNow from './Premium/PremiumBuyNow'
import Premium from '../TabNavigation/Premium'
import MyPosts from './Account/MyPosts'
import PlayVideo from '../../../components/PremiumComponent/PlayVideo'
import EditProfile from './Account/EditProfile'
import AboutUs from './Account/AboutUs'
import Royalties from './Account/Royalties'
import FAQ from './Account/FAQ'
import Customer from './Account/CustomerCare'
// import Accessories from './Accessories'
import AccessoriesDetails from './Accessories/AccessoriesDetails.tsx'
import Avatar from '../../../components/MediumLevel/Avatar'
import Accessory from '../../../components/Accessory'
import PostDetails from './Post/PostDetails'

const Stack = createStackNavigator()

const StackNavigationRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: 'rgba(191, 148, 228, 0.8)' },
        // headerLeft: HeaderLeft,
        // headerRight: HeaderRight,

        headerTitle: HeaderLeft,
        headerShadowVisible: false,
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
      <Stack.Screen
        name='MyPosts'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={MyPosts}
      />
      <Stack.Screen
        name='PlayVideo'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={PlayVideo}
      />
      <Stack.Screen
        name='EditProfile'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={EditProfile}
      />
      <Stack.Screen
        name='Aboutus'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={AboutUs}
      />
      <Stack.Screen
        name='FAQ'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={FAQ}
      />
      <Stack.Screen
        name='Customer'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={Customer}
      />
      <Stack.Screen
        name='Royalties'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={Royalties}
      />
      <Stack.Screen
        name='Accessories'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={Accessory}
      />
      <Stack.Screen
        name='AccessoriesDetails'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={AccessoriesDetails}
      />
      <Stack.Screen
        name='PostDetails'
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        component={PostDetails}
      />

      <Stack.Screen name='MyOrders' component={MyOrders} />
      <Stack.Screen name='TrackOrder' component={TrackOrder} />
      <Stack.Screen name='GiftOptions' component={GiftOptions} />
      <Stack.Screen name='Notification' component={NotificationPage} />
      <Stack.Screen name='Premiumm' component={Premium} />
      <Stack.Screen name='PremiumBuynow' component={PremiumBuyNow} />
      <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginModal} />
      <Stack.Screen name='Signup' options={{ headerShown: false }} component={SignupModal} />
      <Stack.Screen name='Forgot' options={{ headerShown: false }} component={ForgotModal} />
      <Stack.Screen name='OrderPlaced' options={{ headerShown: false }} component={OrderPlaced} />
      <Stack.Screen name='Search' component={MostSearches} />
      <Stack.Screen name='Avatar' component={Avatar} />
    </Stack.Navigator>
  )
}

export default StackNavigationRoutes
