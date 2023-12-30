import React, { useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { userStore } from '../../../../store/userStore'

import Medium from '../../../../components/Medium'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../../styles/theme'

import BeforeUser from '../../../../components/BeforeUser'
import { Video, ResizeMode } from 'expo-av'
import { Dimensions, View } from 'react-native'
import { generalStore } from '../../../../store/generalStore'

const { height, width } = Dimensions.get('window')

const MidLevel: React.FC = () => {
  const confirmDetails = userStore((state) => state.confirmDetails)
  const updateLogoVideo = generalStore((state) => state.updateLogoVideo)
  const logoVideo = generalStore((state) => state.logoVideo)

  useEffect(() => {
    setInterval(() => updateLogoVideo(true), 10000)
  })

  return (
    <Animated.View style={{ flex: 1 }}>
      <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        {!logoVideo ? (
          <View style={{ flex: 1 }}>
            <Video
              source={require('../../../../assets/video/sj-logo.mp4')}
              shouldPlay
              style={{ width: width, height: height * 1.04 }}
              isLooping
              resizeMode={ResizeMode.COVER}
              useNativeControls={false}
            />
          </View>
        ) : confirmDetails ? (
          <Medium />
        ) : (
          <BeforeUser />
        )}
      </LinearGradient>
    </Animated.View>
  )
}

export default MidLevel
