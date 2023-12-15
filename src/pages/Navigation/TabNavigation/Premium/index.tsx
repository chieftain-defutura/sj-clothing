import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PremiumLevel from '../../../../components/PremiumLevel'
import { gradientOpacityColors } from '../../../../styles/theme'
import PremiumTooltip from '../../../../components/Tooltips/PremiumTooltip'
import { useNavigation } from '@react-navigation/native'

const Premium: React.FC = () => {
  const [openDetails, setOpenDetails] = useState(false)
  const [toolTip, showToolTip] = useState(false)
  const navigation = useNavigation()

  const isShowToolTip = async () => {
    const data = await AsyncStorage.getItem('showPremiumTooltip')

    if (data !== '1') {
      AsyncStorage.setItem('showPremiumTooltip', '1')
      showToolTip(true)
    }
    // await AsyncStorage.removeItem('mail')
  }

  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  return (
    <LinearGradient colors={gradientOpacityColors}>
      <PremiumWrapper scrollEnabled={openDetails ? false : true}>
        <PremiumLevel openDetails={openDetails} setOpenDetails={setOpenDetails} />
      </PremiumWrapper>
      <PremiumTooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
        navigation={navigation}
      />
    </LinearGradient>
  )
}

const PremiumWrapper = styled.ScrollView`
  height: 100%;
`

export default Premium
