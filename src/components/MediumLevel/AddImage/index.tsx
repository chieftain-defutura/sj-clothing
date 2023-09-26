import React, { useState } from 'react'

import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import Animated, {
  BounceInUp,
  BounceOutUp,
  FlipInXDown,
  FlipOutXDown,
} from 'react-native-reanimated'
import CloseIcon from '../../../assets/icons/Close'
import { COLORS } from '../../../styles/theme'

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

const { width } = Dimensions.get('window')

interface IAddImage {
  isDropDown: boolean
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDesign: React.Dispatch<React.SetStateAction<boolean>>
}
const AddImage: React.FC<IAddImage> = ({ isDropDown, setDropDown, setOpenDesign }) => {
  const [isSelect, setSelect] = useState('Front')
  return (
    <View style={styles.addImageContainer}>
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
                    setOpenDesign(true), setDropDown(false), setSelect(data.title)
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
                    setOpenDesign(true), setDropDown(false), setSelect(data.title)
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
    </View>
  )
}

export default AddImage

const styles = StyleSheet.create({
  addImageContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: width,
    zIndex: 10,
  },
})
