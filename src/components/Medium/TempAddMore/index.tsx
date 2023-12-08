import React, { useCallback, useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import { doc, setDoc, updateDoc } from 'firebase/firestore/lite'
import uuid from 'react-native-uuid'

import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'

const { height, width } = Dimensions.get('window')

interface ITempAddMoreProps {
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
}

const TempAddMore: React.FC<ITempAddMoreProps> = ({ color, isImageOrText }) => {
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const elementRef = useRef<View | null>(null)
  const [webviewLoading, setWebviewLoading] = useState(true)
  const [uid, setUid] = useState<string>('')
  const isMounted = useRef(false)
  const avatar = userStore((state) => state.avatar)

  const handleSetUid = useCallback(async () => {
    if (!isMounted.current) {
      try {
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'ModelsMidlevel', tempUid)
        await setDoc(docRef, {
          uid: tempUid,
          skin: avatar?.skinTone,
          gender: avatar?.gender,
          color,
        })

        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [color])

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
  return (
    <View
      style={{
        width: width / 1,
        height: height / 1.3,
        // flex: 1,
        zIndex: 1,
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
            // uri: `http://localhost:5173/midlevel/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
            uri: `https://sj-threejs-development.netlify.app/midlevel/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
          }}
          scrollEnabled={false}
          onLoad={() => setWebviewLoading(false)}
        />
      )}
    </View>
  )
}

export default TempAddMore

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
