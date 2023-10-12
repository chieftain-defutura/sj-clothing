import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import PremiumCard from '../../../../components/PremiumComponent/PremiumCard'
import { PremiumData } from '../../../../utils/data/premiumData'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../../styles/theme'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../../../../../firebase'
import { FlatList, Text, View } from 'react-native'
import PremiumDetailsCard from '../../StackNavigation/Premium/PremiumDetailsCard'

const Premium: React.FC = () => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const [data, setData] = useState<any[]>()
  const [openCard, setOpenCard] = useState(false)
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

  if (!data) return <Text>No Data</Text>
  return (
    <LinearGradient colors={gradientOpacityColors}>
      <PremiumWrapper>
        <AuthNavigate focus={isFocused}>
          <FlatList
            data={data}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View key={index} style={{ flex: 1 }}>
                {/* {openCard && <PremiumDetailsCard />} */}
                <CardPairContainer>
                  <PremiumCard data={item} />
                </CardPairContainer>
              </View>
            )}
          />
        </AuthNavigate>
      </PremiumWrapper>
    </LinearGradient>
  )
}

const PremiumWrapper = styled.ScrollView`
  height: 100%;
  /* flex:1 */
`

const CardPairContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export default Premium
