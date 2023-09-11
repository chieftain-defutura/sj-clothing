import React from 'react'
import styled from 'styled-components/native'
import { Pressable } from 'react-native'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../../styles/theme'
import Setting from '../../../../assets/icons/Settings'
import Search from '../../../../assets/icons/Search'
import PostCard from '../../../../components/PostCard'

const Post: React.FC = () => {
  const navigation = useNavigation()

  const goToSearch = () => {
    navigation.navigate('Search')
  }

  return (
    <PostWrapper>
      <PostHead>
        <View>
          <ViewedText>Most viewed</ViewedText>
        </View>
        <PostIcons>
          <Pressable>
            <Setting />
          </Pressable>
          <Pressable onPress={goToSearch}>
            <Search height={20} width={20} />
          </Pressable>
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
