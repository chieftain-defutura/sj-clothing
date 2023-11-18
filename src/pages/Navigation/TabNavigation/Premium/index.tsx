import React, { useState } from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'

import PremiumLevel from '../../../../components/PremiumLevel'
import { gradientOpacityColors } from '../../../../styles/theme'

const Premium: React.FC = () => {
  const [openDetails, setOpenDetails] = useState(false)
  return (
    <LinearGradient colors={gradientOpacityColors}>
      <PremiumWrapper scrollEnabled={openDetails ? false : true}>
        <PremiumLevel openDetails={openDetails} setOpenDetails={setOpenDetails} />
      </PremiumWrapper>
    </LinearGradient>
  )
}

const PremiumWrapper = styled.ScrollView`
  height: 100%;
`

export default Premium
