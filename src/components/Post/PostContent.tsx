import React, { useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import {
  Pressable,
  Dimensions,
  Share,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native'
import styled from 'styled-components/native'
import { useState } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Animated, { LightSpeedInRight, LightSpeedOutRight } from 'react-native-reanimated'
import { getDocs, collection } from 'firebase/firestore/lite'
import { COLORS } from '../../styles/theme'
import SaveIcon from '../../assets/icons/SaveIcon'
import { IUserPost } from '../../constant/types'
import AuthNavigate from '../../screens/AuthNavigate'
import SubscriptionModal from '../../screens/Modals/Subscription'
import { db } from '../../../firebase'
import PostCard from './PostCard'
import { LinearGradient } from 'expo-linear-gradient'
import HomePlusIcon from '../../assets/icons/PostPlusIcon'
import Loader from '../Loading'

const { height } = Dimensions.get('window')

interface IPost {
  navigation: any
  setPostId: Dispatch<SetStateAction<string>>
  setOpen: Dispatch<SetStateAction<boolean>>
  setEditPost: React.Dispatch<React.SetStateAction<boolean>>
  setOpenPost: React.Dispatch<React.SetStateAction<boolean>>
}

const PostContent: React.FC<IPost> = ({
  navigation,
  setPostId,
  setOpen,
  setEditPost,
  setOpenPost,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSubscriptionModal, setSubscriptionModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IUserPost[]>()
  const [focus, setFocus] = useState(false)
  const tabHeight = 120
  const reelsHeight = height - tabHeight

  const handlePostClick = (postId: string) => {
    setPostId(postId)
    setOpen(true)
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
      const sortedData = fetchProduct.sort((a, b) => {
        const timeA = a.updateAt.seconds * 1000 + a.updateAt.nanoseconds / 1e6
        const timeB = b.updateAt.seconds * 1000 + b.updateAt.nanoseconds / 1e6
        return timeB - timeA // Sorting in descending order
      })

      setData(sortedData)
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

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData()
    })
  }, [])

  return (
    <>
      {loading ? (
        <View style={{ height: height - 100, justifyContent: 'center' }}>
          <Loader />
        </View>
      ) : (
        <PostCardWrapper style={{ position: 'relative', height: height - 100 }}>
          <SwiperFlatList
            data={data}
            vertical
            renderAll={true}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={[
                  {
                    height: reelsHeight,
                    flex: 1,
                    borderRadius: 10,
                    position: 'relative',
                  },
                  styles.iosContainer,
                ]}
              >
                <PostCard
                  setPostId={setPostId}
                  item={item}
                  handlePostClick={handlePostClick}
                  setEditPost={setEditPost}
                />

                {/* <SliderCountContent>
              <SliderNumber>

                {currentIndex + 1}/{item.images.length}
              </SliderNumber>
            </SliderCountContent> */}

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
                      <PostCardText>{item.product}</PostCardText>
                      <PostDescription>{item.caption}</PostDescription>
                    </Content>
                  </PostCardContent>
                </Animated.View>
              </View>
            )}
          />
          <TouchableOpacity
            style={[
              {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                gap: 6,
                position: 'absolute',
                left: 0,
                right: 24,
                bottom: 50,
                zIndex: 1000,
              },
              styles.iosContent,
            ]}
            onPress={onSubmit}
          >
            <LinearGradient
              // start={{ x: 0, y: 0 }}
              // end={{ x: 1, y: 1 }}
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
            setOpenPost={setOpenPost}
          />
        </PostCardWrapper>
      )}
    </>
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
  margin-bottom: 15px;
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
  iosContent: {
    ...Platform.select({
      ios: {
        bottom: 110,
        right: 16,
      },
    }),
  },
  iosContainer: {
    ...Platform.select({
      ios: {
        paddingBottom: 80,
      },
    }),
  },
})

export default PostContent
