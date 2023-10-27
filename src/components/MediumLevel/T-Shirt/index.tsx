import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import { WebView } from 'react-native-webview'

const { height, width } = Dimensions.get('window')

interface ITShirtProps {
  uid: string
  steps: number
}

const TShirt: React.FC<ITShirtProps> = ({ uid, steps }) => {
  return (
    <View>
      <View
        style={{
          width: width / 1,
          height: steps === 1 ? height / 2 : height / 2.5,
          paddingBottom: 1,
        }}
      >
        <WebView
          source={{
            uri: `http://localhost:5173/midlevel/?uid=${uid}`,
            // uri: `https://sj-threejs-development.netlify.app/create-avatar/?uid=${uid}`,
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
