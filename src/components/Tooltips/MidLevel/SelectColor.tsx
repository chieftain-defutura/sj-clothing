import React from 'react'
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import RightIcon from '../../../assets/icons/MidlevelIcon/rightIcon'
import { COLORS, FONT_FAMILY } from '../../../styles/theme'
import TooltipTopArrowIcon from '../../../assets/icons/TooltipIcon.tsx/TooltipTopArrow'

interface ISelectColorTooltip {
  isVisible?: boolean
  onClose?: () => void
}

const { width } = Dimensions.get('window')

const SelectColorTooltip: React.FC<ISelectColorTooltip> = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <TooltipWrapper>
        <Content style={[{ width: width / 1.2 }, styles.container]}>
          <Heading allowFontScaling={false} style={{ width: width / 1.4 }}>
            Select Color
          </Heading>
          <Paragraph allowFontScaling={false} style={{ width: width / 1.4 }}>
            Manage your profile, customize avatars, and track your orders
          </Paragraph>

          <View
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
          </View>
        </Content>
        <View style={[{ position: 'absolute', top: 150, left: 180 }, styles.icon]}>
          <TooltipTopArrowIcon width={26} height={46} />
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
const Content = styled.View`
  padding-vertical: 16px;
  padding-horizontal: 24px;
  position: absolute;
  top: 163px;
  background: white;
  border-radius: 20px;
  z-index: 10000;
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
  width: 320px;
  margin-bottom: 8px;
`

export default SelectColorTooltip

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
  container: {
    ...Platform.select({
      ios: {
        top: 270,
      },
    }),
  },
  icon: {
    ...Platform.select({
      ios: {
        top: 255,
      },
    }),
  },
})