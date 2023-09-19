import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '../../../styles/theme'
import NotificationInActive from '../../../assets/icons/NotificationInActive'

const data = [
  {
    notificationIcon: NotificationInActive,
    name: 'Upload video',
    description:
      'Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend tellus augue lec.',
    date: '12 July,2023',
  },
  {
    notificationIcon: NotificationInActive,
    name: 'New collections',
    description:
      'Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend tellus augue lec.',
    date: '12 July,2023',
  },
  {
    notificationIcon: NotificationInActive,
    name: 'Shipping',
    description:
      'Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend tellus augue lec.',
    date: '12 July,2023',
  },
  {
    notificationIcon: NotificationInActive,
    name: 'Shipping',
    description:
      'Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend tellus augue lec.',
    date: '12 July,2023',
  },
]

const NotificationPage: React.FC = () => {
  return (
    <ScrollViewContent>
      <NotificationHead>Today</NotificationHead>
      {data.map((f, index) => {
        return (
          <NotificationFlexContent key={index}>
            <IconView>
              <f.notificationIcon width={24} height={24} />
            </IconView>
            <View>
              <TextHead>{f.name}</TextHead>
              <TextDescription>{f.description}</TextDescription>
              <DateText>{f.date}</DateText>
            </View>
          </NotificationFlexContent>
        )
      })}
      <NotificationHead>YESTERDAY</NotificationHead>
      {data.map((f, index) => {
        return (
          <NotificationFlexContent key={index}>
            <IconView>
              <f.notificationIcon width={24} height={24} />
            </IconView>
            <View>
              <TextHead>{f.name}</TextHead>
              <TextDescription>{f.description}</TextDescription>
              <DateText>{f.date}</DateText>
            </View>
          </NotificationFlexContent>
        )
      })}
    </ScrollViewContent>
  )
}

const ScrollViewContent = styled.ScrollView`
  background: ${COLORS.backgroundClr};
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
