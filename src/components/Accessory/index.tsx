import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
import styled from 'styled-components/native'
import { db } from '../../../firebase'
import AccessoryCard from './AccessoryCard'
import AccessoryDetailsCard from './AccessoryDetailCard'
import AccessoryThreeSixtyDegree from './AccessoryThreeSixtyDegree'
import { useNavigation } from '@react-navigation/native'
import { IAccessory } from '../../constant/types'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../styles/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { userStore } from '../../store/userStore'
import LoginModal from '../../screens/Modals/Login'
import SignupModal from '../../screens/Modals/Signup'
import ForgotMail from '../../screens/Modals/ForgotMail'
import Checkout from '../../pages/Navigation/StackNavigation/Checkout'

const { width } = Dimensions.get('window')

const Accessory = () => {
  const navigation = useNavigation()
  const [data, setData] = useState<IAccessory[]>()
  const [openCard, setOpenCard] = useState(false)
  const [productId, setProductId] = useState('')
  const [openDetails, setOpenDetails] = useState(false)
  const { user, updateOderId } = userStore()
  const [openCheckout, setOpenCheckout] = useState(false)

  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [forgotMail, setForgotmail] = useState(false)

  const [isSize, setSize] = useState({
    country: '',
    sizeVarient: { size: '', measurement: '', quantity: 1 },
  })

  const getData = useCallback(async () => {
    const ProductRef = await getDocs(collection(db, 'Products'))
    const fetchProduct = ProductRef.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }))
    const data = fetchProduct.filter((f) => f.type === 'ACCESSORY-PRODUCTS')
    setData(data)
  }, [db])
  useEffect(() => {
    getData()
  }, [getData])

  const handleBack = () => {
    setOpenCard(false), setOpenDetails(false), setProductId('')
  }
  const FilteredData = data?.filter((f) => f.id === productId)

  const handleSubmit = async () => {
    if (!FilteredData) return

    if (!user) {
      setLogin(true)
    }
    if (user && !user.emailVerified) {
      setSignUp(true)
    }
    // if (user && user.emailVerified && !user.phoneNumber) {
    //   setSignUp(true)
    // }
    if (user && user.emailVerified) {
      // const docRef = await addDoc(collection(db, 'Orders'), {
      //   sizes: isSize,
      //   productImage: FilteredData[0].productImage,
      //   description: FilteredData[0].description,
      //   price: FilteredData[0].normalPrice,
      //   offerPrice: FilteredData[0].offerPrice,
      //   paymentStatus: 'pending',
      //   userId: user?.uid,
      //   type: 'Premium-Level',
      //   productName: FilteredData[0].productName,
      //   orderStatus: {
      //     orderplaced: {
      //       createdAt: null,
      //       description: '',
      //       status: false,
      //     },
      //     manufacturing: {
      //       createdAt: null,
      //       description: '',
      //       status: false,
      //     },
      //     readyToShip: {
      //       createdAt: null,
      //       description: '',
      //       status: false,
      //     },
      //     shipping: {
      //       createdAt: null,
      //       description: '',
      //       status: false,
      //     },
      //     delivery: {
      //       createdAt: null,
      //       description: '',
      //       status: false,
      //     },
      //   },
      // })
      // updateOderId(docRef.id)
      setOpenDetails(false)
      navigation.navigate('Checkout')
    }
  }

  if (!data) return <Text>No Data</Text>
  return (
    <View>
      {!openCheckout && (
        <View style={{ flex: 1 }}>
          <ScrollView scrollEnabled={openDetails ? false : true}>
            <View>
              {openDetails ? (
                <View>
                  {FilteredData?.map((item, index) => (
                    <AccessoryThreeSixtyDegree
                      key={index}
                      navigation={navigation}
                      setOpenDetails={setOpenDetails}
                      data={item}
                      handleSubmit={handleSubmit}
                    />
                  ))}
                </View>
              ) : (
                <View>
                  {openCard && (
                    <View>
                      {FilteredData?.map((item, index) => (
                        <AccessoryDetailsCard
                          key={index}
                          data={item}
                          setOpenDetails={setOpenDetails}
                          handleBack={handleBack}
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
                          <AccessoryCard
                            data={item}
                            setOpenCard={setOpenCard}
                            setProductId={setProductId}
                          />
                        </View>
                      ))}
                  </View>
                </View>
              )}
            </View>
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
          type='Accessory-Level'
          setOpenCheckout={setOpenCheckout}
          id={FilteredData[0].id}
          description={FilteredData[0].description}
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

export default Accessory

const styles = StyleSheet.create({})
const CardPairContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
