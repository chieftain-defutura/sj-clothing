import React from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import PremiumCard from '../../../../components/PremiumComponent/PremiumCard'
import { PremiumData } from '../../../../utils/data/premiumData'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../../styles/theme'

const Premium: React.FC = () => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  const getCardPairs = (data: any[]) => {
    const pairs = []
    for (let i = 0; i < data.length; i += 2) {
      pairs.push(data.slice(i, i + 2))
    }
    return pairs
  }

  const cardPairs = getCardPairs(PremiumData)

  return (
    <LinearGradient colors={gradientOpacityColors}>
      <PremiumWrapper>
        <AuthNavigate focus={isFocused}>
          {cardPairs.map((pair, index) => (
            <CardPairContainer key={index}>
              {pair.map((item) => (
                <PremiumCard
                  key={item.id}
                  image={item.image}
                  productName={item.productName}
                  price={item.price}
                  inr={item.inr}
                  navigation={navigation}
                />
              ))}
            </CardPairContainer>
          ))}
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
