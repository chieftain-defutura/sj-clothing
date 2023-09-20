import React from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'
import { ScrollView, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import CustomButton from '../../../../components/Button'
import { userStore } from '../../../../store/userStore'
import { useNavigation } from '@react-navigation/native'
import { signOut, updateCurrentUser } from 'firebase/auth'
import { auth } from '../../../../../firebase'
import { COLORS } from '../../../../styles/theme'
import UserIcon from '../../../../assets/icons/AccountPageIcon/UserIcon'
import ChevronLeft from '../../../../assets/icons/ChevronLeft'
import CopyIcon from '../../../../assets/icons/AccountPageIcon/CopyIcon'
import SackDollar from '../../../../assets/icons/AccountPageIcon/SackDollar'
import Cart from '../../../../assets/icons/AccountPageIcon/CartIcon'
import ShoppingBag from '../../../../assets/icons/AccountPageIcon/ShoppingBag'
import WishListIcon from '../../../../assets/icons/AccountPageIcon/WishlistIcon'
import HomeLocation from '../../../../assets/icons/AccountPageIcon/HomeLocation'
import CustomerCare from '../../../../assets/icons/AccountPageIcon/CustomerCare'
import HelpQuestion from '../../../../assets/icons/AccountPageIcon/HelpQuestion'
import UsersMore from '../../../../assets/icons/AccountPageIcon/UsersMore'
import LogoutIcon from '../../../../assets/icons/AccountPageIcon/Logout'

const data = [
  {
    leftIcon: CopyIcon,
    name: 'My posts',
    rightText: '44 posts',
  },
  {
    leftIcon: SackDollar,
    name: 'Royalties',
    rightText: '1500 INR',
  },
  {
    leftIcon: Cart,
    name: 'My cart',
    rightText: '2 items',
  },
  {
    leftIcon: ShoppingBag,
    name: 'My orders',
    rightText: '2 items',
  },
  {
    leftIcon: WishListIcon,
    name: 'Wishlist',
    rightText: '5 items',
  },
  {
    leftIcon: HomeLocation,
    name: 'Addressbook',
    rightText: 'Home',
  },
  {
    leftIcon: CustomerCare,
    name: 'Customer care',
  },
  {
    leftIcon: HelpQuestion,
    name: 'Help & FAQ',
  },
  {
    leftIcon: UsersMore,
    name: 'About us',
  },
]
interface IAccount {
  navigation: any
}

const Account: React.FC<IAccount> = ({ navigation }) => {
  const isFocused = useIsFocused()
  // const navigation = useNavigation()
  const { user, updateUser } = userStore()

  const handleLogout = async () => {
    try {
      await auth.signOut()
      const user = auth.currentUser

      if (!user) {
        updateUser(null)
        navigation.navigate('Post')
        console.log('Signed out successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(user?.displayName)

  return (
    <ScrollView>
      <AuthNavigate focus={isFocused}>
        <AccountWrapper>
          <ProfileImage source={require('../../../../assets/images/accountProfile.png')} />
          <ProfileName>John David</ProfileName>

          <FlexContent>
            <View>
              <PostText>Posts</PostText>
              <ViewText>298K</ViewText>
            </View>
            <View>
              <PostText>Royalties</PostText>
              <ViewText>24 INR</ViewText>
            </View>
            <View>
              <PostText>Orders</PostText>
              <ViewText>0</ViewText>
            </View>
            <View>
              <PostText>Cart</PostText>
              <ViewText>2</ViewText>
            </View>
          </FlexContent>
          <ProfileUserContent>
            <FlexIcon>
              <UserIcon width={20} height={20} />
              <UserText>Avatar</UserText>
            </FlexIcon>
            <ChevronLeft width={16} height={16} />
          </ProfileUserContent>
          {data.map((f, index) => {
            return (
              <View key={index}>
                <ProfileUserContent>
                  <FlexIcon>
                    <f.leftIcon width={20} height={20} />
                    <UserText>{f.name}</UserText>
                  </FlexIcon>
                  <RightText>{f.rightText}</RightText>
                </ProfileUserContent>
              </View>
            )
          })}
          <LogoutPressable onPress={handleLogout}>
            <ProfileUserContent>
              <FlexIcon>
                <LogoutIcon width={24} height={24} />
                <LogoutText>Log out</LogoutText>
              </FlexIcon>
            </ProfileUserContent>
          </LogoutPressable>
        </AccountWrapper>
      </AuthNavigate>
    </ScrollView>
  )
}

const AccountWrapper = styled.View`
  flex: 1;
`
const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 16px;
  padding-horizontal: 24px;
`

const LogoutPressable = styled.Pressable`
  margin-bottom: 42px;
`

const RightText = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.SecondaryTwo};
`
const LogoutText = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: #ef5757;
`

const ProfileUserContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 16px;
  padding-horizontal: 24px;
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
`

const FlexIcon = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const UserText = styled.Text`
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
  font-size: 14px;
`

const PostText = styled.Text`
  text-align: center;
  font-size: 12px;
  font-family: Gilroy-Medium;
  color: ${COLORS.SecondaryTwo};
  text-transform: uppercase;
  margin-bottom: 4px;
`

const ViewText = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: Montserrat-SemiBold;
  color: ${COLORS.iconsHighlightClr};
`

const ProfileImage = styled.Image`
  width: 100%;
  overflow: hidden;
  object-fit: fill;
`

const ProfileName = styled.Text`
  font-size: 20px;
  font-family: Montserrat-SemiBold;
  color: ${COLORS.iconsHighlightClr};
  text-align: center;
  margin-top: 8px;
`

const AccountText = styled.Text`
  font-size: 28px;
`

export default Account
