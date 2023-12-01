import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Modal, View, StyleSheet, Pressable } from 'react-native'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import { TooltipData } from '../../utils/data/TooltipData'
import CloudIcon from '../../assets/icons/PostPageIcon/CloudIcon'
import { LinearGradient } from 'expo-linear-gradient'
import CloudRightArrow from '../../assets/icons/PostPageIcon/CloudRightArrow'
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'

interface TooltipProps {
  isVisible?: boolean
  onClose?: () => void
}
const Tooltip: React.FC<TooltipProps> = ({ isVisible, onClose }) => {
  const [header, setHeader] = useState<string | null>(null)
  const [body, setBody] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [index, setIndex] = useState<number>(0)

  const handleNext = () => {
    if (index < TooltipData.length - 1) {
      setIndex(index + 1)
      setHeader(TooltipData[index + 1].title)
      setBody(TooltipData[index + 1].description)
      setImage(TooltipData[index + 1].image)
    } else {
      onClose?.()
    }
  }

  useEffect(() => {
    setIndex(0)
    setHeader(TooltipData[0].title)
    setBody(TooltipData[0].description)
    setImage(TooltipData[0].image)
  }, [])

  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <TooltipWrapper>
        <TooltipContainer>
          <Animated.View entering={ZoomIn.duration(600).delay(200)} exiting={ZoomOut}>
            <CloudIcon width={328} height={210} />
          </Animated.View>
        </TooltipContainer>
        <View style={{ position: 'absolute', bottom: 160 }}>
          <Heading allowFontScaling={false}>{header}</Heading>
          <Paragraph allowFontScaling={false}>{body}</Paragraph>
          <Animated.View
            entering={LightSpeedInLeft.duration(1000).delay(200)}
            exiting={LightSpeedOutLeft}
          >
            <Pressable onPress={handleNext}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#462D85', '#DB00FF']}
                style={styles.plusIconGradientColor}
              >
                <View>
                  <CloudRightArrow width={20} height={20} />
                </View>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </View>
      </TooltipWrapper>
    </Modal>
  )
}

export default Tooltip

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

const styles = StyleSheet.create({
  plusIconGradientColor: {
    backgroundColor: '#462d85',
    borderRadius: 70,
    padding: 16,
    width: 40,
    height: 40,
    position: 'absolute',
    left: 90,
    bottom: -35,
  },
})
