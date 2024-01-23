import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect } from 'react'
import Slick from 'react-native-slick'
import * as ImagePicker from 'expo-image-picker'
import UndrawGiftBox from '../../../assets/icons/Undraw-gift-box'
import { COLORS } from '../../../styles/theme'
import { Video, ResizeMode } from 'expo-av'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../../firebase'
import { uriToBlob } from '../../Refund'
import * as FileSystem from 'expo-file-system'
import CloseIcon from '../../../assets/icons/Close'
import CloseRedIcon from '../../../assets/icons/CloseRedIcon'

interface ICarousle {
  isGiftVideo: any
  setGiftVideo: React.Dispatch<any>
  isImageOrText: {
    title: string
    position: string
    rate: number
    designs: {
      hashtag: string
      image: string
    }
  }
  productImage: string
  productId: string
}

const { height, width } = Dimensions.get('window')

const Carousle: React.FC<ICarousle> = ({
  isGiftVideo,
  setGiftVideo,
  isImageOrText,
  productImage,
  productId,
}) => {
  useEffect(() => {
    ;(async () => {
      // Request permission to access the user's media library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission to access media library is required!')
      }
    })()
  }, [])
  console.log(productId)

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      })

      if (!result.canceled) {
        const selectedVideoUri = result.assets?.[0]?.uri
        uploadVideo(selectedVideoUri)
      }
    } catch (error) {
      console.error('Error picking a video', error)
    }
  }

  const uploadVideo = async (videoUri: string) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(videoUri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      // const blob = await uriToBlob(videoUri)
      // const imageRef = ref(storage, productId)
      // const task = uploadBytesResumable(imageRef, blob)

      // await task

      // const url = await getDownloadURL(imageRef)

      // console.log('videourl:', url)
      setGiftVideo(`data:image/jpeg;base64,${fileContent}`)
    } catch (error) {
      console.error('Error uploading Video:', error)
      Alert.alert('Error', 'Failed to upload video')
    }
  }

  return (
    <Slick
      style={styles.wrapper}
      showsButtons={false}
      dotStyle={{ width: 4, height: 4, backgroundColor: COLORS.slickDotClr }}
      activeDotStyle={{ backgroundColor: COLORS.textSecondaryClr, width: 12, height: 4 }}
    >
      <View style={styles.slide1}>
        {productImage ? (
          <Image
            source={{ uri: productImage }}
            alt=''
            style={{ objectFit: 'contain', width: width / 1, height: height / 2.5 }}
          />
        ) : (
          <Image
            source={require('../../../assets/images/plain-shirt.png')}
            alt='carousle-img'
            style={{ width: width / 2, height: height / 2.5, objectFit: 'contain' }}
          />
        )}
      </View>
      {isImageOrText.designs.image && (
        <View style={styles.slide2}>
          <Image
            style={{ objectFit: 'cover', width: 400, height: 400 }}
            source={{ uri: `${isImageOrText.designs.image}` }}
            alt='carousle-img'
          />
        </View>
      )}
      <View style={styles.slide3}>
        {isGiftVideo ? (
          <View
            style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 10 }}
          >
            <TouchableOpacity
              onPress={() => setGiftVideo('')}
              style={{
                borderRadius: 50,
                borderColor: 'red',
                borderWidth: 1.5,
              }}
            >
              <CloseRedIcon width={40} height={40} />
            </TouchableOpacity>
            <Video
              source={{ uri: isGiftVideo }}
              shouldPlay
              style={{ width: width / 1.1, height: height / 2.5 }}
              isLooping
              resizeMode={ResizeMode.COVER}
              useNativeControls={false}
            />
          </View>
        ) : (
          <View style={{ marginTop: -35 }}>
            <UndrawGiftBox />
            <View style={{ paddingVertical: 16 }}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'center',
                  fontSize: 22,
                  fontFamily: 'Arvo-Regular',
                  color: COLORS.textClr,
                }}
              >
                Upload Your
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'center',
                  fontSize: 22,
                  fontFamily: 'Arvo-Regular',
                  color: COLORS.textSecondaryClr,
                }}
              >
                Gift unboxing video
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'center',
                  fontSize: 22,
                  fontFamily: 'Arvo-Regular',
                  color: COLORS.textClr,
                }}
              >
                here!
              </Text>
            </View>
            <Pressable onPress={pickVideo} style={styles.button}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontFamily: 'Gilroy-Regular',
                  color: COLORS.textSecondaryClr,
                }}
              >
                Upload
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Slick>
  )
}

export default Carousle

const styles = StyleSheet.create({
  wrapper: {
    height: height / 2,
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    borderColor: COLORS.textSecondaryClr,
    borderWidth: 1,
    borderRadius: 50,
    width: 250,
    paddingVertical: 8,
    opacity: 0.4,
    fontSize: 12,
    marginTop: -10,
  },
})
