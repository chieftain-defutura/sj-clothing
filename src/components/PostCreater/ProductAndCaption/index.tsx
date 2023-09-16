import * as Yup from 'yup'
import React, { useState } from 'react'
import styled from 'styled-components/native'

import {
  StyleSheet,
  View,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageSourcePropType,
  ScrollView,
} from 'react-native'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import { COLORS } from '../../../styles/theme'
import { Formik } from 'formik'

const Data = [
  require('../../../assets/images/text-tshirt.png'),
  require('../../../assets/images/plain-shirt.png'),
  require('../../../assets/images/t-shirt.png'),
  require('../../../assets/images/imaged-tshirt.png'),
]

interface IProductAndCaption {
  navigation: any
}

const ValidationSchema = Yup.object({
  productname: Yup.string().required('Please enter your product name'),
  caption: Yup.string().required('Please enter your caption'),
})

const ProductAndCaption: React.FC<IProductAndCaption> = ({ navigation }) => {
  return (
    <View style={styles.ProductAndCaptionContainer}>
      <View style={styles.ProductAndCaptionNavigator}>
        <Pressable onPress={() => navigation.navigate('AddText')}>
          <ArrowCircleLeft width={24} height={24} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('FinalProduct')}>
          <ArrowCircleRight width={24} height={24} />
        </Pressable>
      </View>
      <View style={styles.TShirt}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.ProductAndCaption360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>

      <Formik
        initialValues={{
          productname: '',
          caption: '',
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, errors, touched, handleChange, isValid, handleSubmit, handleBlur }) => (
          <SignUpContainer>
            <View>
              <LabelText>Product name</LabelText>
              <InputStyle
                placeholder='Name'
                value={values.productname}
                onChangeText={handleChange('productname')}
                onBlur={handleBlur('productname')}
                placeholderTextColor={COLORS.SecondaryTwo}
              />
              {touched.productname && errors.productname && (
                <ErrorText>{errors.productname}</ErrorText>
              )}
            </View>
            <View>
              <LabelText>Caption</LabelText>
              <InputStyle
                placeholder='Caption'
                value={values.caption}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                placeholderTextColor={COLORS.SecondaryTwo}
              />
              {touched.caption && errors.caption && <ErrorText>{errors.caption}</ErrorText>}
            </View>
          </SignUpContainer>
        )}
      </Formik>
    </View>
  )
}

export default ProductAndCaption

const styles = StyleSheet.create({
  ProductAndCaptionContainer: {
    flex: 1,
    backgroundColor: '#FFEFFF',
  },
  ProductAndCaptionNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
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
