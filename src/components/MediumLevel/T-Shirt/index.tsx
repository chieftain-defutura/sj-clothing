import { StyleSheet, View, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import { WebView } from 'react-native-webview'
import uuid from 'react-native-uuid'
import { doc, setDoc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'

const { height, width } = Dimensions.get('window')

interface ITShirtProps {
  color: string
}

const TShirt: React.FC<ITShirtProps> = ({ color }) => {
  console.log('TSHIRT', color)
  const [uid, setUid] = useState<string | null>(null)
  const isMounted = useRef(false)

  const handleSetUid = useCallback(async () => {
    if (!isMounted.current) {
      try {
        console.log('rendered')
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'ModelsMidlevel', tempUid)
        await setDoc(docRef, { uid: tempUid })
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
    <View>
      <View
        style={{
          width: width / 1,
          height: height / 2.5,
          paddingBottom: 1,
        }}
      >
        <WebView
          source={{
            uri: `http://localhost:5173/midlevel/?uid=${uid}`,
            // uri: `https://sj-threejs-development.netlify.app/create-avatar/?uid=${uid}`,
          }}
        />
      </View>
      <View style={styles.selectSize360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>
    </View>
  )
}

const ShirtImg = styled.Image`
  width: 65%;
  height: 350px;
`

export default TShirt

const styles = StyleSheet.create({
  selectSizeTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectSize360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
