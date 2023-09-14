import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../../components/Button'

interface IGiftOption {
  navigation: any
}

const validationSchema = Yup.object({
  yourGift: Yup.string()
    .required('Gift message is required')
    .test('maxLines', 'Your gift message should not exceed 8 lines', (value) => {
      if (!value) return true
      const lines = value.split('\n')
      return lines.length <= 8
    })
    .test('maxLength', 'Your gift message should not exceed 212 characters', (value) => {
      if (!value) return true
      return value.replace(/\n/g, '').length <= 212
    }),
  from: Yup.string().required('From field is required'),
})

const GiftOptions: React.FC<IGiftOption> = ({ navigation }) => {
  return (
    <ScrollViewContent>
      <View>
        <GiftContent>
          <GoBackArrowContent
            onPress={() => {
              navigation.goBack()
            }}
          >
            <LeftArrow width={24} height={24} />
            <CartText>Gift options</CartText>
          </GoBackArrowContent>
          <GiftImage>
            <TShirtImage source={require('../../../assets/images/t-shirt.png')} />
          </GiftImage>
          <Formik
            initialValues={{
              yourGift: '',
              from: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
          >
            {({ values, errors, touched, handleChange, isValid, handleSubmit, handleBlur }) => (
              <GiftMessageWrapper>
                <View>
                  <GiftMessageText>Gift message</GiftMessageText>
                  <TextArea
                    multiline={true}
                    numberOfLines={4}
                    value={values.yourGift}
                    onChangeText={handleChange('yourGift')}
                    onBlur={handleBlur('yourGift')}
                    placeholder='Enjoy your gift!'
                    placeholderTextColor={COLORS.SecondaryTwo}
                  />
                  {touched.yourGift && errors.yourGift && <ErrorText>{errors.yourGift}</ErrorText>}
                </View>
                <InputStyleContent>
                  <GiftMessageText>From</GiftMessageText>
                  <InputStyle
                    value={values.from}
                    onChangeText={handleChange('from')}
                    onBlur={handleBlur('from')}
                    placeholder='David'
                    placeholderTextColor={COLORS.SecondaryTwo}
                  />
                  {touched.from && errors.from && <ErrorText>{errors.from}</ErrorText>}
                </InputStyleContent>
                <ContinueBtn>
                  <CustomButton
                    variant='primary'
                    text='Continue'
                    onPress={() => {
                      handleSubmit(), navigation.navigate('Notification')
                    }}
                    disabled={!isValid}
                    fontFamily='Arvo-Regular'
                    fontSize={16}
                    style={{ marginTop: '14%' }}
                  />
                </ContinueBtn>
              </GiftMessageWrapper>
            )}
          </Formik>
        </GiftContent>
      </View>
    </ScrollViewContent>
  )
}

const ScrollViewContent = styled.ScrollView`
  background: ${COLORS.iconsNormalClr};
  flex: 1;
`

const GiftContent = styled.View`
  height: 100%;
`

const GiftMessageWrapper = styled.View`
  background: ${COLORS.backgroundClr};
  padding: 16px;
`

const InputStyleContent = styled.View`
  margin-vertical: 16px;
`

const ContinueBtn = styled.View`
  margin-top: 16px;
`

const InputStyle = styled.TextInput`
  border-color: ${COLORS.strokeClr};
  border-width: 1px;
  border-radius: 5px;
  padding-vertical: 8px;
  padding-left: 14px;
  font-family: Gilroy-Medium;
`

const ErrorText = styled.Text`
  font-size: 12px;
  color: ${COLORS.errorClr};
`

const TextArea = styled.TextInput`
  border-width: 1px;
  border-color: ${COLORS.strokeClr};
  border-radius: 5px;
  margin-top: 8px;
  padding-horizontal: 16px;
`

const GiftMessageText = styled.Text`
  font-size: 16px;
  font-family: Montserrat-SemiBold;
  color: ${COLORS.iconsHighlightClr};
`

const GiftImage = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 32px;
`

const TShirtImage = styled.Image`
  width: 300px;
  height: 300px;
  flex-shrink: 0;
`

const GoBackArrowContent = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
`

const CartText = styled.Text`
  color: ${COLORS.textClr};
  font-family: Arvo-Regular;
  font-size: 20px;
  letter-spacing: -0.4px;
`

export default GiftOptions
