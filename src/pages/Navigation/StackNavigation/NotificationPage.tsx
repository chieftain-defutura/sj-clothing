import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS, gradientOpacityColors } from '../../../styles/theme'
import { NotificationData } from '../../../utils/data/NotificationData'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const NotificationPage: React.FC = () => {
  return (
    <LinearGradient colors={gradientOpacityColors}>
      <Animated.View
        entering={SlideInDown.duration(500).delay(200)}
        exiting={SlideOutDown.duration(500).delay(200)}
      >
        <ScrollViewContent showsVerticalScrollIndicator={false}>
          <View>
            <NotificationHead allowFontScaling={false}>Today</NotificationHead>
            {NotificationData.map((f, index) => {
              return (
                <NotificationFlexContent key={index}>
                  <IconView>
                    <f.notificationIcon width={24} height={24} />
                  </IconView>
                  <View>
                    <TextHead allowFontScaling={false}>{f.name}</TextHead>
                    <TextDescription allowFontScaling={false}>{f.description}</TextDescription>
                    <DateText allowFontScaling={false}>{f.date}</DateText>
                  </View>
                </NotificationFlexContent>
              )
            })}
            <NotificationHead allowFontScaling={false}>YESTERDAY</NotificationHead>
            {NotificationData.map((f, index) => {
              return (
                <NotificationFlexContent key={index}>
                  <IconView>
                    <f.notificationIcon width={24} height={24} />
                  </IconView>
                  <View>
                    <TextHead allowFontScaling={false}>{f.name}</TextHead>
                    <TextDescription allowFontScaling={false}>{f.description}</TextDescription>
                    <DateText allowFontScaling={false}>{f.date}</DateText>
                  </View>
                </NotificationFlexContent>
              )
            })}
          </View>
        </ScrollViewContent>
      </Animated.View>
    </LinearGradient>
  )
}

const ScrollViewContent = styled.ScrollView`
  height: 100%;
  padding-horizontal: 16px;
`

const NotificationHead = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  text-transform: uppercase;
  color: ${COLORS.SecondaryTwo};
  margin-top: 16px;
`

const NotificationFlexContent = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 16px;
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
`

const IconView = styled.View`
  background: ${COLORS.iconsNormalClr};
  width: 32px;
  height: 32px;
  padding: 6px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`

const TextDescription = styled.Text`
  letter-spacing: -0.24px;
  font-size: 12px;
  font-family: Gilroy-Regular;
  color: ${COLORS.SecondaryTwo};
  margin-top: 4px;
  width: 290px;
  line-height: 16px;
`

const DateText = styled.Text`
  font-size: 10px;
  line-height: 16px;
  letter-spacing: -0.2px;
  font-family: Gilroy-Regular;
  color: ${COLORS.SecondaryTwo};
  margin-bottom: 16px;
`

const TextHead = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

export default NotificationPage
