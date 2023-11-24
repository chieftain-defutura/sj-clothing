import React, { useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const { height, width } = Dimensions.get('window')

interface ITShirtProps {
  uid: string
  steps: number
}

const TShirt: React.FC<ITShirtProps> = ({ uid, steps }) => {
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

  return (
    <View
      style={{
        width: width / 1,
        height: steps === 5 ? height / 2.2 : height / 1.3,
        // flex: 1,
        zIndex: 1,
        backgroundColor: 'transparent',
      }}
      ref={elementRef}
      onLayout={handleLayout}
    >
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
        />
      )}
    </View>
  )
}

export default TShirt

const styles = StyleSheet.create({})
