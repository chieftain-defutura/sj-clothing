import React, { useState } from 'react'
import styled from 'styled-components/native'
// import AuthNavigate from '../../../../screens/AuthNavigate'
// import { useIsFocused } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../../styles/theme'
import PremiumLevel from '../../../../components/PremiumLevel'

const Premium: React.FC = () => {
  // const isFocused = useIsFocused()
  const [openDetails, setOpenDetails] = useState(false)
  return (
    <LinearGradient colors={gradientOpacityColors}>
      <PremiumWrapper scrollEnabled={openDetails ? false : true}>
        {/* <AuthNavigate focus={isFocused}> */}
        <PremiumLevel openDetails={openDetails} setOpenDetails={setOpenDetails} />
        {/* </AuthNavigate> */}
      </PremiumWrapper>
    </LinearGradient>
  )
}

const PremiumWrapper = styled.ScrollView`
  height: 100%;
  /* flex:1 */
`

export default Premium
