import React, { useState } from 'react'
import { Pressable, StyleSheet, Dimensions, Image } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { gradientOpacityColors } from '../../../../../styles/theme'
import LeftArrow from '../../../../../assets/icons/LeftArrow'
// import ThreeSixtyDegree from '../../../../../assets/icons/360-degree'
import CustomButton from '../../../../../components/Button'

interface IAccessoriesDetails {
  navigation: any
}

const { width, height } = Dimensions.get('window')

const AccessoriesDetails: React.FC<IAccessoriesDetails> = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Animated.View
      entering={SlideInRight.duration(500).delay(200)}
      exiting={SlideOutRight.duration(500).delay(200)}
    >
      <LinearGradient colors={gradientOpacityColors} style={styles.linearGradient}>
        <FlexContent>
          <Pressable
            onPress={() => {
              navigation.goBack()
            }}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            {() => (
              <IconHoverClr
                style={{ backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.5)' : 'transparent' }}
              >
                <IconHoverPressable>
                  <LeftArrow width={24} height={24} />
                </IconHoverPressable>
              </IconHoverClr>
            )}
          </Pressable>
        </FlexContent>
        <ThreeSixtyDegreeImageWrapper>
          <ThreeSixtyDegreeImage>
            <Image
              source={require('../../../../../assets/images/PremiumImage/premium-img2.png')}
              style={{
                resizeMode: 'contain',
                width: width * 0.9,
                height: height * 0.7,
              }}
            />
          </ThreeSixtyDegreeImage>
          {/* <SelectStyle360Degree>
            <ThreeSixtyDegree width={40} height={40} />
          </SelectStyle360Degree> */}
          <CustomButton
            text='Buy Now'
            fontFamily='Arvo-Regular'
            fontSize={16}
            style={{ width: '100%', position: 'absolute', left: 0, right: 0, bottom: -90 }}
            onPress={() => navigation.navigate('Checkout')}
          />
        </ThreeSixtyDegreeImageWrapper>
      </LinearGradient>
    </Animated.View>
  )
}

const ThreeSixtyDegreeImage = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
`
const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ThreeSixtyDegreeImageWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

const IconHoverClr = styled.View`
  border-radius: 20px;
  width: 32px;
  height: 32px;
`

const SelectStyle360Degree = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
`

export default AccessoriesDetails

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
    height,
  },
})
