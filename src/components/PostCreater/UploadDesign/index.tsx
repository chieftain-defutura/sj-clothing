import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Pressable, StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'

import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import CustomButton from '../../Button'
import { uriToBlob } from '../../../pages/Navigation/StackNavigation/Account/EditProfile'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../../firebase'
import { userStore } from '../../../store/userStore'

interface IUploadDesign {
  isImageOrText: {
    title: string
    image: string
    position: string
  }
  setDone: React.Dispatch<React.SetStateAction<boolean>>
  setImageOrText: React.Dispatch<
    React.SetStateAction<{
      title: string
      image: string
      position: string
    }>
  >
}
const { height, width } = Dimensions.get('window')
const UploadDesign: React.FC<IUploadDesign> = ({ setDone, setImageOrText, isImageOrText }) => {
  const { user } = userStore()
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
      const blob = await uriToBlob(uri)

      const imageRef = ref(storage, user?.uid)
      const task = uploadBytesResumable(imageRef, blob)

      task.on('state_changed', (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        )
      })

      await task // Wait for the upload to complete

      const url = await getDownloadURL(imageRef)
      setImageOrText((prevState) => ({
        ...prevState,
        image: url,
      })),
        console.log('Image uploaded to the bucket!')
    } catch (error) {
      console.error('Error uploading image:', error)
      Alert.alert('Error', 'Failed to upload image')
      // You can also throw the error to handle it elsewhere if needed
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
          <Text style={{ fontSize: 16, color: COLORS.textClr, fontFamily: 'Arvo-Regular' }}>
            Upload Design
          </Text>
        </View>
        <Pressable onPress={() => setDone(true)}>
          <CloseIcon width={20} height={20} />
        </Pressable>
      </View>
      <View>
        {isImageOrText.image ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Image source={{ uri: isImageOrText.image }} style={{ width: 200, height: 200 }} />
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
          <CustomButton text='Select Image' onPress={handleSelectImage} />
        )}
      </View>
    </Animated.View>
  )
}

export default UploadDesign

const styles = StyleSheet.create({})
