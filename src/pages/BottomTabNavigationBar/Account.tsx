import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Account = () => {
  return (
    <View style={styles.accountWrapper}>
      <Text style={styles.text}>Account</Text>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  accountWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
  },
})
