import { View, StyleSheet, Pressable, Dimensions, Platform, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components/native'
import { RadioButton } from 'react-native-paper'
import { userStore } from '../../store/userStore'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import HomeIcon from '../../assets/icons/HomeIcon'
import { ScrollView } from 'react-native-gesture-handler'
import { db } from '../../../firebase'
import Loader from '../Loading'
import { Text } from 'react-native'
import AddressAdd from './AddressAdd'
import DeleteIcon from '../../assets/icons/AccountPageIcon/DeleteIcon'
import EditIcon from '../../assets/icons/AccountPageIcon/EditIcon'

interface AddressData {
  name: string
  addressOne: string
  addressTwo: string
  city: string
  state: string
  pinCode: string
  country: string
  floor: string
  fullAddress: string
  isSelected: boolean
  phoneNo: string
  saveAddressAs: string
}

interface IAddAddress {
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
  setDataToEdit: React.Dispatch<React.SetStateAction<AddressData | undefined>>
}

const { width, height } = Dimensions.get('window')

const AddressChoose: React.FC<IAddAddress> = ({ setOpenEdit, setDataToEdit }) => {
  const user = userStore((state) => state.user)
  const [data, setData] = useState<AddressData[] | null>([])
  const [checked, setChecked] = React.useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)

  const checkefRef = useRef(null)

  const DeleteAddress = async (indexToRemove: number) => {
    if (!user) return
    const userDocRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)
    if (userDoc.exists()) {
      const userData = userDoc.data()
      if (!userData) return

      const updatedAddresses = userData.address.filter(
        (_: any, index: any) => index !== indexToRemove,
      )
      setData(updatedAddresses)
      await updateDoc(userDocRef, { address: updatedAddresses })
    } else {
      console.log('User document not found')
    }
  }

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

  const getData = useCallback(async () => {
    try {
      setLoading(true)

      if (!user) return

      const q = doc(db, 'users', user.uid)
      const querySnapshot = await getDoc(q)

      if (querySnapshot.exists()) {
        const fetchData = querySnapshot.data()
        setData(fetchData.address)
        fetchData.address.forEach((d: any, index: any) => {
          if (d.isSelected === true) {
            setChecked(index.toString())
          }
        })
        setLoading(false)
      } else {
        console.log('Document not found')
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    getData()
  }, [getData])

  if (isLoading)
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 10,
      }}
    >
      <Loader />
    </View>

  return (
    <View>
      <View style={{ marginTop: 26, marginLeft: 8 }}>
        <Header allowFontScaling={false}>Choose Address</Header>

        {/* <RadioButton.Group
          onValueChange={(newValue) => {
            updateData(newValue)
            setChecked(newValue)
          }}
          value={checked as string}
        > */}
        {data?.length ? (
          <ScrollView style={{ height: 500 }} showsVerticalScrollIndicator={false}>
            {data.map((f, index) => (
              <View
                key={index}
                style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
              >
                <TouchableOpacity
                  style={styles.radioBtn}
                  onPress={() => {
                    setChecked(index.toString())
                    updateData(index.toString())
                  }}
                >
                  <View>
                    <RadioButton
                      status={checked === index.toString() ? 'checked' : 'unchecked'}
                      value={index.toString()}
                      color={COLORS.textSecondaryClr}
                      onPress={() => {
                        setChecked(index.toString())
                        updateData(index.toString())
                      }}
                    />
                    <View style={styles.radioBtnIOS}></View>
                  </View>

                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={styles.RadioTitle}>
                      <HomeIcon width={16} height={16} color={'black'} />
                      <HeaderStyle allowFontScaling={false}>{f.saveAddressAs}</HeaderStyle>
                    </View>
                    <DescriptionText allowFontScaling={false}>
                      {f.name}, {f.phoneNo}, {f.floor}, {f.addressOne}, {f.addressTwo}, {f.city},{' '}
                      {f.state}, {f.country}, {f.pinCode}.
                    </DescriptionText>
                  </View>
                </TouchableOpacity>
                <Pressable onPress={() => DeleteAddress(index)}>
                  <DeleteIcon
                    width={24}
                    height={24}
                    fill='#DB00FF'
                    stroke='#DB00FF'
                    strokeWidth={0.9}
                  />
                </Pressable>
                <Pressable
                  style={styles.editStyle}
                  onPress={(e) => {
                    setOpenEdit(true), setDataToEdit(f)
                  }}
                >
                  <EditIcon
                    width={24}
                    height={24}
                    fill='#DB00FF'
                    stroke='#DB00FF'
                    strokeWidth={0}
                  />
                  {/* <Text allowFontScaling={false} style={styles.editText}>
                    Edit
                  </Text> */}
                </Pressable>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={{ marginTop: 40 }}>
            <ProductText allowFontScaling={false}>No Address</ProductText>
          </View>
        )}
        {/* </RadioButton.Group> */}
      </View>
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
  margin-top: 12px;
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
const ProductText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  text-align: center;
  margin-left: 39px;
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
    width: width / 1.5,
    gap: 8,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        gap: 16,
      },
    }),
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

  radioBtnIOS: {
    ...Platform.select({
      ios: {
        borderWidth: 1.5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderRadius: 300,
        width: 30,
        height: 30,
        marginTop: -32,
        marginLeft: 4,
      },
    }),
  },
})

export default AddressChoose
