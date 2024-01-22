import React, { useCallback, useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { doc, setDoc, updateDoc } from 'firebase/firestore/lite'
import uuid from 'react-native-uuid'

import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import { IDesigns } from '../../../constant/types'
import TextAnimation from '../Navigation/TextAnimation'
import Loader from '../../Loading'

const { height, width } = Dimensions.get('window')

interface IFlowThreeProps {
  color: string
  isImageOrText: {
    title: string
    position: string
    rate: number
    designs: {
      hashtag: string
      image: string
      originalImage: string
    }
  }
  setAnimationUpdated: React.Dispatch<React.SetStateAction<boolean>>
  designs: IDesigns[] | undefined
  animationUpdated: boolean
  shake: () => void
  shakeAnimation: any
  setUid: React.Dispatch<React.SetStateAction<string>>
  uid: string
}

const FlowThree: React.FC<IFlowThreeProps> = ({
  color,
  isImageOrText,
  designs,
  animationUpdated,
  shake,
  setAnimationUpdated,
  shakeAnimation,
  setUid,
  uid,
}) => {
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const elementRef = useRef<View | null>(null)
  const [webviewLoading, setWebviewLoading] = useState(true)
  const [webLoader, setWebLoader] = useState(false)
  const isMounted = useRef(false)
  const avatar = userStore((state) => state.avatar)
  const webViewRef = useRef<any>(null)

  useEffect(() => {
    setAnimationUpdated(false)
  }, [])

  const handleSetUid = useCallback(async () => {
    if (!isMounted.current) {
      try {
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'ModelsMidlevel', tempUid)
        const docObj: any = { uid: tempUid, skin: avatar?.skinTone, gender: avatar?.gender, color }

        if (isImageOrText.designs.originalImage) {
          designs?.forEach((f) => {
            const spottedImage = f.originalImages.find((f) => f.colorCode === color)
            if (spottedImage) {
              docObj.image = spottedImage.url
            }
          })
        }

        await setDoc(docRef, docObj)

        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [color, isImageOrText])
  const handleUpdateImageAndText = useCallback(async () => {
    if (!isImageOrText.designs.originalImage || !uid) return
    try {
      const docRef = doc(db, 'ModelsMidlevel', uid)
      await updateDoc(docRef, { image: isImageOrText.designs.originalImage })
    } catch (error) {
      console.log(error)
    }
  }, [isImageOrText])

  useEffect(() => {
    handleSetUid()
    handleUpdateImageAndText()
  }, [handleSetUid, handleUpdateImageAndText])

  const handleLayout = () => {
    if (elementRef.current) {
      elementRef.current.measure((x, y, width, height, pageX, pageY) => {
        setPageY(pageY)
        setElementHeight(height)
      })
    }
  }

  useEffect(() => {
    try {
      if (isImageOrText.designs.image) {
        setWebLoader(true)
        if (webViewRef.current) {
          webViewRef.current.reload()
        }
        setTimeout(() => {
          setWebLoader(false)
        }, 5000)
      }
    } catch (error) {
      console.log(error)
      setWebLoader(false)
    }
  }, [isImageOrText])

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          width: width / 1,
          height: height / 1.15,
          flex: 1,
          backgroundColor: 'transparent',
          position: 'relative',
          opacity: webLoader ? 0 : 1,
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
            ref={webViewRef}
            style={{
              backgroundColor: 'transparent',
            }}
            source={{
              // uri: `http://localhost:5173/midlevel/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
              uri: `https://sj-threejs-development.netlify.app/midlevel/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
            }}
            scrollEnabled={false}
            onLoad={() => {
              setTimeout(() => {
                setWebviewLoading(false)
              }, 1000)
            }}
            onHttpError={(value) => console.log('HTTP ERROR', value)}
          />
        )}
      </View>
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        {webLoader && <Loader />}
      </View>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {animationUpdated && !webviewLoading && <Loader />}
      </View>
    </View>
  )
}

export default FlowThree

const styles = StyleSheet.create({
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
