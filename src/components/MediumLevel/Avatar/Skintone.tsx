import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import CustomButton from '../../Button'
import { COLORS } from '../../../styles/theme'

interface ISkintone {
  skinColor: string
  setSkinColor: React.Dispatch<React.SetStateAction<string>>
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: () => void
}
const Skintone: React.FC<ISkintone> = ({ setToggle, skinColor, setSkinColor, handleSubmit }) => {
  return (
    <View style={styles.SkintoneContainer}>
      <View style={styles.bottomWrapper}>
        <Text style={styles.bottomTitle}>1.Select Your Skintone.</Text>

        <View style={styles.skinCollection}>
          {['#FFCCAF', '#EBB89B', '#D7A487', '#C39073', '#AF7C5F', '#9B684B'].map((m) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.skinTab,
                {
                  borderColor: skinColor === m ? '#DB00FF' : 'transparent',
                  borderWidth: 1,
                  padding: 2,
                },
              ]}
              onPress={() => setSkinColor(m)}
            >
              <View style={{ flex: 1, backgroundColor: m, borderRadius: 20 }}></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.SkintoneButtonWrapper}>
          <CustomButton
            text='Previous'
            variant='primary'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: 180 }}
            onPress={() => setToggle(false)}
          />
          <CustomButton
            onPress={handleSubmit}
            text='Done'
            variant='primary'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: 180 }}
          />
        </View>
      </View>
    </View>
  )
}

export default Skintone

const styles = StyleSheet.create({
  SkintoneContainer: { flex: 1 },

  bottomWrapper: {
    padding: 24,
  },
  bottomTitle: {
    color: COLORS.textClr,
    fontSize: 20,
    textAlign: 'center',
  },
  SkintoneButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  skinCollection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  skinTab: {
    height: 72,
    width: 40,
    borderRadius: 30,
    overflow: 'hidden',
  },
})
