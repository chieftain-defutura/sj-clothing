import { View, Pressable, StyleSheet, Dimensions, Platform } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
import styled from 'styled-components/native'
import HomeIcon from '../../assets/icons/HomeIcon'
import { COLORS } from '../../styles/theme'

interface AddressData {
  name: string
  addressOne: string
  addressTwo: string
  city: string
  state: string
  pinCode: string
  country: string
  floor: string
  fullAddress: string
  isSelected: boolean
  phoneNo: string
  saveAddressAs: string
}

interface IRadioBtnContent {
  setCheckedIndex: React.Dispatch<React.SetStateAction<string>>
  checkedIndex: string
  data: AddressData
  index: number
  updateData: (index: string) => Promise<void>
  setChecked: React.Dispatch<React.SetStateAction<string | null>>
  checked: string | null
}

const { height, width } = Dimensions.get('window')

const RadioBtnContent: React.FC<IRadioBtnContent> = ({
  setCheckedIndex,
  checkedIndex,
  data,
  index,
  updateData,
  setChecked,
  checked,
}) => {
  return (
    <RadioButton.Group
      onValueChange={(newValue) => {
        console.log('newValue', newValue)
        console.log('checkedIndex', checkedIndex)

        updateData(checkedIndex)
        setChecked(checkedIndex)
      }}
      value={checked as string}
    >
      <Pressable onPress={() => setCheckedIndex(index.toString())}>
        <View style={styles.radioBtn}>
          <View>
            <RadioButton value={checkedIndex} color={COLORS.textSecondaryClr} />
            <View style={styles.radioBtnIOS}></View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <View style={styles.RadioTitle}>
              <HomeIcon width={16} height={16} color={'black'} />
              <HeaderStyle allowFontScaling={false}>{data.saveAddressAs}</HeaderStyle>
            </View>
            <DescriptionText allowFontScaling={false}>
              {data.name}, {data.phoneNo}, {data.floor}, {data.addressOne}, {data.addressTwo},{' '}
              {data.city}, {data.state}, {data.country}, {data.pinCode}.
            </DescriptionText>
          </View>
        </View>
      </Pressable>
    </RadioButton.Group>
  )
}

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

export default RadioBtnContent

const styles = StyleSheet.create({
  radioBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    width: width / 1.2,
    gap: 8,
    marginVertical: 8,
  },
  editText: {
    color: '#DB00FF',
    fontSize: 14,
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
    marginLeft: 8,
  },
  radioBtnIOS: {
    ...Platform.select({
      ios: {
        borderWidth: 1.5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderRadius: 200,
        width: width / 14,
        height: height / 30,
        marginTop: -32,
        marginLeft: 4,
      },
    }),
  },
})
