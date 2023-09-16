import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps'
import CustomRadioButton from '../../../components/CustomRadioButton'
import SearchIcon from '../../../assets/icons/Search'
import CustomButton from '../../../components/Button'
import TickIcon from '../../../assets/icons/TickIcon'
import styled from 'styled-components/native'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const AddressBook = () => {
  const height = useSharedValue('0%')
  const displayAddressSelection = useSharedValue('none')
  const [onText, setOnSearchChange] = React.useState<string>()

  const handleSearchText = (text: string) => {
    setOnSearchChange(text)
  }
  const handlePress = () => {
    height.value = withTiming('50%')
    displayAddressSelection.value = 'flex'
  }

  const editAnimationStyle = useAnimatedStyle(() => ({
    height: height.value,
    display: displayAddressSelection.value,
  }))

  // useEffect(() => {}, [])

  const handleClose = () => {
    height.value = withTiming('0%', { duration: 300 })
    setTimeout(() => (displayAddressSelection.value = 'none'), 300)
  }

  const [selectedId, setSelectedId] = useState<string | undefined>()
  return (
    <View style={[styles.container]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 12.9288755,
          longitude: 80.131692,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>
      <View style={{ height: 100, justifyContent: 'center' }}>
        <CustomButton
          variant='primary'
          text='use location'
          style={{ backgroundColor: 'white', width: '80%', alignSelf: 'center' }}
        />
        <CustomButton
          onPress={handlePress}
          variant='primary'
          text='select address'
          style={{ width: '90%', alignSelf: 'center' }}
        />
      </View>

      <Animated.View style={[styles.parent, editAnimationStyle]}>
        <View style={styles.cancelContainer}>
          <Pressable onPress={handleClose}>
            <Text style={styles.cancel}>X</Text>
          </Pressable>
        </View>
        <View style={styles.searchInputBox}>
          <SearchIcon />
          <TextInput
            placeholder='Search for area, street name'
            onChangeText={(text) => handleSearchText(text)}
            value={onText}
            style={styles.inputBox}
          />
        </View>
        <View>
          <View>
            <CustomRadioButton />
          </View>
          <FlexContent style={{ width: '100%' }}>
            <Pressable>
              <AddAddressBtn>Add new Address</AddAddressBtn>
            </Pressable>
            <CustomButton
              variant='primary'
              text='Deliver here'
              leftIcon={<TickIcon width={16} height={16} />}
            />
          </FlexContent>
        </View>
      </Animated.View>
    </View>
  )
}

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const AddAddressBtn = styled.Text`
  border-color: #db00ff;
  border-width: 1px;
  padding-horizontal: 14px;
  padding-vertical: 12px;
  font-size: 12px;
  font-family: Arvo-Regular;
  border-radius: 32px;
  width: 100%;
  color: #db00ff;
`

export default AddressBook

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },

  parent: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    zIndex: 10,
  },
  inputBox: {
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    marginVertical: 8,
  },
  cancelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  cancel: {
    fontSize: 20,
    paddingRight: 10,
  },
  searchInputBox: {
    borderColor: '#efcef5',
    borderWidth: 1,
    borderRadius: 36,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginVertical: 8,
    gap: 16,
  },
  map: {
    flex: 1,
  },
})
