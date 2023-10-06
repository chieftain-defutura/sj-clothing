import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  AddressBook: undefined
  Stack: undefined
  Buynow: undefined
  Cart: undefined
  Checkout: undefined
  MyOrders: undefined
  GiftOptions: undefined
  Notification: undefined
  PremiumDetailsCard: undefined
  PremiumThreeSixtyDegreePage: undefined
  Search: undefined
  Post: undefined
  Home: undefined
  MidLevel: undefined
  Premium: undefined
  Account: { dName: string }
  Header: undefined
  TrackOrder: undefined
}

export type ScreenProps<RouteName extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, RouteName>
}
