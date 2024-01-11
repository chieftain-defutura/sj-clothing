import UsersMore from '../../assets/icons/AccountPageIcon/UsersMore'
import ShoppingBag from '../../assets/icons/AccountPageIcon/ShoppingBag'
import UserIcon from '../../assets/icons/AccountPageIcon/UserIcon'
import ChevronLeft from '../../assets/icons/ChevronLeft'
import HomeLocation from '../../assets/icons/AccountPageIcon/HomeLocation'
import CustomerCare from '../../assets/icons/AccountPageIcon/CustomerCare'
import HelpQuestion from '../../assets/icons/AccountPageIcon/HelpQuestion'
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
  {
    leftIcon: ShoppingBag,
    name: 'My orders',
    rightText: '0 items',
    navigation: 'MyOrders',
  },
  {
    leftIcon: HomeLocation,
    name: 'Address Book',
    rightText: 'Home',
    navigation: 'Location',
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
  // {
  //   leftIcon: UsersMore,
  //   name: 'Search',
  //   navigation: 'Search',
  // },
  // {
  //   leftIcon: UsersMore,
  //   name: 'NotificationPage',
  //   navigation: 'NotificationPage',
  // },
  // {
  //   leftIcon: TermsAndCondition,
  //   name: 'Royalties',
  //   navigation: 'Royalties',
  // },
]
