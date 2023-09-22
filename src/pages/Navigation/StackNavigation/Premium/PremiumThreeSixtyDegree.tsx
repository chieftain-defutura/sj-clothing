import React from 'react'
import { Pressable, StyleSheet, Dimensions, Image, View } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import { COLORS, FONT_FAMILY } from '../../../../styles/theme'
import ThreeSixtyDegree from '../../../../assets/icons/360-degree'

interface IPremiumThreeSixtyDegree {
  navigation: any
}

const { width, height } = Dimensions.get('window')

const PremiumThreeSixtyDegree: React.FC<IPremiumThreeSixtyDegree> = ({ navigation }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#FFEFFF', '#FFF']}
      style={styles.linearGradient}
    >
      <FlexContent>
        <Pressable
          onPress={() => {
            navigation.goBack()
          }}
        >
          <LeftArrow width={24} height={24} />
        </Pressable>
        <Pressable>
          <DoneText>Done</DoneText>
        </Pressable>
      </FlexContent>
      <ThreeSixtyDegreeImageWrapper>
        <ThreeSixtyDegreeImage>
          <Image
            source={require('../../../../assets/images/PremiumImage/premium-img2.png')}
            style={{
              resizeMode: 'contain',
              width: width * 0.9,
              height: height * 0.7,
            }}
          />
        </ThreeSixtyDegreeImage>
        <SelectStyle360Degree>
          <ThreeSixtyDegree width={40} height={40} />
        </SelectStyle360Degree>
      </ThreeSixtyDegreeImageWrapper>
    </LinearGradient>
  )
}

const FlexContent = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const DoneText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.GilroySemiBold};
  color: ${COLORS.iconsHighlightClr};
`

const ThreeSixtyDegreeImage = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`

const ThreeSixtyDegreeImageWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SelectStyle360Degree = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`

export default PremiumThreeSixtyDegree

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
    height,
  },
})
