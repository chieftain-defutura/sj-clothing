import { Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { userStore } from '../../../../store/userStore'
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../../../../../firebase'
import PostComponent from '../../../../components/Post'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientColors } from '../../../../styles/theme'
import PostTooltip from '../../../../components/Tooltips/PostTooltip'

const { height } = Dimensions.get('window')

const Post: React.FC = () => {
  const navigation = useNavigation()
  const [toolTip, showToolTip] = useState(false)
  const user = userStore((state) => state.user)
  const updateName = userStore((state) => state.updateName)
  const updateAvatar = userStore((state) => state.updateAvatar)
  const updateAddress = userStore((state) => state.updateAddress)
  const updatePhoneNo = userStore((state) => state.updatePhoneNo)
  const updateProfile = userStore((state) => state.updateProfile)

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

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showPostTooltip')

      if (data !== '23') {
        AsyncStorage.setItem('showPostTooltip', '23')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  return (
    <LinearGradient colors={gradientColors} style={{ height: height }}>
      <PostComponent navigation={navigation} />
      <PostTooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
    </LinearGradient>
  )
}

export default Post
