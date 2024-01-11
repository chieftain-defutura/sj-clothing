import React, { useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Pressable, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import CustomButton from '../../Button'
import * as FileSystem from 'expo-file-system'
import { userStore } from '../../../store/userStore'
import axios from 'axios'

interface IUploadDesign {
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
  color: string
  setDone: React.Dispatch<React.SetStateAction<boolean>>
  setImageOrText: React.Dispatch<
    React.SetStateAction<{
      title: string
      position: string
      rate: number
      designs: {
        hashtag: string
        image: string
        originalImage: string
      }
    }>
  >
}
const { height, width } = Dimensions.get('window')
const UploadDesign: React.FC<IUploadDesign> = ({
  setDone,
  setImageOrText,
  isImageOrText,
  color,
}) => {
  const user = userStore((state) => state.user)
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const ref = useRef<any>(null)
  function resolveImage() {
    return require('../../../assets/images/PremiumImage/premium-img2.png')
  }

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.canceled) {
      uploadImage(result.assets[0].uri)
    }
  }
  const uploadImage = async (uri: string) => {
    try {
      setLoading(true)
      console.log(color)
      const fileContent = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      })
      const { data } = await axios.post('https://ruby-bull-robe.cyclic.app/canvas', {
        color: color,
        image: `data:image/jpeg;base64,${fileContent}`,
      })

      setImage(data.base64Image)

      setImageOrText({
        title: 'image',
        position: isImageOrText.position,
        rate: 0,
        designs: {
          hashtag: '',
          image: `data:image/jpeg;base64,${fileContent}`,
          originalImage: `data:image/png;base64,${data.base64Image}`,
        },
      })
      console.log('Image uploaded to the bucket!')
      setDone(true)
      setLoading(false)
    } catch (error) {
      console.error('Error uploading image:', error)
      setLoading(false)
      throw error
    }
  }

  return (
    <Animated.View
      entering={SlideInDown.duration(800)}
      exiting={SlideOutDown.duration(800)}
      style={{
        backgroundColor: COLORS.iconsNormalClr,
        padding: 24,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: width,
        height: height / 3,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}
      >
        <View>
          <Text
            allowFontScaling={false}
            style={{ fontSize: 16, color: COLORS.textClr, fontFamily: 'Arvo-Regular' }}
          >
            Upload Design
          </Text>
        </View>
        <Pressable onPress={() => setDone(true)}>
          <CloseIcon width={20} height={20} />
        </Pressable>
      </View>
      <View>
        {image ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Image
              source={{ uri: `data:image/png;base64,${image}` }}
              style={{ width: 200, height: 200 }}
              alt='upload-design-img'
            />
            <CustomButton
              text='ReSelect'
              style={{ width: 130 }}
              onPress={() =>
                setImageOrText((prevState) => ({
                  ...prevState,
                  image: '',
                }))
              }
            />
          </View>
        ) : (
          <CustomButton
            text={loading ? 'Loading...' : 'Select Image'}
            onPress={handleSelectImage}
            disabled={loading}
            style={{ marginTop: 18 }}
          />
        )}
      </View>
    </Animated.View>
  )
}

export default UploadDesign

const styles = StyleSheet.create({})
