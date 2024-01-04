import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import {
  Pressable,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  Image,
  View,
  TouchableHighlight,
} from 'react-native'
import { db } from '../../../../../firebase'
import { COLORS, gradientOpacityColors } from '../../../../styles/theme'
import { userStore } from '../../../../store/userStore'
import LogoutIcon from '../../../../assets/icons/AccountPageIcon/Logout'
import { AccountData } from '../../../../utils/data/AccountData'
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated'
import SubscriptionModal from '../../../../screens/Modals/Subscription'
import EditIcon from '../../../../assets/icons/AccountPageIcon/EditIcon'
import CustomerCare from '../../../../assets/icons/AccountPageIcon/CustomerCare'
import { LinearGradient } from 'expo-linear-gradient'
import NotUserIcon from '../../../../assets/icons/AccountPageIcon/NotUserIcon'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../ScreenTypes'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite'
import { useTranslation } from 'react-i18next'
import { IOrder } from '../../../../constant/types'
import LoginModal from '../../../../screens/Modals/Login'
import SignupModal from '../../../../screens/Modals/Signup'
import ForgotMail from '../../../../screens/Modals/ForgotMail'
import LogOut from '../../../../screens/Modals/LogOut'
import DelectAccount from '../../../../screens/Modals/DelectAccount'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DeleteIcon from '../../../../assets/icons/AccountPageIcon/DeleteIcon'
import { generalStore } from '../../../../store/generalStore'
import AccountTooltip from '../../../../components/Tooltips/AccountTooltip'
import EditProfileTooltip from '../../../../components/Tooltips/Account/EditProfileTooltip'

interface IAccount {
  navigation: any
  route: RouteProp<RootStackParamList, 'Account'>
}

const { width, height } = Dimensions.get('window')

