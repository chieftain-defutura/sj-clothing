import React from 'react'
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import Animated, { LightSpeedInLeft, LightSpeedOutLeft } from 'react-native-reanimated'
import ArrowRight from '../../assets/icons/PostPageIcon/ArrowRight'
import RightIcon from '../../assets/icons/MidlevelIcon/rightIcon'

interface IMidLevelTooltip {
  isVisible?: boolean
  onClose?: () => void
  navigation: any
}

const MidLevelTooltip: React.FC<IMidLevelTooltip> = ({ isVisible, onClose, navigation }) => {
  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <TooltipWrapper>
        <Content>
          <Heading allowFontScaling={false}>Mid level</Heading>
          <Paragraph allowFontScaling={false}>
            Express your unique style with our customizable clothes.
          </Paragraph>
          <Animated.View
            entering={LightSpeedInLeft.duration(1000).delay(200)}
            exiting={LightSpeedOutLeft}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableOpacity onPress={onClose}>
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
                  <RightIcon width={20} height={20} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </Content>
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
const Content = styled.View`
  padding: 16px;
  position: absolute;
  bottom: 80px;
  background: white;
  border-radius: 20px;
`
const Heading = styled.Text`
  font-size: 16px;
  color: ${COLORS.iconsHighlightClr};
  font-family: ${FONT_FAMILY.ArvoRegular};
  margin-bottom: 8px;
`
const Paragraph = styled.Text`
  font-size: 14px;
  color: rgba(70, 45, 133, 0.6);
  font-family: ${FONT_FAMILY.GilroyRegular};
  line-height: 18px;
  letter-spacing: -0.28px;
  width: 250px;
  margin-bottom: 8px;
`

export default MidLevelTooltip

const styles = StyleSheet.create({
  plusIconGradientColor: {
    backgroundColor: '#462d85',
    borderRadius: 70,
    padding: 16,
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
