import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LeftArrow from '../../../assets/icons/LeftArrow'
import CloseIcon from '../../../assets/icons/Close'

const SelectDesign = () => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text>Select Design</Text>
        <CloseIcon />
      </View>
      <Text>MOST SEARCHES</Text>
    </View>
  )
}

export default SelectDesign

const styles = StyleSheet.create({})
