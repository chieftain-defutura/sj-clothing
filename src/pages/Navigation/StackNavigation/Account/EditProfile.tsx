import React, { useState } from 'react'
import {
  View,
  Dimensions,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import styled from 'styled-components/native'
import * as ImagePicker from 'expo-image-picker'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../../styles/theme'
import NotUserIcon from '../../../../assets/icons/AccountPageIcon/NotUserIcon'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import Input from '../../../../components/Input'
import { userStore } from '../../../../store/userStore'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { db, storage } from '../../../../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '../../../../components/Button'
import { updateProfile as updateProfileDb } from 'firebase/auth'
import CameraIcon from '../../../../assets/icons/AccountPageIcon/Camera'

const { width, height } = Dimensions.get('window')

interface IEditProfile {
  navigation: any
}

export function uriToBlob(uri: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onload = function () {
      resolve(xhr.response)
    }

    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'))
    }

    xhr.responseType = 'blob'

    xhr.open('GET', uri, true)

    xhr.send(null)
  })
}

const validationSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
})

const EditProfile: React.FC<IEditProfile> = ({ navigation }) => {
  const user = userStore((state) => state.user)
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const updateName = userStore((name) => name.updateName)
  const profile = userStore((state) => state.profile)
  const [image, setImage] = React.useState<string | null>(profile)
  const updateProfile = userStore((state) => state.updateProfile)
  const [editProfileDisable, setEditProfileDisable] = useState(false)
  console.log('urlggfgu', url)

  const onSubmit = async (values: { fullName: string }) => {
    try {
      setIsLoading(true)
      if (user) {
        updateName(user?.displayName)
        updateProfile(url)
        await updateProfileDb(user, { displayName: values.fullName, photoURL: url })
        console.log('urlll', url)

        await updateDoc(doc(db, 'users', user.uid), {
          name: values.fullName,
          profile: url,
        })
      } else console.log('error')
      navigation.navigate('Account', { dName: values.fullName, profileImg: image })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
      console.log('urrl', url)
      setUrl(url)
      console.log('1', editProfileDisable)

      console.log('Image uploaded to the bucket!')

      setEditProfileDisable(true)
      console.log('2', editProfileDisable)
    } catch (error) {
      console.error('Error uploading image:', error)
      Alert.alert('Error', 'Failed to upload image')
      throw error
    }
  }

  const formik = useFormik({
    initialValues: {
      fullName: user?.displayName ? user.displayName : '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
      <UserWrapper style={{ width: width, height: height / 2.5 }}>
        <FlexContent>
          <TouchableHighlight
            onPress={() => {
              navigation.goBack()
            }}
            activeOpacity={0.6}
            underlayColor='rgba(70, 45, 133, 0.1)'
            style={{ borderRadius: 100 }}
          >
            <IconHoverClr>
              <IconHoverPressable>
                <LeftArrow width={24} height={24} style={{ marginTop: -10 }} />
              </IconHoverPressable>
            </IconHoverClr>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.6} underlayColor='rgba(70, 45, 133, 0.1)'>
            <View>
              <CustomButton
                style={{ padding: 2 }}
                fontSize={11}
                text={isLoading ? 'Saving' : 'Done'}
                disabled={!editProfileDisable || isLoading}
                onPress={() => {
                  formik.handleSubmit()
                }}
              />
              {/* <LocationText allowFontScaling={false}>Done</LocationText> */}
            </View>
          </TouchableHighlight>
        </FlexContent>
        <NotUserContent>
          <View>
            {image ? (
              <ProfileImage
                source={{ uri: image }}
                style={{
                  width: 170,
                  height: 170,
                  resizeMode: 'cover',
                  borderRadius: 100,
                }}
                alt='edit-profile-img'
              />
            ) : user?.photoURL ? (
              <ProfileImage
                source={{ uri: user.photoURL }}
                style={{
                  width: 128,
                  height: 128,
                  resizeMode: 'cover',
                  borderRadius: 100,
                }}
                alt='edit-profile-img'
              />
            ) : (
              <NotUserIcon width={128} height={128} />
            )}

            {/* {user?.photoURL ? (
              <ChangeProfileText allowFontScaling={false}>Change profile picture</ChangeProfileText>
            ) : (
              <ChangeProfileText allowFontScaling={false}>Choose profile picture</ChangeProfileText>
            )} */}
          </View>
          <View style={{ marginTop: 12 }}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor='rgba(70, 45, 133, 0.1)'
              onPress={pickImage}
            >
              <View>
                <ChangeProfileText allowFontScaling={false}>Remove profile</ChangeProfileText>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ position: 'absolute', bottom: 80, right: 130 }}>
            <TouchableOpacity onPress={pickImage}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#462D85', '#DB00FF']}
                style={styles.plusIconGradientColor}
              >
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <CameraIcon width={20} height={20} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </NotUserContent>
      </UserWrapper>
      <View style={{ padding: 20, marginHorizontal: 8, marginTop: 8 }}>
        <Label allowFontScaling={false}>Full name</Label>
        <Input
          placeholder='John David'
          value={formik.values.fullName}
          onChangeText={formik.handleChange('fullName')}
          onBlur={formik.handleBlur('fullName')}
        />
        {formik.errors.fullName && (
          <ErrorText allowFontScaling={false}>{formik.errors.fullName}</ErrorText>
        )}
      </View>
    </LinearGradient>
  )
}

const UserWrapper = styled.View`
  position: relative;
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-width: 0;
`
const NotUserContent = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`

const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 10px;
  padding: 10px;
`

const ErrorText = styled.Text`
  font-size: 12px;
  color: ${COLORS.errorClr};
`

const ChangeProfileText = styled.Text`
  font-size: 12px;
  font-family: ${FONT_FAMILY.GilroySemiBold};
  color: ${COLORS.textSecondaryClr};
  padding: 4px;
  text-align: center;
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
const IconHoverClr = styled.View``

const LocationText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.iconsHighlightClr};
  padding-top: 8px;
  padding-horizontal: 8px;
`

export default EditProfile

const styles = StyleSheet.create({
  plusIconGradientColor: {
    backgroundColor: '#462d85',
    borderRadius: 70,
    padding: 16,
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
