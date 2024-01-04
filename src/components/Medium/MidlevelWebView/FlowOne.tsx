import React, { useCallback, useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator, Dimensions, StyleSheet, View, Text } from 'react-native'
import uuid from 'react-native-uuid'
import { doc, setDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import TextAnimation from '../Navigation/TextAnimation'
import Loader from '../../Loading'

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

  return (
    <View
      style={{
        width: width / 1,
        height: steps === 5 ? height / 1 : height / 1.3,
        flex: steps === 5 ? 5 : 1,
        zIndex: -100,
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

      {/* {steps === 1 && ( */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {!animationUpdated && !webviewLoading && (
          // <TextAnimation shake={shake} shakeAnimation={shakeAnimation}>
          //   Please wait till avatar load
          // </TextAnimation>
          <Loader />
        )}
      </View>
      {/* )} */}
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
