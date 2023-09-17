import React from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'
import { useIsFocused } from '@react-navigation/native'
// import CustomButton from '../../../../components/Button'
// import { userStore } from '../../../../store/userStore'
// import { useNavigation } from '@react-navigation/native'
// import { signOut, updateCurrentUser } from 'firebase/auth'
// import { auth } from '../../../../../firebase'

const Account: React.FC = () => {
  const isFocused = useIsFocused()
  // const navigation = useNavigation()
  // const user = userStore((state) => state.user)

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth)
  //     // console.log(auth.currentUser)
  //     const user = auth.currentUser
  //     if (!user) {
  //       userStore((state) => state.updateUser(null))

  //       navigation.navigate('Post')
  //       console.log('Signed out successfully')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <AccountWrapper>
      <AuthNavigate focus={isFocused}>
        <AccountText>Account</AccountText>
        {/* <CustomButton variant='primary' text='Log out' onPress={handleLogout} /> */}
      </AuthNavigate>
    </AccountWrapper>
  )
}

const AccountWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const AccountText = styled.Text`
  font-size: 28px;
`

export default Account
