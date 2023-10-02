import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import styled from 'styled-components/native'
import { StyleSheet, View, Image, Pressable, ScrollView } from 'react-native'

import { COLORS } from '../../../styles/theme'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import { PostCreationStore } from '../../../store/postCreationStore'
import Animated, { LightSpeedInLeft, LightSpeedOutRight } from 'react-native-reanimated'

// const Data = [
//   require('../../../assets/images/text-tshirt.png'),
//   require('../../../assets/images/plain-shirt.png'),
//   require('../../../assets/images/t-shirt.png'),
//   require('../../../assets/images/imaged-tshirt.png'),
// ]

interface IProductAndCaption {
  setProduct: React.Dispatch<React.SetStateAction<string>>
  setCaption: React.Dispatch<React.SetStateAction<string>>
}

const ValidationSchema = Yup.object({
  productname: Yup.string().required('Please enter your product name'),
  caption: Yup.string().required('Please enter your caption'),
})

const ProductAndCaption: React.FC<IProductAndCaption> = ({ setProduct, setCaption }) => {
  return (
    <ScrollView style={styles.ProductAndCaptionContainer}>
      <SignUpContainer>
        <View>
          <LabelText>Product name</LabelText>
          <InputStyle
            placeholder='Product Name'
            onChangeText={(text) => setProduct(text)}
            placeholderTextColor={COLORS.SecondaryTwo}
          />
        </View>
        <View>
          <LabelText>Caption</LabelText>
          <InputStyle
            placeholder='Caption'
            onChangeText={(text) => setCaption(text)}
            placeholderTextColor={COLORS.SecondaryTwo}
          />
        </View>
      </SignUpContainer>
    </ScrollView>
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
