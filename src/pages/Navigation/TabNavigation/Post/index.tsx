// import React, { useState } from 'react'
// import styled from 'styled-components/native'
// import { Pressable, View, StyleSheet, ScrollView } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient'
// import { COLORS } from '../../../../styles/theme'
// import Setting from '../../../../assets/icons/Settings'
// import Search from '../../../../assets/icons/Search'
// import PostCard from '../../../../components/PostCard'
// import SubscriptionModal from '../../../../screens/Subscription'
// import PlusIcon from '../../../../assets/icons/Plus'
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated'
// import CloseIcon from '../../../../assets/icons/Close'

// interface IPost {
//   navigation: any
// }

// const data = [
//   'Trending',
//   'New collection',
//   'Trending',
//   'New collection',
//   'Trending',
//   'New collection',
//   'Trending',
//   'New collection',
//   'Trending',
//   'New collection',
//   'Trending',
//   'New collection',
// ]

// const Post: React.FC<IPost> = ({ navigation }) => {
//   const [isSubscriptionModal, setSubscriptionModal] = useState(false)
//   const height = useSharedValue(0)
//   const display = useSharedValue<'none' | 'flex'>('none')
//   const top = useSharedValue(10)

//   const animStyle = useAnimatedStyle(() => ({
//     height: height.value,
//   }))

//   const displayStyle = useAnimatedStyle(() => ({
//     display: display.value,
//   }))

//   const cancelStyle = useAnimatedStyle(() => ({
//     top: top.value,
//   }))

//   const closeSubscriptionModal = () => {
//     setSubscriptionModal(false)
//   }
//   const openSubscriptionModal = () => {
//     setSubscriptionModal(true)
//   }

//   const handleClick = () => {
//     if (height.value === 0) {
//       height.value = withSpring(196)
//       display.value = 'flex'
//       top.value = withSpring(205)
//     } else {
//       top.value = withTiming(0, { duration: 300 })
//       height.value = withTiming(0, { duration: 300 })
//       setTimeout(() => {
//         display.value = 'none'
//       }, 200)
//     }
//   }

//   return (
//     <PostContainer>
//       <Animated.View style={[animStyle, styles.dropDown, displayStyle]}>
//         <CategoryHeading>Category</CategoryHeading>
//         <CategoryContent>
//           {data.slice(0, 3).map((f, index) => (
//             <Pressable key={index}>
//               <CategoryText>{f}</CategoryText>
//             </Pressable>
//           ))}
//         </CategoryContent>
//         <CategoryContent>
//           {data.slice(3, 6).map((f, index) => (
//             <Pressable key={index}>
//               <CategoryText>{f}</CategoryText>
//             </Pressable>
//           ))}
//         </CategoryContent>
//         <CategoryContent>
//           {data.slice(6, 9).map((f, index) => (
//             <Pressable key={index}>
//               <CategoryText>{f}</CategoryText>
//             </Pressable>
//           ))}
//         </CategoryContent>
//         <CategoryContent>
//           {data.slice(9, 12).map((f, index) => (
//             <Pressable key={index}>
//               <CategoryText>{f}</CategoryText>
//             </Pressable>
//           ))}
//         </CategoryContent>
//       </Animated.View>
//       <Animated.View style={[styles.cancel, cancelStyle, displayStyle]}>
//         <Pressable onPress={handleClick}>
//           <CloseIcon width={24} height={24} />
//         </Pressable>
//       </Animated.View>
//       <ScrollView style={styles.postWrapper}>
//         <PostHead style={{ padding: 16 }}>
//           <View>
//             <ViewedText>Most viewed</ViewedText>
//           </View>
//           <PostIcons>
//             <Pressable onPress={handleClick}>
//               <View></View>
//               <Setting />
//             </Pressable>
//             <Pressable onPress={() => navigation.navigate('Search')}>
//               <Search />
//             </Pressable>
//           </PostIcons>
//         </PostHead>
//         <View>
//           <Cards>
//             <PostCard onPress={() => navigation.navigate('Buynow')} />
//             <PostCard onPress={() => navigation.navigate('Buynow')} />
//             <PostCard onPress={() => navigation.navigate('Buynow')} />
//             <PostCard onPress={() => navigation.navigate('Buynow')} />
//           </Cards>
//         </View>
//       </ScrollView>
//       <LinearGradient
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         colors={['#462D85', '#DB00FF']}
//         style={styles.gradientColor}
//       >
//         <Pressable onPress={openSubscriptionModal}>
//           <PlusIcon width={24} height={24} />
//         </Pressable>
//       </LinearGradient>
//       <SubscriptionModal isVisible={isSubscriptionModal} onClose={closeSubscriptionModal} />
//     </PostContainer>
//   )
// }

// const PostContainer = styled.View`
//   flex: 1;
// `

// const CategoryHeading = styled.Text`
//   font-family: Arvo-Regular;
//   font-size: 16px;
//   color: ${COLORS.iconsHighlightClr};
// `

// const CategoryContent = styled.View`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   margin-top: 20px;
// `

// const CategoryText = styled.Text`
//   font-family: Gilroy-Medium;
//   font-size: 12px;
//   color: rgba(70, 45, 133, 0.4);
// `

// const PostHead = styled.View`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `

// const ViewedText = styled.Text`
//   color: ${COLORS.textClr};
//   font-size: 16px;
// `

// const PostIcons = styled.View`
//   display: flex;
//   flex-direction: row;
//   gap: 24px;
// `

// const Cards = styled.View`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

// const styles = StyleSheet.create({
//   dropDown: {
//     backgroundColor: 'white',
//     width: '100%',
//     zIndex: 999,
//     position: 'absolute',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     padding: 16,
//   },
//   cancel: {
//     position: 'absolute',
//     width: 45,
//     height: 45,
//     zIndex: 999,
//     backgroundColor: '#EBEBEB',
//     borderRadius: 50,
//     left: '44%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   gradientColor: {
//     backgroundColor: '#462d85',
//     borderRadius: 50,

//     padding: 20,
//     position: 'absolute',
//     bottom: 40,
//     right: 30,
//   },
//   postWrapper: {
//     backgroundColor: COLORS.backgroundClr,
//   },
// })

// export default Post

import React from 'react'
import { SafeAreaView } from 'react-native'
import ReelsComponent from '../../../../components/PostReels'
import { reelsData } from '../../../../utils/postData'

const Post: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReelsComponent reelsData={reelsData} />
    </SafeAreaView>
  )
}

export default Post
