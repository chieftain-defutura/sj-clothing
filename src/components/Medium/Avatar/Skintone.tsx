import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import CustomButton from '../../Button'
import { COLORS } from '../../../styles/theme'
import { useTranslation } from 'react-i18next'

interface ISkintone {
  skinColor: string
  setSkinColor: React.Dispatch<React.SetStateAction<string>>
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: () => void
}
const Skintone: React.FC<ISkintone> = ({ setToggle, skinColor, setSkinColor, handleSubmit }) => {
  const { t } = useTranslation('avatar')
  return (
    <View style={styles.SkintoneContainer}>
      <View style={styles.bottomWrapper}>
        <Text style={styles.bottomTitle}>1.{t('select your skintone')}.</Text>

        <View style={styles.skinCollection}>
          {['1', '2', '3', '4'].map((m) => (
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
            text={`${t('previous')}`}
            variant='primary'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: 180 }}
            onPress={() => setToggle(false)}
          />
          <CustomButton
            onPress={handleSubmit}
            text={`${t('done')}`}
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
  SkintoneContainer: {},

  bottomWrapper: {
    // padding: 24,
  },
  bottomTitle: {
    color: COLORS.textClr,
    fontSize: 20,
    textAlign: 'center',
  },
  SkintoneButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  skinCollection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    gap: 12,
  },
  skinTab: {
    height: 72,
    width: 40,
    borderRadius: 30,
    overflow: 'hidden',
  },
})
