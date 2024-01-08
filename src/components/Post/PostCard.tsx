import React, { useEffect, useCallback } from 'react'
import { Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { LinearGradient } from 'expo-linear-gradient'
import { getDocs, collection } from 'firebase/firestore/lite'
import { gradientColors } from '../../styles/theme'
import { IPostData } from '../../constant/types'
import { db } from '../../../firebase'

const { width, height } = Dimensions.get('window')

interface IPost {
  item: IPostData
  handlePostClick: (postId: string) => void
}

const PostCard: React.FC<IPost> = ({ item, handlePostClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IPostData[]>()

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

  let productImg = []
  productImg.push(item.productImage)

  return (
    // <LinearGradient colors={gradientColors} style={{ borderRadius: 10 }}>

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
        </LinearGradient>
      )}
    />

    // </LinearGradient>
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
