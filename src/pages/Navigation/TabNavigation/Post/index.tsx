import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Pressable, View } from 'react-native'
import { COLORS } from '../../../../styles/theme'
import Setting from '../../../../assets/icons/Settings'
import Search from '../../../../assets/icons/Search'
import PostCard from '../../../../components/PostCard'
import SubscriptionModal from '../../../../screens/Subscription'
import PlusIcon from '../../../../assets/icons/Plus'

interface IPost {
  navigation: any
}

const Post: React.FC<IPost> = ({ navigation }) => {
  const [isSubscriptionModal, setSubscriptionModal] = useState(false)

  const closeSubscriptionModal = () => {
    setSubscriptionModal(false)
  }
  return (
    <PostContainer>
      <PostWrapper>
        <PostHead>
          <View>
            <ViewedText>Most viewed</ViewedText>
          </View>
          <PostIcons>
            <Setting />
            <Pressable onPress={() => navigation.navigate('Search')}>
              <Search />
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
      <PlusWrapper onPress={() => navigation.navigate('Style')}>
        <PlusIcon />
      </PlusWrapper>
      <SubscriptionModal isVisible={isSubscriptionModal} onClose={closeSubscriptionModal} />
    </PostContainer>
  )
}

const PostContainer = styled.View`
  flex: 1;
`

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

const PlusWrapper = styled.Pressable`
  background-color: #462d85;
  border-radius: 50px;
  width: 69px;
  padding: 25px;
  position: absolute;
  bottom: 60px;
  right: 30px;
`

const Cards = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Post
