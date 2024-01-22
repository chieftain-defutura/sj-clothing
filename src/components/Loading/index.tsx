import { ActivityIndicator, Text, View } from 'react-native'
import styled from 'styled-components/native'
import React from 'react'
import { COLORS, FONT_FAMILY } from '../../styles/theme'

const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <View>
        <ActivityIndicator size={50} color={'#8C73CB'} />
        <LoadingText allowFontScaling={false} style={{ textAlign: 'center' }}>
          Loading...
        </LoadingText>
      </View>
    </LoaderWrapper>
  )
}

const LoaderWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
`

const LoadingText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.SecondaryTwo};
  margin-top: 8px;
`

export default Loader
