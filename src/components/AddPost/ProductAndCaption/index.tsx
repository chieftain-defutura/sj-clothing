import React from 'react'
import styled from 'styled-components/native'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'
import { addDoc, collection } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import { userStore } from '../../../store/userStore'

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
  type?: string
  description?: string
  price?: string
  offerPrice?: string
  gender?: string
  productName?: string
  productImage?: any
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
  type,
}) => {
  const user = userStore((state) => state.user)

  const handleSubmit = async () => {
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
      type: type,
      productName: productName,
    })
  }
  return (
    <View style={styles.ProductAndCaptionContainer}>
      <SignUpContainer>
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
      <CustomButton
        variant='primary'
        text='Post'
        fontFamily='Arvo-Regular'
        fontSize={16}
        onPress={() => handleSubmit()}
        buttonStyle={[styles.submitBtn]}
      />
    </View>
  )
}

export default ProductAndCaption

const styles = StyleSheet.create({
  ProductAndCaptionContainer: {
    flex: 1,
  },
  ProductAndCaptionNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  ProductAndCaptionDropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  ProductAndCaptionTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 64,
  },
  ProductAndCaption360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  TShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 54,
  },
})

const SignUpContainer = styled.View`
  padding: 20px;
  border-radius: 10px;
  padding-bottom: 100px;
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
