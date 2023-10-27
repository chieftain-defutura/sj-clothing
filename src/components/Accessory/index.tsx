import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
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

const { width } = Dimensions.get('window')

const Accessory = () => {
  const navigation = useNavigation()
  const [data, setData] = useState<IAccessory[]>()
  const [openCard, setOpenCard] = useState(false)
  const [productId, setProductId] = useState('')
  const [openDetails, setOpenDetails] = useState(false)

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

  if (!data) return <Text>No Data</Text>
  return (
    <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
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
    </LinearGradient>
  )
}

export default Accessory

const styles = StyleSheet.create({})
const CardPairContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
