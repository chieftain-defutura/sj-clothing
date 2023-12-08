import React from 'react'
import { Modal, Pressable, View, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import CloudIcon from '../../assets/icons/PostPageIcon/CloudIcon'
import TooltipCloseIcon from '../../assets/icons/MidlevelIcon/close'

interface IMidLevelTooltip {
  isVisible?: boolean
  onClose?: () => void
}

const MidLevelTooltip: React.FC<IMidLevelTooltip> = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <TooltipWrapper>
        <TooltipContainer>
          <Animated.View entering={ZoomIn.duration(600).delay(200)} exiting={ZoomOut}>
            <CloudIcon width={328} height={210} />
          </Animated.View>
        </TooltipContainer>
        <View style={{ position: 'absolute', bottom: 130 }}>
          <Heading allowFontScaling={false}>Mid level</Heading>
          <Paragraph allowFontScaling={false}>
            Express your unique style with our customizable clothes.
          </Paragraph>
          <Animated.View
            entering={LightSpeedInLeft.duration(1000).delay(200)}
            exiting={LightSpeedOutLeft}
          >
            <Pressable onPress={onClose}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#462D85', '#DB00FF']}
                style={styles.plusIconGradientColor}
              >
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <TooltipCloseIcon width={16} height={16} style={{ marginTop: -3 }} />
                </View>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </View>
      </TooltipWrapper>
    </Modal>
  )
}

const TooltipWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundBlurClrTooltip};
  position: relative;
`
const TooltipContainer = styled.View`
  padding: 20px;
  width: 328px;
  position: absolute;
  bottom: 81px;
  right: 55px;
`
const Heading = styled.Text`
  font-size: 16px;
  color: ${COLORS.iconsHighlightClr};
  font-family: ${FONT_FAMILY.ArvoRegular};
  margin-bottom: 8px;
  text-align: center;
`
const Paragraph = styled.Text`
  font-size: 14px;
  color: rgba(70, 45, 133, 0.6);
  font-family: ${FONT_FAMILY.GilroyRegular};
  line-height: 18px;
  letter-spacing: -0.28px;
  margin-bottom: 16px;
  text-align: center;
  width: 250px;
`

export default MidLevelTooltip

const styles = StyleSheet.create({
  plusIconGradientColor: {
    backgroundColor: '#462d85',
    borderRadius: 70,
    padding: 16,
    width: 40,
    height: 40,
    position: 'absolute',
    left: 100,
    bottom: -35,
  },
})
