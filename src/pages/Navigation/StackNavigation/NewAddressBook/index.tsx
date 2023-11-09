import { View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS, gradientOpacityColors } from '../../../../styles/theme'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import LocationAddAddress from './LocationAddAddress'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import ChooseAddress from './ChooseAddress'
import LocationEditAddress from './LocationEditAddress'

const NewAddressBook: React.FC = () => {
  const [addedAddress, setAddedAddress] = useState<any>()
  const [showDisplay, setDisplay] = useState(1)
  const [editAddress, setEditAddress] = useState<any>()
  const navigation = useNavigation()

  return (
    <LinearGradient colors={gradientOpacityColors}>
      <Animated.View
        entering={SlideInRight.duration(500).delay(200)}
        exiting={SlideOutRight.duration(500).delay(200)}
      >
        <ScrollViewContent showsVerticalScrollIndicator={false}>
          <View>
            <GoBackArrowContent
              onPress={() => {
                navigation.goBack()
              }}
            >
              <LeftArrow width={24} height={24} />
              <CartText>Address Book</CartText>
            </GoBackArrowContent>

            {showDisplay == 1 && (
              <ChooseAddress
                addedAddress={addedAddress}
                onEditPress={(e, address) => {
                  setDisplay(3)
                  setEditAddress(address)
                }}
                onAddPress={() => setDisplay(2)}
              />
            )}
            {showDisplay == 2 && (
              <LocationAddAddress
                saveAddress={(addr) => {
                  setAddedAddress(addr)
                }}
                onSavePress={() => setDisplay(1)}
              />
            )}
            {showDisplay == 3 && (
              <LocationEditAddress
                onEditPress={() => {
                  setDisplay(1)
                }}
                selectedAddress={editAddress}
              />
            )}
          </View>
        </ScrollViewContent>
      </Animated.View>
    </LinearGradient>
  )
}

const ScrollViewContent = styled.ScrollView`
  height: 100%;
`
const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

export default NewAddressBook
