import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginModal from './Login'
import SignupModal from './Signup'
import ForgotModal from './Forgot'
import { userStore } from '../store/userStore'

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
  console.log('user', user)

  const onSignUpClick = () => {
    setLoginModalVisible(false)
    setSignupModal(true)
  }

  const getUserMail = useCallback(async () => {
    const data = await AsyncStorage.getItem('mail')
    setUserMail(data)
  }, [])

  const onForgot = () => {
    console.log('ASUI')
    // setForgotModalVisible(true)
    // setLoginModalVisible(false)
    // console.log('asa')
  }

  const closeSignUpModal = () => {
    setSignupModal(false)
    if (!userMail) {
      navigation.navigate('Post')
    }
  }

  const closeLoginModal = () => {
    setLoginModalVisible(false)
    if (!userMail) {
      navigation.navigate('Post')
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
      {!userMail && isLoginModalVisible && (
        <LoginModal
          isVisible={isLoginModalVisible}
          onClose={closeLoginModal}
          onSignClick={onSignUpClick}
          // onForgot={onForgot}
        />
      )}
      {!userMail && isLoginModalVisible && (
        <ForgotModal isVisible={isForgotModalVisible} onClose={closeLoginModal} />
      )}
      {!userMail && isSignUpModal && (
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
