import React, { useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import { Pressable, Dimensions, Share, View, StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useState } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { LightSpeedInRight, LightSpeedOutRight } from 'react-native-reanimated'
import { getDocs, collection } from 'firebase/firestore/lite'
import { COLORS } from '../../styles/theme'
import Like from '../../assets/icons/like'
import Fire from '../../assets/icons/fire'
import Heart from '../../assets/icons/heart'
import SaveIcon from '../../assets/icons/SaveIcon'
import IsLikeIcon from '../../assets/icons/PostPageIcon/isLikeIcon'
import IsFireIcon from '../../assets/icons/PostPageIcon/isFire'
import IsHeartIcon from '../../assets/icons/PostPageIcon/isHeartIcon'
import HomePlusIcon from '../../assets/icons/PostPlusIcon'
import { IPostData } from '../../constant/types'
import AuthNavigate from '../../screens/AuthNavigate'
import SubscriptionModal from '../../screens/Modals/Subscription'
import { db } from '../../../firebase'
import PostCard from './PostCard'

const { height, width } = Dimensions.get('window')

interface IPost {
  navigation: any
  // postData: IPostData[] | undefined
  setPostId: Dispatch<SetStateAction<string>>
  setOpen: Dispatch<SetStateAction<boolean>>
}

const PostContent: React.FC<IPost> = ({ navigation, setPostId, setOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isFireActive, setIsFireActive] = useState(false)
  const [isSubscriptionModal, setSubscriptionModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IPostData[]>()
  const [isHeartActive, setIsHeartActive] = useState(false)
  const [focus, setFocus] = useState(false)
  const tabHeight = 120
  const reelsHeight = height - tabHeight

  const handlePostClick = (postId: string) => {
    console.log(postId)
    setPostId(postId)
    setOpen(true)
  }

  const handleIconPress = (iconName: string) => {
    setActiveIcon(iconName)
    if (iconName === 'like') {
      setIsLiked((prevIsLiked) => !prevIsLiked)
    } else if (iconName === 'fire') {
      setIsFireActive((prev) => !prev)
    } else if (iconName === 'heart') {
      setIsHeartActive((prev) => !prev)
    }
  }

  const onClose = () => {
    setFocus(false)
  }

  // const handlePress = (postId: string) => {
  //   const selectedPost = data?.find((post) => post.id === postId)
  //   if (selectedPost) {
  //     setSelectedPost(selectedPost)
  //     setShowPostDetails(true)
  //   }
  // }

  const onSubmit = () => {
    setSubscriptionModal(true)

    // if (!user) {
    //   console.log('user not found')
    //   await setFocus(true)
    //   setSubscriptionModal(true)
    // }
  }

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const openSubscriptionModal = () => {
    setSubscriptionModal(true)
  }
  const closeSubscriptionModal = () => {
    setSubscriptionModal(false)
  }

  const url = 'https://www.youtube.com/watch?v=lTxn2BuqyzU'
  const share = async () => {
    try {
      const result = await Share.share({ message: 'Bug:' + `\n` + url })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with active type', result.activityType)
        } else {
          console.log('shared')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getData = useCallback(async () => {
    try {
      setLoading(true)
      const ProductRef = await getDocs(collection(db, 'Post'))
      const fetchProduct = ProductRef.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }))
      setData(fetchProduct)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [db])

  useEffect(() => {
    getData()
  }, [getData])

  const LikeIconStyle = {
    backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.5)' : 'transparent',
  }

  const dynamicLikeIconStyle = activeIcon === 'like' ? LikeIconStyle : {}

  const FireIconStyle = {
    backgroundColor: isPressed ? 'rgba(251, 99, 4, 0.5)' : 'transparent',
  }

  const dynamicFireIconStyle = activeIcon === 'fire' ? FireIconStyle : {}

  const HeartIconStyle = {
    backgroundColor: isPressed ? 'rgba(219, 0, 255, 0.5)' : 'transparent',
  }

  const dynamicHeartIconStyle = activeIcon === 'heart' ? HeartIconStyle : {}

  return (
    <AuthNavigate focus={focus} onClose={onClose}>
      <PostCardWrapper style={{ position: 'relative', height: height }}>
        <SwiperFlatList
          data={data}
          vertical
          renderAll={true}
          renderItem={({ item }) => (
            <View
              key={item.id}
              style={{
                height: reelsHeight,
                flex: 1,
                borderRadius: 10,
                position: 'relative',
              }}
            >
              <PostCard item={item} handlePostClick={handlePostClick} />

              {/* <SliderCountContent>
                <SliderNumber>
                  {currentIndex + 1}/{item.images.length}
                </SliderNumber>
              </SliderCountContent> */}

              <CardContent>
                <IconPressable>
                  <ContentView
                    onPress={() => handleIconPress('like')}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={dynamicLikeIconStyle}
                  >
                    {activeIcon === 'like' ? (
                      isLiked ? (
                        <IsLikeIcon width={20} height={20} />
                      ) : (
                        <IsLikeIcon width={20} height={20} />
                      )
                    ) : (
                      <Like width={20} height={20} />
                    )}
                  </ContentView>
                  <LikeText>1k</LikeText>
                </IconPressable>

                <IconPressable>
                  <ContentView
                    onPress={() => handleIconPress('fire')}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={dynamicFireIconStyle}
                  >
                    {activeIcon === 'fire' ? (
                      isFireActive ? (
                        <IsFireIcon width={20} height={20} />
                      ) : (
                        <IsFireIcon width={20} height={20} />
                      )
                    ) : (
                      <Fire width={20} height={20} />
                    )}
                  </ContentView>
                  <LikeText>1.2k</LikeText>
                </IconPressable>
                <IconPressable>
                  <ContentView
                    onPress={() => handleIconPress('heart')}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={dynamicHeartIconStyle}
                  >
                    {activeIcon === 'heart' ? (
                      isHeartActive ? (
                        <IsHeartIcon width={20} height={20} />
                      ) : (
                        <IsHeartIcon width={20} height={20} />
                      )
                    ) : (
                      <Heart width={20} height={20} />
                    )}
                  </ContentView>
                  <LikeText>1.5k</LikeText>
                </IconPressable>
              </CardContent>
              <Animated.View
                entering={LightSpeedInRight.duration(1000).delay(200)}
                exiting={LightSpeedOutRight}
              >
                <PostCardContent>
                  <FlexContent>
                    <TextHead>{item.style}</TextHead>
                    <Pressable onPress={share}>
                      <SaveIcon width={24} height={24} />
                    </Pressable>
                  </FlexContent>
                  <Content>
                    <PostCardText>{item.productName}</PostCardText>
                    <PostDescription>{item.description}</PostDescription>
                  </Content>
                </PostCardContent>
              </Animated.View>
            </View>
          )}
        />
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            gap: 6,
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
          onPress={onSubmit}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#462D85', '#DB00FF']}
            style={styles.plusIconGradientColor}
          >
            <HomePlusIcon width={20} height={20} />
          </LinearGradient>
        </TouchableOpacity>
        <SubscriptionModal
          isVisible={isSubscriptionModal}
          onClose={closeSubscriptionModal}
          navigation={navigation}
        />
      </PostCardWrapper>
    </AuthNavigate>
  )
}

const PostCardWrapper = styled.View`
  padding-horizontal: 8px;
  padding-vertical: 8px;
`

const SliderCountContent = styled.View`
  background: ${COLORS.iconsNormalClr};
  border-radius: 20px;
  padding-vertical: 4px;
  padding-horizontal: 8px;
  width: 42px;
  position: absolute;
  top: 16px;
  right: 16px;
`

// const PlusIconStyle = styled.TouchableOpacity`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   bottom: 24px;
//   right: 24px;
//   z-index: 10000;
// `

const IconPressable = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`

const TextHead = styled.Text`
  font-size: 14px;
  letter-spacing: -0.28px;
  font-family: Gilroy-SemiBold;
  color: ${COLORS.iconsHighlightClr};
`

const SliderNumber = styled.Text`
  color: ${COLORS.iconsHighlightClr};
  letter-spacing: -0.28px;
  font-size: 14px;
  font-family: Gilroy-SemiBold;
  text-align: center;
`

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Content = styled.View`
  margin-top: 20px;
`

const PostCardText = styled.Text`
  color: ${COLORS.textClr};
  font-size: 16px;
  font-family: Gilroy-Medium;
`

const PostDescription = styled.Text`
  color: ${COLORS.secondaryRGBAClr};
  font-size: 12px;
  font-family: Gilroy-Regular;
  letter-spacing: -0.24px;
  margin-top: 4px;
  text-transform: capitalize;
`

const CardContent = styled.View`
  position: absolute;
  padding-left: 16px;
  display: flex;
  bottom: 145px;
  flex-direction: row;
  gap: 8px;
`

const ContentView = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 5px;
  border-radius: 30px;
`

const LikeText = styled.Text`
  color: white;
  align-items: center;
  font-style: normal;
  font-size: 14px;
`

const PostCardContent = styled.View`
  padding: 16px;
`

const styles = StyleSheet.create({
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  plusIconGradientColor: {
    backgroundColor: '#462d85',
    borderRadius: 70,
    padding: 15,
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 0,
    elevation: 5,
  },
})

export default PostContent
