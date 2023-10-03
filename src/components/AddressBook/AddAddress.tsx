import {
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import Search from '../../assets/icons/SearchIcon'
import Plus from '../../assets/icons/PlusIcon'
import TickIcon from '../../assets/icons/TickIcon'
import CustomButton from '../Button'
import { COLORS } from '../../styles/theme'
import { RadioButton } from 'react-native-paper'
import { AddressBookData } from '../../utils/data/AddressBookData'

interface AddAddressProps {
  onAddPress: (event: GestureResponderEvent) => void | undefined | null
}

const AddAddress: React.FC<AddAddressProps> = ({ onAddPress }) => {
  const [onText, setOnSearchChange] = React.useState<string>()
  const [checked, setChecked] = React.useState('first')

  const handleSearchText = (text: string) => {
    setOnSearchChange(text)
  }
  return (
    <View>
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
        <RadioButton.Group onValueChange={(newValue) => setChecked(newValue)} value={checked}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ height: '67%' }}>
            {AddressBookData.map((f, index) => (
              <View key={index} style={styles.radioBtn}>
                <View>
                  <RadioButton value={index.toString()} color={COLORS.textSecondaryClr} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <View style={styles.RadioTitle}>
                    <f.icon width={16} height={16} color={'black'} />
                    <HeaderStyle>{f.header}</HeaderStyle>
                  </View>
                  <DescriptionText>{f.location}</DescriptionText>
                </View>
                <Pressable style={styles.editStyle}>
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </RadioButton.Group>
        <FlexContent>
          <Pressable onPress={onAddPress}>
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
    </View>
  )
}

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
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

const RadioBtn = styled.View`
  border-width: 1px;
  border-color: ${COLORS.strokeClr};
  border-radius: 10px;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-vertical: 8px;
`

export default AddAddress

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
  radioBtn: {
    borderWidth: 1,
    borderColor: '#efcef5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginVertical: 8,
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
    alignItems: 'center',
  },
  editText: {
    color: '#DB00FF',
    fontSize: 14,
  },
})
