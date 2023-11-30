import { View, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
import styled from 'styled-components/native'
import { db } from '../../../firebase'
import PremiumCard from './PremiumCard'
import PremiumDetailsCard from './PremiumDetailsCard'
import PremiumThreeSixtyDegree from './PremiumThreeSixtyDegree'
import { useNavigation } from '@react-navigation/native'
import { IPremiumData } from '../../constant/types'
import Checkout from '../../pages/Navigation/StackNavigation/Checkout'
import { userStore } from '../../store/userStore'
import { BlurView } from 'expo-blur'
import LoginModal from '../../screens/Modals/Login'
import SignupModal from '../../screens/Modals/Signup'
import ForgotMail from '../../screens/Modals/ForgotMail'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated'
import Loader from '../Loading'

const { width, height } = Dimensions.get('window')

interface IPremiumLevel {
  openDetails: boolean
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
}

const PremiumLevel: React.FC<IPremiumLevel> = ({ openDetails, setOpenDetails }) => {
  const navigation = useNavigation()
  const user = userStore((state) => state.user)
  const [data, setData] = useState<IPremiumData[]>()
  const [openCard, setOpenCard] = useState(false)
  const [productId, setProductId] = useState('')
  const [focus, setFocus] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [openCheckout, setOpenCheckout] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [forgotMail, setForgotmail] = useState(false)

  const [isSize, setSize] = useState({
    country: '',
    sizeVarient: { size: '', measurement: '', quantity: 1 },
  })

  const getData = useCallback(async () => {
    try {
      setLoading(true)
      const ProductRef = await getDocs(collection(db, 'Products'))
      const fetchProduct = ProductRef.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }))
      const data = fetchProduct.filter((f) => f.type === 'PREMIUM-PRODUCTS')
      setData(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [db])

  useEffect(() => {
    getData()
  }, [getData])

  const handleBack = () => {
    setOpenCard(false), setOpenDetails(false), setProductId('')
  }

  const FilteredData = data?.filter((f) => f.id === productId)
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('') // Set the state to null after 5 seconds
    }, 2000)
  }, [errorMessage])
  const handleSubmit = async () => {
    if (!FilteredData) return
    // if (!user) {
    //   setFocus(true)
    // }
    if (!user) {
      setLogin(true)
    }
    if (user && !user.emailVerified) {
      setSignUp(true)
    }

    if (user && user.emailVerified) {
      if (!isSize.sizeVarient.size) {
        setErrorMessage('Select size to procced further')
      } else {
        setFocus(true)
        setErrorMessage('')

        setOpenCheckout(true)
        setOpenDetails(false)
      }
    }
  }
  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height }}>
        <Loader />
      </View>
    )
  if (!data)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height }}>
        <ProductText allowFontScaling={false}>No Data</ProductText>
      </View>
    )
  return (
    <View style={{ flex: 1 }}>
      {!openCheckout && (
        <View style={{ flex: 1 }}>
          {openDetails ? (
            <View style={{ flex: 1 }}>
              {FilteredData?.map((item, index) => (
                <PremiumThreeSixtyDegree
                  key={index}
                  errorMessage={errorMessage}
                  setOpenDetails={setOpenDetails}
                  data={item}
                  focus={focus}
                  handleSubmit={handleSubmit}
                  setFocus={setFocus}
                />
              ))}
            </View>
          ) : (
            <View>
              {openCard && (
                <View>
                  {FilteredData?.map((item, index) => (
                    <PremiumDetailsCard
                      key={index}
                      data={item}
                      setOpenDetails={setOpenDetails}
                      setSize={setSize}
                      handleBack={handleBack}
                      isSize={isSize}
                      handleSubmit={handleSubmit}
                    />
                  ))}
                </View>
              )}
              <View
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  width: width / 1.6,
                  columnGap: 150,
                }}
              >
                {data
                  .filter((f) => f.id !== productId)
                  .map((item, index) => (
                    <View key={index} style={{ flex: 1 }}>
                      <PremiumCard
                        data={item}
                        setSize={setSize}
                        setOpenCard={setOpenCard}
                        setProductId={setProductId}
                      />
                    </View>
                  ))}
                <View style={{ flex: 1 }}>
                  <Animated.View
                    entering={FadeInLeft.duration(800).delay(200)}
                    exiting={FadeOutLeft}
                  >
                    <BlurView
                      intensity={90}
                      style={{
                        width: width / 2.6,
                        height: height / 4,
                        marginLeft: 22,
                        marginBottom: 16,
                        marginTop: 18,
                      }}
                    >
                      <View
                        style={{
                          width: width / 2.6,
                          height: height / 4,
                          borderRadius: 35,
                          position: 'relative',
                        }}
                      >
                        <View
                          style={{
                            width: width / 2.6,
                            marginBottom: 8,
                            position: 'absolute',
                            top: 85,
                            right: 20,
                          }}
                        >
                          <ProductText allowFontScaling={false}>Coming soon</ProductText>
                        </View>
                      </View>
                    </BlurView>
                  </Animated.View>
                </View>
              </View>
            </View>
          )}
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
              onClose={() => setSignUp(false)}
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
        </View>
      )}
      {openCheckout && FilteredData && (
        <Checkout
          type='Premium-Level'
          setOpenCheckout={setOpenCheckout}
          id={FilteredData[0].id}
          description={FilteredData[0].description}
          gender={FilteredData[0].gender}
          navigation={navigation}
          offerPrice={FilteredData[0].offerPrice}
          price={FilteredData[0].normalPrice}
          productImage={FilteredData[0].productImage}
          productName={FilteredData[0].productName}
          size={isSize}
        />
      )}
    </View>
  )
}

const ProductText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  text-align: center;
  margin-left: 39px;
`

export default PremiumLevel
