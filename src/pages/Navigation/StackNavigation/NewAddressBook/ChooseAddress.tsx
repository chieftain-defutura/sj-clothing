import { View, Text, StyleSheet, Pressable, GestureResponderEvent } from 'react-native'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { RadioButton } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import { userStore } from '../../../../store/userStore'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../../../firebase'
import { COLORS, FONT_FAMILY } from '../../../../styles/theme'
import HomeIcon from '../../../../assets/icons/HomeIcon'
import Plus from '../../../../assets/icons/PlusIcon'
import CustomButton from '../../../../components/Button'
import TickIcon from '../../../../assets/icons/TickIcon'

interface AddressData {
  name: string
  mobile: string
  email: string
  addressLineOne: string
  addressLineTwo: string
  city: string
  region: string
  pinCode: string
  saveAsAddress: string
  isSelected: boolean
}

interface IChooseLocation {
  addedAddress: AddressData[]
  onEditPress?: (event: GestureResponderEvent, address: AddressData) => void | undefined | null
  onAddPress: (
    event: GestureResponderEvent,
    location: string | undefined,
  ) => void | undefined | null
}

const ChooseAddress: React.FC<IChooseLocation> = ({ onAddPress, onEditPress }) => {
  const [onText, setOnSearchChange] = React.useState<string>()
  const [data, setData] = useState<AddressData[] | null>([])
  const [checked, setChecked] = React.useState<string | null>(null)
  const { user } = userStore()
  const focus = useIsFocused()

  const updateData = async (index: string) => {
    try {
      if (data) {
        data.forEach((item, i) => {
          if (i === parseInt(index)) {
            item.isSelected = true
          } else {
            item.isSelected = false
          }
        })

        const updatedData = [...data]
        setData(updatedData)

        //@ts-ignore
        const userDocRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          if (!userData) return

          userData.address = [...data]
          await updateDoc(userDocRef, userData)
        } else {
          console.log('User document not found')
        }
      }
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const getData = async () => {
    try {
      if (!user) return

      const q = doc(db, 'users', user.uid)
      const querySnapshot = await getDoc(q)

      if (querySnapshot.exists()) {
        const fetchData = querySnapshot.data()
        setData(fetchData.address)
      } else {
        console.log('Document not found')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View>
      <View style={{ padding: 22 }}>
        <Header>Choose Address</Header>
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
            <View>
              {data.map((f, index) => (
                <View key={index} style={styles.radioBtn}>
                  <View>
                    <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} />
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={styles.RadioTitle}>
                      <HomeIcon width={16} height={16} color={'black'} />
                      <HeaderStyle>{f.saveAsAddress}</HeaderStyle>
                    </View>
                    <DescriptionText>
                      {f.addressLineOne}, {f.addressLineTwo}, {f.city}, {f.region}, {f.pinCode},{' '}
                      {f.email}, {f.mobile}
                    </DescriptionText>
                  </View>
                  {/* <Pressable style={styles.editStyle} onPress={(e) => onEditPress(e, f)}>
                    <Text style={styles.editText}>Edit</Text>
                  </Pressable> */}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Loading</Text>
            </View>
          )}
        </RadioButton.Group>
      </View>
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
  )
}

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
const BtnText = styled.Text`
  font-size: 12px;
  font-family: Arvo-Regular;
  color: #db00ff;
`
const Header = styled.Text`
  font-family: ${FONT_FAMILY.GilroySemiBold};
  font-size: 18px;
  color: ${COLORS.iconsHighlightClr};
  margin-bottom: 12px;
`

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 16px;
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

const styles = StyleSheet.create({
  radioBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginVertical: 8,
  },
  editText: {
    color: '#DB00FF',
    fontSize: 14,
  },
  RadioTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  errorText: {
    color: COLORS.textSecondaryClr,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 70,
  },
  editStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
})

export default ChooseAddress
