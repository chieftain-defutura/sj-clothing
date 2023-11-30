import { StyleSheet, View, KeyboardAvoidingView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import CustomButton from '../../components/Button'
import styled from 'styled-components/native'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../styles/theme'
import CurrentLocationIcon from '../../assets/icons/CurrentLocationIcon'
import LeftArrow from '../../assets/icons/LeftArrow'
import CloseIcon from '../../assets/icons/Close'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import * as Location from 'expo-location'
import AddressAdd from './AddressAdd'

interface IAddressBook {
  navigation: any
  setDisplay: React.Dispatch<React.SetStateAction<number>>
  onText: string | null
  setOnSearchChange: React.Dispatch<React.SetStateAction<string | null>>
}

const { width } = Dimensions.get('window')

const Map: React.FC<IAddressBook> = ({ navigation, setDisplay, onText, setOnSearchChange }) => {
  const { t } = useTranslation('account')
  const height = useSharedValue('0%')
  const displayAddressSelection = useSharedValue('none')
  const [location, setLocation] = useState<any>()
  const [locText, setLocText] = useState<any>()
  const mapRef = React.useRef<MapView>(null)
  const [addedAddress, setAddedAddress] = useState<any>()
  const [isOpen, setIsOpen] = useState(false)

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

      const address = await reverseGeocode(loc.latitude, loc.longitude)
      console.log('Current Location Address:', address)
      setLocation(loc)
      moveMapToMarker(loc)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const editAnimationStyle = useAnimatedStyle(() => ({
    height: height.value as any,
    display: displayAddressSelection.value as any,
  }))

  const handlePress = () => {
    setIsOpen(true)
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

  return (
    <View style={{ flex: 1 }}>
      {!isOpen && (
        <KeyboardAvoidingView style={[styles.container]} contentContainerStyle={{ height: 1000 }}>
          <GoBackArrowContent
            onPress={() => {
              navigation.goBack()
            }}
          >
            <LeftArrow width={24} height={24} />
            <CartText allowFontScaling={false}>Address Book</CartText>
          </GoBackArrowContent>

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
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <CurrentLocationWrapper onPress={() => getPermissions()}>
              <FlexRow
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <CurrentLocationIcon width={16} height={16} />
                <UseCurrentLocationText allowFontScaling={false}>
                  Use current location
                </UseCurrentLocationText>
              </FlexRow>
            </CurrentLocationWrapper>
          </View>

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
          </Animated.View>
        </KeyboardAvoidingView>
      )}

      {isOpen && (
        <AddressAdd
          onText={onText}
          setDisplay={setDisplay}
          location={locText}
          saveAddress={(addr) => {
            console.log(addr)
            setAddedAddress(addr)
          }}
          setOnSearchChange={setOnSearchChange}
        />
      )}
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
`

const FlexRow = styled.View`
  background: ${COLORS.iconsNormalClr};
  border-radius: 42px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  background: ${COLORS.iconsNormalClr};
`

export default Map

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
