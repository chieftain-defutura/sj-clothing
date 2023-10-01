import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import Animated from 'react-native-reanimated'
import { addDoc, collection } from 'firebase/firestore/lite'
import { useNavigation } from '@react-navigation/native'
import { gradientColors } from '../../styles/theme'
import { LinearGradient } from 'expo-linear-gradient'
import Navigator from '../MediumLevel/Navigator'
import SelectStyle from '../MediumLevel/SelectStyle'
import { db } from '../../../firebase'
import CustomButton from '../Button'
import SelectSize from '../MediumLevel/SelectSize'
import SelectColor from '../MediumLevel/SlectColor'

interface IPostCreation {}
const PostCreation: React.FC<IPostCreation> = () => {
  const navigation = useNavigation()
  const [isPostCreationSteps, setPostCreationSteps] = useState(1)
  const [isDropDown, setDropDown] = useState(false)

  //style
  const [isSelectedStyle, setSelectedStyle] = useState('Half sleeve')
  //size
  const [isSize, setSize] = useState({
    country: '',
    sizeVarient: { size: '', measurement: '', unit: '' },
  })
  //color
  const [isColor, setColor] = useState({
    colorName: '',
    hexCode: '',
  })

  //image&text
  const [isImageOrText, setImageOrText] = useState(false)
  const [isOpenDesign, setOpenDesign] = useState(false)
  const [isHashtag, setHashtag] = useState('')
  const [isDone, setDone] = useState(false)

  const handleIncreaseSteps = () => {
    setPostCreationSteps(isPostCreationSteps + 1)
    setDropDown(false)
    setOpenDesign(false)
    setDone(false)
    if (isPostCreationSteps === 4) {
      setHashtag('')
    }
  }
  const handleDecreaseSteps = () => {
    if (isPostCreationSteps !== 1) {
      setPostCreationSteps(isPostCreationSteps - 1)
      setDropDown(false)
      setOpenDesign(false)
      if (isPostCreationSteps === 4) {
        setHashtag('')
      }
    }
  }

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, 'PostCreation'), {
      style: isSelectedStyle,
      sizes: {
        country: 'India',
        sizeVarient: { size: 'S', measurement: '38', unit: 'cm' },
      },
      color: {
        colorName: '',
        hexCode: '',
      },
      image: {
        position: 'front',
        designs: {
          hashtag: 'friends',
          image: '',
        },
      },
      textImage: {
        position: 'rightarm',
        designs: {
          hashtag: 'family',
          image: '',
        },
      },

      detailedFeatures: [
        {
          title: 'Material',
          detail: '70% cotton',
        },
      ],
      price: '400',
      offerPrice: '20',
      giftVideo: '',
      productName: '',
      productCaption: '',
    })
  }

  return (
    <Animated.View style={{ flex: 1 }}>
      <LinearGradient
        colors={gradientColors}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Navigator
          steps={isPostCreationSteps}
          isOpenDesign={isOpenDesign}
          isDone={isDone}
          setDone={setDone}
          setDropDown={setDropDown}
          setOpenDesign={setOpenDesign}
          setImageOrText={setImageOrText}
          handleDecreaseSteps={handleDecreaseSteps}
          handleIncreaseSteps={handleIncreaseSteps}
        />
        {isPostCreationSteps === 1 && (
          <SelectStyle
            isDropDown={isDropDown}
            isSelectedStyle={isSelectedStyle}
            setDropDown={setDropDown}
            setSelectedStyle={setSelectedStyle}
            handleIncreaseSteps={handleIncreaseSteps}
          />
        )}
        {isPostCreationSteps === 2 && (
          <SelectSize
            isDropDown={isDropDown}
            isSize={isSize}
            setSize={setSize}
            setDropDown={setDropDown}
            handleIncreaseSteps={handleIncreaseSteps}
          />
        )}

        {isPostCreationSteps === 3 && (
          <SelectColor
            isDropDown={isDropDown}
            isColor={isColor}
            setDropDown={setDropDown}
            setColor={setColor}
            handleIncreaseSteps={handleIncreaseSteps}
          />
        )}
        {/* <CustomButton text='create' onPress={handleSubmit} /> */}
      </LinearGradient>
    </Animated.View>
  )
}

export default PostCreation

const PostCreationContainer = styled.View`
  flex: 1;
`
