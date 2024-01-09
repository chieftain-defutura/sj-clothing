import React, { useCallback, useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import PostContent from './PostContent'
import { getDocs, collection } from 'firebase/firestore/lite'
import { IPostData, IUserPost } from '../../constant/types'
import { db } from '../../../firebase'
import Loader from '../Loading'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import styled from 'styled-components/native'
import PostDetails from './PostDetails'
import AddPost from '../AddPost'

interface IPostComponent {
  navigation: any
}

const { height } = Dimensions.get('window')

const PostComponent: React.FC<IPostComponent> = ({ navigation }) => {
  const [data, setData] = useState<IUserPost[] | undefined>(undefined)
  const [isLoading, setLoading] = useState(false)
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

  const FilteredData = data?.find((f) => f.id === postId)
  console.log(FilteredData)
  if (isLoading) {
    return (
      <View style={{ justifyContent: 'center', height: height }}>
        <Loader />
      </View>
    )
  }

  if (!data || data.length === 0) {
    return (
      <View style={{ height: height, justifyContent: 'center' }}>
        <ProductText allowFontScaling={false}>No Data</ProductText>
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
