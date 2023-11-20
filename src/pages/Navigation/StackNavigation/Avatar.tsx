import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../styles/theme'
import Avatar from '../../../components/Medium/Avatar'

const AvatarNavigation = () => {
  return (
    <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
      <Avatar />
    </LinearGradient>
  )
}

export default AvatarNavigation

const styles = StyleSheet.create({})
