import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import CustomButton from '../../../components/Button'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../styles/theme'
import { useNavigation } from '@react-navigation/native'

const Thankyou = () => {
  const navigation = useNavigation()
  return (
    <LinearGradient style={{ flex: 1 }} colors={gradientOpacityColors}>
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
        <CustomButton
          variant='primary'
          text='View Orders'
          fontFamily='Arvo-Regular'
          onPress={() => navigation.navigate('MyOrders')}
          fontSize={16}
          style={{
            padding: 16,
          }}
        />
      </View>
    </LinearGradient>
  )
}

export default Thankyou

const styles = StyleSheet.create({})
