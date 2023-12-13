import { StyleSheet, View, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import styled from 'styled-components/native'
import { Pressable } from 'react-native'
import { COLORS, gradientOpacityColors } from '../../styles/theme'
import axios from 'axios'
import * as Location from 'expo-location'
import { LinearGradient } from 'expo-linear-gradient'
import Search from '../../assets/icons/SearchIcon'
import Plus from '../../assets/icons/PlusIcon'
import LeftArrow from '../../assets/icons/LeftArrow'
import Map from './map'
import ForgotMail from '../../screens/Modals/ForgotMail'
import SignupModal from '../../screens/Modals/Signup'
import LoginModal from '../../screens/Modals/Login'
import { userStore } from '../../store/userStore'
import AddressChoose from './AddressChoose'

interface IAddressBook {
  navigation: any
}
interface Suggestion {
  display_name: string
  place_id: number
}

const Locations: React.FC<IAddressBook> = ({ navigation }) => {
  const [showDisplay, setDisplay] = useState(0)
  const [location, setLocation] = useState<any>()
  const mapRef = React.useRef<MapView>(null)
  const [onText, setOnSearchChange] = React.useState<string | null>(null)
  const [suggestions, setSuggestions] = React.useState<Suggestion[] | null>([])
  const user = userStore((state) => state.user)
  const phoneNumber = userStore((state) => state.phoneNo)
  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [forgotMail, setForgotmail] = useState(false)

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

      reverseGeocode(loc.latitude, loc.longitude)
      setLocation(loc)
      moveMapToMarker(loc)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    getPermissions()
  }, [])

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

  const handleSearchText = async (text: string) => {
    try {
      if (text === '') {
        setSuggestions([])
        setOnSearchChange(null)
      } else {
        setOnSearchChange(text)

        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${text}`,
        )

        setSuggestions(response.data)
      }
    } catch (error) {
      console.error('Error handling search text:', error)
    }
  }

  const handleAddAddress = () => {
    if (!user) {
      setLogin(true)
    }
    if (user && !phoneNumber) {
      setSignUp(true)
    }

    if (user && phoneNumber) {
      setDisplay(1)
    }
  }
  return (
    <LinearGradient colors={gradientOpacityColors} style={{ flex: 1, position: 'relative' }}>
      <KeyboardAvoidingView style={[styles.container]} contentContainerStyle={{ height: 900 }}>
        {showDisplay === 0 && (
          <>
            <GoBackArrowContent
              onPress={() => {
                navigation.goBack()
              }}
            >
              <LeftArrow width={24} height={24} />
              <CartText allowFontScaling={false}>Address Book</CartText>
            </GoBackArrowContent>
            <View style={{ padding: 20, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <View style={styles.searchInputBox}>
                <Search width={16} height={16} />
                <InputBox
                  placeholder='Search for area, street name'
                  onChangeText={(text) => handleSearchText(text)}
                  value={onText || ''}
                  style={styles.inputBox}
                  placeholderTextColor={COLORS.SecondaryTwo}
                  allowFontScaling={false}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 100000,
                  top: 120,
                  backgroundColor: 'white',
                  left: 20,
                  height: 240,
                  borderRadius: 4,
                }}
              >
                <FlatList
                  data={suggestions}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setOnSearchChange(item.display_name)
                        setSuggestions(null)
                      }}
                      style={{
                        borderBottomColor: '#E5CEF5',
                        borderBottomWidth: 1,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                      }}
                    >
                      <HeaderStyle allowFontScaling={false}>{item.display_name}</HeaderStyle>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.place_id.toString()}
                  scrollEnabled={true}
                  horizontal={false}
                />
              </View>
              <Pressable onPress={handleAddAddress}>
                <AddAddressBtn>
                  <Plus width={16} height={16} />
                  <BtnText allowFontScaling={false}>Add new Address</BtnText>
                </AddAddressBtn>
              </Pressable>
              <AddressChoose />
            </View>
          </>
        )}
        {showDisplay === 1 && (
          <Map
            navigation={navigation}
            setDisplay={setDisplay}
            onText={onText}
            setOnSearchChange={setOnSearchChange}
          />
        )}
      </KeyboardAvoidingView>
      {login && (
        <LoginModal
          onForgotClick={() => {
            setForgotmail(true), setLogin(false)
          }}
          onSignClick={() => {
            setSignUp(true), setLogin(false)
          }}
          onClose={() => setLogin(false)}
        />
      )}
      {signUp && (
        <SignupModal
          onLoginClick={() => {
            setLogin(true), setSignUp(false)
          }}
          onClose={() => setSignUp(false)}
        />
      )}
      {forgotMail && (
        <ForgotMail
          onLoginClick={() => {
            setLogin(true), setForgotmail(false)
          }}
          onClose={() => setForgotmail(false)}
        />
      )}
    </LinearGradient>
  )
}

const AddAddressBtn = styled.View`
  border-color: #db00ff;
  border-width: 1px;
  padding-horizontal: 14px;
  padding-vertical: 12px;
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  width: 165px;
  top: 30px;
`
const BtnText = styled.Text`
  font-size: 12px;
  font-family: Arvo-Regular;
  color: #db00ff;
`

const GoBackArrowContent = styled.TouchableOpacity`
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

const InputBox = styled.TextInput`
  width: 100%;
  border-radius: 20px;
  background-color: white;
  color: black;
  font-size: 14px;
  margin-vertical: 12px;
  padding-right: 16px;
  padding-vertical: 4x;
`
const HeaderStyle = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

export default Locations

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
    zIndex: 100000,
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
    position: 'relative',
    top: 30,
  },
  inputBox: {
    borderRadius: 20,
    backgroundColor: 'transparent',
    color: '#462D85',
    fontSize: 14,
    marginVertical: 10,
  },
})
