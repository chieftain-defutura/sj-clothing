import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'
import { addDoc, collection, doc, updateDoc, Timestamp } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { useNavigation } from '@react-navigation/native'
import { PostStore } from '../../../store/postCreationStore'
import axios from 'axios'

interface IProductAndCaption {
  setProduct: React.Dispatch<React.SetStateAction<string>>
  setCaption: React.Dispatch<React.SetStateAction<string>>
  editId?: string
  id?: string
  style?: string
  color?: string
  textAndImage?: {
    title: string
    position: string
    rate: number
    designs: {
      hashtag: string
      image: string
      originalImage: string
    }
  }
  size?: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
      quantity: number | string
    }
  }
  isGiftVideo: any
  product: string
  caption: string
  description?: string
  price?: string
  offerPrice?: string
  gender?: string
  productName?: string
  productImage?: any
  uid: string
  setOpenCheckout: React.Dispatch<React.SetStateAction<boolean>>
  setOpenPost?: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductAndCaption: React.FC<IProductAndCaption> = ({
  setProduct,
  setCaption,
  description,
  gender,
  offerPrice,
  price,
  productImage,
  productName,
  size,
  id,
  color,
  style,
  textAndImage,
  caption,
  product,
  editId,
  uid,
  isGiftVideo,
  setOpenCheckout,
  setOpenPost,
}) => {
  const user = userStore((state) => state.user)
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const UpdatePost = PostStore((state) => state.updatepost)

  useEffect(() => {
    if (errorMessage) {
      setInterval(() => {
        setErrorMessage('')
      }, 3000)
    }
  })

  console.log('uid', uid)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (!caption && !product) {
        return setErrorMessage(
          'Both product and caption cannot be empty. Please provide valid inputs.',
        )
      }
      if (!caption) {
        return setErrorMessage('Please fill caption')
      }
      if (!product) {
        return setErrorMessage('Please fill product')
      }
      if (caption && product) {
        if (editId) {
          await updateDoc(doc(db, 'Post', editId), {
            sizes: size ? size : '',
            style: style ? style : '',
            color: color ? color : '',
            textAndImage: textAndImage ? textAndImage : '',
            giftVideo: isGiftVideo,
            product: product,
            caption: caption,
          })
        }
        if (!editId) {
          const { data } = await axios.post('https://ruby-bull-robe.cyclic.app/captureWebsite', {
            uid: uid,
          })
          await addDoc(collection(db, 'Post'), {
            sizes: size ? size : '',
            style: style ? style : '',
            color: color ? color : '',
            textAndImage: textAndImage ? textAndImage : '',
            productImage: `data:image/jpeg;base64,${data.screenshotBase64}`,
            description: description,
            price: price,
            offerPrice: offerPrice,
            productId: id,
            userId: user?.uid,
            gender: gender,
            productName: productName,
            giftVideo: isGiftVideo,
            product: product,
            caption: caption,
            postComment: [],
            createdAt: Timestamp.now(),
            updateAt: Timestamp.now(),
          })
          UpdatePost({
            isSteps: '1',
            isSelectedStyle: '',
            isSize: {
              country: '',
              sizeVarient: [
                {
                  size: '',
                  measurement: '',
                  quantity: '',
                },
              ],
            },
            isColor: '',
            isColorName: '',
            isImageOrText: {
              title: '',
              position: '',
              rate: 0,
              designs: {
                hashtag: '',
                image: '',
                originalImage: '',
              },
            },
            tempIsImageOrText: {
              title: '',
              position: '',
              rate: 0,
              designs: {
                hashtag: '',
                image: '',
                originalImage: '',
              },
            },
            product: '',
            caption: '',
            uid: '',
          })
        }

        setOpenCheckout(false)
        setOpenPost?.(false)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={styles.ProductAndCaptionContainer}>
      <SignUpContainer>
        <GoBackArrowContent onPress={() => setOpenCheckout(false)}>
          <LeftArrow width={24} height={24} />
          <CartText allowFontScaling={false}>Create Post</CartText>
        </GoBackArrowContent>
        <View>
          <LabelText allowFontScaling={false}>Product name</LabelText>
          <InputStyle
            placeholder='Product Name'
            value={product}
            onChangeText={(text) => setProduct(text)}
            placeholderTextColor={COLORS.SecondaryTwo}
            style={{ color: '#462D85' }}
          />
        </View>
        <View>
          <LabelText allowFontScaling={false}>Caption</LabelText>
          <InputStyle
            placeholder='Caption'
            value={caption}
            onChangeText={(text) => setCaption(text)}
            placeholderTextColor={COLORS.SecondaryTwo}
            style={{ color: '#462D85' }}
          />
        </View>
      </SignUpContainer>
      <View style={{ flex: 1 }}>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <CustomButton
          variant='primary'
          text={loading ? 'Posting...' : 'Post'}
          fontFamily='Arvo-Regular'
          fontSize={16}
          onPress={() => handleSubmit()}
          disabled={loading}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 28,
          }}
        />
      </View>
    </View>
  )
}

export default ProductAndCaption

const styles = StyleSheet.create({
  ProductAndCaptionContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 54,
    position: 'absolute',
    bottom: -400,
    left: 0,
    right: 0,
    marginHorizontal: 10,
  },
})

const GoBackArrowContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

const SignUpContainer = styled.View`
  padding: 20px;
  border-radius: 10px;
`

const InputStyle = styled.TextInput`
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-radius: 5px;
  padding-vertical: 8px;
  padding-horizontal: 14px;
  font-family: Gilroy-Medium;
`

const LabelText = styled.Text`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: ${COLORS.textClr};
  font-family: Gilroy-Medium;
  margin-top: 16px;
  margin-bottom: 8px;
`

const ErrorText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: ${COLORS.errorClr};
`
