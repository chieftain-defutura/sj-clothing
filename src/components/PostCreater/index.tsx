import React, { useState } from 'react'
import styled from 'styled-components/native'
import Animated from 'react-native-reanimated'
import { addDoc, collection } from 'firebase/firestore/lite'
import { useNavigation } from '@react-navigation/native'
import { gradientOpacityColors } from '../../styles/theme'
import { LinearGradient } from 'expo-linear-gradient'
import SelectStyle from '../MediumLevel/SelectStyle'
import { db } from '../../../firebase'
import SelectSize from '../MediumLevel/SelectSize'
import SelectColor from '../MediumLevel/SlectColor'
import AddImageOrText from '../MediumLevel/AddImageOrText'
import ProductAndCaption from './ProductAndCaption'
import FinalProduct from './FinalProduct'
import PostNavigator from './PostNavigator'
import { ScrollView, View } from 'react-native'
import TShirt from '../MediumLevel/T-Shirt'
import SelectDesign from '../MediumLevel/SelectDesign'
import { Designs, TextDesigns } from '../../utils/PostCreationData'

interface IPostCreation {}
const PostCreation: React.FC<IPostCreation> = () => {
  const navigation = useNavigation()
  const [isPostCreationSteps, setPostCreationSteps] = useState(1)
  const [isDropDown, setDropDown] = useState(false)

  //style
  const [isSelectedStyle, setSelectedStyle] = useState('Half sleeve')
  //size
  const [isSize, setSize] = useState({
    country: 'India',
    sizeVarient: { size: '', measurement: '', unit: '' },
  })
  //color
  const [isColor, setColor] = useState({
    colorName: '',
    hexCode: '',
  })

  //image&text
  const [isOpenDesign, setOpenDesign] = useState(false)
  const [isDone, setDone] = useState(false)
  const [isImageOrText, setImageOrText] = useState({
    title: '',
    position: 'front',
    designs: {
      hashtag: 'friends',
      image: '',
    },
  })

  //product and caption
  const [isCaption, setCaption] = useState('')
  const [isProduct, setProduct] = useState('')
  //final product
  const [isGiftVideo, setGiftVideo] = useState<any>(null)

  const handleIncreaseSteps = () => {
    setPostCreationSteps(isPostCreationSteps + 1)
    setDropDown(false)
    setOpenDesign(false)
    setDone(false)
  }
  const handleDecreaseSteps = () => {
    if (isPostCreationSteps !== 1) {
      setPostCreationSteps(isPostCreationSteps - 1)
      setDropDown(false)
      setOpenDesign(false)
    }
    if (isPostCreationSteps === 1) {
      navigation.navigate('Post')
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
      textAndImage: isImageOrText,
      detailedFeatures: [
        {
          title: 'Material',
          detail: '70% cotton',
        },
      ],
      price: '400',
      offerPrice: '20',
      giftVideo: '',
      productName: isProduct,
      productCaption: isCaption,
    })
    navigation.navigate('Stack')
  }

  return (
    <Animated.View style={{ flex: 1 }}>
      <LinearGradient
        colors={gradientOpacityColors}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <PostNavigator
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
        {isPostCreationSteps === 4 && (
          <AddImageOrText
            isDropDown={isDropDown}
            setDropDown={setDropDown}
            setOpenDesign={setOpenDesign}
          />
        )}
        <View>
          <ScrollView>
            {isPostCreationSteps !== 6 && <TShirt />}

            {isPostCreationSteps === 6 && (
              <FinalProduct
                navigation={navigation}
                handleSubmit={handleSubmit}
                isGiftVideo={isGiftVideo}
                setGiftVideo={setGiftVideo}
              />
            )}
          </ScrollView>
        </View>
        {isPostCreationSteps === 5 && (
          <ProductAndCaption setCaption={setCaption} setProduct={setProduct} />
        )}
        {isOpenDesign && !isDone && isPostCreationSteps === 4 && (
          <SelectDesign
            isImageOrText={isImageOrText}
            designs={isImageOrText.title === 'text image' ? TextDesigns : Designs}
            setOpenDesign={setOpenDesign}
            isDone={isDone}
            setDone={setDone}
            setImageOrText={setImageOrText}
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
