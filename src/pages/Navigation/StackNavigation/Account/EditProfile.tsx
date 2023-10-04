import React from 'react'
import { View, Dimensions, Pressable } from 'react-native'
import styled from 'styled-components/native'
import * as ImagePicker from 'expo-image-picker'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { COLORS, FONT_FAMILY } from '../../../../styles/theme'
import NotUserIcon from '../../../../assets/icons/AccountPageIcon/NotUserIcon'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import Input from '../../../../components/Input'
import { auth, db } from '../../../../../firebase'
import { doc, updateDoc } from 'firebase/firestore/lite'

const { width, height } = Dimensions.get('window')

interface IEditProfile {
  navigation: any
}

const validationSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
})

const EditProfile: React.FC<IEditProfile> = ({ navigation }) => {
  const [image, setImage] = React.useState<string | null>(null)

  const onSubmit = async () => {
    // try {
    //   const user = auth.currentUser
    //   if (user) {
    //     const userDocRef = doc(db, 'users', user.uid)
    //     await updateDoc(userDocRef, { fullName: formik.values.fullName })
    //     console.log('Full name updated successfully in Firestore.')
    //   }
    // } catch (error) {
    //   console.error('Error updating full name in Firestore:', error)
    // }
  }

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
    }
  }

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
          <Pressable onPress={() => navigation.navigate('Account')}>
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
  object-fit: fill;
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
