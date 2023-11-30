import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import React from 'react'

const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <ActivityIndicator size={50} color={'#8C73CB'} />
    </LoaderWrapper>
  )
}

const LoaderWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
`

export default Loader
