import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { COLORS } from '../../../../styles/theme'
import Setting from '../../../../assets/icons/Settings'
import Search from '../../../../assets/icons/Search'
import PostCard from '../../../../components/PostCard'

const Post: React.FC = () => {
  return (
    <PostWrapper>
      <PostHead>
        <View>
          <ViewedText>Most viewed</ViewedText>
        </View>
        <PostIcons>
          <Setting />
          <Search />
        </PostIcons>
      </PostHead>
      <Cards>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </Cards>
    </PostWrapper>
  )
}

const PostWrapper = styled.ScrollView`
  background-color: ${COLORS.backgroundClr};
  padding: 16px;
`

const PostHead = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ViewedText = styled.Text`
  color: ${COLORS.textClr};
  font-size: 16px;
`

const PostIcons = styled.View`
  display: flex;
  flex-direction: row;
  gap: 24px;
`

const Cards = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Post
