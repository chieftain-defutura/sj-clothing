import {
  query as defaultQuery,
  collection as defualtCollection,
  where as defaultWhere,
  onSnapshot,
} from 'firebase/firestore'
import uuid from 'react-native-uuid'
import { WebView } from 'react-native-webview'
import { useTranslation } from 'react-i18next'
import { doc, setDoc, updateDoc } from 'firebase/firestore/lite'
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native'
import { COLORS } from '../../../styles/theme'
import { userStore } from '../../../store/userStore'
import { db, dbDefault } from '../../../../firebase'
import SelectYourSkintoneTooltip from '../../Tooltips/MidLevel/SelectYourSkintoneTooltip'
import { tooltipDisableStore } from '../../../store/TooltipDisable'
import { Audio } from 'expo-av'

const { height, width } = Dimensions.get('window')

interface ISkintone {}
const Skintone: React.FC<ISkintone> = ({}) => {
  const isMounted = useRef(false)
  const { t } = useTranslation('avatar')
  const elementRef = useRef<View | null>(null)
  const avatar = userStore((store) => store.avatar)
  const user = userStore((store) => store.user)
  const [uid, setUid] = useState<string | null>(null)
  const [pageY, setPageY] = useState<number | null>(null)
  const updateAvatar = userStore((store) => store.updateAvatar)
  const updateAnimation = userStore((store) => store.updateAnimation)
  const createAvatarAnimationFinished = userStore((store) => store.createAvatarAnimationFinished)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const [data, setData] = useState<{ uid: string; animationFinished?: boolean } | null>(null)
  const [webviewLoading, setWebviewLoading] = useState(true)
  const [toolTip, showToolTip] = useState(false)
  const updateDisable = tooltipDisableStore((state) => state.updateDisable)

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showSkinToneTooltip')

      if (data !== '11') {
        setTimeout(() => {
          updateDisable(false)
          AsyncStorage.setItem('showSkinToneTooltip', '11')
          updateDisable(true)
          showToolTip(true)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])
  let sound: Audio.Sound | null = null

  const playSound = async () => {
    try {
      if (sound === null) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('../../../assets/video/sound.wav'),
        )
        sound = newSound
      }
      await sound.playAsync()
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  const stopSound = async () => {
    try {
      if (sound !== null) {
        await sound.stopAsync()
        sound = null // Reset sound variable after stopping
      }
    } catch (error) {
      console.error('Error stopping sound:', error)
    }
  }

  const handleGetData = useCallback(() => {
    if (!uid) return
    const q = defaultQuery(
      defualtCollection(dbDefault, 'CreateAvatar'),
      defaultWhere('uid', '==', uid),
    )
    playSound()
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setData(doc.data() as any)
        if (doc.data()['animationFinished']) updateAnimation(doc.data()['animationFinished'])
      })
    })

    return () => {
      unsubscribe()
      stopSound()
    }
  }, [uid])

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
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'CreateAvatar', tempUid)
        await setDoc(docRef, { uid: tempUid, gender: avatar.gender, skin: avatar.skinTone || '3' })
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
    handleGetData()
  }, [handleSetUid, handleUpdateGender, handleUpdateSkintone, handleGetData])

  const handleSubmit = async (index: number) => {
    if (user) {
      updateAvatar({ gender: avatar.gender, skinTone: index.toString() })
      await updateDoc(doc(db, 'users', user.uid), {
        avatar: {
          gender: avatar.gender,
          skinTone: index.toString(),
        },
      })
    }
    if (!user) {
      updateAvatar({ gender: avatar.gender, skinTone: index.toString() })
    }
  }

  return (
    <View style={styles.SkintoneContainer}>
      <Text allowFontScaling={false} style={styles.bottomTitle}>
        {t('select your skintone')}
      </Text>
      <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOut}>
        <View
          style={{
            width: width / 1,
            height: height / 2,
            backgroundColor: 'transparent',
            position: 'relative',
          }}
          ref={elementRef}
          onLayout={handleLayout}
        >
          {webviewLoading && (
            <View style={styles.absoluteContainer}>
              <ActivityIndicator size='large' color={'#8C73CB'} />
            </View>
          )}
          {uid && pageY && elementHeight && (
            <WebView
              style={{
                backgroundColor: 'transparent',
              }}
              source={{
                // uri: `http://localhost:5173/create-avatar/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
                uri: `https://sj-threejs-development.netlify.app/create-avatar/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
              }}
              scrollEnabled={false}
              onLoad={() => setWebviewLoading(false)}
            />
          )}
        </View>
      </Animated.View>
      <View style={styles.bottomWrapper}>
        <View style={styles.skinCollection}>
          {['#a07160', '#c69d92', '#dabdaf'].map((m, index) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.skinTab,
                {
                  borderColor:
                    avatar.skinTone === (index + 2).toString() ? '#DB00FF' : 'transparent',
                  borderWidth: 1,
                  padding: 2,
                  opacity: !createAvatarAnimationFinished ? 0.7 : 1,
                },
              ]}
              onPress={() => handleSubmit(index + 2)}
              disabled={!createAvatarAnimationFinished}
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
      <SelectYourSkintoneTooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
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
    textTransform: 'uppercase',
    ...Platform.select({
      ios: {
        marginBottom: -40,
        width: width / 1.1,
        marginLeft: 20,
      },
    }),
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
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
