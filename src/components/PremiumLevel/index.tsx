import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
import styled from 'styled-components/native'
import { db } from '../../../firebase'
import PremiumCard from './PremiumCard'
import PremiumDetailsCard from './PremiumDetailsCard'
import PremiumThreeSixtyDegree from './PremiumThreeSixtyDegree'
import { useNavigation } from '@react-navigation/native'
import { IPremiumData } from '../../constant/types'
import axios from 'axios'
import Checkout from '../../pages/Navigation/StackNavigation/Checkout'
import { userStore } from '../../store/userStore'

const { width, height } = Dimensions.get('window')

interface IPremiumLevel {
  openDetails: boolean
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
}

const PremiumLevel: React.FC<IPremiumLevel> = ({ openDetails, setOpenDetails }) => {
  const navigation = useNavigation()
  const { user, updateOderId } = userStore()
  const [data, setData] = useState<IPremiumData[]>()
  const [openCard, setOpenCard] = useState(false)
  const [productId, setProductId] = useState('')
  const [focus, setFocus] = useState(false)

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
    const data = fetchProduct.filter((f) => f.type === 'PREMIUM-PRODUCTS')
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
      setFocus(true)
    } else {
      // navigation.navigate('Checkout', { product: data })
      setFocus(true)
      const docRef = await addDoc(collection(db, 'Orders'), {
        sizes: isSize,
        productImage: FilteredData[0].productImage,
        description: FilteredData[0].description,
        price: FilteredData[0].normalPrice,
        offerPrice: FilteredData[0].offerPrice,
        status: 'pending',
        userId: user?.uid,
        gender: FilteredData[0].gender,
        type: 'Premium-Level',
        productName: FilteredData[0].productName,
        orderStatus: {
          orderplaced: {
            createdAt: null,
            description: '',
            status: false,
          },
          manufacturing: {
            createdAt: null,
            description: '',
            status: false,
          },
          readyToShip: {
            createdAt: null,
            description: '',
            status: false,
          },
          shipping: {
            createdAt: null,
            description: '',
            status: false,
          },
          delivery: {
            createdAt: null,
            description: '',
            status: false,
          },
        },
      })
      updateOderId(docRef.id)
      setOpenDetails(false)
      navigation.navigate('Checkout')
    }
  }
  if (!data) return <Text>No Data</Text>
  return (
    <View style={{ flex: 1 }}>
      {openDetails ? (
        <View style={{ flex: 1 }}>
          {FilteredData?.map((item, index) => (
            <PremiumThreeSixtyDegree
              key={index}
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
          </View>
          {/* <FlatList
            data={data.filter((f) => f.id !== productId)}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View key={index} style={{ flex: 1 }}>
                <CardPairContainer>
                  <PremiumCard
                    data={item}
                    setSize={setSize}
                    setOpenCard={setOpenCard}
                    setProductId={setProductId}
                  />
                </CardPairContainer>
              </View>
            )}
          /> */}
        </View>
      )}
    </View>
  )
}

export default PremiumLevel

const styles = StyleSheet.create({})
const CardPairContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
