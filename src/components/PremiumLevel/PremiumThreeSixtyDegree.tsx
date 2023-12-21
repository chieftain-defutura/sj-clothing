import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Platform,
} from 'react-native'
import { WebView } from 'react-native-webview'
import styled from 'styled-components/native'
import uuid from 'react-native-uuid'
import LeftArrow from '../../assets/icons/LeftArrow'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import CustomButton from '../Button'
import { doc, setDoc } from 'firebase/firestore/lite'
import { db } from '../../../firebase'
import { IPremiumData } from '../../constant/types'
import { userStore } from '../../store/userStore'
import AuthNavigate from '../../screens/AuthNavigate'
import { COLORS } from '../../styles/theme'
import InfoIcon from '../../assets/icons/MidlevelIcon/infoIcon'
// import { Audio } from 'expo-av'

interface IPremiumThreeSixtyDegree {
  focus: boolean
  data: IPremiumData
  errorMessage: string
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: () => Promise<void>
  setFocus: React.Dispatch<React.SetStateAction<boolean>>
}

const { width, height } = Dimensions.get('window')

const PremiumThreeSixtyDegree: React.FC<IPremiumThreeSixtyDegree> = ({
  setOpenDetails,
  data,
  handleSubmit,
  setFocus,
  focus,
  errorMessage,
}) => {
  const [webviewLoading, setWebviewLoading] = useState(true)
  const isMounted = useRef(false)
  const avatar = userStore((state) => state.avatar)
  const [uid, setUid] = useState<string>('')
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const elementRef = useRef<View | null>(null)

  // const playSound = async () => {
  //   const { sound } = await Audio.Sound.createAsync(require('../../assets/video/sound.mp3'))
  //   await sound.playAsync()
  // }

  // const handleImageClick = () => {
  //   playSound()
  // }

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
        const docRef = doc(db, 'ModelsPremium', tempUid)
        await setDoc(docRef, { uid: tempUid, skin: avatar.skinTone, gender: avatar.gender })

        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  useEffect(() => {
    handleSetUid()
    // handleImageClick()
  }, [handleSetUid])

  const onClose = () => {
    setFocus(false)
  }

  return (
    <Animated.View
      entering={SlideInRight.duration(500).delay(200)}
      exiting={SlideOutRight.duration(500).delay(200)}
    >
      <AuthNavigate focus={focus} onClose={onClose}>
        <View style={styles.linearGradient}>
          <FlexContent>
            <TouchableHighlight
              onPress={() => {
                setOpenDetails(false)
              }}
              activeOpacity={0.6}
              underlayColor='rgba(70, 45, 133, 0.2)'
              style={{ borderRadius: 100, width: 50, height: 50 }}
            >
              <View>
                <IconHoverPressable>
                  <LeftArrow width={24} height={24} style={{ marginTop: 10 }} />
                </IconHoverPressable>
              </View>
            </TouchableHighlight>
          </FlexContent>
          <View
            style={{
              width: width,
              height: height / 1.6,
              backgroundColor: 'transparent',
              marginTop: 18,
              position: 'relative',
            }}
            onLayout={(event) => handleLayout()}
            ref={elementRef}
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
                  // uri: `http://localhost:5173/premium/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
                  uri: `https://sj-threejs-development.netlify.app/premium/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
                }}
                scrollEnabled={false}
                onLoad={() => setWebviewLoading(false)}
              />
            )}
          </View>
          {errorMessage && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                position: 'absolute',
                bottom: 90,
                left: 90,
                zIndex: 1000,
              }}
            >
              <InfoIcon width={24} height={24} style={{ marginTop: 4 }} />
              <Text
                allowFontScaling={false}
                style={{
                  color: 'red',
                  fontFamily: 'Gilroy-Medium',
                  paddingTop: 3,
                  // width: width / 1,
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                {errorMessage}
              </Text>
            </View>
          )}
          <CustomButton
            text='Buy Now'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{
              width: '100%',
              paddingHorizontal: 18,
              position: 'absolute',
              bottom: 25,
            }}
            onPress={handleSubmit}
          />
        </View>
      </AuthNavigate>
    </Animated.View>
  )
}

const FlexContent = styled.View`
  margin-left: 22px;
`

const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

export default PremiumThreeSixtyDegree

const styles = StyleSheet.create({
  linearGradient: {
    height: height / 1.2,
    flex: 1,
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
