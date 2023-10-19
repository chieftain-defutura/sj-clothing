import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginModal from './Modals/Login'
import SignupModal from './Modals/Signup'
import { userStore } from '../store/userStore'
import ForgotMail from './Modals/ForgotMail'

interface AuthNavigateProps {
  children: React.ReactNode
  focus: boolean
}

const AuthNavigate: React.FC<AuthNavigateProps> = ({ children, focus }) => {
  const [isSignUpModal, setSignupModal] = useState(false)
  const [isLoginModalVisible, setLoginModalVisible] = useState(false)
  const [isForgotModalVisible, setForgotModalVisible] = useState(false)
  const [userMail, setUserMail] = useState<string | null>('')
  const user = userStore((state) => state.user)

  const navigation = useNavigation()

  const onSignUpClick = () => {
    setLoginModalVisible(false)
    setSignupModal(true)
  }

  const getUserMail = useCallback(async () => {
    const data = await AsyncStorage.getItem('mail')
    setUserMail(data)
  }, [])

  const onForgot = () => {
    setForgotModalVisible(true)
    setLoginModalVisible(false)
  }

  const closeSignUpModal = () => {
    setSignupModal(false)
    if (!userMail) {
      // navigation.navigate('Post')
      navigation.navigate('Account', { showToolTip: true })
    }
  }

  const closeLoginModal = () => {
    setLoginModalVisible(false)
    if (!userMail) {
      navigation.navigate('Account')
    }
  }

  const closeForgotModel = () => {
    setForgotModalVisible(false)
    if (!userMail) {
      navigation.navigate('Account')
    }
  }

  useEffect(() => {
    getUserMail()
    if (focus === true && !userMail) {
      setLoginModalVisible(true)
    }
  }, [userMail, focus])

  return (
    <View>
      {!user && isLoginModalVisible && (
        <LoginModal
          isVisible={isLoginModalVisible}
          onClose={closeLoginModal}
          onSignClick={onSignUpClick}
          onForgotClick={onForgot}
        />
      )}
      {!user && isForgotModalVisible && (
        <ForgotMail
          isVisible={isForgotModalVisible}
          onClose={closeForgotModel}
          onLoginClick={() => {
            setForgotModalVisible(false)
            setLoginModalVisible(true)
          }}
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
