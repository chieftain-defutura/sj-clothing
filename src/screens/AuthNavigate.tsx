import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userStore } from '../store/userStore'
import LoginModal from './Login'
import SignupModal from './Signup'

interface AuthNavigateProps {
  children: React.ReactNode
}

const AuthNavigate: React.FC<AuthNavigateProps> = ({ children }) => {
  const [isSignUpModal, setSignupModal] = useState(false)
  const [isLoginModalVisible, setLoginModalVisible] = useState(false)
  const user = userStore((state) => state.user)
  const navigation = useNavigation()

  const onSignUpClick = () => {
    setLoginModalVisible(false)
    setSignupModal(true)
  }

  const closeSignUpModal = () => {
    setSignupModal(false)
    if (!user) {
      navigation.navigate('Post')
    }
  }

  const closeLoginModal = () => {
    setLoginModalVisible(false)
    if (!user) {
      navigation.navigate('Post')
    }
  }

  useEffect(() => {
    if (!user) {
      setLoginModalVisible(true)
    }
  }, [user])

  return (
    <View>
      {!user && isLoginModalVisible && (
        <LoginModal
          isVisible={isLoginModalVisible}
          onClose={closeLoginModal}
          onSignClick={onSignUpClick}
        />
      )}
      {!user && isSignUpModal && (
        <SignupModal
          isVisible={isSignUpModal}
          onLoginClick={() => {
            setSignupModal(false)
            setLoginModalVisible(true)
          }}
          onClose={closeSignUpModal}
        />
      )}
      {children}
    </View>
  )
}

export default AuthNavigate
