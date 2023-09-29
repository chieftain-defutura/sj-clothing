import * as Yup from 'yup'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { View, Modal, StyleSheet, Pressable, Text } from 'react-native'
import { AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'
import { COLORS } from '../../styles/theme'
import { FirebaseError } from 'firebase/app'
import CloseIcon from '../../assets/icons/Close'
import EyeIcon from '../../assets/icons/EyeIcon'
import CustomButton from '../../components/Button'
import EyeHideIcon from '../../assets/icons/EyeIconHide'
import { TooltipData } from '../../utils/data/TooltipData'

interface TooltipProps {
  isVisible?: boolean
  onClose?: () => void
}
const Tooltip: React.FC<TooltipProps> = ({ isVisible, onClose }) => {
  const [header, setHeader] = useState<string | null>(null)
  const [body, setBody] = useState<string | null>(null)
  const [index, setIndex] = useState<number>(0)

  const handleNext = () => {
    if (index < TooltipData.length - 1) {
      setIndex(index + 1)
      setHeader(TooltipData[index + 1][0])
      setBody(TooltipData[index + 1][1])
    } else {
      onClose?.()
    }
  }

  useEffect(() => {
    setIndex(0)
    setHeader(TooltipData[0][0])
    setBody(TooltipData[0][1])
  }, [])

  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <View style={{ width: 328, backgroundColor: 'pink' }}>
        <Text>{header}</Text>
        <Text>{body}</Text>
        <CustomButton text='Next' onPress={handleNext} />
      </View>
    </Modal>
  )
}

export default Tooltip

const LoginWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundBlurClr};
`

const LoginContainer = styled.View`
  background-color: ${COLORS.iconsNormalClr};
  padding: 20px;
  border-radius: 10px;
  width: 328px;
`

const LoginHead = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LoginHeading = styled.Text`
  font-size: 20px;
  letter-spacing: -0.4px;
  font-family: Arvo-Regular;
  color: ${COLORS.textClr};
`

const LabelText = styled.Text`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: ${COLORS.textClr};
  font-family: Gilroy-Medium;
  margin-top: 16px;
  margin-bottom: 8px;
`

const InputBorder = styled.View`
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  padding-vertical: 8px;
  padding-horizontal: 16px;
`

const InputStyle = styled.TextInput`
  font-family: Gilroy-Medium;
  width: 100%;
  font-size: 12px;
`

const ErrorText = styled.Text`
  font-size: 12px;
  color: ${COLORS.errorClr};
`

const ForgotPasswordText = styled.Text`
  font-family: Gilroy-Regular;
  color: ${COLORS.textSecondaryClr};
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 16px;
`

const AccountView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`

const AccountViewText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
`

const SignUpLink = styled.Text`
  color: ${COLORS.textSecondaryClr};
  font-size: 14px;
  font-family: Gilroy-Medium;
`

const styles = StyleSheet.create({
  submitBtn: {
    marginBottom: 16,
    fontFamily: 'Montserrat-Medium',
  },
})
