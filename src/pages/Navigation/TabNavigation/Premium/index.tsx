import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PremiumLevel from '../../../../components/PremiumLevel'
import { gradientOpacityColors } from '../../../../styles/theme'
import PremiumTooltip from '../../../../components/Tooltips/PremiumTooltip'

const Premium: React.FC = () => {
  const [openDetails, setOpenDetails] = useState(false)
  const [toolTip, showToolTip] = useState(false)

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showPremiumTooltip')

      if (data !== '1') {
        AsyncStorage.setItem('showPremiumTooltip', '1')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
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
      />
    </LinearGradient>
  )
}

const PremiumWrapper = styled.ScrollView`
  height: 100%;
`

export default Premium
