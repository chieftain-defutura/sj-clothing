import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import uuid from 'react-native-uuid'
import { WebView } from 'react-native-webview'
import CustomButton from '../../../components/Button'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import { useNavigation, StackActions } from '@react-navigation/native'

import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  StretchInX,
  StretchOutX,
} from 'react-native-reanimated'
import { userStore } from '../../../store/userStore'
import { doc, setDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'

const { height } = Dimensions.get('window')
const Thankyou = () => {
  const isMounted = useRef(false)
  const navigation = useNavigation()
  const elementRef = useRef<View | null>(null)
  const avatar = userStore((store) => store.avatar)
  const [uid, setUid] = useState<string | null>(null)
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const [webviewLoading, setWebviewLoading] = useState(true)

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
        const docRef = doc(db, 'Greetings', tempUid)
        await setDoc(docRef, { uid: tempUid, gender: avatar.gender, skin: avatar.skinTone || '3' })
        console.log('added')
        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  useEffect(() => {
    handleSetUid()
  }, [handleSetUid])

  return (
    <LinearGradient style={{ flex: 1 }} colors={gradientOpacityColors}>
      <View style={{ flex: 1 }}>
        <Animated.View
          entering={StretchInX.duration(1000)}
          exiting={StretchOutX}
          style={{ height: 70 }}
        >
          <Text allowFontScaling={false} style={styles.title}>
            Thank You
          </Text>
        </Animated.View>
        <View
          style={{
            height: height - 70,
          }}
          ref={elementRef}
          onLayout={handleLayout}
        >
          {webviewLoading && (
            <View style={styles.absoluteContainer}>
              <ActivityIndicator size='large' color={'#8C73CB'} />
            </View>
          )}
          {Boolean(uid) && Boolean(pageY) && Boolean(elementHeight) && (
            <WebView
              style={{
                backgroundColor: 'transparent',
              }}
              source={{
                // uri: `http://localhost:5173/create-avatar/?uid=${uid}`,
                uri: `https://sj-threejs-development.netlify.app/thankyou?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
              }}
              scrollEnabled={false}
              onLoad={() => setWebviewLoading(false)}
            />
          )}
        </View>
        <CustomButton
          variant='primary'
          text='View Orders'
          fontFamily='Arvo-Regular'
          onPress={() => navigation.dispatch(StackActions.replace('MyOrders'))}
          fontSize={16}
          style={{
            padding: 16,
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        />
      </View>
    </LinearGradient>
  )
}

export default Thankyou

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: COLORS.textClr,
    fontFamily: FONT_FAMILY.ArvoRegular,
    textAlign: 'center',
    padding: 14,
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
