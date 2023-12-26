import React, { useState } from 'react'
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

import { IRefund } from '../constant/types'

const { width, height } = Dimensions.get('window')

interface IRefundViewDetails {
  closeModal?: () => void
  refundData: IRefund
}

const RefundViewDetails: React.FC<IRefundViewDetails> = ({ closeModal }) => {
  return (
    <Modal animationType='fade' transparent={true}>
      <RefundWrapper>
        <RefundContainer style={{ width: width / 1.2 }}>
          <RefundHeading>Refund Details</RefundHeading>
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

export default RefundViewDetails

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
