import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'

import CustomButton from '../../Button'
import { COLORS } from '../../../styles/theme'
import { useNavigation } from '@react-navigation/native'
import { userStore } from '../../../store/userStore'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'

interface ISkintone {
  isGender: string
  path: string
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}
const Skintone: React.FC<ISkintone> = ({ setToggle, isGender, path }) => {
  const navigation = useNavigation()
  const { updateProfile, updateAvatar, updateAddress, updatePhoneNo, updateName, user } =
    userStore()

  const handleSubmit = async () => {
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        avatar: isGender,
      })
    }
    if (path === 'MidLevel') {
      navigation.navigate('MidLevel')
    } else {
      navigation.goBack()
    }
  }

  const fetchDataFromFirestore = useCallback(async () => {
    try {
      if (!user) return
      const q = doc(db, 'users', user.uid)
      const querySnapshot = await getDoc(q)
      console.log(querySnapshot.data())

      const fetchData = querySnapshot.data()

      updateProfile(fetchData?.profile)
      updateName(fetchData?.name)
      updateAddress(fetchData?.address)
      updateAvatar(fetchData?.avatar)
      updatePhoneNo(fetchData?.phoneNo)
    } catch (error) {
      console.error('Error fetching data from Firestore:', error)
    }
  }, [user, updateProfile])

  useEffect(() => {
    fetchDataFromFirestore()
  }, [fetchDataFromFirestore])
  return (
    <View style={styles.SkintoneContainer}>
      <View style={styles.bottomWrapper}>
        <Text style={styles.bottomTitle}>1.Select Your Skintone.</Text>
        <View style={styles.SkintoneButtonWrapper}>
          <CustomButton
            text='Previous'
            variant='primary'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ paddingTop: 56, width: 180 }}
            onPress={() => setToggle(false)}
          />
          <CustomButton
            onPress={handleSubmit}
            text='Done'
            variant='primary'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ paddingTop: 56, width: 180 }}
          />
        </View>
      </View>
    </View>
  )
}

export default Skintone

const styles = StyleSheet.create({
  SkintoneContainer: { flex: 1 },

  bottomWrapper: {
    padding: 24,
  },
  bottomTitle: {
    color: COLORS.textClr,
    fontSize: 20,
    textAlign: 'center',
  },
  SkintoneButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
})
