import CopyIcon from '../../assets/icons/AccountPageIcon/CopyIcon'
import UsersMore from '../../assets/icons/AccountPageIcon/UsersMore'
import SackDollar from '../../assets/icons/AccountPageIcon/SackDollar'
import ShoppingBag from '../../assets/icons/AccountPageIcon/ShoppingBag'
// import WishListIcon from '../../assets/icons/AccountPageIcon/WishlistIcon'
import UserIcon from '../../assets/icons/AccountPageIcon/UserIcon'
import ChevronLeft from '../../assets/icons/ChevronLeft'
import HomeLocation from '../../assets/icons/AccountPageIcon/HomeLocation'
import CustomerCare from '../../assets/icons/AccountPageIcon/CustomerCare'
import HelpQuestion from '../../assets/icons/AccountPageIcon/HelpQuestion'
import Cart from '../../assets/icons/AccountPageIcon/CartIcon'
import LanguageIcon from '../../assets/icons/LanguageIcon'
import CurrencyIcon from '../../assets/icons/CurrencyIcon'
import TermsAndCondition from '../../assets/icons/AccountPageIcon/TermsAndConditions'

export const AccountData = [
  {
    leftIcon: UserIcon,
    name: `Avatar`,
    rightIcon: ChevronLeft,
    navigation: 'Avatar',
  },
  // {
  //   leftIcon: CopyIcon,
  //   name: 'My posts',
  //   rightText: '44 posts',
  //   navigation: 'MyPosts',
  // },
  // {
  //   leftIcon: SackDollar,
  //   name: 'Checkout',
  //   rightText: '1500 INR',
  //   navigation: 'Checkout',
  // },
  // {
  //   leftIcon: Cart,
  //   name: 'My cart',
  //   rightText: '2 items',
  //   navigation: 'Cart',
  // },
  {
    leftIcon: ShoppingBag,
    name: 'My orders',
    rightText: '2 items',
    navigation: 'MyOrders',
  },
  // {
  //   leftIcon: HomeLocation,
  //   name: 'Addressbook',
  //   rightText: 'Home',
  //   navigation: 'AddressBook',
  // },
  {
    leftIcon: HomeLocation,
    name: 'Address Book',
    rightText: 'Home',
    navigation: 'LocationAddAddress',
  },
  {
    leftIcon: CustomerCare,
    name: 'Accessories',
    navigation: 'Accessories',
  },
  {
    leftIcon: LanguageIcon,
    name: 'Language',
    navigation: 'Languages',
  },
  {
    leftIcon: CurrencyIcon,
    name: 'Currency',
    navigation: 'Currency',
  },
  {
    leftIcon: HelpQuestion,
    name: 'Help & FAQ',
    navigation: 'FAQ',
  },
  {
    leftIcon: UsersMore,
    name: 'About us',
    navigation: 'Aboutus',
  },
  {
    leftIcon: TermsAndCondition,
    name: 'Terms And Condition',
    navigation: 'TermsAndConditions',
  },
]
