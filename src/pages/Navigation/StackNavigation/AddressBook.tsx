import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import CustomButton from '../../../components/Button'
import styled from 'styled-components/native'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import CurrentLocationIcon from '../../../assets/icons/CurrentLocationIcon'
import LeftArrow from '../../../assets/icons/LeftArrow'
import CloseIcon from '../../../assets/icons/Close'
import AddAddress from '../../../components/AddressBook/AddAddress'
import ChooseLocation from '../../../components/AddressBook/ChooseLocation'
import EditAddress from '../../../components/AddressBook/EditAddress'
import axios from 'axios'
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { setDefaultNamespace } from 'i18next'
import { useTranslation } from 'react-i18next'

interface IAddressBook {
  navigation: any
}

const AddressBook: React.FC<IAddressBook> = ({ navigation }) => {
  const { t } = useTranslation('account')
  const height = useSharedValue('0%')
  const displayAddressSelection = useSharedValue('none')
  const [showDisplay, setDisplay] = useState(1)
  const [selectSug, setSug] = useState()
  const [location, setLocation] = useState<any>()
  const mapRef = React.useRef<MapView>(null)

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

  const handlePress = () => {
    height.value = withTiming('52%')
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
  const handleMarking = (data: any) => {
    getLocationFromAddress(data)
      .then((location) => {
        console.log('Location:', location)
        setLocation(location)
        moveMapToMarker(location)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <KeyboardAvoidingView style={[styles.container]} contentContainerStyle={{ height: 900 }}>
      <GoBackArrowContent
        onPress={() => {
          navigation.goBack()
        }}
      >
        <LeftArrow width={24} height={24} />
        <CartText>{t('Addressbook')}</CartText>
      </GoBackArrowContent>
      <MapView
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

      <CurrentLocationWrapper>
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
          text='Select address'
          fontFamily='Arvo-Regular'
          fontSize={16}
        />
      </SelectAddressBtn>
      <Animated.View style={[styles.parent, editAnimationStyle]}>
        <View style={styles.cancelContainer}>
          <Pressable onPress={handleClose}>
            <CloseIcon width={24} height={24} />
          </Pressable>
        </View>
        {showDisplay == 1 && (
          <ChooseLocation
            onAddPress={() => {
              setDisplay(2)
              changeHeight('77%')
            }}
            onEditPress={() => {
              setDisplay(3)
              changeHeight('75%')
            }}
            suggestion={(data: any) => {
              handleMarking(data)
            }}
          />
        )}
        {showDisplay == 2 && (
          <AddAddress
            onSavePress={() => {
              setDisplay(1)
              changeHeight('52%')
            }}
          />
        )}
        {showDisplay == 3 && (
          <EditAddress
            onEditPress={() => {
              setDisplay(3)
              changeHeight('52%')
            }}
          />
        )}
      </Animated.View>
    </KeyboardAvoidingView>
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
  background: ${COLORS.iconsNormalClr};
  padding-horizontal: 16px;
  padding-vertical: 24px;
`

const UseCurrentLocationText = styled.Text`
  font-size: 14px;
  text-align: center;
  font-family: Gilroy-Medium;
  color: ${COLORS.textSecondaryClr};
`

const CurrentLocationWrapper = styled.View`
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

export default AddressBook

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
})
