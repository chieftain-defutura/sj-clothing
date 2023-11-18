import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
  DocumentData,
  Query,
} from 'firebase/firestore/lite'
import {
  query as defaultQuery,
  collection as defualtCollection,
  where as defaultWhere,
} from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import uuid from 'react-native-uuid'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import Gender from './Gender'
import Skintone from './Skintone'
import { COLORS, gradientColors } from '../../../styles/theme'
import Animated, { FadeInUp, FadeOut, FadeOutDown } from 'react-native-reanimated'
import { WebView } from 'react-native-webview'
import { db, dbDefault } from '../../../../firebase'
import { userStore } from '../../../store/userStore'

const { height, width } = Dimensions.get('window')
export const gradientOpacityColors = [
  // 'rgba(191, 148, 228, 0.8)',
  'rgba(215, 180, 232, 0.1)',
  'rgba(236, 209, 236, 0.8)',
  'rgba(246, 229, 246, 0.8)',
  'rgba(202, 218, 241, 0.8)',
  'rgba(145, 177, 225, 0.2)',
]

interface IAvatar {
  path?: string
  steps?: number
  setSteps?: React.Dispatch<React.SetStateAction<number>>
}
const Avatar: React.FC<IAvatar> = ({ path, setSteps, steps }) => {
  const { t } = useTranslation('avatar')
  const { avatar } = userStore()
  const [toggle, setToggle] = useState(steps === 0 ? true : false)
  const [isGender, setGender] = useState(avatar.gender as string)
  const [skinColor, setSkinColor] = useState('3')
  const [uid, setUid] = useState<string | null>(null)
  const [data, setData] = useState<{ uid: string; animationFinished?: boolean } | null>(null)
  const isMounted = useRef(false)
  const navigation = useNavigation()
  const { updateProfile, updateAvatar, updateAddress, updatePhoneNo, updateName, user } =
    userStore()

  const handleGetData = useCallback(() => {
    if (!uid) return
    const q = defaultQuery(
      defualtCollection(dbDefault, 'CreateAvatar'),
      defaultWhere('uid', '==', uid),
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data())
        setData(doc.data() as any)
      })
    })

    return () => {
      unsubscribe()
    }
  }, [uid])

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
      await updateDoc(docRef, { skin: skinColor })
      console.log('updated')
    } catch (error) {
      console.log(error)
    }
  }, [skinColor])

  useEffect(() => {
    handleSetUid()
    handleUpdateGender()
    handleUpdateSkintone()
    handleGetData()
  }, [handleSetUid, handleUpdateGender, handleUpdateSkintone, handleGetData])

  const handleSubmit = async () => {
    if (user) {
      if (path === 'MidLevel') {
        await updateDoc(doc(db, 'users', user.uid), {
          avatar: {
            gender: isGender,
            skinTone: skinColor,
          },
        })
        navigation.navigate('MidLevel')
      } else {
        await updateDoc(doc(db, 'users', user.uid), {
          avatar: {
            gender: isGender,
            skinTone: skinColor,
          },
        })
        navigation.goBack()
      }
    }
    if (!user) {
      if (path === 'MidLevel') {
        updateAvatar({ gender: isGender, skinTone: skinColor })

        navigation.navigate('MidLevel')
      } else {
        updateAvatar({ gender: isGender, skinTone: skinColor })

        navigation.goBack()
      }
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
      }}
    >
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          // gap: 10,
          backgroundColor: 'transparent',
        }}
      >
        <Animated.View
          entering={FadeInUp.duration(800)}
          exiting={FadeOut}
          style={[styles.genderWrapper]}
        >
          <Text style={styles.title}>{t('title')}.</Text>
        </Animated.View>

        <View>
          {toggle && (
            <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
              <Skintone
                skinColor={skinColor}
                setSkinColor={setSkinColor}
                setToggle={setToggle}
                handleSubmit={handleSubmit}
                path={path as string}
                setSteps={setSteps as any}
                uid={uid as string}
              />
            </Animated.View>
          )}

          {!toggle && (
            <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOutDown}>
              <Gender setToggle={setToggle} isGender={isGender} setGender={setGender} data={data} />
            </Animated.View>
          )}
        </View>
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
    // position: 'absolute',
    // top: 0,
    // zIndex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    color: COLORS.textClr,
    // paddingHorizontal: 16,
    // paddingVertical: 16,
    fontFamily: 'Arvo-Regular',
  },
  // image: {
  //   paddingTop: 16,
  // },
  button: {
    backgroundColor: '#61e3a5',
    padding: 10,
    borderRadius: 10,
    // margin: 10,
  },
})
