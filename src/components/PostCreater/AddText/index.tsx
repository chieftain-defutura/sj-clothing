import React, { useState } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import Animated, {
  BounceInUp,
  BounceOutUp,
  FlipInXDown,
  FlipOutXDown,
  LightSpeedInLeft,
  LightSpeedOutRight,
} from 'react-native-reanimated'

import SelectText from './SelectText'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
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

interface IAddText {
  navigation: any
  setPostCreationSteps: React.Dispatch<React.SetStateAction<number>>
}

const AddText: React.FC<IAddText> = ({ navigation, setPostCreationSteps }) => {
  const [isFont, setFont] = useState('Aa')
  const [isSelect, setSelect] = useState('Front')
  const [isAddText, setAddText] = useState(false)
  const [isDropDown, setDropDown] = useState(false)
  const [isTextAdded, setTextAdded] = useState(false)
  const [isTextColor, setTextColor] = useState('red')
  const [isFontFamily, setFontFamily] = useState('Arvo-Regular')

  return (
    <View style={{ flex: 1 }}>
      {!isTextAdded ? (
        <View style={styles.AddTextContainer}>
          <Animated.View style={styles.AddTextNavigator}>
            <Pressable onPress={() => setPostCreationSteps(2)}>
              <ArrowCircleLeft width={24} height={24} />
            </Pressable>
            <Pressable onPress={() => setDropDown(true)} style={styles.AddTextDropdown}>
              <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Add Text</Text>
            </Pressable>
            <Pressable onPress={() => setPostCreationSteps(4)}>
              <ArrowCircleRight width={24} height={24} />
            </Pressable>
          </Animated.View>
          {isDropDown && (
            <DropDownWrapper>
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
                    fontFamily: 'Gilroy-Medium',
                    borderBottomColor: COLORS.borderClr,
                    borderBottomWidth: 1,
                    paddingVertical: 20,
                    color: COLORS.textClr,
                    fontSize: 14,
                  }}
                >
                  Select area to add text
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
                        setSelect(data.title), setAddText(false), setTextAdded(true)
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
                        setSelect(data.title), setAddText(false), setTextAdded(true)
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
                          width: 70,
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'row',
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
            </DropDownWrapper>
          )}

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <View style={[styles.AddTextTShirt]}>
              <Image source={require('../../../assets/images/plain-shirt.png')} />
            </View>
            <View style={styles.AddText360Degree}>
              <ThreeSixtyDegree width={40} height={40} />
            </View>
          </View>
        </View>
      ) : (
        <SelectText
          navigation={navigation}
          setTextAdded={setTextAdded}
          isTextColor={isTextColor}
          setTextColor={setTextColor}
          setFont={setFont}
          isFont={isFont}
          isSelect={isSelect}
          fontFamily={isFontFamily}
          setFontFamily={setFontFamily}
          setPostCreationSteps={setPostCreationSteps}
        />
      )}
    </View>
  )
}

export default AddText

const styles = StyleSheet.create({
  AddTextContainer: {
    flex: 1,
    backgroundColor: '#FFEFFF',
  },
  AddTextNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: -1,
  },
  AddTextDropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  AddTextTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: -1,
  },
  AddText360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})

const DropDownWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
`
