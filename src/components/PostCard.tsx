// import * as React from 'react'
// import { TouchableOpacity, Pressable } from 'react-native'
// import { COLORS } from '../styles/theme'
// import styled from 'styled-components/native'
// import Like from '../assets/icons/like'
// import EyeIcon from '../assets/icons/EyeIcon'
// import Fire from '../assets/icons/fire'
// import Heart from '../assets/icons/heart'
// import LoginModal from '../screens/Login'
// import SaveIcon from '../assets/icons/SaveIcon'

// interface componentNameProps {}

// const onLikePressed = () => {}

// const Data = [
//   {
//     id: 1,
//     image: require('../assets/images/t-shirt.png'),
//     title: 'John David',
//     description: 'Imperdiet in sit rhoncus , eleifend tellus augue lec ... more',
//   },
//   {
//     id: 2,
//     image: require('../assets/images/t-shirt.png'),
//     title: 'John David',
//     description: 'Imperdiet in sit rhoncus , eleifend tellus augue lec ... more',
//   },
// ]

// const PostCard = (props: componentNameProps) => {
//   const [isLoginModalVisible, setLoginModalVisible] = React.useState(false)

//   const openLoginModal = () => {
//     setLoginModalVisible(true)
//   }

//   const closeLoginModal = () => {
//     setLoginModalVisible(false)
//   }
//   return (
//     <PostCardWrapper>
//       <ImageContent>
//         <TouchableOpacity onPress={openLoginModal}>
//           <TShirtImg source={require('../assets/images/t-shirt.png')} />
//         </TouchableOpacity>
//         <CardContent>
//           <Pressable onPress={onLikePressed}>
//             <Like height={20} width={20} />
//           </Pressable>

//           <Pressable onPress={onLikePressed}>
//             <Fire height={20} width={20} />
//           </Pressable>
//           <ContentView>
//             <Pressable onPress={onLikePressed}>
//               <Heart height={20} width={20} />
//             </Pressable>
//             <LikeText>10.01k</LikeText>
//           </ContentView>
//         </CardContent>
//         <EyeContent>
//           <Pressable onPress={onLikePressed}>
//             <EyeIcon height={20} width={20} />
//           </Pressable>
//           <EyeText>10.01k</EyeText>
//         </EyeContent>
//       </ImageContent>

//       <PostCardContent>
//         <FlexContent>
//           <SliderNumber>1/2</SliderNumber>
//           <SliderDots>...</SliderDots>
//           <SaveIcon width={24} height={24} />
//         </FlexContent>
//         <Content>
//           <PostCardText>Post Card</PostCardText>
//           <PostDescription>
//             Imperdiet in sit rhoncus , eleifend tellus augue lec ... more
//           </PostDescription>
//         </Content>
//       </PostCardContent>

//       <LoginModal isVisible={isLoginModalVisible} onClose={closeLoginModal} />
//     </PostCardWrapper>
//   )
// }

// const PostCardWrapper = styled.View`
//   background-color: transparent;
//   margin: 20px;
// `

// const SliderNumber = styled.Text`
//   color: ${COLORS.iconsHighlightClr};
//   letter-spacing: -0.28px;
//   font-size: 14px;
//   font-family: Gilroy-SemiBold;
// `

// const FlexContent = styled.View`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `

// const Content = styled.View`
//   margin-top: 20px;
// `

// const PostCardText = styled.Text`
//   color: ${COLORS.textClr};
//   font-size: 16px;
//   font-family: Gilroy-Medium;
// `

// const PostDescription = styled.Text`
//   color: ${COLORS.secondaryRGBAClr};
//   font-size: 12px;
//   font-family: Gilroy-Regular;
//   letter-spacing: -0.24px;
//   margin-top: 4px;
// `

// const SliderDots = styled.Text``

// const ImageContent = styled.View`
//   background-color: ${COLORS.imageContentClr};
//   padding: 16px;
//   border-top-left-radius: 10px;
//   border-top-right-radius: 10px;
// `

// const TShirtImg = styled.Image`
//   width: 300px;
//   height: 300px;
//   flex-shrink: 0;
//   margin-vertical: 30px;
//   margin-horizontal: 14px;
// `

// const CardContent = styled.View`
//   position: absolute;
//   padding-left: 16px;
//   bottom: 10px;
//   display: flex;
//   flex-direction: row;
//   gap: 16px;
// `

// const ContentView = styled.View`
//   display: flex;
//   flex-direction: row;
//   gap: 5px;
// `

// const LikeText = styled.Text`
//   color: white;
//   align-items: center;
//   font-style: normal;
//   font-size: 14px;
// `

// const EyeContent = styled.View`
//   position: absolute;
//   right: 25px;
//   bottom: 10px;
//   display: flex;
//   flex-direction: row;
//   gap: 5px;
// `

// const EyeText = styled.Text`
//   color: white;
//   align-items: center;
//   font-style: normal;
//   font-size: 14px;
// `

// const PostCardContent = styled.View`
//   width: auto;
//   background-color: white;
//   padding: 16px;
//   border-bottom-left-radius: 10px;
//   border-bottom-right-radius: 10px;
// `

// export default PostCard

import * as React from 'react'
import { TouchableOpacity, Pressable, FlatList, View, Dimensions } from 'react-native'
import { COLORS } from '../styles/theme'
import styled from 'styled-components/native'
import Like from '../assets/icons/like'
import EyeIcon from '../assets/icons/EyeIcon'
import Fire from '../assets/icons/fire'
import Heart from '../assets/icons/heart'
import LoginModal from '../screens/Login'
import SaveIcon from '../assets/icons/SaveIcon'
import { useState } from 'react'
import SignupModal from '../screens/Signup'

interface componentNameProps {}

const onLikePressed = () => {}

const { height, width } = Dimensions.get('window')
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

const PostCard = (props: componentNameProps) => {
  const [isLoginModalVisible, setLoginModalVisible] = React.useState(false)
  const [isSignUpModel, setSignupMoodel] = React.useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLoginModal = () => {
    setLoginModalVisible(true)
  }

  const closeLoginModal = () => {
    setLoginModalVisible(false)
  }

  const onSignUpClick = () => {
    setLoginModalVisible(false)
    setSignupMoodel(true)
  }

  const openSignUpModel = () => {
    setSignupMoodel(true)
  }

  const closeSignUpModel = () => {
    setSignupMoodel(false)
  }

  const flatListRenderer = () => {
    return (
      <ImageContent style={{ width: 345 }}>
        <TouchableOpacity onPress={openLoginModal}>
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
    <PostCardWrapper>
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
          <SaveIcon width={24} height={24} />
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
  width: 90%;
  background-color: transparent;
  margin: 20px;
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
  height: 300px;
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
`

const PostCardContent = styled.View`
  width: auto;
  background-color: white;
  padding: 16px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

export default PostCard
