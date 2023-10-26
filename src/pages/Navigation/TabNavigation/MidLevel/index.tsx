import React, { useCallback, useEffect } from 'react'
import MediumLevel from '../../../../components/MediumLevel'
import Animated from 'react-native-reanimated'
import { userStore } from '../../../../store/userStore'
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../../../../../firebase'
// import AuthNavigate from '../../../../screens/AuthNavigate'
// import { useIsFocused } from '@react-navigation/native'

const MidLevel: React.FC = () => {
  // const isFocused = useIsFocused()
  const { updateProfile, updateAvatar, updateAddress, updatePhoneNo, updateName, user } =
    userStore()

  const fetchDataFromFirestore = useCallback(async () => {
    try {
      if (!user) return
      const q = doc(db, 'users', user.uid)
      const querySnapshot = await getDoc(q)

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
    <>
      {/* <AuthNavigate focus={isFocused} children={null} /> */}
      <Animated.View style={{ flex: 1 }}>
        <MediumLevel />
      </Animated.View>
    </>
  )
}

export default MidLevel
