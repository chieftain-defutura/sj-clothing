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

export const AccountData = [
  {
    leftIcon: UserIcon,
    name: 'Avatar',
    rightIcon: ChevronLeft,
    navigation: 'MidLevel',
  },
  {
    leftIcon: CopyIcon,
    name: 'My posts',
    rightText: '44 posts',
    navigation: 'MyPosts',
  },
  {
    leftIcon: SackDollar,
    name: 'Royalties',
    rightText: '1500 INR',
    navigation: 'Royalties',
  },
  {
    leftIcon: Cart,
    name: 'My cart',
    rightText: '2 items',
    navigation: 'Cart',
  },
  {
    leftIcon: ShoppingBag,
    name: 'My orders',
    rightText: '2 items',
    navigation: 'MyOrders',
  },
  {
    leftIcon: HomeLocation,
    name: 'Addressbook',
    rightText: 'Home',
    navigation: 'AddressBook',
  },
  {
    leftIcon: CustomerCare,
    name: 'Accessories',
    navigation: 'Accessories',
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
]
