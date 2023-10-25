import { StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'
import React from 'react'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'

const TShirt: React.FC = () => {
  return (
    <View>
      <View style={[styles.selectSizeTShirt]}>
        <ShirtImg source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.selectSize360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>
    </View>
  )
}

const ShirtImg = styled.Image`
  width: 65%;
  height: 350px;
`

export default TShirt

const styles = StyleSheet.create({
  selectSizeTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectSize360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
