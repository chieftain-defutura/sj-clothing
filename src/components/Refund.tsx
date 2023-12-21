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
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import styled from 'styled-components/native'
import { COLORS, FONT_FAMILY } from '../styles/theme'
import CustomButton from './Button'
import DownArrow from '../assets/icons/DownArrow'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import * as ImagePicker from 'expo-image-picker'
import { collection, getDocs } from 'firebase/firestore/lite'
import { Formik } from 'formik'
import { db } from '../../firebase'
import { IReturns } from '../constant/types'

const { width, height } = Dimensions.get('window')

const initialValues = { description: '' }

interface IRefund {
  closeModal?: () => void
}

const RefundModal: React.FC<IRefund> = ({ closeModal }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [data, setData] = useState<IReturns[]>()
  const [dropdownItems, setDropdownItems] = useState<string[]>([
    'Issue on Size',
    'Damage replacement',
  ])

  console.log('data', data)

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState)
  }

  const handleSelect = (item: string) => {
    setSelectedCountry(item)
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
    }
  }

  const handleSubmit = (values: typeof initialValues) => {
    console.log('values', values)
  }

  // const getData = useCallback(async () => {
  //   try {
  //     const ProductRef = await getDocs(collection(db, 'Returns'))
  //     const fetchProduct = ProductRef.docs.map((doc) => ({
  //       id: doc.id,
  //       ...(doc.data() as any),
  //     }))
  //     setData(data)
  //     console.log('fetchProduct', fetchProduct)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [db])

  // useEffect(() => {
  //   getData()
  // }, [getData])

  return (
    <Modal animationType='fade' transparent={true}>
      <RefundWrapper>
        <RefundContainer style={{ width: width / 1.2 }}>
          <RefundHeading>Refund</RefundHeading>

          <DropDownContainer>
            <View style={{ width: width / 1.4 }}>
              <SelectContent onPress={toggleDropdown}>
                <SelectText allowFontScaling={false}>
                  {selectedCountry || 'Select an Issue'}
                </SelectText>
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
                    text='Refund'
                    onPress={handleSubmit}
                    style={{ width: selectedImage ? width / 3 : width / 3 }}
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
