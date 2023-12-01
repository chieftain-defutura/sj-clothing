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
import { collection, getDocs } from 'firebase/firestore/lite'
import { useTranslation } from 'react-i18next'
import { IOrder } from '../../../../constant/types'
import LoginModal from '../../../../screens/Modals/Login'
import SignupModal from '../../../../screens/Modals/Signup'
import ForgotMail from '../../../../screens/Modals/ForgotMail'
import Tooltip from '../../../../screens/Modals/TooltipModel'
import LogOut from '../../../../screens/Modals/LogOut'
import DelectAccount from '../../../../screens/Modals/DelectAccount'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DeleteIcon from '../../../../assets/icons/AccountPageIcon/DeleteIcon'

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
  const phoneNumber = userStore((state) => state.phoneNo)
  const [toolTip, showToolTip] = useState(false)
  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [forgotMail, setForgotmail] = useState(false)
  // const isFocused = useIsFocused()
  const [logOut, setLogOut] = useState(false)
  const [isDelectAccount, setIsDelectAccount] = useState(false)
  // const {
  //   updateUser,
  //   updateProfile,
  //   profile,
  //   updateAvatar,
  //   updateAddress,
  //   updatePhoneNo,
  //   updateName,
  // } = userStore()

  const isShowToolTip = async () => {
    const data = await AsyncStorage.getItem('showToolTip')

    console.log(data)
    if (!data) {
      AsyncStorage.setItem('showToolTip', '0')
      showToolTip(true)
    }
    // await AsyncStorage.removeItem('mail')
  }
  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  const updateUser = userStore((state) => state.updateUser)
  const profile = userStore((state) => state.profile)

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
    // if (user && user.emailVerified && !user.phoneNumber) {
    //   setSignUp(true)
    // }
    // if (user && user.emailVerified && user.phoneNumber) {
    //   navigation.navigate('EditProfile')
    // }
  }

  // const fetchDataFromFirestore = useCallback(async () => {
  //   try {
  //     if (!user) return
  //     const q = doc(db, 'users', user.uid)
  //     const querySnapshot = await getDoc(q)

  //     const fetchData = querySnapshot.data()
  //     updateProfile(fetchData?.profile)
  //     updateName(fetchData?.name)
  //     updateAddress(fetchData?.address)
  //     updateAvatar(fetchData?.avatar)
  //     updatePhoneNo(fetchData?.phoneNo)
  //   } catch (error) {
  //     console.error('Error fetching data from Firestore:', error)
  //   }
  // }, [user, profile])

  // useEffect(() => {
  //   fetchDataFromFirestore()
  //   if (route.params) {
  //     if (route.params.profileImg) {
  //       setImage(profile)
  //     } else {
  //       setImage(profile)
  //     }
  //   } else {
  //     setImage(profile)
  //   }
  // }, [fetchDataFromFirestore])

  const handleCustomerCarePress = () => {
    const phoneNumber = '7358947141'
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const openSubscriptionModal = () => {
    setSubscriptionModal(true)
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
      {/* <AuthNavigate focus={focus} onClose={onClose}> */}
      <ScrollView>
        <AccountWrapper>
          <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
            <UserWrapper style={{ width: width, height: height / 2.5 }}>
              <NotUserContent>
                {route.params?.profileImg ? (
                  <Image
                    source={{ uri: route.params.profileImg }}
                    style={{
                      width: width,
                      height: height / 2.5,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                    }}
                  />
                ) : user && profile ? (
                  <Image
                    source={{ uri: profile as string }}
                    style={{
                      width: width,
                      height: height / 2.5,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                    }}
                  />
                ) : (
                  <NotUserIcon width={128} height={128} />
                )}
              </NotUserContent>
              <EditContent
                onPress={() => handleLogin()}
                // onPress={() => navigation.navigate('EditProfile')}
              >
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

            {route.params?.dName ? (
              <Text allowFontScaling={false} style={styles.ProfileName}>
                {route.params.dName}
              </Text>
            ) : (
              <Text allowFontScaling={false} style={styles.ProfileName}>
                {user?.displayName}
              </Text>
            )}

            {/* <View style={{ padding: 16 }}>
                <CustomButton
                  text={t('Subscribe now')}
                  fontFamily='Arvo-Regular'
                  fontSize={16}
                  onPress={openSubscriptionModal}
                />
              </View> */}

            <SubscriptionModal
              isVisible={isSubscriptionModal}
              onClose={closeSubscriptionModal}
              navigation={navigation}
            />

            {/* <FlexContent>
              {Data.map((viewItem, viewIndex) => (
                <View key={viewIndex}>
                  <PostText>{viewItem.postName}</PostText>
                  <ViewText>
                    {viewItem.postView}
                    {viewItem.view}
                    {viewItem.inr}
                  </ViewText>
                </View>
              ))}
            </FlexContent> */}
          </Animated.View>

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
                <LogoutPressable>
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
                  <Pressable onPress={handleDelectAccount}>
                    <ProfileUserContent>
                      <FlexIcon>
                        <DeleteIcon width={24} height={24} />
                        <Text allowFontScaling={false} style={styles.LogoutText}>
                          Delect Account
                        </Text>
                      </FlexIcon>
                    </ProfileUserContent>
                  </Pressable>
                </LogoutPressable>
              </View>
            ) : (
              <LogoutPressable onPress={() => setLogin(true)}>
                <ProfileUserContent>
                  <FlexIcon>
                    <Text
                      allowFontScaling={false}
                      style={(styles.LogoutText, { color: '#462D85' })}
                    >
                      {t('Log In')}
                    </Text>
                  </FlexIcon>
                </ProfileUserContent>
              </LogoutPressable>
            )}
          </Animated.View>
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
        />
      )}

      {signUp && (
        <SignupModal
          onLoginClick={() => {
            setLogin(true), setSignUp(false)
          }}
          onClose={() => {
            setSignUp(false)
            // showToolTip(true)
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

      <Tooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
      {/* </AuthNavigate> */}
    </LinearGradient>
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

const UserWrapper = styled.View`
  position: relative;
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`

const LogoutPressable = styled.Pressable`
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

const AccountText = styled.Text`
  font-size: 28px;
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
