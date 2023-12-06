import React, { useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import { Audio } from 'expo-av'

const { height, width } = Dimensions.get('window')

interface ITShirtProps {
  uid: string
  steps: number
}

const TShirt: React.FC<ITShirtProps> = ({ uid, steps }) => {
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const elementRef = useRef<View | null>(null)
  const [webviewLoading, setWebviewLoading] = useState(true)

  const handleLayout = () => {
    if (elementRef.current) {
      elementRef.current.measure((x, y, width, height, pageX, pageY) => {
        setPageY(pageY)
        setElementHeight(height)
      })
    }
  }

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../../assets/video/sound.mp3'))
    await sound.playAsync()
  }

  const handleImageClick = () => {
    playSound()
  }

  useEffect(() => {
    handleImageClick()
  }, [])

  return (
    <View
      style={{
        width: width / 1,
        height: steps === 5 ? height / 2.2 : height / 1.3,
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
      {pageY && elementHeight && (
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

export default TShirt

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
