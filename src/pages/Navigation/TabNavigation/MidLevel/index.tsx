// import React from 'react'
// import styled from 'styled-components/native'

// const MidLevel: React.FC = () => {
//   return (
//     <MidLevelWrapper>
//       <MidLevelText>MidLevel</MidLevelText>
//     </MidLevelWrapper>
//   )
// }

// const MidLevelWrapper = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `

// const MidLevelText = styled.Text`
//   font-size: 28px;
// `

// export default MidLevel

import React, { useRef } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
} from 'react-native'

const images = [
  {
    id: 1,
    img: require('../../../../assets/images/t-shirt.png'),
    title: 'Beautiful Coral Reef',
    color: '#33ccff',
  },
  {
    id: 2,
    img: require('../../../../assets/images/t-shirt.png'),
    title: 'Beautiful Sea Wave',
    color: 'brown',
  },

  {
    id: 3,
    img: require('../../../../assets/images/t-shirt.png'),
    title: 'Ice Galcier Mystery',
    color: '#33ccff',
  },
  {
    id: 4,
    img: require('../../../../assets/images/t-shirt.png'),
    title: 'Wonderful Jelly fish Group',
    color: '#33ccff',
  },

  {
    id: 5,
    img: require('../../../../assets/images/t-shirt.png'),
    title: 'Fresh Sea Water',
    color: '#33ccff',
  },
  {
    id: 6,
    img: require('../../../../assets/images/t-shirt.png'),
    title: 'Sea the Universe',
    color: 'brown',
  },
]

const MidLevel = () => {
  const scrollX = useRef(new Animated.Value(0)).current

  let { width: windowWidth, height: windowHeight } = useWindowDimensions()
  windowHeight = windowHeight - 300

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.scrollContainer, { height: windowHeight }]}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
        >
          {images.map((image, imageIndex) => {
            return (
              <Animated.View style={{ width: windowWidth }} key={imageIndex}>
                <Image source={image.img} style={styles.card} />
              </Animated.View>
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.indicatorContainer}>
        {images.map((image, imageIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          })

          return (
            <Animated.View
              style={[styles.normalDots, { width }, { backgroundColor: image.color }]}
            />
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    shadowColor: '#6A6C6E',
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowOpacity: 1,
  },
  card: {
    flex: 1,
    marginVertical: 10,
    width: 350,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,

    marginHorizontal: 4,
  },
  textAreaContainer: {
    width: '100%',
    marginBottom: 10,
  },
  textView: {
    position: 'absolute',
    fontSize: 22,
    textAlign: 'center',
    width: '100%',
  },
})

export default MidLevel
