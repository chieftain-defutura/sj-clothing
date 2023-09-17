import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { RadioButton } from 'react-native-paper'
import HomeIcon from '../assets/icons/HomeIcon'
import Briefcase from '../assets/icons/Briefcase'
import { COLORS } from '../styles/theme'

const CustomRadioButton = () => {
  const [checked, setChecked] = useState('first')

  return (
    <View>
      <RadioButton.Group onValueChange={(newValue) => setChecked(newValue)} value={checked}>
        <RadioBtn>
          <View>
            <RadioButton value='1' color={COLORS.textSecondaryClr} />
          </View>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <View style={styles.RadioTitle}>
              <HomeIcon width={16} height={16} color={'black'} />
              <HeaderStyle>Home</HeaderStyle>
            </View>
            <DescriptionText>Madras Christian College, East </DescriptionText>
            <DescriptionText>Tambaram, Chennai - 600 059.</DescriptionText>
          </View>
          <View style={styles.editStyle}>
            <Text style={styles.editText}>Edit</Text>
          </View>
        </RadioBtn>

        <View style={styles.radioBtn}>
          <View>
            <RadioButton value='2' color={COLORS.textSecondaryClr} />
          </View>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <View style={styles.RadioTitle}>
              <Briefcase width={16} height={16} color={'black'} />
              <HeaderStyle>Home</HeaderStyle>
            </View>
            <DescriptionText>Madras Christian College, East </DescriptionText>
            <DescriptionText>Tambaram, Chennai - 600 059.</DescriptionText>
          </View>
          <View style={styles.editStyle}>
            <Text style={styles.editText}>Edit</Text>
          </View>
        </View>
      </RadioButton.Group>
    </View>
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

export default CustomRadioButton

const styles = StyleSheet.create({
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
