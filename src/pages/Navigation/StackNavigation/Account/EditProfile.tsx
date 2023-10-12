import React from 'react'
import { View, Dimensions, Pressable, Alert } from 'react-native'
import styled from 'styled-components/native'
import * as ImagePicker from 'expo-image-picker'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { COLORS, FONT_FAMILY } from '../../../../styles/theme'
import NotUserIcon from '../../../../assets/icons/AccountPageIcon/NotUserIcon'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import Input from '../../../../components/Input'
// import { auth, db, storage } from '../../../../../firebase'
// import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import storage from '@react-native-firebase/storage'
import { updateProfile } from 'firebase/auth'
import { userStore } from '../../../../store/userStore'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../../../firebase'

const { width, height } = Dimensions.get('window')

interface IEditProfile {
  navigation: any
}

const validationSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
})

const EditProfile: React.FC<IEditProfile> = ({ navigation }) => {
  const [image, setImage] = React.useState<string | null>(null)
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
    navigation.navigate('Account', { dName: values.fullName })
  }

  console.log('image', image)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      // await uploadImage(result.assets[0].uri)
    }
  }

  // const uploadImage = async (uri: string) => {
  //   try {
  //     const reference = storage().ref('black-t-shirt-sm.png')
  //     const task = reference.putFile(uri)

  //     task.on('state_changed', (taskSnapshot) => {
  //       console.log(
  //         `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
  //       )
  //     })

  //     await task // Wait for the upload to complete

  //     console.log('Image uploaded to the bucket!')
  //   } catch (error) {
  //     console.error('Error uploading image:', error)
  //     Alert.alert('Error', 'Failed to upload image')
  //     // You can also throw the error to handle it elsewhere if needed
  //     throw error
  //   }
  // }
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
