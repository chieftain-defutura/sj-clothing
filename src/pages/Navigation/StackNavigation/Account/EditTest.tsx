import React, { useState } from 'react'
import { View, Image, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import storage from '@react-native-firebase/storage'
import 'firebase/storage'

const EditTest = () => {
  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      uploadImage(result.assets[0].uri)
    }
  }
  const uploadImage = async (uri: string) => {
    try {
      const url = storage().ref('images/').getDownloadURL()
      console.log(url)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title='Pick an image from camera roll' onPress={pickImage} />
    </View>
  )
}

export default EditTest
