import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Pressable, View, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../../../styles/theme'
import Setting from '../../../../assets/icons/Settings'
import Search from '../../../../assets/icons/Search'
import PostCard from '../../../../components/PostCard'
import SubscriptionModal from '../../../../screens/Subscription'
import PlusIcon from '../../../../assets/icons/Plus'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import CloseIcon from '../../../../assets/icons/Close'

interface IPost {
  navigation: any
}

const { width } = Dimensions.get('window')

const Post: React.FC<IPost> = ({ navigation }) => {
  const [isSubscriptionModal, setSubscriptionModal] = useState(false)
  const height = useSharedValue(0)
  const display = useSharedValue<'none' | 'flex'>('none')
  const top = useSharedValue(10)

  const animStyle = useAnimatedStyle(() => ({
    height: height.value,
  }))

  const displayStyle = useAnimatedStyle(() => ({
    display: display.value,
  }))

  const cancelStyle = useAnimatedStyle(() => ({
    top: top.value,
  }))

  const closeSubscriptionModal = () => {
    setSubscriptionModal(false)
  }

  const handleClick = () => {
    if (height.value === 0) {
      height.value = withSpring(196)
      display.value = 'flex'
      top.value = withSpring(205)
    } else {
      top.value = withTiming(0, { duration: 300 })
      height.value = withTiming(0, { duration: 300 })
      setTimeout(() => {
        display.value = 'none'
      }, 200)
    }
  }

  return (
    <PostContainer>
      <Animated.View style={[animStyle, styles.dropDown, displayStyle]}>
        <CategoryHeading>Category</CategoryHeading>
        <CategoryContent>
          <CategoryText>Trending</CategoryText>
          <CategoryText>Trending</CategoryText>
          <CategoryText>Trending</CategoryText>
        </CategoryContent>
        <CategoryContent>
          <CategoryText>New collections</CategoryText>
          <CategoryText>New collections</CategoryText>
          <CategoryText>New collections</CategoryText>
        </CategoryContent>
        <CategoryContent>
          <CategoryText>Trending</CategoryText>
          <CategoryText>Trending</CategoryText>
          <CategoryText>Trending</CategoryText>
        </CategoryContent>
        <CategoryContent>
          <CategoryText>Trending</CategoryText>
          <CategoryText>Trending</CategoryText>
          <CategoryText>Trending</CategoryText>
        </CategoryContent>
      </Animated.View>
      <Animated.View style={[styles.cancel, cancelStyle, displayStyle]}>
        <Pressable onPress={handleClick}>
          <CloseIcon width={24} height={24} />
        </Pressable>
      </Animated.View>

      <PostWrapper>
        <PostHead>
          <View>
            <ViewedText>Most viewed</ViewedText>
          </View>
          <PostIcons>
            <Pressable onPress={handleClick}>
              <View></View>
              <Setting />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Search')}>
              <Search />
            </Pressable>
          </PostIcons>
        </PostHead>
        <View>
          <Cards>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </Cards>
        </View>
      </PostWrapper>

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#462D85', '#DB00FF']}
        style={styles.gradientColor}
      >
        <Pressable onPress={() => navigation.navigate('Style')}>
          <PlusIcon width={24} height={24} />
        </Pressable>
      </LinearGradient>
      <SubscriptionModal isVisible={isSubscriptionModal} onClose={closeSubscriptionModal} />
    </PostContainer>
  )
}

const PostContainer = styled.View`
  flex: 1;
`

const CategoryHeading = styled.Text`
  font-family: Arvo-Regular;
  font-size: 16px;
  color: ${COLORS.iconsHighlightClr};
`

const CategoryContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`

const CategoryText = styled.Text`
  font-family: Gilroy-Medium;
  font-size: 12px;
  color: rgba(70, 45, 133, 0.4);
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

const Cards = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`

const styles = StyleSheet.create({
  dropDown: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 999,
    position: 'absolute',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 16,
  },
  cancel: {
    position: 'absolute',
    width: 45,
    height: 45,
    zIndex: 999,
    backgroundColor: '#EBEBEB',
    borderRadius: 50,
    left: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientColor: {
    borderRadius: 70,
    width: 64,
    height: 64,
    padding: 20,
    position: 'absolute',
    bottom: 35,
    right: 30,
  },
})

export default Post
