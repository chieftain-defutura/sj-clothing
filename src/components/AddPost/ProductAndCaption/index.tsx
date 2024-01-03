import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'
import { addDoc, collection } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { ErrorMessage } from 'formik'
import { useNavigation } from '@react-navigation/native'

interface IProductAndCaption {
  setProduct: React.Dispatch<React.SetStateAction<string>>
  setCaption: React.Dispatch<React.SetStateAction<string>>
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
  setOpenCheckout: React.Dispatch<React.SetStateAction<boolean>>
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
  isGiftVideo,
  setOpenCheckout,
}) => {
  const user = userStore((state) => state.user)
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (errorMessage) {
      setInterval(() => {
        setErrorMessage('')
      }, 3000)
    }
  })
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
        await addDoc(collection(db, 'Post'), {
          sizes: size ? size : '',
          style: style ? style : '',
          color: color ? color : '',
          textAndImage: textAndImage ? textAndImage : '',
          productImage: productImage,
          description: description,
          price: price,
          offerPrice: offerPrice,
          productId: id,
          userId: user?.uid,
          gender: gender,
          productName: productName,
          giftVideo: isGiftVideo,
        })
        setOpenCheckout(false)
        navigation.navigate('Stack')
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
          <CartText allowFontScaling={false}>Gift options</CartText>
        </GoBackArrowContent>
        <View>
          <LabelText allowFontScaling={false}>Product name</LabelText>
          <InputStyle
            placeholder='Product Name'
            onChangeText={(text) => setProduct(text)}
            placeholderTextColor={COLORS.SecondaryTwo}
          />
        </View>
        <View>
          <LabelText allowFontScaling={false}>Caption</LabelText>
          <InputStyle
            placeholder='Caption'
            onChangeText={(text) => setCaption(text)}
            placeholderTextColor={COLORS.SecondaryTwo}
          />
        </View>
      </SignUpContainer>
      <View>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <CustomButton
          variant='primary'
          text={loading ? 'Poasting...' : 'Post'}
          fontFamily='Arvo-Regular'
          fontSize={16}
          onPress={() => handleSubmit()}
          buttonStyle={[styles.submitBtn]}
          disabled={loading}
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
const ImageContent = styled.View`
  padding: 16px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`
const TShirtImg = styled.Image`
  width: 250px;
  height: 300px;
  flex-shrink: 0;
  margin-vertical: 30px;
  margin-horizontal: 14px;
`
