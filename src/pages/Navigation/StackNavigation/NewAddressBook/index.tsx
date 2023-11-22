import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import CustomButton from '../../../../components/Button'
import styled from 'styled-components/native'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { COLORS, gradientOpacityColors } from '../../../../styles/theme'
import CurrentLocationIcon from '../../../../assets/icons/CurrentLocationIcon'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import CloseIcon from '../../../../assets/icons/Close'
import AddAddress from '../../../../components/AddressBook/AddAddress'
import ChooseLocation from '../../../../components/AddressBook/ChooseLocation'
import EditAddress from '../../../../components/AddressBook/EditAddress'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import * as Location from 'expo-location'
import { LinearGradient } from 'expo-linear-gradient'

interface IAddressBook {
  navigation: any
  setDisplay: React.Dispatch<React.SetStateAction<number>>
  onText: string | null
  setOnSearchChange: React.Dispatch<React.SetStateAction<string | null>>
}
interface Suggestion {
  display_name: string
  place_id: number
}
const { height, width } = Dimensions.get('window')
const AddAddressBook: React.FC<IAddressBook> = ({
  navigation,
  setDisplay,
  onText,
  setOnSearchChange,
}) => {
  const { t } = useTranslation('account')
  const height = useSharedValue('0%')
  const displayAddressSelection = useSharedValue('none')
  // const [showDisplay, setDisplay] = useState(1)
  const [location, setLocation] = useState<any>()
  const [locText, setLocText] = useState<any>()
  const mapRef = React.useRef<MapView>(null)
  const [addedAddress, setAddedAddress] = useState<any>()
  const [editAddress, setEditAddress] = useState<any>()
  // const [onText, setOnSearchChange] = React.useState<string>()
  const [suggestions, setSuggestions] = React.useState<Suggestion[] | null>([])

  const getLocationFromAddress = async (address: string) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`,
      )

      if (response.data.length > 0) {
        const location = response.data[0]
        return {
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
        }
        // return location
      } else {
        throw new Error('Location not found')
      }
    } catch (error) {
      console.error('Error fetching location:', error)
      throw error
    }
  }

  async function reverseGeocode(latitude: number, longitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`

    try {
      const response = await axios.get(url)
      const data = response.data
      if (data.display_name) {
        return data.display_name
      } else {
        return 'Address not found'
      }
    } catch (error) {
      console.error('Error:', error)
      return 'Failed to retrieve address'
    }
  }

  const getPermissions = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        console.log('Please grant location permissions')
        return
      }

      let currentLocation = await Location.getCurrentPositionAsync({})
      const loc = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      }

      // reverseGeocode(loc.latitude, loc.longitude)
      const address = await reverseGeocode(loc.latitude, loc.longitude)
      console.log('Current Location Address:', address)
      setLocation(loc)
      moveMapToMarker(loc)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // useEffect(() => {
  //   getPermissions()
  // }, [])

  const handlePress = () => {
    height.value = withTiming('100%')
    displayAddressSelection.value = 'flex'
  }

  const editAnimationStyle = useAnimatedStyle(() => ({
    height: height.value as any,
    display: displayAddressSelection.value as any,
  }))

  const changeHeight = (value: string) => {
    height.value = withTiming(value)
  }

  const handleClose = () => {
    setDisplay(1)
    height.value = withTiming('0%', { duration: 300 })
    setTimeout(() => (displayAddressSelection.value = 'none'), 300)
  }
  const moveMapToMarker = (marker: any) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    }
  }
  // const handleMarking = (data: any) => {
  //   getLocationFromAddress(data)
  //     .then((location) => {
  //       console.log('Location:', location)
  //       setLocation(location)
  //       moveMapToMarker(location)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error)
  //     })
  // }

  // const handleSearchText = async (text: string) => {
  //   try {
  //     if (text === '') {
  //       setSuggestions([])
  //       setOnSearchChange(text)
  //     } else {
  //       setOnSearchChange(text)

  //       const response = await axios.get(
  //         `https://nominatim.openstreetmap.org/search?format=json&q=${text}`,
  //       )

  //       setSuggestions(response.data)
  //     }
  //   } catch (error) {
  //     console.error('Error handling search text:', error)
  //   }
  // }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={[styles.container]} contentContainerStyle={{ height: 1000 }}>
        {/* <GoBackArrowContent
          onPress={() => {
            navigation.goBack()
          }}
        >
          <LeftArrow width={24} height={24} />
          <CartText>{'Addressbook'}</CartText>
        </GoBackArrowContent> */}

        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 12.9288755,
            longitude: 80.131692,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title='Your Location'
              description='This is the marked location'
            />
          )}
        </MapView>

        <CurrentLocationWrapper onPress={() => getPermissions()}>
          <FlexRow
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 8,
            }}
          >
            <CurrentLocationIcon width={16} height={16} />
            <UseCurrentLocationText>Use current location</UseCurrentLocationText>
          </FlexRow>
        </CurrentLocationWrapper>

        <SelectAddressBtn>
          <CustomButton
            onPress={handlePress}
            variant='primary'
            text='Enter Complete Address'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: width / 1.1 }}
          />
        </SelectAddressBtn>
        <Animated.View style={[styles.parent, editAnimationStyle]}>
          <View style={styles.cancelContainer}>
            <Pressable onPress={handleClose}>
              <CloseIcon width={24} height={24} />
            </Pressable>
          </View>
          <AddAddress
            onText={onText}
            setDisplay={setDisplay}
            onSavePress={() => {
              changeHeight('60%')
            }}
            location={locText}
            saveAddress={(addr) => {
              console.log(addr)
              setAddedAddress(addr)
            }}
            setOnSearchChange={setOnSearchChange}
          />
          {/* {showDisplay == 1 && (
            <ChooseLocation
              onAddPress={(e, address) => {
                setDisplay(2)
                changeHeight('77%')
                setLocText(address)
              }}
              onEditPress={(e, address) => {
                setDisplay(3)
                changeHeight('75%')
                setEditAddress(address)
              }}
              suggestion={(data: any) => {
                handleMarking(data)
              }}
              addedAddress={addedAddress}
            />
          )}
          {showDisplay == 2 && (
            <AddAddress
              onSavePress={() => {
                setDisplay(1)
                changeHeight('52%')
              }}
              location={locText}
              saveAddress={(addr) => {
                console.log(addr)
                setAddedAddress(addr)
              }}
            />
          )}
          {showDisplay == 3 && (
            <EditAddress
              onEditPress={() => {
                setDisplay(1)
                changeHeight('52%')
              }}
              selectedAddress={editAddress}
            />
          )} */}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  )
}

