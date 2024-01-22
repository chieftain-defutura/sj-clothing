import React, { useEffect, useCallback, useRef, SetStateAction } from 'react'
import {
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
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
import { storage } from '../../../firebase'
import { ScrollView, TapGestureHandler } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { updateDoc, doc, getDoc } from 'firebase/firestore/lite'
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
import { Video, ResizeMode } from 'expo-av'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Slick from 'react-native-slick'

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
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isFireActive, setIsFireActive] = useState(false)
  const [isHeartActive, setIsHeartActive] = useState(false)
  const user = userStore((state) => state.user)
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)
  const doubleTapRef = useRef()

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

  let productImg = []
  productImg.push(item.productImage)

  // const getVideoUrl = async () => {
  //   const imageRef = ref(storage, item.productId)
  //   const url = await getDownloadURL(imageRef)
  //   setVidUrl(url)
  // }

  // useEffect(() => {
  //   getVideoUrl()
  // }, [getVideoUrl])

  return (
    <View style={{ position: 'relative', flex: 1, zIndex: 1 }}>
      <Slick
        showsButtons={false}
        dotStyle={{ width: 4, height: 4, backgroundColor: COLORS.slickDotClr }}
        activeDotStyle={{
          backgroundColor: COLORS.textSecondaryClr,
          width: 12,
          height: 4,
        }}
      >
        <View style={styles.slide1}>
          <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
            <TapGestureHandler
              maxDelayMs={250}
              ref={doubleTapRef}
              numberOfTaps={2}
              onActivated={onDoubleTap}
            >
              <Animated.View style={styles.container}>
                <ImageBackground
                  source={{ uri: item.productImage }}
                  style={{
                    height: height / 1.3,
                    width: width - 19,
                  }}
                  resizeMode='cover'
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
                </ImageBackground>
              </Animated.View>
            </TapGestureHandler>
          </TapGestureHandler>
        </View>

        {item.giftVideo && (
          <View style={styles.slide2}>
            <Video
              source={{ uri: item.giftVideo }}
              shouldPlay
              style={{ width: width / 1.1, height: height / 2.5 }}
              isLooping
              resizeMode={ResizeMode.COVER}
              useNativeControls={false}
            />
          </View>
        )}
        {item.textAndImage.designs.image && (
          <View style={styles.slide2}>
            <Image
              source={{ uri: item.textAndImage.designs.image as string }}
              style={{ width: width / 1.1, height: height / 2.5 }}
              resizeMode={ResizeMode.COVER}
            />
          </View>
        )}
      </Slick>
      <View style={{ position: 'absolute', bottom: 18, zIndex: 1000 }}>
        <PostComment
          activeIcon={activeIcon}
          handleIconPress={handleIconPress}
          isFireActive={isFireActive}
          isHeartActive={isHeartActive}
          isLiked={isLiked}
          userId={''}
          icons={''}
          id={item.id}
          setActiveIcon={setActiveIcon}
          comments={item.postComment}
        />
      </View>

      {item.userId === user?.uid && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 22,
            top: 22,
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            zIndex: 100,
          }}
          onPress={() => (setEditPost(true), setPostId(item.id))}
        >
          <AddressEditIcon width={20} height={20} />
          <View>
            <EditText allowFontScaling={false}>Edit</EditText>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          handlePostClick(item.id)
        }}
        style={{
          position: 'absolute',
          right: 18,
          bottom: 24,
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          zIndex: 100,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#462D85', '#DB00FF']}
          style={{ borderRadius: 30 }}
        >
          <ViewDetailsBtn>
            <ViewDetailsText allowFontScaling={false}>View Details</ViewDetailsText>
          </ViewDetailsBtn>
        </LinearGradient>
      </TouchableOpacity>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.10)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></LinearGradient>
    </View>
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
  slide1: {
    flex: 1,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PostCard

const CardContent = styled.View`
  padding-left: 12px;
  display: flex;
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

interface IPostComment {
  activeIcon: string | null
  isLiked: boolean
  isFireActive: boolean
  isHeartActive: boolean
  handleIconPress: (iconName: string) => Promise<void>
  setActiveIcon: React.Dispatch<React.SetStateAction<string | null>>
  comments: {
    userId: string
    icons: string
  }[]
  id: string
}
const PostComment: React.FC<IPostComment> = ({
  activeIcon,
  isLiked,
  isFireActive,
  isHeartActive,
  handleIconPress,
  setActiveIcon,
  comments,
  id,
}) => {
  const user = userStore((state) => state.user)
  const [isPressed, setIsPressed] = useState(false)
  const [data, setData] = useState<any>()

  // console.log(data?.postComment.filter((f: { icons: string }) => f.icons === 'like').length)
  const getData = useCallback(async () => {
    try {
      if (!user) return

      const q = doc(db, 'Post', id)
      const querySnapshot = await getDoc(q)

      if (querySnapshot.exists()) {
        const fetchData = querySnapshot.data()
        setData(fetchData)
        fetchData.postComment.forEach((d: any, index: any) => {
          if (d.userId === user?.uid) {
            setActiveIcon(d.icons as string)
          }
        })
      } else {
        console.log('Document not found')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [activeIcon])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    if (!activeIcon) {
      const data = comments.find((f) => f.userId === user?.uid)
      setActiveIcon(data?.icons as string)
    }
  })

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

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
  return (
    <CardContent>
      <IconPressable>
        <ContentView
          onPress={() => (activeIcon === 'like' ? handleIconPress('') : handleIconPress('like'))}
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
        <LikeText allowFontScaling={false}>
          {data?.postComment.filter((f: { icons: string }) => f.icons === 'like').length}
        </LikeText>
      </IconPressable>

      <IconPressable>
        <ContentView
          onPress={() => (activeIcon === 'fire' ? handleIconPress('') : handleIconPress('fire'))}
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
        <LikeText allowFontScaling={false}>
          {data?.postComment.filter((f: any) => f.icons === 'fire').length}
        </LikeText>
      </IconPressable>
      <IconPressable>
        <ContentView
          onPress={() => (activeIcon === 'heart' ? handleIconPress('') : handleIconPress('heart'))}
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
        <LikeText allowFontScaling={false}>
          {data?.postComment.filter((f: any) => f.icons === 'heart').length}
        </LikeText>
      </IconPressable>
    </CardContent>
  )
}
