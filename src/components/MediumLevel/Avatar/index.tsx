import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore/lite'
import uuid from 'react-native-uuid'

import Gender from './Gender'
import Skintone from './Skintone'
import { COLORS, gradientOpacityColors } from '../../../styles/theme'
import Animated, { FadeInUp, FadeOut, FadeOutDown } from 'react-native-reanimated'
import { WebView } from 'react-native-webview'
import { db } from '../../../../firebase'
import { useNavigation } from '@react-navigation/native'
import { userStore } from '../../../store/userStore'

const { height, width } = Dimensions.get('window')

interface IAvatar {
  path?: string
}
const Avatar: React.FC<IAvatar> = ({ path }) => {
  const [toggle, setToggle] = useState(false)
  const [isGender, setGender] = useState('')
  const [skinColor, setSkinColor] = useState('#FFCCAF')
  const [uid, setUid] = useState<string | null>(null)
  const isMounted = useRef(false)
  const navigation = useNavigation()
  const { updateProfile, updateAvatar, updateAddress, updatePhoneNo, updateName, user } =
    userStore()

  const handleSetUid = useCallback(async () => {
    if (!isMounted.current) {
      try {
        console.log('rendered')
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'CreateAvatar', tempUid)
        await setDoc(docRef, { uid: tempUid })
        console.log('added')

        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  const handleUpdateGender = useCallback(async () => {
    if (!isGender || !uid) return
    try {
      const docRef = doc(db, 'CreateAvatar', uid)
      await updateDoc(docRef, { gender: isGender })
      console.log('updated')
    } catch (error) {
      console.log(error)
    }
  }, [isGender])

  const handleUpdateSkintone = useCallback(async () => {
    if (!skinColor || !uid) return
    try {
      const docRef = doc(db, 'CreateAvatar', uid)
      await updateDoc(docRef, { skinColor: skinColor })
      console.log('updated')
    } catch (error) {
      console.log(error)
    }
  }, [skinColor])

  useEffect(() => {
    handleSetUid()
    handleUpdateGender()
    handleUpdateSkintone()
  }, [handleSetUid, handleUpdateGender, handleUpdateSkintone])

  const handleSubmit = async () => {
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        avatar: isGender,
        skinColor: skinColor,
      })
    }
    if (!user) {
      updateAvatar(isGender)
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
    <LinearGradient
      colors={gradientOpacityColors}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <View>
        <Animated.View
          entering={FadeInUp.duration(800)}
          exiting={FadeOut}
          style={styles.genderWrapper}
        >
          <Text style={styles.title}>Create your avatar.</Text>
          {/* <Image style={styles.image} source={require('../../../assets/images/girl-modal.png')} /> */}
          <View
            style={{
              width: width / 1,
              height: height / 2.5,
              paddingBottom: 1,
            }}
          >
            {
              <WebView
                source={{
                  // uri: `http://localhost:5173/create-avatar/?uid=${uid}`,
                  uri: `https://sj-threejs-development.netlify.app/create-avatar/?uid=${uid}`,
                }}
              />
            }
          </View>
        </Animated.View>

        {toggle && (
          <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
            <Skintone
              skinColor={skinColor}
              setSkinColor={setSkinColor}
              setToggle={setToggle}
              handleSubmit={handleSubmit}
            />
          </Animated.View>
        )}

        {!toggle && (
          <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
            <Gender setToggle={setToggle} isGender={isGender} setGender={setGender} />
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  )
}

export default Avatar

const styles = StyleSheet.create({
  genderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: COLORS.textClr,
    paddingHorizontal: 76,
    paddingVertical: 16,
    fontFamily: 'Arvo-Regular',
  },
  image: {
    paddingTop: 16,
  },
})
