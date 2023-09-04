import * as React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Logo from '../assets/icons/Logo'
import ShoppingCart from '../assets/icons/ShoppingCart'

const Header = () => {
  return (
    <View style={styles.headerWrapper}>
      <Pressable>
        <Logo />
      </Pressable>
      <Pressable>
        <ShoppingCart height={24} width={24} />
      </Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 26,
  },
})
