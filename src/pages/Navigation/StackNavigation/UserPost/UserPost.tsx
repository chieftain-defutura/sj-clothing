import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { View, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import LeftArrow from '../../../../assets/icons/LeftArrow'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../../styles/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { getDocs, collection as collectionLite } from 'firebase/firestore/lite'
import { db, dbDefault } from '../../../../../firebase'
import { userStore } from '../../../../store/userStore'

import Loader from '../../../../components/Loading'
import { useNavigation } from '@react-navigation/native'
import { IPostData } from '../../../../constant/types'
import UserPostCard from './UserPostCard'
import AddPost from '../../../../components/AddPost'

const { height, width } = Dimensions.get('window')

const UserPost: React.FC = ({}) => {
  const { t } = useTranslation('account')
  const [postId, setPostId] = useState('')
  const [openPost, setOpenPost] = useState(false)
  const user = userStore((state) => state.user)
  const [isLoading, setLoading] = useState(false)
  const [userPostData, setuserPostData] = useState<IPostData[]>([])
  const navigation = useNavigation()

  const getData = useCallback(async () => {
    try {
      setLoading(true)
      if (!user) return
      const ProductRef = await getDocs(collectionLite(db, 'Post'))
      const fetchProduct = ProductRef.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }))
      const data = fetchProduct.filter((f: { userId: string }) => f.userId === user.uid)
      setuserPostData(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const FilterData = userPostData.find((f) => f.id === postId)

  if (isLoading)
    return (
      <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height }}>
          <Loader />
        </View>
      </LinearGradient>
    )
  if (!userPostData.length)
    return (
      <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        <GoBackArrowContent
          onPress={() => {
            navigation.navigate('Account')
          }}
        >
          <LeftArrow width={24} height={24} />
          <CartText allowFontScaling={false}>{t('User Posts')}</CartText>
        </GoBackArrowContent>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height }}>
          <ProductText allowFontScaling={false}>No Data</ProductText>
        </View>
      </LinearGradient>
    )

  return (
    <>
      {!openPost ? (
        <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
          <Animated.View
            entering={SlideInRight.duration(500).delay(200)}
            exiting={SlideOutRight.duration(500).delay(200)}
          >
            <ScrollViewContent>
              <View>
                <GoBackArrowContent
                  onPress={() => {
                    navigation.navigate('Account')
                  }}
                >
                  <LeftArrow width={24} height={24} />
                  <CartText allowFontScaling={false}>{t('User Posts')}</CartText>
                </GoBackArrowContent>
                <CartPageContent>
                  {userPostData.map((f, index) => (
                    <UserPostCard
                      data={f}
                      key={index}
                      setOpenPost={setOpenPost}
                      setPostId={setPostId}
                    />
                  ))}
                </CartPageContent>
              </View>
            </ScrollViewContent>
          </Animated.View>
        </LinearGradient>
      ) : (
        <AddPost editData={FilterData as IPostData} openPost={openPost} setOpenPost={setOpenPost} />
      )}
    </>
  )
}

const ScrollViewContent = styled.ScrollView`
  height: 100%;
`

const GoBackArrowContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
`

const StatusText = styled.Text`
  font-size: 12px;
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.textSecondaryClr};
`

const ProductText = styled.Text`
  color: ${COLORS.SecondaryTwo};
  font-family: ${FONT_FAMILY.GilroyMedium};
  font-size: 12px;
`
const ProductShirtText = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  font-family: ${FONT_FAMILY.GilroyMedium};
  color: ${COLORS.iconsHighlightClr};
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: ${FONT_FAMILY.ArvoRegular};
  font-size: 20px;
  letter-spacing: -0.4px;
  margin-top: -4px;
`

const ProductWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
`

const TShirtImage = styled.Image`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  object-fit: cover;
`

const StarContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1px;
  margin-top: 16px;
`

const CartPageContainer = styled.View`
  border-bottom-color: ${COLORS.strokeClr};
  border-bottom-width: 1px;
  padding-bottom: 16px;
`
const CartPageData = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding-vertical: 12px;
`

const CartPageContent = styled.View`
  padding-horizontal: 24px;
  flex: 1;
`

export default UserPost
