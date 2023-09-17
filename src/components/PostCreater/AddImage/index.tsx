import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

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
}

const AddImage: React.FC<IAddImage> = ({ navigation }) => {
  const height = useSharedValue(0)
  const [isSelect, setSelect] = useState('Front')
  const [isAddImage, setAddImage] = useState(false)
  const display = useSharedValue<'none' | 'flex'>('none')
  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    display: display.value,
  }))
  const animate = () => {
    if (height.value === 0) {
      display.value = 'flex' as 'none' | 'flex'
      height.value = withSpring(95)
    } else {
      height.value = withTiming(0, { duration: 300 })
      setTimeout(() => {
        display.value = 'none'
      }, 250)
    }
  }

  return (
    <View style={styles.AddImageContainer}>
      <View style={styles.AddImageNavigator}>
        <Pressable onPress={() => navigation.navigate('Color')}>
          <ArrowCircleLeft width={24} height={24} />
        </Pressable>
        <Pressable onPress={animate} style={styles.AddImageDropdown}>
          <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Add Image</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('AddText')}>
          <ArrowCircleRight width={24} height={24} />
        </Pressable>
      </View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            backgroundColor: COLORS.iconsNormalClr,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            zIndex: 10,
          },
          animatedStyle,
        ]}
      >
        <View
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
              borderBottomWidth: 2,
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
                  setSelect(data.title), setAddImage(false), navigation.navigate('AddedImage')
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
                  setSelect(data.title), setAddImage(false), navigation.navigate('AddedImage')
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
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
        >
          <Pressable
            onPress={animate}
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
        </View>
      </Animated.View>

      <View
        style={{
          marginTop: !isAddImage ? 64 : 254,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.AddImage360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>
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
    marginTop: 64,
  },
  AddImage360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})

// const DropDownWrapper = styled.View`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   width: 100%;
//   z-index: 1;
// `
