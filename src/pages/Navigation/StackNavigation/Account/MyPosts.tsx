import React from 'react'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import styled from 'styled-components/native'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import { COLORS } from '../../../../styles/theme'
import { Dimensions } from 'react-native'

interface IMyPosts {
  navigation: any
}

const { width } = Dimensions.get('window')

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
  const halfWidth = width / 2.1

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
            <MyPostText allowFontScaling={false}>My posts</MyPostText>
          </GoBackArrowContent>
          <MyPostContainer>
            {cardPairs.map((pair, index) => (
              <CardPairContainer key={index}>
                {pair.map((item, subIndex) => (
                  <GiftImage
                    key={subIndex}
                    style={{ width: halfWidth, height: 174, marginRight: 4 }}
                  >
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
  padding: 6px;
  margin-bottom: 8px;
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
