import {
  FlatList,
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import Search from '../../assets/icons/SearchIcon'
import Plus from '../../assets/icons/PlusIcon'
import TickIcon from '../../assets/icons/TickIcon'
import CustomButton from '../Button'
import { COLORS } from '../../styles/theme'
import { RadioButton } from 'react-native-paper'
import { AddressBookData } from '../../utils/data/AddressBookData'
import HomeIcon from '../../assets/icons/HomeIcon'
import axios from 'axios'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite'
import { db } from '../../../firebase'
import { useStore } from 'zustand'
import { userStore } from '../../store/userStore'

interface AddressData {
  floor: string
  fullAddress: string
  landmark: string
  saveAddressAs: string
}

interface IChooseLocation {
  onAddPress: (event: GestureResponderEvent) => void | undefined | null
  onEditPress?: (event: GestureResponderEvent) => void | undefined | null
  suggestion?: any
}

const ChooseLocation: React.FC<IChooseLocation> = ({ onAddPress, onEditPress, suggestion }) => {
  const [onText, setOnSearchChange] = React.useState<string>()
  const [checked, setChecked] = React.useState('first')
  const [suggestions, setSuggestions] = React.useState<string[] | null>([])
  const [showSuggestion, setSugPop] = useState(false)
  const [data, setData] = useState<AddressData[] | null>([])
  const { user } = userStore()
  console.log('daataaaa', data)

  const getData = async () => {
    if (!user) return
    const q = doc(db, 'users', user.uid)
    const querySnapshot = await getDoc(q)

    const fetchData = querySnapshot.data()
    if (fetchData?.address) setData(fetchData?.address)
    else setData(null)
    console.log('fetchDataa', fetchData?.address)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSearchText = async (text: string) => {
    if (text === '') setSuggestions([])
    setOnSearchChange(text)

    // Make a request to the Nominatim geocoding service to get location suggestions
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${text}`,
    )

    setSuggestions(response.data)
  }
  const renderItem = (txt: string) => (
    <TouchableOpacity
      onPress={() => {
        suggestion(txt)
        setOnSearchChange(txt)
        setSuggestions(null)
      }}
      style={{ borderColor: 'black', borderWidth: 1 }}
    >
      <Text>{txt}</Text>
    </TouchableOpacity>
  )
  // if (!data) return

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
        <RadioButton.Group onValueChange={(newValue) => setChecked(newValue)} value={checked}>
          {data ? (
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
                  <Pressable style={styles.editStyle} onPress={onEditPress}>
                    <Text style={styles.editText}>Edit</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>No address</Text>
            </View>
          )}
        </RadioButton.Group>
        <FlexContent>
          <Pressable onPress={onAddPress}>
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
    color: 'black',
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
