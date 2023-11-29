import { Video, ResizeMode } from 'expo-av'
import styled from 'styled-components/native'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Modal, View } from 'react-native'

import { COLORS } from '../styles/theme'
import CloseIcon from '../assets/icons/Close'
import { Text } from 'react-native'
const { width, height } = Dimensions.get('window')

interface PremiumVideoModalProps {
  isVisible?: boolean
  video: string
  onClose?: () => void
}

const PremiumVideo: React.FC<PremiumVideoModalProps> = ({ isVisible, onClose, video }) => {
  return (
    <Modal visible={isVisible} animationType='slide' onRequestClose={onClose} transparent={true}>
      <PremiumVideoWrapper onPress={onClose}>
        {video ? (
          <Video
            source={{ uri: video }}
            style={{ width: 400, height: 300 }}
            shouldPlay
            isLooping
            resizeMode={ResizeMode.COVER}
            useNativeControls
          />
        ) : (
          <Text allowFontScaling={false} style={{ color: 'white' }}>
            No Video
          </Text>
        )}
      </PremiumVideoWrapper>
    </Modal>
  )
}

const PremiumVideoWrapper = styled.Pressable`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`

export default PremiumVideo
