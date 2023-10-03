import React from 'react'
import styled from 'styled-components/native'
import { Pressable, ScrollView, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../../../../../firebase'
import { COLORS } from '../../../../styles/theme'
import { userStore } from '../../../../store/userStore'
import AuthNavigate from '../../../../screens/AuthNavigate'
import ChevronLeft from '../../../../assets/icons/ChevronLeft'
import LogoutIcon from '../../../../assets/icons/AccountPageIcon/Logout'
import UserIcon from '../../../../assets/icons/AccountPageIcon/UserIcon'
import { AccountData } from '../../../../utils/data/AccountData'
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated'

interface IAccount {
  navigation: any
}

const data = [
  {
    image: require('../../../../assets/images/accountProfile.png'),
    profileName: 'John David',
    viewData: [
      {
        postName: 'Posts',
        postView: 298,
        view: 'K',
      },
      {
        postName: 'Royalties',
        postView: 24,
        inr: 'INR',
      },
      {
        postName: 'Orders',
        postView: 0,
      },
      {
        postName: 'Cart',
        postView: 2,
      },
    ],
  },
]

const Account: React.FC<IAccount> = ({ navigation }) => {
  const user = userStore((state) => state.user)
  const isFocused = useIsFocused()
  const { updateUser } = userStore()

  const handleLogout = async () => {
    try {
      await auth.signOut()
      const data = await AsyncStorage.getItem('mail')
      await AsyncStorage.removeItem('mail')
      if (!data) {
        updateUser(null)
        navigation.navigate('Post')
        console.log('Signed out successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView>
      <AuthNavigate focus={isFocused}>
        <AccountWrapper>
          <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
            <View>
              {data.map((item, index) => (
                <View key={index}>
                  <ProfileImage source={item.image} />
                  <ProfileName>{user?.displayName}</ProfileName>
                  <FlexContent>
                    {item.viewData.map((viewItem, viewIndex) => (
                      <View key={viewIndex}>
                        <PostText>{viewItem.postName}</PostText>
                        <ViewText>
                          {viewItem.postView}
                          {viewItem.view}
                          {viewItem.inr}
                        </ViewText>
                      </View>
                    ))}
                  </FlexContent>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(800).delay(200)} exiting={FadeOutDown}>
            <ProfileUserContent>
              <FlexIcon>
                <UserIcon width={20} height={20} />
                <UserText>Avatar</UserText>
              </FlexIcon>
              <ChevronLeft width={16} height={16} />
            </ProfileUserContent>
            {AccountData.map((f, index) => {
              return (
                <Pressable key={index} onPress={() => navigation.navigate(f.navigation)}>
                  <ProfileUserContent>
                    <FlexIcon>
                      <f.leftIcon width={20} height={20} />
                      <UserText>{f.name}</UserText>
                    </FlexIcon>
                    <RightText>{f.rightText}</RightText>
                  </ProfileUserContent>
                </Pressable>
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
          </Animated.View>
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
