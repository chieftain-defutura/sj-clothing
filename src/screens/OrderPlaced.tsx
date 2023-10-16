import React from 'react'
import { Modal } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../styles/theme'
import CloseIcon from '../assets/icons/Close'
import CustomButton from '../components/Button'

interface PlaceOrderModalProps {
  isVisible?: boolean
  onClose?: () => void
}

const OrderPlaced: React.FC<PlaceOrderModalProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation()
  return (
    <Modal visible={isVisible} animationType='fade' onRequestClose={onClose} transparent={true}>
      <OrderPlacedWrapper>
        <OrderPlacedContainer>
          <IconEnd onPress={onClose}>
            <CloseIcon width={24} height={24} />
          </IconEnd>
          <OrderPlacedText>Order placed!</OrderPlacedText>
          <CustomButton
            variant='primary'
            text='My orders'
            fontFamily='Arvo-Regular'
            fontSize={16}
            onPress={() => navigation.navigate('MyOrders')}
          />
        </OrderPlacedContainer>
      </OrderPlacedWrapper>
    </Modal>
  )
}

const OrderPlacedWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundBlurClr};
`

const OrderPlacedContainer = styled.View`
  background-color: ${COLORS.iconsNormalClr};
  padding: 20px;
  border-radius: 10px;
  width: 328px;
`

const IconEnd = styled.Pressable`
  display: flex;
  align-self: flex-end;
`

const OrderPlacedText = styled.Text`
  font-size: 20px;
  font-family: Arvo-Regular;
  letter-spacing: -0.4px;
  color: ${COLORS.iconsHighlightClr};
  text-align: center;
  margin-vertical: 16px;
`

export default OrderPlaced
