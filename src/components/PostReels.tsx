import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Share } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { COLORS } from '../styles/theme'
import { ReelsComponentProps } from '../constant/types'
import HomePlusIcon from '../assets/icons/PostPlusIcon'
import ShareWhiteIcon from '../assets/icons/ShareWhiteIcon'
import Like from '../assets/icons/like'
import Fire from '../assets/icons/fire'
import Heart from '../assets/icons/heart'
import IsLikeIcon from '../assets/icons/PostPageIcon/isLikeIcon'
import IsHeartIcon from '../assets/icons/PostPageIcon/isHeartIcon'
import IsFireIcon from '../assets/icons/PostPageIcon/isFire'

const { width, height } = Dimensions.get('window')

const ReelsComponent: React.FC<ReelsComponentProps> = ({ reelsData }) => {
  const [isFullContent, setIsFullContent] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isFireActive, setIsFireActive] = useState(false)
  const [isHeartActive, setIsHeartActive] = useState(false)
  const [isSubscriptionModal, setSubscriptionModal] = useState(false)

  const tabHeight = 110
  const reelsHeight = height - tabHeight

  const handleIconPress = (iconName: string) => {
    setActiveIcon(iconName)
    if (iconName === 'like') {
      setIsLiked((prevIsLiked) => !prevIsLiked)
    } else if (iconName === 'fire') {
      setIsFireActive((prev) => !prev)
    } else if (iconName === 'heart') {
      setIsHeartActive((prev) => !prev)
    }
  }

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }
  const closeSubscriptionModal = () => {
    setSubscriptionModal(false)
  }

  const openSubscriptionModal = () => {
    setSubscriptionModal(true)
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

  const toggleContent = () => {
    setIsFullContent(!isFullContent)
  }

  const LikeIconStyle = {
    backgroundColor: isPressed ? '#462D85' : 'transparent',
    borderRadius: 30,
    padding: 5,
  }

  const FireIconStyle = {
    backgroundColor: isPressed ? '#fb6304' : 'transparent',
    borderRadius: 30,
    padding: 5,
  }

  const HeartIconStyle = {
    backgroundColor: isPressed ? '#DB00FF' : 'transparent',
    borderRadius: 30,
    padding: 5,
  }

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
            <ImageSlide>
              <SwiperFlatList
                data={item.images}
                horizontal
                index={currentIndex}
                onChangeIndex={({ index }) => setCurrentIndex(index)}
                renderItem={({ item: imageUrl }) => (
                  <View
                    key={imageUrl}
                    style={[styles.item, { backgroundColor: 'pink', height: reelsHeight }]}
                  >
                    <View style={styles.container}>
                      <Image
                        source={{ uri: imageUrl }}
                        style={[styles.adImage, { height: reelsHeight }]}
                      />
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.80)']}
                        style={styles.linearGradient}
                      ></LinearGradient>
                    </View>
                  </View>
                )}
              />
            </ImageSlide>

            <FlexContent>
              <SliderCountContent>
                <SliderNumber>
                  {currentIndex + 1}/{item.images.length}
                </SliderNumber>
              </SliderCountContent>
              <PlusIconStyle onPress={openSubscriptionModal}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['#462D85', '#DB00FF']}
                  style={styles.plusIconGradientColor}
                >
                  <HomePlusIcon width={20} height={20} />
                </LinearGradient>
              </PlusIconStyle>
            </FlexContent>
            <IconsContent>
              <View>
                <IconPressable onPress={share}>
                  <ShareWhiteIcon width={20} height={20} />
                </IconPressable>
              </View>
              <View>
                <IconPressable
                  onPress={() => handleIconPress('like')}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  // style={LikeIconStyle}
                >
                  <View>
                    {activeIcon === 'like' ? (
                      isLiked ? (
                        <IsLikeIcon width={20} height={20} />
                      ) : (
                        <IsLikeIcon width={20} height={20} />
                      )
                    ) : (
                      <Like width={20} height={20} />
                    )}
                  </View>
                </IconPressable>
                <ViewText>1k</ViewText>
              </View>
              <View>
                <IconPressable
                  onPress={() => handleIconPress('fire')}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  // style={FireIconStyle}
                >
                  <View>
                    {activeIcon === 'fire' ? (
                      isFireActive ? (
                        <IsFireIcon width={20} height={20} />
                      ) : (
                        <IsFireIcon width={20} height={20} />
                      )
                    ) : (
                      <Fire width={20} height={20} />
                    )}
                  </View>
                </IconPressable>
                <ViewText>1.6k</ViewText>
              </View>
              <View>
                <IconPressable
                  onPress={() => handleIconPress('heart')}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  // style={HeartIconStyle}
                >
                  <View>
                    {activeIcon === 'heart' ? (
                      isHeartActive ? (
                        <IsHeartIcon width={20} height={20} />
                      ) : (
                        <IsHeartIcon width={20} height={20} />
                      )
                    ) : (
                      <Heart width={20} height={20} />
                    )}
                  </View>
                </IconPressable>
                <ViewText>12k</ViewText>
              </View>
            </IconsContent>
            <Content>
              <ReelsHead>{item.text}</ReelsHead>
              <ReelsTitle>{item.title}</ReelsTitle>
              <ReelsDescription>
                {isFullContent ? item.description : `${item.description.slice(0, 100)}...`}
              </ReelsDescription>
              <TouchableOpacity onPress={toggleContent}>
                <ReelsDescription>{isFullContent ? 'Read Less' : 'Read More'}</ReelsDescription>
              </TouchableOpacity>
            </Content>
          </View>
        )}
      />
    </View>
  )
}

const ReelsHead = styled.Text`
  font-size: 14px;
  font-family: Gilroy-SemiBold;
  color: ${COLORS.iconsNormalClr};
  margin-bottom: 20px;
`

const Content = styled.View`
  padding-horizontal: 16px;
  position: absolute;
  bottom: 26px;
`

const ImageSlide = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const IconPressable = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ViewText = styled.Text`
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.28px;
  font-family: Gilroy-Medium;
  margin-top: 4px;
  color: ${COLORS.iconsNormalClr};
`

const IconsContent = styled.View`
  position: absolute;
  right: 20px;
  bottom: 106px;
  display: flex;
  gap: 18px;
`

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
`

const PlusIconStyle = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const SliderNumber = styled.Text`
  color: ${COLORS.iconsHighlightClr};
  letter-spacing: -0.28px;
  font-size: 14px;
  font-family: Gilroy-SemiBold;
  text-align: center;
`

const ReelsTitle = styled.Text`
  font-size: 14px;
  font-family: Gilroy-Medium;
  color: ${COLORS.iconsNormalClr};
`

const SliderCountContent = styled.View`
  background: ${COLORS.iconsNormalClr};
  border-radius: 20px;
  padding-vertical: 4px;
  padding-horizontal: 8px;
  width: 42px;
`

const ReelsDescription = styled.Text`
  font-size: 12px;
  font-family: Gilroy-Regular;
  color: #eee;
  letter-spacing: -0.24px;
  margin-top: 4px;
  line-height: 16px;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  item: {
    width,
    position: 'relative',
  },
  gradientColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconGradientColor: {
    backgroundColor: '#462d85',
    borderRadius: 70,
    padding: 10,
    width: 40,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 0,
    elevation: 5,
  },
  adContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  adImage: {
    width,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.6,
  },
})

export default ReelsComponent
