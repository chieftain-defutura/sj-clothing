import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'
import Carousle from './Carousle'
import { PostCreationStore } from '../../../store/postCreationStore'

interface IFinalProduct {
  isGiftVideo: any
  handleSubmit: () => Promise<void>
  setGiftVideo: React.Dispatch<any>
  price: string
  offerPrice: string
  size: string
  style: string
  caption: string
  color: string
  product: string
  Data: {
    cloth: string
    materials: string
  }[]
}
const FinalProduct: React.FC<IFinalProduct> = ({
  handleSubmit,
  setGiftVideo,
  isGiftVideo,
  size,
  style,
  price,
  offerPrice,
  caption,
  product,
  Data,
  color,
}) => {
  return (
    <ScrollView style={styles.selectContainer}>
      <View style={styles.selectColorTShirt}>
        <Carousle isGiftVideo={isGiftVideo} setGiftVideo={setGiftVideo} />
      </View>

      <View style={{ paddingVertical: 8, display: 'flex', gap: 4 }}>
        <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>#{product}</Text>
        <Text style={{ color: COLORS.textTertiaryClr, fontFamily: 'Gilroy-Regular' }}>
          {caption === ''
            ? 'Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend tellus augue lec.'
            : caption}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 37,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Style
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            {style}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Size
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            {size}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Quantity
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            x1
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 37,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Price
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            {price ? price : 0}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Offer Price
          </Text>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
            {offerPrice ? offerPrice : '-'}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 95,
            paddingTop: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
            }}
          >
            Color
          </Text>
          <Text
            style={{
              color: COLORS.textClr,
              fontFamily: 'Arvo-Regular',
              fontSize: 14,
              backgroundColor: color,
            }}
          ></Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingBottom: 8,
          columnGap: 37,
        }}
      >
        {Data.map((item, index) => (
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 95,
              paddingTop: 16,
            }}
          >
            <Text
              style={{
                color: COLORS.textClr,
                fontFamily: 'Montserrat-Regular',
                fontSize: 10,
              }}
            >
              {item.cloth}
            </Text>
            <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 14 }}>
              {item.materials}
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
