import React, { useCallback, useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import { doc, setDoc, updateDoc } from 'firebase/firestore/lite'
import uuid from 'react-native-uuid'

import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import { IDesigns } from '../../../constant/types'

const { height, width } = Dimensions.get('window')

interface IFlowTwoProps {
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
  designs: IDesigns[] | undefined
  imageApplied: boolean
}

const FlowTwo: React.FC<IFlowTwoProps> = ({ color, isImageOrText, designs, imageApplied }) => {
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const elementRef = useRef<View | null>(null)
  const [webviewLoading, setWebviewLoading] = useState(true)
  const [uid, setUid] = useState<string>('')
  const isMounted = useRef(false)
  const avatar = userStore((state) => state.avatar)

  const handleSetUid = useCallback(async () => {
    // if (!isMounted.current) {
    try {
      isMounted.current = true
      const tempUid = uuid.v4().toString()
      const docRef = doc(db, 'ModelsMidlevel', tempUid)

      const docObj: any = { uid: tempUid, skin: avatar?.skinTone, gender: avatar?.gender, color }

      if (imageApplied && isImageOrText.designs.originalImage) {
        if (designs) {
          designs?.forEach((f) => {
            const spottedImage = f.originalImages.find((f) => f.colorCode === color)
            if (spottedImage) {
              docObj.image = spottedImage.url
            }
          })
        } else {
          docObj.image = isImageOrText.designs.originalImage
        }
      } else if (isImageOrText.designs.originalImage) {
        if (designs) {
          designs?.forEach((f) => {
            const spottedImage = f.originalImages.find((f) => f.colorCode === color)
            if (spottedImage) {
              docObj.image = spottedImage.url
            }
          })
        } else {
          docObj.image = isImageOrText.designs.originalImage
        }
      }
      console.log(tempUid)
      console.log(docObj)
      await setDoc(docRef, docObj)

      setUid(tempUid)
    } catch (error) {
      console.log(error)
    }
    // }
  }, [color, isImageOrText, designs])

  useEffect(() => {
    handleSetUid()
  }, [handleSetUid])

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
        flex: 5,
        zIndex: -10,
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
      {Boolean(uid) && Boolean(pageY) && Boolean(elementHeight) && (
        <WebView
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
        />
      )}
    </View>
  )
}

export default FlowTwo

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
