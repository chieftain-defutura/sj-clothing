import { Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Tooltip from '../../../../screens/Modals/TooltipModel'
import { userStore } from '../../../../store/userStore'
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../../../../../firebase'
import PostComponent from '../../../../components/Post'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientColors } from '../../../../styles/theme'

const { height, width } = Dimensions.get('window')

interface postProps {
  route: any
}

const Post: React.FC<postProps> = ({ route }) => {
  const navigation = useNavigation()
  const user = userStore((state) => state.user)
  const updateName = userStore((state) => state.updateName)
  const [showTooltip, setTooltip] = useState<boolean>(false)
  const [openDetails, setOpenDetails] = useState(false)
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
    if (route.params) {
      setTooltip(route.params.showToolTip)
    }
  }, [fetchDataFromFirestore])

  return (
    <LinearGradient colors={gradientColors} style={{ height: height }}>
      <PostComponent navigation={navigation} />
      {showTooltip && (
        <Tooltip
          onClose={() => {
            setTooltip(false)
            navigation.navigate('Post')
          }}
          isVisible={showTooltip}
        />
      )}
    </LinearGradient>
  )
}

export default Post
