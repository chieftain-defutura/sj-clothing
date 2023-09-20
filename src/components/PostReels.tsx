import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import SwiperFlatList from 'react-native-swiper-flatlist'
import EyesWhiteIcon from '../assets/icons/EyesWhiteIcon'
import ShareArrow from '../assets/icons/ShareArrow'
import Like from '../assets/icons/like'
import Fire from '../assets/icons/fire'
import Heart from '../assets/icons/heart'
import { COLORS } from '../styles/theme'

const { width, height } = Dimensions.get('window')

const ReelsComponent: React.FC = () => {
  const tabHeight = 110
  const reelsHeight = height - tabHeight

  const reelsData = [
    {
      id: '1',
      text: '#Round neck',
      title: 'John david',
      description: 'Imperdiet in sit rhoncus , eleifend tellus augue lec ... more',
      shareIcon: ShareArrow,
      Like: Like,
      fireIcon: Fire,
      heart: Heart,
      eyes: EyesWhiteIcon,
    },
    {
      id: '2',
      text: '#Round neck',
      title: 'John david',
      description: 'Imperdiet in sit rhoncus , eleifend tellus augue lec ... more',
      shareIcon: ShareArrow,
      Like: Like,
      fireIcon: Fire,
      heart: Heart,
      eyes: EyesWhiteIcon,
    },
  ]

  return (
    <View style={{ height: reelsHeight }}>
      <SwiperFlatList
        data={reelsData}
        vertical
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={[styles.item, { backgroundColor: item.backgroundColor, height: reelsHeight }]}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.40)']}
              style={styles.gradientColor}
            >
              <View style={styles.container}>
                <PostImage source={require('../assets/images/t-shirt.png')} />
              </View>
              <View style={{ paddingHorizontal: 16 }}>
                <ReelsHead>{item.text}</ReelsHead>
                <ReelsTitle>{item.title}</ReelsTitle>
              </View>
            </LinearGradient>
          </View>
        )}
      />
    </View>
  )
}

const ReelsContainer = styled.View``

const PostImage = styled.Image`
  width: 100%;
  aspect-ratio: 1;
`
const ReelsHead = styled.Text`
  font-size: 14px;
  font-family: Gilroy-SemiBold;
  color: ${COLORS.iconsHighlightClr};
  margin-bottom: 20px;
`

const ReelsTitle = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsHighlightClr};
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width,
    position: 'relative',
  },
  gradientColor: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
})

export default ReelsComponent
