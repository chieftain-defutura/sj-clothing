import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
import styled from 'styled-components/native'
import { db } from '../../../firebase'
import PremiumCard from './PremiumCard'
import PremiumDetailsCard from './PremiumDetailsCard'
import PremiumThreeSixtyDegree from './PremiumThreeSixtyDegree'
import { useNavigation } from '@react-navigation/native'
import { IPremiumData } from '../../constant/types'

const PremiumLevel = () => {
  const navigation = useNavigation()
  const [data, setData] = useState<IPremiumData[]>()
  const [openCard, setOpenCard] = useState(false)
  const [productId, setProductId] = useState('')
  const [openDetails, setOpenDetails] = useState(false)
  const [isSize, setSize] = useState({
    country: '',
    sizeVarient: { size: '', measurement: '' },
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

  if (!data) return <Text>No Data</Text>
  return (
    <View>
      {openDetails ? (
        <View>
          {FilteredData?.map((item, index) => (
            <PremiumThreeSixtyDegree
              key={index}
              navigation={navigation}
              setOpenDetails={setOpenDetails}
              data={item}
              size={isSize}
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
                />
              ))}
            </View>
          )}
          <FlatList
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
          />
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
