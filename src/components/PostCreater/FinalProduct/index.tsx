import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'
import Carousle from './Carousle'
import { PostCreationStore } from '../../../store/postCreationStore'
const Data = [
  {
    title: 'Product',
    content: 'Black blazer',
  },
  {
    title: 'Style',
    content: 'Round neck',
  },
  {
    title: 'Quantity',
    content: 'x1',
  },
  {
    title: 'Material',
    content: '70% Wool, 30% Mohair',
  },
  {
    title: 'Lining',
    content: '100% Silk',
  },
  {
    title: 'Price',
    content: '450 INR',
  },
]

interface IFinalProduct {
  navigation: any
  isGiftVideo: any
  handleSubmit: () => Promise<void>
  setGiftVideo: React.Dispatch<any>
}
const FinalProduct: React.FC<IFinalProduct> = ({
  navigation,
  handleSubmit,
  setGiftVideo,
  isGiftVideo,
}) => {
  const { color, image, text, style, productandcaption } = PostCreationStore()

  console.log(style, text, color, image, productandcaption)
  return (
    <ScrollView style={styles.selectContainer}>
      <View style={styles.selectColorTShirt}>
        <Carousle isGiftVideo={isGiftVideo} setGiftVideo={setGiftVideo} />
      </View>

      <View style={{ paddingVertical: 8, display: 'flex', gap: 4 }}>
        <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>#{style?.title}</Text>
        <Text style={{ color: COLORS.textTertiaryClr, fontFamily: 'Gilroy-Regular' }}>
          {productandcaption?.caption === ''
            ? 'Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend tellus augue lec.'
            : productandcaption?.caption}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingBottom: 8,
        }}
      >
        {Data.map((item, index) => (
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              columnGap: 30,
              width: 100,
              paddingTop: 16,
            }}
          >
            <Text style={{ color: COLORS.textClr, fontFamily: 'Montserrat-Regular', fontSize: 10 }}>
              {item.title}
            </Text>
            <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
              {item.content}
            </Text>
          </View>
        ))}
      </View>
      <CustomButton
        variant='primary'
        text='Post'
        onPress={handleSubmit}
        buttonStyle={[styles.submitBtn]}
      />
    </ScrollView>
  )
}

export default FinalProduct

const styles = StyleSheet.create({
  selectContainer: {
    padding: 16,
  },
  selectNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  selectColorTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectColor360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 54,
  },
})
