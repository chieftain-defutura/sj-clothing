import React, { useEffect, useCallback } from 'react'
import { Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import styled from 'styled-components/native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { LinearGradient } from 'expo-linear-gradient'
import { getDocs, collection } from 'firebase/firestore/lite'
import { gradientColors } from '../../styles/theme'
import { IPostData } from '../../constant/types'
import { db } from '../../../firebase'
import IsLikeIcon from '../../assets/icons/PostPageIcon/isLikeIcon'
import Like from '../../assets/icons/like'
import IsFireIcon from '../../assets/icons/PostPageIcon/isFire'
import Fire from '../../assets/icons/fire'
import IsHeartIcon from '../../assets/icons/PostPageIcon/isHeartIcon'
import Heart from '../../assets/icons/heart'

const { width, height } = Dimensions.get('window')

interface IPost {
  item: IPostData
  handlePostClick: (postId: string) => void
}

const PostCard: React.FC<IPost> = ({ item, handlePostClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IPostData[]>()
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isFireActive, setIsFireActive] = useState(false)
  const [isHeartActive, setIsHeartActive] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

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
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              console.log('Clicked on post with ID:', item.id)
              handlePostClick(item.id)
            }}
          >
            <Image
              source={{ uri: imageUrl }}
              style={{
                height: height,
                width: width - 19,
                resizeMode: 'contain',
              }}
              alt='postCard-reels-img'
            />
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.30)']}
              style={styles.linearGradient}
            ></LinearGradient>
          </TouchableOpacity>
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
