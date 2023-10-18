import React, { useState } from 'react'
import { View, Dimensions, Pressable } from 'react-native'
import styled from 'styled-components/native'
import * as ImagePicker from 'expo-image-picker'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { COLORS, FONT_FAMILY } from '../../../../styles/theme'
import NotUserIcon from '../../../../assets/icons/AccountPageIcon/NotUserIcon'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import Input from '../../../../components/Input'
import { updateProfile } from 'firebase/auth'
import { userStore } from '../../../../store/userStore'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../../../firebase'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../../../firebase'

const { width, height } = Dimensions.get('window')

interface IEditProfile {
  navigation: any
}

const validationSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
})

const EditProfile: React.FC<IEditProfile> = ({ navigation }) => {
  const [image, setImage] = React.useState<any>()
  const [uploading, setUploading] = useState(false)
  const user = userStore((state) => state.user)
  const updateName = userStore((name) => name.updateName)

  const onSubmit = async (values: { fullName: string }) => {
    if (user) {
      updateName(user?.displayName)
      updateProfile(user, { displayName: values.fullName })
      await updateDoc(doc(db, 'users', user.uid), {
        name: values.fullName,
        profile: image,
      })
    } else console.log('error')
    navigation.navigate('Account', { dName: values.fullName, profileImg: image })
    console.log('navigated ', { dName: values.fullName, profileImg: image })
  }

  // const onSubmit = async (values: { fullName: string }) => {
  //   if (user) {
  //     updateName(user?.displayName)

  //     // Upload the image to Firebase Storage
  //     if (image) {
  //       const storageRef = ref(storage, 'profile_images/' + user.uid)
  //       try {
  //         const response = await uploadFile(storageRef, image, 'data_url')
  //         const downloadURL = await getDownloadURL(response.ref)
  //         await updateDoc(doc(db, 'users', user.uid), {
  //           name: values.fullName,
  //           profile: downloadURL,
  //         })
  //       } catch (error) {
  //         console.error('Error uploading file to Firebase Storage:', error)
  //       }
  //     } else {
  //       await updateDoc(doc(db, 'users', user.uid), {
  //         name: values.fullName,
  //       })
  //     }

  //     navigation.navigate('Account', { dName: values.fullName, profileImg: image })
  //     console.log('navigated ', { dName: values.fullName, profileImg: image })
  //   } else {
  //     console.log('error')
  //   }
  // }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg',
  }

  const storageRef = ref(storage, 'images/')
  const uploadTask = uploadBytesResumable(storageRef, image, metadata)

  console.log('storageRef', storageRef)

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      // console.log('Upload is ' + progress + '% done')
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
      }
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break
        case 'storage/canceled':
          // User canceled the upload
          break

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
      })
    },
  )

  const formik = useFormik({
    initialValues: {
      fullName: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <View>
      <UserWrapper style={{ width: width, height: height / 2.5 }}>
        <FlexContent>
          <Pressable
            onPress={() => {
              navigation.goBack()
            }}
          >
            <LeftArrow width={24} height={24} />
          </Pressable>
          <Pressable
            onPress={() => {
              formik.handleSubmit()
            }}
          >
            <LocationText>Done</LocationText>
          </Pressable>
        </FlexContent>
        <NotUserContent onPress={pickImage}>
          {image ? (
            <ProfileImage
              source={{ uri: image }}
              style={{
                width: 128,
                height: 128,
                resizeMode: 'cover',
                borderRadius: 100,
              }}
            />
          ) : (
            <NotUserIcon width={128} height={128} />
          )}
          <ChangeProfileText>Change profile picture</ChangeProfileText>
        </NotUserContent>
      </UserWrapper>
      <View style={{ padding: 16 }}>
        <Label>Full name</Label>
        <Input
          placeholder='John David'
          value={formik.values.fullName}
          onChangeText={formik.handleChange('fullName')}
          onBlur={formik.handleBlur('fullName')}
        />
        {formik.errors.fullName && <ErrorText>{formik.errors.fullName}</ErrorText>}
      </View>
    </View>
  )
}

const UserWrapper = styled.View`
  position: relative;
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`
const NotUserContent = styled.Pressable`
  align-items: center;
  justify-content: center;
  flex: 1;
`

const ErrorText = styled.Text`
  font-size: 12px;
  color: ${COLORS.errorClr};
`

const ChangeProfileText = styled.Text`
  font-size: 12px;
  font-family: ${FONT_FAMILY.GilroySemiBold};
  color: ${COLORS.textSecondaryClr};
  margin-top: 8px;
`
const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 16px;
  padding-top: 16px;
`

const ProfileImage = styled.Image`
  width: 100%;
  overflow: hidden;
`

const Label = styled.Text`
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.iconsHighlightClr};
  font-size: 14px;
  margin-bottom: 8px;
`

const LocationText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.iconsHighlightClr};
`

export default EditProfile
