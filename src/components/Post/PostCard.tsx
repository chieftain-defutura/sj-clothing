import React, { useEffect, useCallback, useRef } from 'react'
import {
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  ImageBackground,
  View,
  Touchable,
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
import { getDocs, collection } from 'firebase/firestore/lite'
import { COLORS, FONT_FAMILY, gradientColors } from '../../styles/theme'
import { IPostData } from '../../constant/types'
import { db } from '../../../firebase'
import IsLikeIcon from '../../assets/icons/PostPageIcon/isLikeIcon'
import Like from '../../assets/icons/like'
import IsFireIcon from '../../assets/icons/PostPageIcon/isFire'
import Fire from '../../assets/icons/fire'
import IsHeartIcon from '../../assets/icons/PostPageIcon/isHeartIcon'
import Heart from '../../assets/icons/heart'
import AddressEditIcon from '../../assets/icons/AddressIcon/AddressEditIcon'
import { userStore } from '../../store/userStore'

const { width: SIZE } = Dimensions.get('window')
const { height, width } = Dimensions.get('window')

interface IPost {
  item: IPostData
  handlePostClick: (postId: string) => void
  setEditPost: React.Dispatch<React.SetStateAction<boolean>>
}

const AnimatedImage = Animated.createAnimatedComponent(Image)

const PostCard: React.FC<IPost> = ({ item, handlePostClick, setEditPost }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IPostData[]>()
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isFireActive, setIsFireActive] = useState(false)
  const [isHeartActive, setIsHeartActive] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)
  const doubleTapRef = useRef()
  const user = userStore((state) => state.user)

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

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
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

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }))

  const onDoubleTap = useCallback(() => {
    handleIconPress('heart')

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
        <LinearGradient colors={gradientColors} style={{ borderRadius: 10 }}>
          {/* <Pressable
            style={styles.container}
            onPress={() => {
              console.log('Clicked on post with ID:', item.id)
              handlePostClick(item.id)
            }}
          > */}
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
                  <AnimatedImage
                    source={require('../../assets/images/AccountImage/heart-img.png')}
                    style={[
                      styles.image,
                      {
                        shadowOffset: { width: 0, height: 20 },
                        shadowOpacity: 0.35,
                        shadowRadius: 35,
                        tintColor: '#DB00FF',
                      },
                      rStyle,
                    ]}
                    resizeMode={'center'}
                  />
                </ImageBackground>
              </Animated.View>
            </TapGestureHandler>
          </TapGestureHandler>
          {/* </Pressable> */}

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

          {item.userId === user?.uid && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 18,
                top: 18,
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
              }}
              onPress={() => setEditPost(true)}
            >
              <AddressEditIcon width={20} height={20} />
              <View>
                <EditText>Edit</EditText>
              </View>
            </TouchableOpacity>
          )}
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
    width: SIZE,
    height: SIZE,
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
  font-size: 16px;
  font-family: ${FONT_FAMILY.GilroySemiBold};
  color: ${COLORS.textSecondaryClr};
`
