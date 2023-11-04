// import React, { useCallback, useEffect } from 'react'
// import Animated from 'react-native-reanimated'
// import { userStore } from '../../../../store/userStore'
// import { doc, getDoc } from 'firebase/firestore/lite'
// import { db } from '../../../../../firebase'
// import Medium from '../../../../components/Medium'
// import Avatar from '../../../../components/Medium/Avatar'
// import { LinearGradient } from 'expo-linear-gradient'
// import { gradientColors, gradientOpacityColors } from '../../../../styles/theme'

// // import AuthNavigate from '../../../../screens/AuthNavigate'
// // import { useIsFocused } from '@react-navigation/native'

// const MidLevel: React.FC = () => {
//   const { updateProfile, updateAvatar, updateAddress, updatePhoneNo, updateName, user, avatar } =
//     userStore()

//   const fetchDataFromFirestore = useCallback(async () => {
//     try {
//       if (!user) return
//       const q = doc(db, 'users', user.uid)
//       const querySnapshot = await getDoc(q)

//       const fetchData = querySnapshot.data()
//       updateProfile(fetchData?.profile)
//       updateName(fetchData?.name)
//       updateAddress(fetchData?.address)
//       updateAvatar(fetchData?.avatar)
//       updatePhoneNo(fetchData?.phoneNo)
//     } catch (error) {
//       console.error('Error fetching data from Firestore:', error)
//     }
//   }, [user, updateProfile])

//   useEffect(() => {
//     fetchDataFromFirestore()
//   }, [fetchDataFromFirestore])
//   console.log('avatar', avatar)
//   return (
//     <Animated.View style={{ flex: 1 }}>
//       <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
//         {!avatar.gender ? <Avatar path='MidLevel' /> : <Medium />}
//       </LinearGradient>
//     </Animated.View>
//   )
// }

// export default MidLevel

import { View, Text } from 'react-native'
import React from 'react'

const MidLevel: React.FC = () => {
  return (
    <View>
      <Text>MidLevel</Text>
    </View>
  )
}

export default MidLevel
