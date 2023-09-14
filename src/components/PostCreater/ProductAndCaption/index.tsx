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
} from 'react-native'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import { COLORS } from '../../../styles/theme'

const Data = [
  require('../../../assets/images/text-tshirt.png'),
  require('../../../assets/images/plain-shirt.png'),
]

interface IProductAndCaption {
  navigation: any
}
const { width } = Dimensions.get('window')

const ProductAndCaption: React.FC<IProductAndCaption> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const flatListRenderer = () => {
    return (
      <ImageContent>
        <TShirtImg source={require('../../../assets/images/t-shirt.png')} />
      </ImageContent>
    )
  }

  return (
    <View style={styles.ProductAndCaptionContainer}>
      <View style={styles.ProductAndCaptionNavigator}>
        <Pressable onPress={() => navigation.navigate('AddText')}>
          <ArrowCircleLeft width={24} height={24} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('AddText')}>
          <ArrowCircleRight width={24} height={24} />
        </Pressable>
      </View>

      <View style={{ height: 400 }}>
        <FlatList
          data={Data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x
            const newIndex = Math.round(x / width)
            setCurrentIndex(newIndex)
          }}
          horizontal
          renderItem={({ item, index }) => flatListRenderer()}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {Data.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: currentIndex == index ? '#DB00FF' : '#AAA',
                  width: currentIndex == index ? 12 : 4,
                  height: 4,
                  borderRadius: 10,
                  marginLeft: 5,
                }}
              ></View>
            )
          })}
        </View>
      </View>
      <View style={styles.ProductAndCaption360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>
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
    padding: 16,
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
})

const ImageContent = styled.View`
  background-color: ${COLORS.imageContentClr};
  padding: 16px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 50%;
`
const TShirtImg = styled.Image`
  width: 250px;
  height: 300px;
  flex-shrink: 0;
  margin-vertical: 30px;
  margin-horizontal: 14px;
`
