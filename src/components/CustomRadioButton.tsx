import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import HomeIcon from '../assets/icons/HomeIcon'
import Briefcase from '../assets/icons/Briefcase'

const CustomRadioButton = () => {
  const [checked, setChecked] = useState('first') // Initialize the selected radio button

  return (
    <View>
      <RadioButton.Group onValueChange={(newValue) => setChecked(newValue)} value={checked}>
        <View style={styles.radioBtn}>
          <View>
            <RadioButton value='1' />
          </View>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <View style={styles.RadioTitle}>
              <HomeIcon width={16} height={16} color={'black'} />
              <Text style={styles.headerStyle}>Home</Text>
            </View>
            <Text style={{ width: 225 }}>Madras christian college chennai</Text>
          </View>
          <View style={styles.editStyle}>
            <Text style={styles.editText}>Edit</Text>
          </View>
        </View>

        <View style={styles.radioBtn}>
          <View>
            <RadioButton value='2' />
          </View>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <View style={styles.RadioTitle}>
              <Briefcase width={16} height={16} color={'black'} />
              <Text style={styles.headerStyle}>Home</Text>
            </View>
            <Text style={{ width: 225, color: 'gray' }}>Madras christian college chennai</Text>
          </View>
          <View style={styles.editStyle}>
            <Text style={styles.editText}>Edit</Text>
          </View>
        </View>
      </RadioButton.Group>
    </View>
  )
}

export default CustomRadioButton

const styles = StyleSheet.create({
  headerStyle: {
    fontWeight: '600',
    paddingLeft: 8,
  },
  radioBtn: {
    borderWidth: 1,
    borderColor: '#efcef5',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    marginVertical: 8,
  },
  RadioTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
