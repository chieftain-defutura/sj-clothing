import { Pressable, StyleSheet, Text, View, Share, ScrollView } from 'react-native'
import React from 'react'
import LeftArrow from '../../../assets/icons/LeftArrow'
import { COLORS } from '../../../styles/theme'
import ShareArrow from '../../../assets/icons/ShareArrow'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import CustomButton from '../../Button'
import Carousle from './Carousle'
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
}
const FinalProduct: React.FC<IFinalProduct> = ({ navigation }) => {
  const url = 'https://www.youtube.com/watch?v=lTxn2BuqyzU'
  const share = async () => {
    try {
      const result = await Share.share({ message: 'Bug:' + `\n` + url })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with active type', result.activityType)
        } else {
          console.log('shared')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ScrollView style={styles.selectContainer}>
      <View style={styles.selectNavigator}>
        <Pressable onPress={() => navigation.navigate('ProductAndCaption')}>
          <LeftArrow width={24} height={24} />
        </Pressable>
        <Pressable
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.textClr, fontFamily: 'Arvo-Regular', fontSize: 16 }}>
            White T-shirt
          </Text>
          <Text
            style={{ color: COLORS.textSecondaryClr, fontFamily: 'Gilroy-Medium', fontSize: 12 }}
          >
            #Roundneck
          </Text>
        </Pressable>
        <Pressable onPress={share}>
          <ShareArrow width={24} height={24} />
        </Pressable>
      </View>
      <View style={styles.selectColorTShirt}>
        <Carousle />
      </View>

      <View style={styles.selectColor360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>
      <View style={{ paddingVertical: 8, display: 'flex', gap: 4 }}>
        <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>#Round neck</Text>
        <Text style={{ color: COLORS.textTertiaryClr, fontFamily: 'Gilroy-Regular' }}>
          Imperdiet in sit rhoncus , eleifend tellus augue lec.Imperdiet in sit rhoncus , eleifend
          tellus augue lec.
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
        onPress={() => navigation.navigate('Stack')}
        buttonStyle={[styles.submitBtn]}
      />
    </ScrollView>
  )
}

export default FinalProduct

const styles = StyleSheet.create({
  selectContainer: {
    padding: 16,
    backgroundColor: '#FFEFFF',
  },
  selectNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 34,
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
