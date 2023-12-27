import React from 'react'
import { Modal, View, StyleSheet, Dimensions, Pressable, Platform } from 'react-native'
import { RadioButton } from 'react-native-paper'
import styled from 'styled-components/native'
import { COLORS } from '../styles/theme'
import { IRefund } from '../constant/types'
import CloseIcon from '../assets/icons/Close'
import moment from 'moment'

const { width } = Dimensions.get('window')

interface IRefundViewDetails {
  closeModal?: () => void
  refundData: IRefund
}

const RefundViewDetails: React.FC<IRefundViewDetails> = ({ closeModal, refundData }) => {
  return (
    <Modal animationType='fade' transparent={true}>
      <RefundWrapper>
        <RefundContainer style={{ width: width / 1.2 }}>
          <RefundHead>
            <RefundHeading allowFontScaling={false}>Refund Status</RefundHeading>
            <Pressable onPress={closeModal}>
              <CloseIcon width={24} height={24} />
            </Pressable>
          </RefundHead>
          <RefundTrackWrapper>
            <RefundGroupContent>
              <View style={[styles.radioBtn, { alignItems: 'center' }]}>
                <RadioButton.Android
                  value='option1'
                  status={refundData?.refundStatus?.orderReturned?.status ? 'checked' : 'unchecked'}
                  color={COLORS.textSecondaryClr}
                />
                <OrderPlacedText allowFontScaling={false}>Order Returned</OrderPlacedText>
              </View>
              <View>
                <DateTextText allowFontScaling={false}>
                  {refundData?.refundStatus?.orderReturned?.createdAt
                    ? moment(refundData?.refundStatus?.orderReturned?.createdAt.toDate()).format(
                        'DD-MM-YYYY',
                      )
                    : ''}
                </DateTextText>
              </View>
            </RefundGroupContent>
            <View
              style={[
                styles.borderRight,
                {
                  borderColor: refundData?.refundStatus?.orderReturned?.status
                    ? COLORS.textSecondaryClr
                    : 'grey',
                },
              ]}
            ></View>

            <RefundGroupContent>
              <View style={[styles.radioBtn, { alignItems: 'center' }]}>
                <RadioButton.Android
                  value='option1'
                  status={
                    refundData?.refundStatus?.paymentInitiated?.status ? 'checked' : 'unchecked'
                  }
                  color={COLORS.textSecondaryClr}
                />
                <OrderPlacedText allowFontScaling={false}>Payment Initiated</OrderPlacedText>
              </View>
              <View>
                <DateTextText allowFontScaling={false}>
                  {refundData?.refundStatus?.paymentInitiated?.createdAt
                    ? moment(refundData?.refundStatus?.paymentInitiated?.createdAt.toDate()).format(
                        'DD-MM-YYYY',
                      )
                    : ''}
                </DateTextText>
              </View>
            </RefundGroupContent>
            <View
              style={[
                styles.borderRight,
                {
                  borderColor: refundData?.refundStatus?.paymentInitiated?.status
                    ? COLORS.textSecondaryClr
                    : 'grey',
                },
              ]}
            ></View>
            <RefundGroupContent style={{ marginBottom: 6 }}>
              <View style={[styles.radioBtn, { alignItems: 'center' }]}>
                <RadioButton.Android
                  value='option1'
                  status={
                    refundData?.refundStatus?.paymenyCompleted?.status ? 'checked' : 'unchecked'
                  }
                  color={COLORS.textSecondaryClr}
                />
                <OrderPlacedText allowFontScaling={false}>Paymeny Completed</OrderPlacedText>
              </View>
              <View>
                <DateTextText allowFontScaling={false}>
                  {refundData?.refundStatus?.paymenyCompleted?.createdAt
                    ? moment(refundData?.refundStatus?.paymenyCompleted?.createdAt.toDate()).format(
                        'DD-MM-YYYY',
                      )
                    : ''}
                </DateTextText>
              </View>
            </RefundGroupContent>
          </RefundTrackWrapper>
        </RefundContainer>
      </RefundWrapper>
    </Modal>
  )
}

const RefundWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${COLORS.backgroundBlurClr};
`

const RefundHead = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-top: 8px;
  padding-left: 8px;
`

const RefundHeading = styled.Text`
  font-size: 20px;
  letter-spacing: -0.4px;
  font-family: Arvo-Regular;
  color: ${COLORS.textClr};
`

const RefundTrackWrapper = styled.View``

const RefundGroupContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const FlexOrder = styled.View`
  margin-bottom: 25px;
`

const OrderPlacedFlexContent = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const DateTextText = styled.Text`
  font-size: 14px;
  color: ${COLORS.SecondaryTwo};
  font-family: Gilroy-Regular;
`

const OrderPlacedText = styled.Text`
  font-size: 16px;
  color: ${COLORS.iconsHighlightClr};
  font-family: Montserrat-SemiBold;
`

const RefundContainer = styled.View`
  background-color: ${COLORS.iconsNormalClr};
  padding: 20px;
  border-radius: 10px;
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
  radioBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  borderRight: {
    borderLeftWidth: 1,
    borderColor: 'grey',
    height: 22,
    marginLeft: 16,
  },
})
