import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, Dimensions, Image, View, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import styled from 'styled-components/native'
import uuid from 'react-native-uuid'

import LeftArrow from '../../assets/icons/LeftArrow'
// import ThreeSixtyDegree from '../../assets/icons/360-degree'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import CustomButton from '../Button'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite'
import { db } from '../../../firebase'
import { IPremiumData } from '../../constant/types'
import { userStore } from '../../store/userStore'
import AuthNavigate from '../../screens/AuthNavigate'
import { COLORS } from '../../styles/theme'

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
  const [isPressed, setIsPressed] = useState(false)
  const isMounted = useRef(false)
  const avatar = userStore((state) => state.avatar)
  const [uid, setUid] = useState<string>('')
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
            <Pressable
              onPress={() => {
                setOpenDetails(false)
              }}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              {() => (
                <IconHoverClr
                  style={{ backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.5)' : 'transparent' }}
                >
                  <IconHoverPressable>
                    <LeftArrow width={24} height={24} />
                  </IconHoverPressable>
                </IconHoverClr>
              )}
            </Pressable>
          </FlexContent>
          <View
            style={{
              width: width / 1.1,
              height: height / 1.6,
              backgroundColor: 'transparent',
              marginTop: 18,
            }}
            onLayout={(event) => handleLayout()}
            ref={elementRef}
          >
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
              />
            )}
          </View>
          {/* <ThreeSixtyDegreeImageWrapper>
            <ThreeSixtyDegreeImage>
              <Image
                source={{ uri: data.productImage }}
                style={{
                  resizeMode: 'contain',
                  width: width * 0.9,
                  height: height * 0.55,
                  marginTop: 30,
                }}
              />
            </ThreeSixtyDegreeImage>
           </ThreeSixtyDegreeImageWrapper> */}
          {errorMessage && (
            <Text
              style={{
                textAlign: 'center',
                marginBottom: -20,
                marginTop: 10,
                color: COLORS.textSecondaryClr,
                fontFamily: 'Gilroy-Medium',
              }}
            >
              {errorMessage}
            </Text>
          )}
          <CustomButton
            text='Buy Now'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: '100%', marginTop: 42 }}
            onPress={handleSubmit}
          />
        </View>
      </AuthNavigate>
    </Animated.View>
  )
}

const ThreeSixtyDegreeImage = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
`
const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ThreeSixtyDegreeImageWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

const IconHoverClr = styled.View`
  border-radius: 20px;
  width: 32px;
  height: 32px;
`

const SelectStyle360Degree = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export default PremiumThreeSixtyDegree

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
    height,
  },
})
