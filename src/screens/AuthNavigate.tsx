import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userStore } from '../store/userStore'
import LoginModal from './Login'
import SignupModal from './Signup'
import ForgotModal from './Forgot'

interface AuthNavigateProps {
  children: React.ReactNode
  focus: boolean
}

const AuthNavigate: React.FC<AuthNavigateProps> = ({ children, focus }) => {
  const [isSignUpModal, setSignupModal] = useState(false)
  const [isLoginModalVisible, setLoginModalVisible] = useState(false)
  const [isForgotModalVisible, setForgotModalVisible] = useState(false)

  const user = userStore((state) => state.user)
  const navigation = useNavigation()

  const onSignUpClick = () => {
    setLoginModalVisible(false)
    setSignupModal(true)
  }

  const onForgot = () => {
    console.log('ASUI')
    // setForgotModalVisible(true)
    // setLoginModalVisible(false)
    // console.log('asa')
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
    if (focus === true && !user) {
      setLoginModalVisible(true)
    }
  }, [user, focus])

  return (
    <View>
      {!user && isLoginModalVisible && (
        <LoginModal
          isVisible={isLoginModalVisible}
          onClose={closeLoginModal}
          onSignClick={onSignUpClick}
          // onForgot={onForgot}
        />
      )}
      {!user && isLoginModalVisible && (
        <ForgotModal isVisible={isForgotModalVisible} onClose={closeLoginModal} />
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
