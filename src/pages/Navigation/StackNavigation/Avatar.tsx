import { Dimensions, View, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../styles/theme'
import Gender from '../../../components/Medium/Avatar/Gender'
import CustomButton from '../../../components/Button'
import Skintone from '../../../components/Medium/Avatar/Skintone'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { useTranslation } from 'react-i18next'

const { width } = Dimensions.get('window')

const AvatarNavigation = () => {
  const navigation = useNavigation()
  const [steps, setSteps] = useState(0)
  const { t } = useTranslation('avatar')

  return (
    <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {steps === 0 && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              padding: 24,
              flex: 1,
            }}
          >
            <View style={{ position: 'absolute', left: 18, top: 16, zIndex: 1000 }}>
              <TouchableHighlight
                onPress={() => {
                  navigation.goBack()
                }}
                activeOpacity={0.6}
                underlayColor='rgba(70, 45, 133, 0.2)'
                style={{ borderRadius: 100 }}
              >
                <IconHoverClr>
                  <IconHoverPressable>
                    <LeftArrow width={24} height={24} style={{ marginBottom: -44 }} />
                  </IconHoverPressable>
                </IconHoverClr>
              </TouchableHighlight>
            </View>
            <Gender />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 16,
                padding: 24,
              }}
            >
              <CustomButton
                style={{ width: width / 1.3 }}
                text={t('Next')}
                onPress={() => setSteps(1)}
              />
            </View>
          </View>
        )}
        {steps === 1 && (
          <>
            <Skintone />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 16,
                padding: 24,
              }}
            >
              <CustomButton
                style={{ width: width / 2.4 }}
                text={t('Previous')}
                onPress={() => setSteps(0)}
              />
              <CustomButton
                style={{ width: width / 2.4 }}
                text={t('Done')}
                onPress={() => navigation.goBack()}
              />
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  )
}

const IconHoverClr = styled.View`
  width: 50px;
  height: 50px;
`
const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

export default AvatarNavigation
