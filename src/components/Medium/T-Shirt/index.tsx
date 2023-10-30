import React from 'react'
import { WebView } from 'react-native-webview'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const { height, width } = Dimensions.get('window')

interface ITShirtProps {
  uid: string
  steps: number
}

const TShirt: React.FC<ITShirtProps> = ({ uid, steps }) => {
  return (
    <View
      style={{
        width: width / 1,
        height: steps === 4 ? height / 2 : height / 1.3,
        // flex: 1,
        zIndex: 1,
      }}
    >
      <WebView
        source={{
          // uri: `http://localhost:5173/midlevel/?uid=${uid}`,
          uri: `https://sj-threejs-development.netlify.app/midlevel/?uid=${uid}`,
        }}
      />
    </View>
  )
}

export default TShirt

const styles = StyleSheet.create({})
