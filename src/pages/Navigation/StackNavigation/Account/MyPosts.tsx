import React from 'react'
import { View, Image } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import styled from 'styled-components/native'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import { COLORS } from '../../../../styles/theme'

interface IMyPosts {
  navigation: any
}

const MyPostData = [
  {
    image: require('../../../../assets/images/t-shirt.png'),
  },
  {
    image: require('../../../../assets/images/t-shirt.png'),
  },
  {
    image: require('../../../../assets/images/t-shirt.png'),
  },
  {
    image: require('../../../../assets/images/t-shirt.png'),
  },
  {
    image: require('../../../../assets/images/t-shirt.png'),
  },
]

const MyPosts: React.FC<IMyPosts> = ({ navigation }) => {
  const getCardPairs = (data: any[]) => {
    const pairs = []
    for (let i = 0; i < data.length; i += 2) {
      pairs.push(data.slice(i, i + 2))
    }
    return pairs
  }

  const cardPairs = getCardPairs(MyPostData)
  return (
    <MyPostWrapper>
      <Animated.View
        entering={SlideInRight.duration(500).delay(200)}
        exiting={SlideOutRight.duration(500).delay(200)}
      >
        <ScrollViewContent>
          <GoBackArrowContent
            onPress={() => {
              navigation.goBack()
            }}
          >
            <LeftArrow width={24} height={24} />
            <MyPostText>My posts</MyPostText>
          </GoBackArrowContent>
          <MyPostContainer>
            {cardPairs.map((pair, index) => (
              <CardPairContainer key={index}>
                {pair.map((item, subIndex) => (
                  <GiftImage key={subIndex}>
                    <TShirtImage source={item.image} />
                  </GiftImage>
                ))}
              </CardPairContainer>
            ))}
          </MyPostContainer>
        </ScrollViewContent>
      </Animated.View>
    </MyPostWrapper>
  )
}

const MyPostWrapper = styled.View`
  background: #f5f5f5;
`

const ScrollViewContent = styled.ScrollView`
  height: 100%;
`

const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
`

const MyPostContainer = styled.View`
  padding: 4px;
`

const MyPostText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

const GiftImage = styled.View`
  border-radius: 10px;
  background: #ffbbe9;
  width: 174px;
  height: 174px;
  justify-content: center;
  align-items: center;
`
const CardPairContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 4px;
`

const TShirtImage = styled.Image`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
`

export default MyPosts
