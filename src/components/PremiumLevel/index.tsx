import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
import styled from 'styled-components/native'
import { db } from '../../../firebase'
import PremiumCard from './PremiumCard'
import PremiumDetailsCard, { IPremiumData } from './PremiumDetailsCard'
import PremiumThreeSixtyDegree from './PremiumThreeSixtyDegree'
import { useNavigation } from '@react-navigation/native'

const PremiumLevel = () => {
  const navigation = useNavigation()
  const [data, setData] = useState<any[]>()
  const [openCard, setOpenCard] = useState(false)
  const [productId, setProductId] = useState(0)
  const [openDetails, setOpenDetails] = useState(false)
  const [isSize, setSize] = useState({
    country: 'India',
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

  const FilteredData = data?.filter((f) => f.id === productId)

  if (!data && !FilteredData) return <Text>No Data</Text>
  return (
    <View>
      {openDetails ? (
        <PremiumThreeSixtyDegree
          navigation={navigation}
          setOpenDetails={setOpenDetails}
          data={FilteredData}
          size={isSize}
        />
      ) : (
        <View>
          {openCard && (
            <View>
              <PremiumDetailsCard
                data={FilteredData}
                setOpenCard={setOpenCard}
                setOpenDetails={setOpenDetails}
                setSize={setSize}
              />
            </View>
          )}
          <FlatList
            data={data}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View key={index} style={{ flex: 1 }}>
                <CardPairContainer>
                  <PremiumCard data={item} setOpenCard={setOpenCard} setProductId={setProductId} />
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
