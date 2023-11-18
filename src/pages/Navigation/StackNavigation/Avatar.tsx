import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../styles/theme'
import Avatar from '../../../components/Medium/Avatar'

const AvatarNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <Avatar />
    </View>
  )
}

export default AvatarNavigation

const styles = StyleSheet.create({})
