import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import CustomRadioButton from '../../../components/CustomRadioButton'
import CustomButton from '../../../components/Button'
import TickIcon from '../../../assets/icons/TickIcon'
import styled from 'styled-components/native'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../../styles/theme'
import CurrentLocationIcon from '../../../assets/icons/CurrentLocationIcon'
import LeftArrow from '../../../assets/icons/LeftArrow'
import CloseIcon from '../../../assets/icons/Close'
import Search from '../../../assets/icons/SearchIcon'
import Plus from '../../../assets/icons/PlusIcon'

interface IAddressBook {
  navigation: any
}

const AddressBook: React.FC<IAddressBook> = ({ navigation }) => {
  const height = useSharedValue('0%')
  const displayAddressSelection = useSharedValue('none')
  const [onText, setOnSearchChange] = React.useState<string>()

  const handleSearchText = (text: string) => {
    setOnSearchChange(text)
  }
  const handlePress = () => {
    height.value = withTiming('51%')
    displayAddressSelection.value = 'flex'
  }

  const editAnimationStyle = useAnimatedStyle(() => ({
    height: height.value as any,
    display: displayAddressSelection.value as any,
  }))

  const handleClose = () => {
    height.value = withTiming('0%', { duration: 300 })
    setTimeout(() => (displayAddressSelection.value = 'none'), 300)
  }

  return (
    <View style={[styles.container]}>
      <GoBackArrowContent
        onPress={() => {
          navigation.goBack()
        }}
      >
        <LeftArrow width={24} height={24} />
        <CartText>Addressbook</CartText>
      </GoBackArrowContent>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 12.9288755,
          longitude: 80.131692,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>

      <CurrentLocationWrapper>
        <FlexRow
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
          }}
        >
          <CurrentLocationIcon width={16} height={16} />
          <UseCurrentLocationText>Use current location</UseCurrentLocationText>
        </FlexRow>
      </CurrentLocationWrapper>

      <SelectAddressBtn>
        <CustomButton
          onPress={handlePress}
          variant='primary'
          text='Select address'
          fontFamily='Arvo-Regular'
          fontSize={16}
        />
      </SelectAddressBtn>

      <Animated.View style={[styles.parent, editAnimationStyle]}>
        <View style={styles.cancelContainer}>
          <Pressable onPress={handleClose}>
            <CloseIcon width={24} height={24} />
          </Pressable>
        </View>
        <View style={styles.searchInputBox}>
          <Search width={16} height={16} />
          <TextInput
            placeholder='Search for area, street name'
            onChangeText={(text) => handleSearchText(text)}
            value={onText}
            style={styles.inputBox}
            placeholderTextColor={COLORS.SecondaryTwo}
          />
        </View>
        <View>
          <View>
            <CustomRadioButton />
          </View>
          <FlexContent>
            <Pressable>
              <AddAddressBtn>
                <Plus width={16} height={16} />
                <BtnText>Add new Address</BtnText>
              </AddAddressBtn>
            </Pressable>
            <View style={{ width: 175 }}>
              <CustomButton
                variant='primary'
                text='Deliver here'
                leftIcon={<TickIcon width={16} height={16} />}
              />
            </View>
          </FlexContent>
        </View>
      </Animated.View>
    </View>
  )
}

const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
`

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

const SelectAddressBtn = styled.View`
  background: ${COLORS.iconsNormalClr};
  padding-horizontal: 16px;
  padding-vertical: 24px;
`

const UseCurrentLocationText = styled.Text`
  font-size: 14px;
  text-align: center;
  font-family: Gilroy-Medium;
  color: ${COLORS.textSecondaryClr};
`

const CurrentLocationWrapper = styled.View`
  position: absolute;
  bottom: 120px;
  left: 100px;
`

const FlexRow = styled.View`
  background: ${COLORS.iconsNormalClr};
  border-radius: 42px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  background: ${COLORS.iconsNormalClr};
  max-width: 188px;
  width: 100%;
`

const AddAddressBtn = styled.View`
  border-color: #db00ff;
  border-width: 1px;
  padding-horizontal: 14px;
  padding-vertical: 12px;
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  width: 165px;
`
const BtnText = styled.Text`
  font-size: 12px;
  font-family: Arvo-Regular;
  color: #db00ff;
`

export default AddressBook

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },

  parent: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    zIndex: 10,
  },
  inputBox: {
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    marginVertical: 8,
  },
  cancelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 8,
  },

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
  map: {
    flex: 1,
  },
})
