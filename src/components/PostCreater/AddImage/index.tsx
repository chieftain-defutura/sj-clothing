import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import Animated, {
  BounceInUp,
  BounceOutUp,
  FlipInXDown,
  FlipOutXDown,
} from 'react-native-reanimated'

import SelectDesign from './SelectDesign'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import { PostCreationStore } from '../../../store/postCreationStore'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'

const Images = [
  {
    title: 'Front',
    image: require('../../../assets/images/front-design.png'),
  },
  {
    title: 'Back',
    image: require('../../../assets/images/front-design.png'),
  },
  {
    title: 'Right arm',
    image: require('../../../assets/images/left-arm-design.png'),
  },
  {
    title: 'Left arm',
    image: require('../../../assets/images/left-arm-design.png'),
  },
]

interface IAddImage {
  navigation: any
  setPostCreationSteps: React.Dispatch<React.SetStateAction<number>>
}

const AddImage: React.FC<IAddImage> = ({ navigation, setPostCreationSteps }) => {
  const { setImage } = PostCreationStore()
  const [isNftImage, setNftImage] = useState(0)
  const [isSelect, setSelect] = useState('Front')
  const [isAddImage, setAddImage] = useState(false)
  const [isDropDown, setDropDown] = useState(false)
  const [isImageAdded, setImageAdded] = useState(false)
  const [isStyleName, setStyleName] = useState('Bluebee')

  return (
    <View style={{ flex: 1 }}>
      {isImageAdded ? (
        <SelectDesign
          navigation={navigation}
          setImageAdded={setImageAdded}
          setPostCreationSteps={setPostCreationSteps}
          isNftImage={isNftImage}
          isStyleName={isStyleName}
          isSelect={isSelect}
          setNftImage={setNftImage}
          setStyleName={setStyleName}
        />
      ) : (
        <View style={styles.AddImageContainer}>
          <Animated.View style={styles.AddImageNavigator}>
            <Pressable onPress={() => setPostCreationSteps(1)}>
              <ArrowCircleLeft width={24} height={24} />
            </Pressable>
            <Pressable onPress={() => setDropDown(true)} style={styles.AddImageDropdown}>
              <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Add Image</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setPostCreationSteps(3),
                  setImage({
                    title: isSelect,
                    design: { image: '/assets/images/left-arm-design.png', name: isStyleName },
                  })
              }}
            >
              <ArrowCircleRight width={24} height={24} />
            </Pressable>
          </Animated.View>
          {isDropDown && (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: '100%',
                  borderBottomRightRadius: 50,
                  borderBottomLeftRadius: 50,
                },
              ]}
            >
              <Animated.View
                entering={FlipInXDown}
                exiting={FlipOutXDown.duration(400)}
                style={{
                  backgroundColor: COLORS.iconsNormalClr,
                  borderBottomRightRadius: 50,
                  borderBottomLeftRadius: 50,
                  paddingHorizontal: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    borderBottomColor: COLORS.borderClr,
                    borderBottomWidth: 1,
                    paddingVertical: 20,
                    color: COLORS.textClr,
                    fontSize: 14,
                    fontFamily: 'Gilroy-Medium',
                  }}
                >
                  Select area to add image
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 20,
                    paddingHorizontal: 1,
                    gap: 10,
                  }}
                >
                  {Images.slice(0, 2).map((data, index) => (
                    <Pressable
                      onPress={() => {
                        setSelect(data.title), setAddImage(false), setImageAdded(true)
                      }}
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: COLORS.BoxBackgoundClr,
                          padding: 16,
                          borderRadius: 10,
                          borderColor: isSelect === data.title ? COLORS.textSecondaryClr : '',
                          borderWidth: isSelect === data.title ? 1 : 0,
                        }}
                      >
                        <Image
                          style={{ width: 50, height: 72, objectFit: 'contain' }}
                          source={data.image}
                        />
                      </View>

                      <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                        {data.title}
                      </Text>
                    </Pressable>
                  ))}
                  {Images.slice(2, 4).map((data, index) => (
                    <Pressable
                      onPress={() => {
                        setSelect(data.title), setAddImage(false), setImageAdded(true)
                      }}
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: COLORS.BoxBackgoundClr,
                          padding: 16,
                          borderRadius: 10,
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          width: 80,
                          borderColor: isSelect === data.title ? COLORS.textSecondaryClr : '',
                          borderWidth: isSelect === data.title ? 1 : 0,
                        }}
                      >
                        <Image
                          style={{ width: 25, height: 72, objectFit: 'contain' }}
                          source={data.image}
                        />
                      </View>

                      <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                        {data.title}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </Animated.View>
              <Animated.View
                entering={BounceInUp.duration(800)}
                exiting={BounceOutUp.duration(700)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  zIndex: 10,
                }}
              >
                <Pressable
                  onPress={() => setDropDown(false)}
                  style={{
                    backgroundColor: COLORS.iconsNormalClr,
                    width: 42,
                    height: 42,
                    borderRadius: 50,
                    padding: 10,
                  }}
                >
                  <CloseIcon />
                </Pressable>
              </Animated.View>
            </Animated.View>
          )}

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <View style={[styles.AddImageTShirt]}>
              <Image source={require('../../../assets/images/plain-shirt.png')} />
            </View>
            <View style={styles.AddImage360Degree}>
              <ThreeSixtyDegree width={40} height={40} />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default AddImage

const styles = StyleSheet.create({
  AddImageContainer: {
    flex: 1,
    backgroundColor: '#FFEFFF',
  },
  AddImageNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  AddImageDropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  AddImageTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: -1,
  },
  AddImage360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
