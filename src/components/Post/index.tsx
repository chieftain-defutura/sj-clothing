import React, { useCallback, useEffect, useState } from 'react'
import { View, Dimensions, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import PostContent from './PostContent'
import { getDocs, collection } from 'firebase/firestore/lite'
import { IUserPost } from '../../constant/types'
import { db } from '../../../firebase'
import Loader from '../Loading'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import styled from 'styled-components/native'
import PostDetails from './PostDetails'
import AddPost from '../AddPost'
import { LinearGradient } from 'expo-linear-gradient'
import HomePlusIcon from '../../assets/icons/PostPlusIcon'
import SubscriptionModal from '../../screens/Modals/Subscription'

interface IPostComponent {
  navigation: any
}

const { height } = Dimensions.get('window')

const PostComponent: React.FC<IPostComponent> = ({ navigation }) => {
  const [data, setData] = useState<IUserPost[] | undefined>(undefined)
  const [isLoading, setLoading] = useState(false)
  const [isSubscriptionModal, setSubscriptionModal] = useState(false)
  const [postId, setPostId] = useState('')
  const [open, setOpen] = useState(false)
  const [editPost, setEditPost] = useState(false)

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
      console.log('PostError', error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [db])

  useEffect(() => {
    getData()
  }, [getData])

  const onSubmit = () => {
    setSubscriptionModal(true)
  }

  const closeSubscriptionModal = () => {
    setSubscriptionModal(false)
  }

  const FilteredData = data?.find((f) => f.id === postId)
  console.log('FilteredData', FilteredData)

  if (isLoading) {
    return (
      <View style={{ justifyContent: 'center', height: height }}>
        <Loader />
      </View>
    )
  }

  if (!data || data.length === 0) {
    return (
      <View style={{ height: height / 1.2, justifyContent: 'center' }}>
        <ProductText allowFontScaling={false}>No Data</ProductText>
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
              right: 20,
              bottom: 30,
              zIndex: 1000,
            },
            styles.iosContent,
          ]}
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
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {!editPost ? (
        open && FilteredData ? (
          <PostDetails onClose={() => setOpen(false)} selectedPost={FilteredData} />
        ) : (
          <View style={{ position: 'relative' }}>
            <PostContent
              navigation={navigation}
              setEditPost={setEditPost}
              setOpen={setOpen}
              setPostId={setPostId}
            />
          </View>
        )
      ) : (
        <View style={{ flex: 1 }}>
          <AddPost editData={FilteredData} openPost={editPost} setOpenPost={setEditPost} />
        </View>
      )}
    </View>
  )
}

const ProductText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  text-align: center;
`

export default PostComponent

const styles = StyleSheet.create({
  iosContent: {
    ...Platform.select({
      ios: {
        bottom: 110,
        right: 16,
      },
    }),
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
