import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartPage from './Cart'
import Checkout from './Checkout'
import MyOrders from './MyOrders'
import TrackOrder from './TrackOrder'
import MostSearches from './MostSearches'
import { HeaderLeft, HeaderRight } from '../../../components/Header'
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

      <Stack.Screen name='Style' component={SelectStyle} />
      <Stack.Screen name='Color' component={SelectColor} />
      <Stack.Screen name='AddImage' component={AddImage} />
      <Stack.Screen name='AddedImage' component={SelectDesign} />
      <Stack.Screen name='AddText' component={AddText} />
      {/* <Stack.Screen
        name='AddedText'

        component={SelectText}
      /> */}
      <Stack.Screen name='ProductAndCaption' component={ProductAndCaption} />
      <Stack.Screen name='FinalProduct' component={FinalProduct} />
      <Stack.Screen name='Search' component={MostSearches} />
    </Stack.Navigator>
  )
}

export default StackNavigationRoutes
