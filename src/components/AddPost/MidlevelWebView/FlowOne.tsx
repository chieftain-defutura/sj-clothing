import React, { useCallback, useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import uuid from 'react-native-uuid'
import { doc, setDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import Loader from '../../Loading'
import * as FileSystem from 'expo-file-system'

const { height, width } = Dimensions.get('window')

interface IFlowOneProps {
  uid: string
  steps: number
  setUid: React.Dispatch<React.SetStateAction<string>>
  color: string
  setAnimationUpdated: React.Dispatch<React.SetStateAction<boolean>>
  animationUpdated: boolean
  shake: () => void
  shakeAnimation: any
}

const FlowOne: React.FC<IFlowOneProps> = ({
  uid,
  steps,
  setUid,
  color,
  setAnimationUpdated,
  shake,
  animationUpdated,
  shakeAnimation,
}) => {
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const elementRef = useRef<View | null>(null)
  const [webviewLoading, setWebviewLoading] = useState(true)
  const isMounted = useRef(false)
  const avatar = userStore((state) => state.avatar)
  const webViewRef = useRef<any>(null)

  const handleSetUid = useCallback(async () => {
    if (!isMounted.current) {
      try {
        isMounted.current = true
        setAnimationUpdated(false)
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'ModelsMidlevel', tempUid)
        const docData: any = { uid: tempUid, skin: avatar?.skinTone, gender: avatar?.gender }
        if (color) {
          docData.color = color
          // docData.colorAnimationFinished = true
        }
        await setDoc(docRef, docData)

        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

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
  // const captureComponent = async () => {
  //   try {
  //     if (webViewRef.current) {
  //       const result = await webViewRef.current.capture()
  //       const blob = await uriToBlob(result)

  //       console.log(blob)
  //       // const imageRef = ref(storage, uid)
  //       // const task = uploadBytesResumable(imageRef, blob)

  //       // await task // Wait for the upload to complete

  //       // const url = await getDownloadURL(imageRef)
  //       // console.log(url)
  //     }
  //   } catch (error) {
  //     console.error('Error capturing component:', error)
  //   }
  // }
  const captureComponent = async () => {
    if (webViewRef.current) {
      try {
        const result = await webViewRef.current.capture()
        const fileContent = await FileSystem.readAsStringAsync(result, {
          encoding: FileSystem.EncodingType.Base64,
        })
        console.log('Image saved to gallery:', `data:image/jpeg;base64,${fileContent}`)
      } catch (error) {
        console.error('Error capturing image:', error)
      }
    }
  }
  return (
    <View
      style={{
        width: width / 1,
        height: steps === 5 ? height / 1 : height / 1.15,
        flex: steps === 5 ? 5 : 1,
        // zIndex: -100,
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
      {/* <View style={{ position: 'absolute', bottom: 0, zIndex: 10000 }}>
        <CustomButton text='capture' onPress={captureComponent} />
      </View> */}

      {/* <ViewShot ref={webViewRef} options={{ format: 'jpg', quality: 0.9 }} style={{ flex: 1 }}> */}
      {Boolean(pageY) && Boolean(elementHeight) && (
        <WebView
          style={{
            backgroundColor: 'transparent',
          }}
          source={{
            // uri: `http://localhost:5173/midlevel/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
            uri: `https://sj-threejs-development.netlify.app/midlevel/?uid=${uid}&pageY=${pageY}&h=${height}&elh=${elementHeight}`,
          }}
          scrollEnabled={false}
          onLoad={() =>
            setTimeout(() => {
              setWebviewLoading(false), 1000
            })
          }
          onHttpError={(value) => console.log('HTTP ERROR', value)}
        />
      )}
      {/* </ViewShot> */}

      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {!animationUpdated && !webviewLoading && <Loader />}
      </View>

      {/* <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <View>
          {!animationUpdated && (
            <TextAnimation shake={shake} shakeAnimation={shakeAnimation}>
              Please wait till avatar load
            </TextAnimation>
          )}
        </View>
      </View> */}
    </View>
  )
}

export default FlowOne

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
