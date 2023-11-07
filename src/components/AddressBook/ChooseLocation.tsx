import {
  FlatList,
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import Search from '../../assets/icons/SearchIcon'
import Plus from '../../assets/icons/PlusIcon'
import TickIcon from '../../assets/icons/TickIcon'
import CustomButton from '../Button'
import { COLORS } from '../../styles/theme'
import { RadioButton } from 'react-native-paper'
import HomeIcon from '../../assets/icons/HomeIcon'
import axios from 'axios'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../firebase'
import { userStore } from '../../store/userStore'
import { useIsFocused } from '@react-navigation/native'
import * as Location from 'expo-location'

interface AddressData {
  floor: string
  fullAddress: string
  landmark: string
  saveAddressAs: string
  isSelected: boolean
}

interface IChooseLocation {
  onAddPress: (
    event: GestureResponderEvent,
    location: string | undefined,
  ) => void | undefined | null
  onEditPress?: (event: GestureResponderEvent, address: AddressData) => void | undefined | null
  suggestion?: any
  addedAddress: AddressData[]
}

const ChooseLocation: React.FC<IChooseLocation> = ({
  onAddPress,
  onEditPress,
  suggestion,
  addedAddress,
}) => {
  const [onText, setOnSearchChange] = React.useState<string>()
  const [checked, setChecked] = React.useState<string | null>(null)
  const [suggestions, setSuggestions] = React.useState<string[] | null>([])
  const [data, setData] = useState<AddressData[] | null>([])
  const [location, setLocation] = useState<Location.LocationObject>()
  const { user } = userStore()
  const focus = useIsFocused()

  const updateData = async (index: string) => {
    if (data) {
      // Iterate through the data array
      data.forEach((item, i) => {
        if (i === parseInt(index)) {
          // Set the 'isSelected' property to true for the selected item
          item.isSelected = true
        } else {
          // Set the 'isSelected' property to false for all other items
          item.isSelected = false
        }
      })

      // Make a copy of the updated array and set it using setData
      const updatedData = [...data]
      setData(updatedData)
      //@ts-ignore
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()
      if (!userData) return
      userData.address = [...data]
      await updateDoc(userDocRef, userData)
      // Now, updatedData contains the modified array with 'isSelected' values updated
    }
  }

  const getData = async () => {
    if (!user) return
    const q = doc(db, 'users', user.uid)
    const querySnapshot = await getDoc(q)

    const fetchData = querySnapshot.data()
    if (addedAddress && fetchData?.adddress) {
      const array = [...addedAddress, ...fetchData?.adddress]
      setData(array)
    } else if (fetchData?.address) {
      const addressData: AddressData[] = Object.values(fetchData?.address)
      setData(addressData)
      addressData.forEach((d, index) => {
        if (d.isSelected === true) {
          setChecked(index.toString())
        }
      })
    }
  }

  useEffect(() => {
    getData()
  }, [focus])

  const handleSearchText = async (text: string) => {
    if (text === '') setSuggestions([])
    setOnSearchChange(text)

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${text}`,
    )

    setSuggestions(response.data)
  }

  const getLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Please grant location permissions')
      return
    }

    let currentLocation = await Location.getCurrentPositionAsync({})
    setLocation(currentLocation)
  }

  const renderItem = (txt: string) => (
    <TouchableOpacity
      onPress={() => {
        suggestion(txt)
        setOnSearchChange(txt)
        setSuggestions(null)
      }}
      style={{
        borderBottomColor: '#E5CEF5',
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
      }}
    >
      <HeaderStyle>{txt}</HeaderStyle>
    </TouchableOpacity>
  )

  return (
    <View>
      <View style={styles.searchInputBox}>
        <Search width={16} height={16} />
        <InputBox
          placeholder='Search for area, street name'
          onChangeText={(text) => handleSearchText(text)}
          value={onText}
          style={styles.inputBox}
          placeholderTextColor={COLORS.SecondaryTwo}
        />
      </View>

      <View style={{ position: 'relative', zIndex: 10 }}>
        <FlatList
          data={suggestions}
          renderItem={({ item }) => renderItem(item.display_name)}
          keyExtractor={(item) => item.place_id.toString()}
          scrollEnabled={true}
          horizontal={false}
        />
      </View>
      <View>
        <RadioButton.Group
          onValueChange={(newValue) => {
            updateData(newValue)
            setChecked(newValue)
          }}
          value={checked}
        >
          {data?.length === 0 ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>No address</Text>
            </View>
          ) : data ? (
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '67%' }}>
              {/* {AddressBookData.map((f, index) => (
              <View key={index} style={styles.radioBtn}>
                <View>
                  <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <View style={styles.RadioTitle}>
                    <f.icon width={16} height={16} color={'black'} />
                    <HeaderStyle>{f.header}</HeaderStyle>
                  </View>
                  <DescriptionText>{f.location}</DescriptionText>
                </View>
                <Pressable style={styles.editStyle} onPress={onEditPress}>
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>
              </View>
            ))} */}
              {data.map((f, index) => (
                <View key={index} style={styles.radioBtn}>
                  <View>
                    <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} />
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={styles.RadioTitle}>
                      <HomeIcon width={16} height={16} color={'black'} />
                      <HeaderStyle>{f.saveAddressAs}</HeaderStyle>
                    </View>
                    <DescriptionText>
                      {f.fullAddress}, {f.landmark}, {f.floor}
                    </DescriptionText>
                  </View>
                  <Pressable style={styles.editStyle} onPress={(e) => onEditPress(e, f)}>
                    <Text style={styles.editText}>Edit</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Loading</Text>
            </View>
          )}
        </RadioButton.Group>
        <FlexContent>
          <Pressable onPress={(e) => onAddPress(e, onText)}>
            <AddAddressBtn>
              <Plus width={16} height={16} />
              <BtnText>Add new Address</BtnText>
            </AddAddressBtn>
          </Pressable>
          <View style={{ width: 175 }}>
            <CustomButton
              variant='primary'
              text='Deliver here'
              leftIcon={<TickIcon width={16} height={16} />}
            />
          </View>
        </FlexContent>
      </View>
    </View>
  )
}

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`
const InputBox = styled.TextInput`
  width: 90%;
  border-radius: 20px;
  background-color: white;
  color: black;
  font-size: 14px;
  margin-vertical: 8px;
`

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
`
const BtnText = styled.Text`
  font-size: 12px;
  font-family: Arvo-Regular;
  color: #db00ff;
`

const HeaderStyle = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

const DescriptionText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-size: 12px;
  font-family: Gilroy-Regular;
  line-height: 18px;
  width: 225px;
`

export default ChooseLocation

const styles = StyleSheet.create({
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
  },
  inputBox: {
    borderRadius: 20,
    backgroundColor: 'white',
    color: '#462D85',
    fontSize: 14,
    marginVertical: 8,
  },
  radioBtn: {
    borderWidth: 1,
    borderColor: '#efcef5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginVertical: 8,
  },
  RadioTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  editStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: '#DB00FF',
    fontSize: 14,
  },
  errorText: {
    color: COLORS.textSecondaryClr,
  },
  errorContainer: {
    height: '65%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
})
