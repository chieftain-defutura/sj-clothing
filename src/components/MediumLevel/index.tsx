import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Avatar from './Avatar'

const MediumLevel = () => {
  return (
    <View style={styles.midiumlevelContainer}>
      <Avatar />
    </View>
  )
}

export default MediumLevel

const styles = StyleSheet.create({
  midiumlevelContainer: {
    flex: 1,
  },
})
