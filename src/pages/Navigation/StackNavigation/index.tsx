import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartPage from './Cart'
import Checkout from './Checkout'
import MyOrders from './MyOrders'
import TrackOrder from './TrackOrder'
import MostSearches from './MostSearches'
import Header from '../../../components/Header'
import LoginModal from '../../../screens/Login'
import SignupModal from '../../../screens/Signup'
import TabNavigationRoutes from '../TabNavigation'
import AddText from '../../../components/PostCreater/AddText'
import AddImage from '../../../components/PostCreater/AddImage'
import SelectStyle from '../../../components/PostCreater/SelectStyle'
import SelectColor from '../../../components/PostCreater/SelectColor'
// import SelectText from '../../../components/PostCreater/AddText/SelectText'
import SelectDesign from '../../../components/PostCreater/AddImage/SelectDesign'
import ProductAndCaption from '../../../components/PostCreater/ProductAndCaption'
import FinalProduct from '../../../components/PostCreater/FinalProduct'
import GiftOptions from './GiftOptions'
import NotificationPage from './NotificationPage'
import OrderPlaced from '../../../screens/OrderPlaced'
import AddressBook from './AddressBook'
import ForgotModal from '../../../screens/Forgot'
import BuyNow from './BuyNow'

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
        name='AddressBook'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={AddressBook}
      />
      <Stack.Screen
        name='Buynow'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={BuyNow}
      />

      <Stack.Screen
        name='Cart'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={CartPage}
      />
      <Stack.Screen
        name='Checkout'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={Checkout}
      />
      <Stack.Screen
        name='MyOrders'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={MyOrders}
      />
      <Stack.Screen
        name='TrackOrder'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={TrackOrder}
      />
      <Stack.Screen
        name='GiftOptions'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={GiftOptions}
      />
      <Stack.Screen
        name='Notification'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={NotificationPage}
      />

      <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginModal} />
      <Stack.Screen name='Signup' options={{ headerShown: false }} component={SignupModal} />
      <Stack.Screen name='Forgot' options={{ headerShown: false }} component={ForgotModal} />
      <Stack.Screen name='OrderPlaced' options={{ headerShown: false }} component={OrderPlaced} />

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
        name='AddedImage'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={SelectDesign}
      />
      <Stack.Screen
        name='AddText'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={AddText}
      />
      {/* <Stack.Screen
        name='AddedText'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={SelectText}
      /> */}
      <Stack.Screen
        name='ProductAndCaption'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={ProductAndCaption}
      />
      <Stack.Screen
        name='FinalProduct'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={FinalProduct}
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