const Account: React.FC<IAccount> = ({ navigation, route }) => {
  const { t } = useTranslation('account')
  const [isSubscriptionModal, setSubscriptionModal] = useState(false)
  const [orderData, setOrderData] = useState<IOrder[]>([])
  const user = userStore((state) => state.user)
  const saveAddressAs = userStore((state) => state.saveAddressAs)
  const phoneNumber = userStore((state) => state.phoneNo)
  const AccessoryName = generalStore((state) => state.AccessoryName)
  const Accessory = generalStore((state) => state.Accessory)
  const [toolTip, showToolTip] = useState(false)
  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [forgotMail, setForgotmail] = useState(false)
  const [logOut, setLogOut] = useState(false)
  const [isDelectAccount, setIsDelectAccount] = useState(false)
  const [editProfileToolTip, setEditProfileToolTip] = useState(false)
  const [showTooltip, setShowTooltip] = useState(1)
  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showAccountTooltip')

      if (data !== '2') {
        AsyncStorage.setItem('showAccountTooltip', '2')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  const isShowToolTipEditProfile = async () => {
    try {
      const data = await AsyncStorage.getItem('showEditProfileTooltip')

      if (data !== '17') {
        AsyncStorage.setItem('showEditProfileTooltip', '17')
        setEditProfileToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    isShowToolTipEditProfile()
  }, [isShowToolTipEditProfile])

  const handleShowTooltip = () => {
    showToolTip(false)
    setShowTooltip(2)
  }

  const handleLogin = () => {
    if (!user) {
      setLogin(true)
      return
    }
    if (user && !phoneNumber) {
      setSignUp(true)
    }
    if (user && phoneNumber) {
      navigation.navigate('EditProfile')
    }
  }

  const handleCustomerCarePress = () => {
    const emailAddress = 'sprinklenadar@gmail.com'
    Linking.openURL(`mailto:${emailAddress}`)
  }

  const closeSubscriptionModal = () => {
    setSubscriptionModal(false)
  }

  const handleLogout = async () => {
    setLogOut(true)
  }

  const handleDelectAccount = () => {
    setIsDelectAccount(true)
  }

  const getData = useCallback(async () => {
    if (!user) return
    const ProductRef = await getDocs(collection(db, 'Orders'))
    const fetchProduct = ProductRef.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }))
    const data = fetchProduct.filter((f) => f.userId === user.uid && f.paymentStatus === 'SUCCESS')
    setOrderData(data)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <LinearGradient colors={gradientOpacityColors}>
      <ScrollView>
        <AccountWrapper>
          <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
            <UserWrapper style={{ width: width, height: height / 2.5 }}>
              <NotUserContent>
                {user && user.photoURL ? (
                  <Image
                    source={{ uri: user.photoURL as string }}
                    style={{
                      width: width,
                      height: height / 2.5,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                    }}
                    alt='profile-img'
                  />
                ) : (
                  <NotUserIcon width={128} height={128} />
                )}
              </NotUserContent>
              <EditContent onPress={() => handleLogin()}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['#462D85', '#DB00FF']}
                  style={styles.plusIconGradientColor}
                >
                  <EditIcon width={20} height={20} />
                </LinearGradient>
              </EditContent>
            </UserWrapper>

            {user && (
              <Text allowFontScaling={false} style={styles.ProfileName}>
                {user?.displayName}
              </Text>
            )}

            <SubscriptionModal
              isVisible={isSubscriptionModal}
              onClose={closeSubscriptionModal}
              navigation={navigation}
            />
          </Animated.View>
          {!Accessory ? (
            <Animated.View entering={FadeInDown.duration(800).delay(200)} exiting={FadeOutDown}>
              {AccountData.filter((f) => f.name !== AccessoryName).map((f, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    onPress={() => navigation.navigate(f.navigation)}
                    activeOpacity={0.6}
                    underlayColor='rgba(70, 45, 133, 0.1)'
                  >
                    <View>
                      <ProfileUserContent>
                        <FlexIcon>
                          <f.leftIcon width={20} height={20} />
                          <Text allowFontScaling={false} style={styles.UserText}>
                            {t(f.name)}
                          </Text>
                        </FlexIcon>
                        {f.rightIcon && <f.rightIcon width={20} height={20} />}
                        {f.name === 'My orders' && (
                          <Text allowFontScaling={false} style={styles.RightText}>
                            {user && f.name === 'My orders' && orderData
                              ? `${orderData.length} items`
                              : '0 items'}
                          </Text>
                        )}
                        {f.name === 'Address Book' && (
                          <Text allowFontScaling={false} style={styles.RightText}>
                            {user && f.name === 'Address Book' && saveAddressAs
                              ? saveAddressAs
                              : ''}
                          </Text>
                        )}
                      </ProfileUserContent>
                    </View>
                  </TouchableHighlight>
                )
              })}
              <TouchableHighlight
                onPress={handleCustomerCarePress}
                activeOpacity={0.6}
                underlayColor='rgba(70, 45, 133, 0.1)'
              >
                <View>
                  <ProfileUserContent>
                    <FlexIcon>
                      <CustomerCare width={20} height={20} />
                      <Text allowFontScaling={false} style={styles.UserText}>
                        {t('Customer care')}
                      </Text>
                    </FlexIcon>
                  </ProfileUserContent>
                </View>
              </TouchableHighlight>

              {user ? (
                <View>
                  <TouchableHighlight
                    onPress={handleLogout}
                    activeOpacity={0.6}
                    underlayColor='rgba(255, 54, 54, 0.1)'
                  >
                    <View>
                      <ProfileUserContent>
                        <FlexIcon>
                          <LogoutIcon width={24} height={24} />
                          <Text allowFontScaling={false} style={styles.LogoutText}>
                            {t('Log out')}
                          </Text>
                        </FlexIcon>
                      </ProfileUserContent>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={handleDelectAccount}
                    activeOpacity={0.6}
                    underlayColor='rgba(255, 54, 54, 0.1)'
                  >
                    <View>
                      <ProfileUserContent>
                        <FlexIcon>
                          <DeleteIcon width={24} height={24} />
                          <Text allowFontScaling={false} style={styles.LogoutText}>
                            {t('Delete Account')}
                          </Text>
                        </FlexIcon>
                      </ProfileUserContent>
                    </View>
                  </TouchableHighlight>
                </View>
              ) : (
                <LogoutPressable
                  onPress={() => setLogin(true)}
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.1)'
                >
                  <ProfileUserContent>
                    <FlexIcon>
                      <Text
                        allowFontScaling={false}
                        style={
                          (styles.LogoutText, { color: '#462D85', fontSize: 14, marginLeft: 6 })
                        }
                      >
                        {t('Log In')}
                      </Text>
                    </FlexIcon>
                  </ProfileUserContent>
                </LogoutPressable>
              )}
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.duration(800).delay(200)} exiting={FadeOutDown}>
              {AccountData.map((f, index) => {
                return (
                  <Pressable key={index} onPress={() => navigation.navigate(f.navigation)}>
                    <ProfileUserContent>
                      <FlexIcon>
                        <f.leftIcon width={20} height={20} />
                        <Text allowFontScaling={false} style={styles.UserText}>
                          {t(f.name)}
                        </Text>
                      </FlexIcon>
                      {f.rightIcon && <f.rightIcon width={20} height={20} />}
                      {f.rightText && (
                        <Text allowFontScaling={false} style={styles.RightText}>
                          {f.name === 'My orders' ? `${orderData.length} items` : f.rightText}
                        </Text>
                      )}
                    </ProfileUserContent>
                  </Pressable>
                )
              })}
              <Pressable onPress={handleCustomerCarePress}>
                <ProfileUserContent>
                  <FlexIcon>
                    <CustomerCare width={20} height={20} />
                    <Text allowFontScaling={false} style={styles.UserText}>
                      {t('Customer care')}
                    </Text>
                  </FlexIcon>
                </ProfileUserContent>
              </Pressable>

              {user ? (
                <View>
                  <LogoutPressable
                    activeOpacity={0.6}
                    underlayColor='rgba(255, 54, 54, 0.1)'
                    style={{ marginBottom: 0 }}
                  >
                    <Pressable onPress={handleLogout}>
                      <ProfileUserContent>
                        <FlexIcon>
                          <LogoutIcon width={24} height={24} />
                          <Text allowFontScaling={false} style={styles.LogoutText}>
                            {t('Log out')}
                          </Text>
                        </FlexIcon>
                      </ProfileUserContent>
                    </Pressable>
                  </LogoutPressable>
                  <TouchableHighlight
                    onPress={handleDelectAccount}
                    activeOpacity={0.6}
                    underlayColor='rgba(255, 54, 54, 0.1)'
                  >
                    <View>
                      <ProfileUserContent>
                        <FlexIcon>
                          <DeleteIcon width={24} height={24} />
                          <Text allowFontScaling={false} style={styles.LogoutText}>
                            {t('Delete Account')}
                          </Text>
                        </FlexIcon>
                      </ProfileUserContent>
                    </View>
                  </TouchableHighlight>
                </View>
              ) : (
                <LogoutPressable
                  onPress={() => setLogin(true)}
                  activeOpacity={0.6}
                  underlayColor='rgba(70, 45, 133, 0.1)'
                >
                  <ProfileUserContent>
                    <FlexIcon>
                      <Text
                        allowFontScaling={false}
                        style={
                          (styles.LogoutText, { color: '#462D85', fontSize: 14, marginLeft: 6 })
                        }
                      >
                        {t('Log In')}
                      </Text>
                    </FlexIcon>
                  </ProfileUserContent>
                </LogoutPressable>
              )}
            </Animated.View>
          )}
        </AccountWrapper>
      </ScrollView>
      {login && (
        <LoginModal
          onForgotClick={() => {
            setForgotmail(true), setLogin(false)
          }}
          onSignClick={() => {
            setSignUp(true), setLogin(false)
          }}
          onClose={() => setLogin(false)}
          isVisible={login}
        />
      )}

      {signUp && (
        <SignupModal
          onLoginClick={() => {
            setLogin(true), setSignUp(false)
          }}
          onClose={() => {
            setSignUp(false)
          }}
        />
      )}
      {forgotMail && (
        <ForgotMail
          onLoginClick={() => {
            setLogin(true), setForgotmail(false)
          }}
          onClose={() => setForgotmail(false)}
        />
      )}

      {logOut && <LogOut closeModal={() => setLogOut(false)} />}

      {isDelectAccount && <DelectAccount closeModal={() => setIsDelectAccount(false)} />}

      {showTooltip === 2 && (
        <EditProfileTooltip
          isVisible={editProfileToolTip}
          onClose={() => {
            setEditProfileToolTip(false)
          }}
        />
      )}

      {showTooltip === 1 && <AccountTooltip isVisible={toolTip} onClose={handleShowTooltip} />}
    </LinearGradient>
  )
}

const AccountWrapper = styled.View`
  flex: 1;
`

const UserWrapper = styled.View`
  position: relative;
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-width: 0;
`

const LogoutPressable = styled.TouchableHighlight`
  margin-bottom: 42px;
`

const NotUserContent = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`

const EditContent = styled.Pressable`
  position: absolute;
  top: 16px;
  right: 16px;
`

const ProfileUserContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 16px;
  padding-horizontal: 24px;
`

const FlexIcon = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export default Account

const styles = StyleSheet.create({
  plusIconGradientColor: {
    backgroundColor: '#462d85',
    borderRadius: 70,
    padding: 15,
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 0,
    elevation: 5,
  },
  ProfileName: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.iconsHighlightClr,
    textAlign: 'center',
    marginTop: 8,
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  UserText: {
    fontFamily: 'Gilroy-Medium',
    color: COLORS.iconsHighlightClr,
    fontSize: 14,
  },
  RightText: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: COLORS.SecondaryTwo,
  },
  LogoutText: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: '#FF3636',
  },
})
