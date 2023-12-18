import React from 'react'
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import RightIcon from '../../../assets/icons/MidlevelIcon/rightIcon'
import TooltipIcon from '../../../assets/icons/TooltipIcon.tsx/TooltipArrowIcon'
import { COLORS, FONT_FAMILY } from '../../../styles/theme'

interface ISelectYourGender {
  isVisible?: boolean
  onClose?: () => void
}

const { width } = Dimensions.get('window')

const SelectYourGender: React.FC<ISelectYourGender> = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <TooltipWrapper>
        <Content style={[{ width: width / 1.2 }, styles.container]}>
          <Heading allowFontScaling={false} style={{ width: width / 1.4 }}>
            Select Your Gender
          </Heading>
          <Paragraph allowFontScaling={false} style={{ width: width / 1.4 }}>
            Express your unique style with our customizable clothes.
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
        <View style={[{ position: 'absolute', bottom: 118, left: 150 }, styles.icon]}>
          <TooltipIcon width={26} height={46} />
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
  bottom: 130px;
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
  margin-bottom: 8px;
`

export default SelectYourGender

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
        bottom: 155,
      },
    }),
  },
  icon: {
    ...Platform.select({
      ios: {
        bottom: 140,
      },
    }),
  },
})
