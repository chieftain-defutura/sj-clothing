import * as React from 'react'
import { TouchableOpacity, Pressable, FlatList, View, Dimensions, Share } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../styles/theme'
import styled from 'styled-components/native'
import Like from '../assets/icons/like'
import EyeIcon from '../assets/icons/EyeIcon'
import Fire from '../assets/icons/fire'
import Heart from '../assets/icons/heart'
import LoginModal from '../screens/Modals/Login'
import SaveIcon from '../assets/icons/SaveIcon'
import { useState } from 'react'
import SignupModal from '../screens/Modals/Signup'

interface componentNameProps {}

const onLikePressed = () => {}

const { width, height } = Dimensions.get('window')

const Data = [
  {
    id: 1,
    image: require('../assets/images/t-shirt.png'),
    title: 'John David',
    description: 'Imperdiet in sit rhoncus , eleifend tellus augue lec ... more',
  },
  {
    id: 2,
    image: require('../assets/images/t-shirt.png'),
    title: 'John David',
    description: 'Imperdiet in sit rhoncus , eleifend tellus augue lec ... more',
  },
]

interface PostCardProps {
  onPress: () => void
  props?: componentNameProps
}

const PostCard: React.FC<PostCardProps> = ({ props: componentNameProps, onPress }) => {
  const [isLoginModalVisible, setLoginModalVisible] = React.useState(false)
  const [isSignUpModel, setSignupMoodel] = React.useState(false)
  const [userMail] = useState<string | null>('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const tabHeight = 110
  const reelsHeight = height - tabHeight

  const handleClick = () => {
    if (!userMail) {
      setLoginModalVisible(true)
    } else {
      setLoginModalVisible(false)
    }
  }

  const closeLoginModal = () => {
    setLoginModalVisible(false)
  }

  const onSignUpClick = () => {
    setLoginModalVisible(false)
    setSignupMoodel(true)
  }

  const closeSignUpModel = () => {
    setSignupMoodel(false)
  }
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

  const flatListRenderer = () => {
    return (
      <ImageContent style={{ width: width, overflow: 'hidden' }}>
        <TouchableOpacity onPress={handleClick}>
          <TShirtImg source={require('../assets/images/t-shirt.png')} resizeMode='cover' />
        </TouchableOpacity>
        <CardContent>
          <Pressable onPress={onLikePressed}>
            <Like height={20} width={20} />
          </Pressable>

          <Pressable onPress={onLikePressed}>
            <Fire height={20} width={20} />
          </Pressable>
          <ContentView>
            <Pressable onPress={onLikePressed}>
              <Heart height={20} width={20} />
            </Pressable>
            <LikeText>10.01k</LikeText>
          </ContentView>
        </CardContent>
        <EyeContent>
          <Pressable onPress={onLikePressed}>
            <EyeIcon height={20} width={20} />
          </Pressable>
          <EyeText>10.01k</EyeText>
        </EyeContent>
      </ImageContent>
    )
  }
  return (
    <PostCardWrapper style={{ height: reelsHeight }}>
      <View>
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

      <PostCardContent>
        <FlexContent>
          <SliderNumber>{currentIndex + 1}/2</SliderNumber>
          <SliderDots>
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
          </SliderDots>
          <Pressable onPress={share}>
            <SaveIcon width={24} height={24} />
          </Pressable>
        </FlexContent>
        <Content>
          <PostCardText>Post Card</PostCardText>
          <PostDescription>
            Imperdiet in sit rhoncus , eleifend tellus augue lec ... more
          </PostDescription>
        </Content>
      </PostCardContent>

      <LoginModal
        isVisible={isLoginModalVisible}
        onClose={closeLoginModal}
        onSignClick={onSignUpClick}
      />
      <SignupModal
        isVisible={isSignUpModel}
        onLoginClick={() => {
          setSignupMoodel(false)
          setLoginModalVisible(true)
        }}
        onClose={closeSignUpModel}
      />
    </PostCardWrapper>
  )
}

const PostCardWrapper = styled.View`
  width: 100%;
  background-color: transparent;
  margin-vertical: 20px;
`

const SliderNumber = styled.Text`
  color: ${COLORS.iconsHighlightClr};
  letter-spacing: -0.28px;
  font-size: 14px;
  font-family: Gilroy-SemiBold;
`

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Content = styled.View`
  margin-top: 20px;
`

const PostCardText = styled.Text`
  color: ${COLORS.textClr};
  font-size: 16px;
  font-family: Gilroy-Medium;
`

const PostDescription = styled.Text`
  color: ${COLORS.secondaryRGBAClr};
  font-size: 12px;
  font-family: Gilroy-Regular;
  letter-spacing: -0.24px;
  margin-top: 4px;
`

const SliderDots = styled.Text``

const ImageContent = styled.View`
  background-color: ${COLORS.imageContentClr};
  padding: 16px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const TShirtImg = styled.Image`
  height: 400px;
  flex-shrink: 0;
  margin-vertical: 30px;
  margin-horizontal: 14px;
`

const CardContent = styled.View`
  position: absolute;
  padding-left: 16px;
  bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const ContentView = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
`

const LikeText = styled.Text`
  color: white;
  align-items: center;
  font-style: normal;
  font-size: 14px;
`

const EyeContent = styled.View`
  position: absolute;
  right: 25px;
  bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 5px;
`

const EyeText = styled.Text`
  color: white;
  align-items: center;
  font-style: normal;
  font-size: 14px;
  margin-top: -3px;
`

const PostCardContent = styled.View`
  width: auto;
  background-color: white;
  padding: 16px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

export default PostCard

// import React from 'react'
// import { View, Dimensions, Image, StyleSheet } from 'react-native'
// import SwiperFlatList from 'react-native-swiper-flatlist'
// import Animated, { FlipInXDown, FlipOutXDown } from 'react-native-reanimated'
// import styled from 'styled-components/native'
// import { reelsData } from '../utils/postData'
// import { LinearGradient } from 'react-native-svg'

// const { width, height } = Dimensions.get('window')

// const PostCard: React.FC = () => {
//   const tabHeight = 110
//   const reelsHeight = height - tabHeight
//   return (
//     <View style={{ height: reelsHeight }}>
//       <Animated.View entering={FlipInXDown} exiting={FlipOutXDown}>
//         <SwiperFlatList
//           data={reelsData}
//           vertical
//           renderItem={({ item }) => (
//             <View key={item.id}>
//               <ImageSlide>
//                 <SwiperFlatList
//                   data={item.images}
//                   horizontal
//                   renderItem={({ item: imageUrl }) => (
//                     <View key={imageUrl}>
//                       <Image style={styles.adImage} source={imageUrl} />
//                       {/* <LinearGradient
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 1 }}
//                         colors={['rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.80)']}
//                         style={styles.linearGradient}
//                       /> */}
//                     </View>
//                   )}
//                 />
//               </ImageSlide>
//             </View>
//           )}
//         />
//       </Animated.View>
//     </View>
//   )
// }

// const ImageSlide = styled.View`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
// `

// export default PostCard

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   item: {
//     width,
//     position: 'relative',
//   },
//   gradientColor: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   plusIconGradientColor: {
//     backgroundColor: '#462d85',
//     borderRadius: 70,
//     padding: 10,
//     width: 40,
//     height: 40,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.24,
//     shadowRadius: 0,
//     elevation: 5,
//   },
//   adContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   linearGradient: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   adImage: {
//     width,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     opacity: 0.6,
//   },
// })