const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
  position: absolute;
  z-index: 10000;
  top: 0;
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

const SelectAddressBtn = styled.View`
  padding-horizontal: 16px;
  padding-vertical: 24px;
  position: absolute;
  bottom: 0px;
`

const UseCurrentLocationText = styled.Text`
  font-size: 14px;
  text-align: center;
  font-family: Gilroy-Medium;
  color: ${COLORS.textSecondaryClr};
`

const CurrentLocationWrapper = styled.Pressable`
  position: absolute;
  bottom: 120px;
  left: 100px;
`

const FlexRow = styled.View`
  background: ${COLORS.iconsNormalClr};
  border-radius: 42px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  background: ${COLORS.iconsNormalClr};
`
const InputBox = styled.TextInput`
  width: 90%;
  border-radius: 20px;
  background-color: white;
  color: black;
  font-size: 14px;
  margin-vertical: 8px;
`
const HeaderStyle = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

export default AddAddressBook

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'relative',
  },

  parent: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    zIndex: 10,
  },

  cancelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  map: {
    flex: 1,
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
    paddingVertical: 2,
    marginVertical: 8,
    gap: 8,
    position: 'absolute',
    top: 50,
  },
  inputBox: {
    borderRadius: 20,
    backgroundColor: 'transparent',
    color: '#462D85',
    fontSize: 14,
    marginVertical: 8,
  },
})
