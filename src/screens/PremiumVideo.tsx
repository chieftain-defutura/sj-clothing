import { Video, ResizeMode } from 'expo-av'
import styled from 'styled-components/native'
import React from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import CloseGrayIcon from '../assets/icons/CloseGrayIcon'

interface PremiumVideoModalProps {
  isVisible?: boolean
  video: string
  onClose?: () => void
}

const PremiumVideo: React.FC<PremiumVideoModalProps> = ({ isVisible, onClose, video }) => {
  return (
    <Modal visible={isVisible} animationType='slide' onRequestClose={onClose} transparent={true}>
      <PremiumVideoWrapper>
        <View>
          {video ? (
            <Video
              source={{ uri: video }}
              style={{ width: 400, height: 300 }}
              shouldPlay
              isLooping
              resizeMode={ResizeMode.COVER}
              useNativeControls={false}
            />
          ) : (
            <Text allowFontScaling={false} style={{ color: 'white' }}>
              No Video
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 20, right: 20 }}>
          <CloseGrayIcon width={20} height={20} />
        </TouchableOpacity>
      </PremiumVideoWrapper>
    </Modal>
  )
}

const PremiumVideoWrapper = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  position: relative;
`

export default PremiumVideo
