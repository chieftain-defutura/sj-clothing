import { StyleSheet, View, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import React from 'react'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import { WebView } from 'react-native-webview'

const { height, width } = Dimensions.get('window')
const TShirt: React.FC = () => {
  return (
    <View>
      <View
        style={{
          width: width / 1,
          height: height / 2.5,
          paddingBottom: 1,
        }}
      >
        <WebView
          source={{
            uri: 'https://sj-threejs-development.netlify.app/',
          }}
        />
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
