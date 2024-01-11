import React, { useEffect, useCallback, useRef, SetStateAction } from 'react'
import {
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native'
import { useState } from 'react'
import styled from 'styled-components/native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { getDocs, collection, updateDoc, doc, getDoc } from 'firebase/firestore/lite'
import { COLORS, FONT_FAMILY, gradientColors } from '../../styles/theme'
import { IUserPost } from '../../constant/types'
import { db } from '../../../firebase'
import IsLikeIcon from '../../assets/icons/PostPageIcon/isLikeIcon'
import Like from '../../assets/icons/like'
import IsFireIcon from '../../assets/icons/PostPageIcon/isFire'
import Fire from '../../assets/icons/fire'
import IsHeartIcon from '../../assets/icons/PostPageIcon/isHeartIcon'
import Heart from '../../assets/icons/heart'
import AddressEditIcon from '../../assets/icons/AddressIcon/AddressEditIcon'
import { userStore } from '../../store/userStore'

const { height, width } = Dimensions.get('window')

interface IPost {
  item: IUserPost
  handlePostClick: (postId: string) => void
  setPostId: React.Dispatch<SetStateAction<string>>
  setEditPost: React.Dispatch<React.SetStateAction<boolean>>
}

interface IPostComment {
  userId: string
  icons: string
}

const AnimatedImage = Animated.createAnimatedComponent(Image)

const PostCard: React.FC<IPost> = ({ item, handlePostClick, setEditPost, setPostId }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IUserPost[]>([])
  const [postComment, setPostComment] = useState<IPostComment[]>([])
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isFireActive, setIsFireActive] = useState(false)
  const [isHeartActive, setIsHeartActive] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const user = userStore((state) => state.user)
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)
  const doubleTapRef = useRef()
  // const heartLength = postComment?.map((f) => f.icons === 'heart')
  // const fireLength = postComment?.map((f) => f.icons === 'fire')
  // const likeLength = postComment?.map((f) => f.icons === 'like')

  const getData = useCallback(async () => {
    try {
      setLoading(true)
      const ProductRef = await getDocs(collection(db, 'Post'))
      const fetchProduct = ProductRef.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }))
      setData(fetchProduct)
      const data = fetchProduct.flatMap((f) => f.postComment)
      setPostComment(data)
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

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const handleIconPress = async (iconName: string) => {
    setActiveIcon(iconName)

    try {
      if (iconName === 'like') {
        setIsLiked((prevIsLiked) => !prevIsLiked)
      } else if (iconName === 'fire') {
        setIsFireActive((prev) => !prev)
      } else if (iconName === 'heart') {
        setIsHeartActive((prev) => !prev)
      }

      if (!user) return

      const userDocRef = doc(db, 'Post', item.id)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()

      if (!userData) return

      const updatedPostComment = Array.isArray(userData.postComment)
        ? [...userData.postComment]
        : []
      const userCommentIndex = updatedPostComment.findIndex(
        (comment) => comment.userId === user.uid,
      )

      const newComment = {
        userId: user.uid,
        icons: iconName,
      }

      if (userCommentIndex === -1) {
        updatedPostComment.push(newComment)
      } else {
        updatedPostComment[userCommentIndex] = newComment
      }

      await updateDoc(userDocRef, {
        ...userData,
        postComment: updatedPostComment,
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // const handleIconPress = async (iconName: string) => {
  //   setActiveIcon(iconName)

  //   if (!user) return
  //   const userDocRef = doc(db, 'Post', user.uid)
  //   const userDoc = await getDoc(userDocRef)
  //   const userData = userDoc.data()

  //   if (!userData) return

  //   console.log('userData', userData)

  //   if (iconName === 'like') {
  //     setIsLiked((prevIsLiked) => !prevIsLiked)
  //   } else if (iconName === 'fire') {
  //     setIsFireActive((prev) => !prev)
  //   } else if (iconName === 'heart') {
  //     setIsHeartActive((prev) => !prev)
  //   }
  // }

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }))

  const onDoubleTap = useCallback(() => {
    handleIconPress('fire')

    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0))
      }
    })
  }, [])

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1))
      }
    })
  }, [])

  const LikeIconStyle = {
    backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.5)' : 'transparent',
  }

  const dynamicLikeIconStyle = activeIcon === 'like' ? LikeIconStyle : {}

  const HeartIconStyle = {
    backgroundColor: isPressed ? 'rgba(219, 0, 255, 0.5)' : 'transparent',
  }

  const dynamicHeartIconStyle = activeIcon === 'heart' ? HeartIconStyle : {}

  const FireIconStyle = {
    backgroundColor: isPressed ? 'rgba(251, 99, 4, 0.5)' : 'transparent',
  }

  const dynamicFireIconStyle = activeIcon === 'fire' ? FireIconStyle : {}

  let productImg = []
  productImg.push(item.productImage)

  return (
    <SwiperFlatList
      data={productImg}
      horizontal
      index={currentIndex}
      onChangeIndex={({ index }) => setCurrentIndex(index)}
      showPagination={false}
      renderItem={({ item: imageUrl }) => (
        <LinearGradient colors={gradientColors}>
          <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
            <TapGestureHandler
              maxDelayMs={250}
              ref={doubleTapRef}
              numberOfTaps={2}
              onActivated={onDoubleTap}
            >
              <Animated.View style={styles.container}>
                <ImageBackground
                  source={{ uri: imageUrl }}
                  style={{
                    height: height,
                    width: width - 19,
                  }}
                  resizeMode='contain'
                >
                  <View style={styles.image}>
                    <AnimatedImage
                      source={require('../../assets/images/AccountImage/fire-img.png')}
                      style={[
                        {
                          shadowOffset: { width: 0, height: 20 },
                          shadowOpacity: 0.35,
                          shadowRadius: 35,
                          // tintColor: '#DB00FF',
                          width: width / 4,
                        },
                        rStyle,
                      ]}
                      resizeMode={'center'}
                    />
                  </View>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.38)']}
                    style={styles.linearGradient}
                  ></LinearGradient>
                </ImageBackground>
              </Animated.View>
            </TapGestureHandler>
          </TapGestureHandler>

          <CardContent>
            <IconPressable>
              <ContentView
                onPress={() =>
                  activeIcon === 'like' ? handleIconPress('') : handleIconPress('like')
                }
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
              {/* <LikeText>{likeLength.length}</LikeText> */}
            </IconPressable>

            <IconPressable>
              <ContentView
                onPress={() =>
                  activeIcon === 'fire' ? handleIconPress('') : handleIconPress('fire')
                }
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
              {/* <LikeText>{fireLength.length}</LikeText> */}
            </IconPressable>
            <IconPressable>
              <ContentView
                onPress={() =>
                  activeIcon === 'heart' ? handleIconPress('') : handleIconPress('heart')
                }
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
              {/* <LikeText>{heartLength.length}</LikeText> */}
            </IconPressable>
          </CardContent>

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 22,
              top: 22,
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
            }}
            onPress={() => (setEditPost(true), setPostId(item.id))}
          >
            <AddressEditIcon width={20} height={20} />
            <View>
              <EditText>Edit</EditText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handlePostClick(item.id)
            }}
            style={{
              position: 'absolute',
              right: 22,
              bottom: 18,
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#462D85', '#DB00FF']}
              style={{ borderRadius: 30 }}
            >
              <ViewDetailsBtn>
                <ViewDetailsText>View Details</ViewDetailsText>
              </ViewDetailsBtn>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      )}
    />
  )
}

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
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PostCard

const CardContent = styled.View`
  position: absolute;
  padding-left: 16px;
  display: flex;
  bottom: 14px;
  flex-direction: row;
  gap: 8px;
`

const ViewDetailsText = styled.Text`
  color: ${COLORS.iconsNormalClr};
  font-size: 12px;
  font-family: ${FONT_FAMILY.GilroySemiBold};
`

const IconPressable = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
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

const EditText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.GilroySemiBold};
  color: ${COLORS.textSecondaryClr};
`

const ViewDetailsBtn = styled.View`
  padding-horizontal: 12px;
  padding-vertical: 8px;
`
