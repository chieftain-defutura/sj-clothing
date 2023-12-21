import React, { useCallback, useEffect, useState } from 'react'
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Image,
  Platform,
  Alert,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY } from '../styles/theme'
import CustomButton from './Button'
import DownArrow from '../assets/icons/DownArrow'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import { IReturns } from '../constant/types'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Timestamp, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite'
import { userStore } from '../store/userStore'

const { width, height } = Dimensions.get('window')

const initialValues = { description: '' }

interface IRefund {
  closeModal?: () => void
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

const dropdownItems = ['Issue on Size', 'Damage replacement']

const RefundModal: React.FC<IRefund> = ({ closeModal }) => {
  const [Issue, setIssue] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const user = userStore((state) => state.user)
  const [editProfileDisable, setEditProfileDisable] = useState(true)
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState)
  }

  const handleSelect = (item: string) => {
    setIssue(item)
    setIsDropdownOpen(false)
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      uploadImage(result.assets[0].uri)
    }
  }

  const uploadImage = async (uri: string) => {
    try {
      setIsLoading(true)
      setEditProfileDisable(false)
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
      setIsLoading(false)

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

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log('values', values)
      if (!user) return
      const docRef = doc(db, 'Returns', user?.uid)
      await setDoc(docRef, {
        createdAt: Timestamp.now(),
        updateAt: Timestamp.now(),
        description: values.description,
        issues: Issue,
        Image: url,
        status: 'pending',
      })
    } catch (e) {
      console.log('error', e)
    } finally {
      closeModal?.()
      setIsLoading(false)
    }
  }

  return (
    <Modal animationType='fade' transparent={true}>
      <RefundWrapper>
        <RefundContainer style={{ width: width / 1.2 }}>
          <RefundHeading>Refund</RefundHeading>

          <DropDownContainer>
            <View style={{ width: width / 1.4 }}>
              <SelectContent onPress={toggleDropdown}>
                <SelectText allowFontScaling={false}>{Issue || 'Select an Issue'}</SelectText>
                <Animatable.View
                  animation={isDropdownOpen ? 'rotate' : ''}
                  duration={500}
                  easing='ease-out'
                >
                  <DownArrow width={16} height={16} />
                </Animatable.View>
              </SelectContent>
              {isDropdownOpen && (
                <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
                  <SelectDropDownList>
                    {dropdownItems.map((item, index) => (
                      <Pressable key={index} onPress={() => handleSelect(item)}>
                        <SelectListText allowFontScaling={false}>{item}</SelectListText>
                      </Pressable>
                    ))}
                  </SelectDropDownList>
                </Animated.View>
              )}
            </View>
          </DropDownContainer>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange, handleSubmit, handleBlur }) => (
              <View style={{ paddingHorizontal: 12 }}>
                <LabelText allowFontScaling={false}>Description</LabelText>
                <InputBorder>
                  <InputStyle
                    placeholder='Enter your Description'
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    placeholderTextColor={COLORS.SecondaryTwo}
                    autoCorrect={false}
                    allowFontScaling={false}
                    style={styles.input}
                  />
                </InputBorder>

                <TouchableOpacity onPress={pickImage} style={{ paddingTop: 20 }}>
                  <View
                    style={{
                      borderColor: COLORS.strokeClr,
                      borderWidth: 1,
                      width: width / 1.4,
                      height: height / 5.5,
                      marginBottom: 20,
                      borderRadius: 8,
                      position: 'relative',
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                    >
                      <Text style={styles.uploadText}>Upload</Text>
                    </View>
                    <View style={{ paddingBottom: 24, position: 'absolute', top: -25 }}>
                      {selectedImage && (
                        <Image
                          source={{ uri: selectedImage }}
                          style={{
                            width: width / 1.4,
                            height: height / 5.5,
                            marginTop: 24,
                            objectFit: 'cover',
                          }}
                          alt='image-upload'
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center',
                    paddingBottom: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={closeModal}
                    style={{ borderRadius: 50, borderColor: '#462D85', borderWidth: 1.5 }}
                  >
                    <StyledView style={{ width: width / 3 }}>
                      <Text style={styles.btnText}>No</Text>
                    </StyledView>
                  </TouchableOpacity>
                  <CustomButton
                    text={isLoading ? 'Loading...' : 'Refund'}
                    onPress={handleSubmit}
                    style={{ width: selectedImage ? width / 3 : width / 3 }}
                    disabled={isLoading}
                  />
                </View>
              </View>
            )}
          </Formik>
        </RefundContainer>
      </RefundWrapper>
    </Modal>
  )
}

const RefundWrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.backgroundBlurClr};
`
const InputBorder = styled.View`
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const InputStyle = styled.TextInput`
  font-family: Gilroy-Medium;
  width: 100%;
  font-size: 12px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`
const SelectListText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  padding-horizontal: 12px;
  padding-vertical: 7px;
`

const RefundContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 12px;
`
const DropDownContainer = styled.View`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 16px;
  gap: 8px;
`

const SelectContent = styled.Pressable`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const SelectText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
`

const RefundHeading = styled.Text`
  font-size: 22px;
  font-family: Gilroy-SemiBold;
  color: ${COLORS.textClr};
  padding-bottom: 18px;
`

const LabelText = styled.Text`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: ${COLORS.textClr};
  font-family: Gilroy-Medium;
  margin-top: 16px;
  margin-bottom: 8px;
`

const StyledView = styled.View`
  padding: 13px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

export default RefundModal

const styles = StyleSheet.create({
  btnText: {
    fontSize: 16,
    color: '#462d85',
  },
  input: {
    ...Platform.select({
      ios: {
        paddingVertical: 12,
      },
    }),
  },
  uploadText: {
    fontSize: 16,
    color: COLORS.SecondaryTwo,
  },
})
