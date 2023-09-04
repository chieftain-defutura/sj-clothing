import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MidLevel = () => {
  return (
    <View style={styles.midLevelWrapper}>
      <Text style={styles.text}>MidLevel</Text>
    </View>
  )
}

export default MidLevel

const styles = StyleSheet.create({
  midLevelWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
  },
})
