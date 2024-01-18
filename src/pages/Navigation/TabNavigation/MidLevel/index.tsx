import React, { useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { userStore } from '../../../../store/userStore'

import Medium from '../../../../components/Medium'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../../../styles/theme'

import BeforeUser from '../../../../components/BeforeUser'
import { Video, ResizeMode } from 'expo-av'
import { Dimensions, View, Image } from 'react-native'
import { generalStore } from '../../../../store/generalStore'

const { height, width } = Dimensions.get('window')

const MidLevel: React.FC = () => {
  const confirmDetails = userStore((state) => state.confirmDetails)
  const updateLogoVideo = generalStore((state) => state.updateLogoVideo)
  const logoVideo = generalStore((state) => state.logoVideo)

  useEffect(() => {
    setInterval(() => updateLogoVideo(true), 2000)
  })

  return (
    <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
      <Animated.View style={{ flex: 1 }}>
        {!logoVideo ? (
          <View style={{ flex: 1 }}>
            {/* <Video
              source={require('../../../../assets/video/sj-logo.mp4')}
              shouldPlay
              style={{ width: width, height: height * 1.04 }}
              isLooping
              resizeMode={ResizeMode.COVER}
              useNativeControls={false}
            /> */}
            <Image source={require('../../../.././../assets/splash.png')} />
          </View>
        ) : confirmDetails ? (
          <Medium />
        ) : (
          <BeforeUser />
        )}
      </Animated.View>
    </LinearGradient>
  )
}

export default MidLevel
