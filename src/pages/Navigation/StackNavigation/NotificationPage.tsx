import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '../../../styles/theme'
import NotificationInActive from '../../../assets/icons/NotificationInActive'

const NotificationPage: React.FC = () => {
  return (
    <ScrollViewContent>
      <NotificationHead>Today</NotificationHead>
      <NotificationFlexContent>
        <IconView>
          <NotificationInActive width={24} height={24} />
        </IconView>
        <View>
          <TextHead>Purple ape t-shirt</TextHead>
          <TextDescription>
            Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend
            tellus augue lec.
          </TextDescription>
        </View>
      </NotificationFlexContent>
    </ScrollViewContent>
  )
}

const ScrollViewContent = styled.ScrollView`
  background: ${COLORS.backgroundClr};
  height: 100%;
  padding: 16px;
`

const NotificationHead = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  text-transform: uppercase;
  color: ${COLORS.SecondaryTwo};
`

const NotificationFlexContent = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 16px;
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
`

const TextHead = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

export default NotificationPage
