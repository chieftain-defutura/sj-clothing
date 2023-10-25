import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import Search from '../../assets/icons/SearchIcon'
import TickIcon from '../../assets/icons/TickIcon'
import CustomButton from '../Button'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import Input from '../Input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import HomeIcon from '../../assets/icons/HomeIcon'

interface IEditAddress {
  onEditPress: () => void
}
const validationSchema = yup.object({
  editAddress: yup.string().required('please enter full address'),
  floor: yup.string().required('Please enter your floor'),
  landmark: yup.string().required('Please enter landmark'),
  displayName: yup.string().required('Enter a display name'),
})

const EditAddress: React.FC<IEditAddress> = ({ onEditPress }) => {
  const [onText, setOnSearchChange] = React.useState<string>()
  const [keyboardStatus, setKeyboardStatus] = React.useState('')
  const [checked, setChecked] = React.useState('first')
  const onSubmit = () => {
    console.log('submitted')
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown')
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden')
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      editAddress: '',
      floor: '',
      landmark: '',
      displayName: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  const handleSearchText = (text: string) => {
    setOnSearchChange(text)
  }
  return (
    <KeyboardAvoidingView style={styles.flexBox} enabled={true} behavior={'padding'}>
      <TouchableWithoutFeedback style={styles.flexBox} onPress={() => Keyboard.dismiss()}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.currentLocation}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <HomeIcon width={16} height={16} />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={styles.RadioTitle}>
                    <HeaderStyle>Home</HeaderStyle>
                  </View>
                  <DescriptionText>
                    Madras Christian College, East Tambaram, Chennai - 600 059.
                  </DescriptionText>
                </View>
              </View>

              <Pressable style={styles.editStyle}>
                <ChangeText>Change</ChangeText>
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.header}>Edit address</Text>
              <View>
                <Input
                  placeholder='Dewallstreet, No.1, Mahalakshmi...'
                  value={formik.values.editAddress}
                  onChangeText={formik.handleChange('editAddress')}
                  onBlur={formik.handleBlur('editAddress')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {formik.errors.editAddress && <ErrorText>{formik.errors.editAddress}</ErrorText>}
              </View>
              <View>
                <Input
                  placeholder='F2'
                  value={formik.values.floor}
                  onChangeText={formik.handleChange('floor')}
                  onBlur={formik.handleBlur('floor')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {formik.errors.floor && <ErrorText>{formik.errors.floor}</ErrorText>}
              </View>
              <View>
                <Input
                  placeholder='Madras Christian College'
                  value={formik.values.landmark}
                  onChangeText={formik.handleChange('landmark')}
                  onBlur={formik.handleBlur('landmark')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {formik.errors.landmark && <ErrorText>{formik.errors.landmark}</ErrorText>}
              </View>
              <View>
                <Input
                  placeholder='Home'
                  value={formik.values.displayName}
                  onChangeText={formik.handleChange('displayName')}
                  onBlur={formik.handleBlur('displayName')}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {formik.errors.displayName && <ErrorText>{formik.errors.displayName}</ErrorText>}
              </View>

              <CustomButton
                variant='primary'
                text='Save address'
                leftIcon={<TickIcon width={16} height={16} />}
                onPress={() => {
                  onEditPress()
                }}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const ChangeText = styled.Text`
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.textSecondaryClr};
  font-size: 12px;
`

const HeaderStyle = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

const DescriptionText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-size: 12px;
  font-family: Gilroy-Regular;
  line-height: 18px;
  width: 225px;
`

const ErrorText = styled.Text`
  font-size: 12px;
  color: ${COLORS.errorClr};
`

export default EditAddress

const styles = StyleSheet.create({
  searchInputBox: {
    borderColor: '#efcef5',
    borderWidth: 1,
    borderRadius: 36,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 2,
    marginVertical: 8,
    gap: 8,
  },
  inputBox: {
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    marginVertical: 8,
  },
  currentLocation: {
    borderWidth: 1,
    borderColor: '#efcef5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  RadioTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  editStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  editText: {
    color: '#DB00FF',
    fontSize: 14,
  },
  inputContainer: {
    gap: 16,
  },
  header: {
    fontFamily: FONT_FAMILY.GilroySemiBold,
    fontSize: 16,
    color: COLORS.iconsHighlightClr,
    marginTop: 24,
  },
  flexBox: {
    flex: 1,
  },
})
