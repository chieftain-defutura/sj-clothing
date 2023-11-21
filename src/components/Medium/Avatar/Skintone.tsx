import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

import CustomButton from '../../Button'
import { COLORS } from '../../../styles/theme'
import { useTranslation } from 'react-i18next'
import WebView from 'react-native-webview'
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated'

const { height, width } = Dimensions.get('window')

interface ISkintone {}
const Skintone: React.FC<ISkintone> = ({}) => {
  const { t } = useTranslation('avatar')
  const [skinColor, setSkinColor] = useState('3')
  return (
    <View style={styles.SkintoneContainer}>
      <Text style={styles.bottomTitle}>{t('select your skintone')}</Text>
      <Animated.View entering={FadeInUp.duration(800)} exiting={FadeOut}>
        <View
          style={{
            width: width / 1,
            height: height / 2,
            backgroundColor: 'transparent',
          }}
        >
          {
            <WebView
              style={{
                backgroundColor: 'transparent',
              }}
              source={{
                // uri: `http://localhost:5173/create-avatar/?uid=${uid}`,
                uri: `https://sj-threejs-development.netlify.app/male`,
              }}
            />
          }
        </View>
      </Animated.View>
      <View style={styles.bottomWrapper}>
        <View style={styles.skinCollection}>
          {['#805244', '#a07160', '#c69d92', '#dabdaf'].map((m, index) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.skinTab,
                {
                  borderColor: skinColor === (index + 1).toString() ? '#DB00FF' : 'transparent',
                  borderWidth: 1,
                  padding: 2,
                },
              ]}
              onPress={() => setSkinColor((index + 1).toString())}
            >
              <View style={{ flex: 1, backgroundColor: m, borderRadius: 20 }}></View>
            </TouchableOpacity>
          ))}
        </View>
        {/* <View style={styles.SkintoneButtonWrapper}>
          <CustomButton
            text={`${t('previous')}`}
            variant='primary'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: 180 }}
            onPress={() => setToggle(false)}
          />
          <CustomButton
            onPress={() => (path === 'MidLevel' ? [handleSubmit(), setSteps(1)] : handleSubmit())}
            text={path === 'MidLevel' ? `${t('Next')}` : `${t('done')}`}
            variant='primary'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: 180 }}
          />
        </View> */}
      </View>
    </View>
  )
}

export default Skintone

const styles = StyleSheet.create({
  SkintoneContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    gap: 40,
  },

  bottomWrapper: {
    // padding: 24,
  },
  bottomTitle: {
    color: COLORS.textClr,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Arvo-Regular',
    textTransform: 'uppercase',
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
