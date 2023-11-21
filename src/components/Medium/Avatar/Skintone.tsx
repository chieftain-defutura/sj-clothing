import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import uuid from 'react-native-uuid'
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore/lite'

import CustomButton from '../../Button'
import { COLORS } from '../../../styles/theme'
import WebView from 'react-native-webview'
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated'
import { userStore } from '../../../store/userStore'
import { db } from '../../../../firebase'

const { height, width } = Dimensions.get('window')

interface ISkintone {}
const Skintone: React.FC<ISkintone> = ({}) => {
  const { t } = useTranslation('avatar')
  const avatar = userStore((store) => store.avatar)
  const updateAvatar = userStore((store) => store.updateAvatar)
  const [uid, setUid] = useState<string | null>(null)
  const isMounted = useRef(false)
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const elementRef = useRef<View | null>(null)

  const handleLayout = () => {
    if (elementRef.current) {
      elementRef.current.measure((x, y, width, height, pageX, pageY) => {
        setPageY(pageY)
        setElementHeight(height)
      })
    }
  }

  const handleSetUid = useCallback(async () => {
    if (!isMounted.current) {
      try {
        console.log('rendered', avatar.gender)
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'CreateAvatar', tempUid)
        await setDoc(docRef, { uid: tempUid, gender: avatar.gender })
        console.log('added')
        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  const handleUpdateGender = useCallback(async () => {
    if (!avatar.gender || !uid) return
    try {
      const docRef = doc(db, 'CreateAvatar', uid)
      await updateDoc(docRef, { gender: avatar.gender })
      console.log('updated')
    } catch (error) {
      console.log(error)
    }
  }, [avatar.gender])

  const handleUpdateSkintone = useCallback(async () => {
    if (!avatar.skinTone || !uid) return
    try {
      const docRef = doc(db, 'CreateAvatar', uid)
      await updateDoc(docRef, { skin: avatar.skinTone })
      console.log('updated')
    } catch (error) {
      console.log(error)
    }
  }, [avatar.skinTone])

  useEffect(() => {
    handleSetUid()
    handleUpdateGender()
    handleUpdateSkintone()
  }, [handleSetUid, handleUpdateGender, handleUpdateSkintone])

  return (
    <View style={styles.SkintoneContainer}>
      <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOut}>
        <View
          style={{
            width: width / 1,
            height: height / 2,
            backgroundColor: 'transparent',
          }}
          ref={elementRef}
          onLayout={handleLayout}
        >
          {uid && pageY && elementHeight && (
            <WebView
              style={{
                backgroundColor: 'transparent',
              }}
              source={{
                uri: `http://localhost:5173/create-avatar/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
                // uri: `https://sj-threejs-development.netlify.app/create-avatar/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
              }}
            />
          )}
        </View>
      </Animated.View>
      <View style={styles.bottomWrapper}>
        <Text style={styles.bottomTitle}>1.{t('select your skintone')}.</Text>

        <View style={styles.skinCollection}>
          {['#805244', '#a07160', '#c69d92', '#dabdaf'].map((m, index) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.skinTab,
                {
                  borderColor:
                    avatar.skinTone === (index + 1).toString() ? '#DB00FF' : 'transparent',
                  borderWidth: 1,
                  padding: 2,
                },
              ]}
              onPress={() =>
                updateAvatar({ gender: avatar.gender, skinTone: (index + 1).toString() })
              }
            >
              <View style={{ flex: 1, backgroundColor: m, borderRadius: 20 }}></View>
            </TouchableOpacity>
          ))}
        </View>
        {/* <View style={styles.SkintoneButtonWrapper}>
          <CustomButton
            text={`${t('previous')}`}
            variant='primary'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: 180 }}
            onPress={() => setToggle(false)}
          />
          <CustomButton
            onPress={() => (path === 'MidLevel' ? [handleSubmit(), setSteps(1)] : handleSubmit())}
            text={path === 'MidLevel' ? `${t('Next')}` : `${t('done')}`}
            variant='primary'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: 180 }}
          />
        </View> */}
      </View>
    </View>
  )
}

export default Skintone

const styles = StyleSheet.create({
  SkintoneContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    gap: 40,
  },

  bottomWrapper: {
    // padding: 24,
  },
  bottomTitle: {
    color: COLORS.textClr,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Arvo-Regular',
  },
  SkintoneButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  skinCollection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    gap: 12,
  },
  skinTab: {
    height: 72,
    width: 40,
    borderRadius: 30,
    overflow: 'hidden',
  },
})
