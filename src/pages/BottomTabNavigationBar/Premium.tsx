import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Premium = () => {
  return (
    <View style={styles.premiumWrapper}>
      <Text style={styles.text}>Premium</Text>
    </View>
  )
}

export default Premium

const styles = StyleSheet.create({
  premiumWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
  },
})
