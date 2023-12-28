import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { COLORS } from '../../styles/theme'
import { userStore } from '../../store/userStore'
import CustomButton from '../../components/Button'
import AlertIcon from '../../assets/icons/Alert'
import styled from 'styled-components/native'
import { db } from '../../../firebase'

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
  countryCode: string
  phoneNo: string
  saveAddressAs: string
}

interface IDelectAddress {
  closeModal?: () => void
  errorMessage?: string | null
  setData: React.Dispatch<React.SetStateAction<AddressData[] | null>>
  index: number
}

const DelectAddress: React.FC<IDelectAddress> = ({ closeModal, errorMessage, setData, index }) => {
  const user = userStore((store) => store.user)
  const [isSendVerifyMail, setSendVerifyMail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const DeleteAddress = async (indexToRemove: number) => {
    try {
      setIsLoading(true)
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
        closeModal?.()
        await updateDoc(userDocRef, { address: updatedAddresses })
      } else {
        console.log('User document not found')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isSendVerifyMail) {
      const timer = setTimeout(() => {
        setSendVerifyMail(false)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isSendVerifyMail])

  return (
    <Modal animationType='fade' transparent={true}>
      <View style={styles.VerificationContainer}>
        <View style={styles.VerificationWrapper}>
          <AlertIcon width={130} height={130} />
          <Text style={styles.header} allowFontScaling={false}>
            Are You sure you want to delete this address?
          </Text>

          {errorMessage && (
            <Text
              allowFontScaling={false}
              style={{ fontSize: 12, color: `${COLORS.errorClr}`, fontFamily: `Gilroy-Regular` }}
            >
              {errorMessage}
            </Text>
          )}
          <View
            style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={{ borderRadius: 50, borderColor: '#462D85', borderWidth: 2 }}
            >
              <StyledView>
                <Text style={styles.btnText}>No</Text>
              </StyledView>
            </TouchableOpacity>
            <CustomButton
              text={isLoading ? 'Deleting...' : 'Yes'}
              disabled={isLoading}
              onPress={() => DeleteAddress(index)}
              style={{ width: 100 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const StyledView = styled.View`
  padding: 13px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 90px;
`

export default DelectAddress

const styles = StyleSheet.create({
  VerificationContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLORS.backgroundBlurClr}`,
  },
  VerificationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLORS.iconsNormalClr}`,
    padding: 20,
    borderRadius: 12,
    width: 328,
  },
  header: {
    fontSize: 22,
    fontFamily: 'Arvo-Regular',
    color: `${COLORS.textClr}`,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 32,
  },
  btnText: {
    fontSize: 14,
    color: '#462d85',
  },
  description: {
    fontSize: 15,
    fontFamily: 'Arvo-Regular',
    color: `${COLORS.textRGBAClr}`,
    textAlign: 'center',
    paddingVertical: 15,
  },
})
