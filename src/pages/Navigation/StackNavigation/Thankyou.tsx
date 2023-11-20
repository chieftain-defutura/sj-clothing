import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const Thankyou = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{
          backgroundColor: 'transparent',
        }}
        source={{
          // uri: `http://localhost:5173/create-avatar/?uid=${uid}`,
          uri: `https://sj-threejs-development.netlify.app/thankyou`,
        }}
      />
    </View>
  )
}

export default Thankyou

const styles = StyleSheet.create({})
