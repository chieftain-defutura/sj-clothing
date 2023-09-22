import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import AuthNavigate from '../../../../screens/AuthNavigate'
import { useIsFocused } from '@react-navigation/native'
import MediumLevel from '../../../../components/MediumLevel'

const MidLevel: React.FC = () => {
  const isFocused = useIsFocused()
  return (
    <MidLevelWrapper>
      {/* <AuthNavigate focus={isFocused}>
      </AuthNavigate> */}
      <MediumLevel />
    </MidLevelWrapper>
  )
}

const MidLevelWrapper = styled.View`
  flex: 1;
`

export default MidLevel
