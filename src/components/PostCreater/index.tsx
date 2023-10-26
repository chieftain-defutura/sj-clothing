import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import Animated, { useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
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
import { Alert, ScrollView, View } from 'react-native'
import TShirt from '../MediumLevel/T-Shirt'
import UploadDesign from './UploadDesign'
import PostAddImageOrText from './PostAddImageOrText'
import { userStore } from '../../store/userStore'
import { IMidlevel } from '../../constant/types'

interface IPostCreation {}
const PostCreation: React.FC<IPostCreation> = () => {
  const user = userStore((state) => state.user)
  const navigation = useNavigation()
  const slideValue = useSharedValue(0)
  const [isPostCreationSteps, setPostCreationSteps] = useState(1)
  const [FilteredData, setFilteredData] = useState<IMidlevel>()
  const [isDropDown, setDropDown] = useState(false)

  const [isGender, setGender] = useState('MALE')
  //data
  const [data, setData] = useState<IMidlevel[]>()

  //style
  const [isSelectedStyle, setSelectedStyle] = useState('')
  //size
  const [isSize, setSize] = useState({
    country: 'Canada',
    sizeVarient: [{ size: '', measurement: '', quantity: '' }],
  })
  //color
  const [isColor, setColor] = useState('')

  //image&text
  const [isOpenDesign, setOpenDesign] = useState(false)
  const [isDone, setDone] = useState(false)
  const [isImageOrText, setImageOrText] = useState({
    title: '',
    image: '',
    position: 'Front',
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
    slideValue.value = withSequence(
      withTiming(1, { duration: 400 }), // Slide out
      withTiming(0, { duration: 400 }), // Slide back to original state
    )
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
    slideValue.value = withSequence(
      withTiming(-1, { duration: 400 }), // Slide out
      withTiming(0, { duration: 400 }),
    )
  }

  const getData = useCallback(async () => {
    const ProductRef = await getDocs(collection(db, 'Products'))
    const fetchProduct = ProductRef.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }))
    const data = fetchProduct.filter((f) => f.type === 'MIDLEVEL-PRODUCTS')
    setData(data)
  }, [db])
  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    const FilteredData = data?.find((f) => f.styles === isSelectedStyle)

    setFilteredData(FilteredData)
    if (!FilteredData) return
    if (FilteredData.gender.toLowerCase() !== 'Male'?.toLowerCase() && isSelectedStyle !== '') {
      Alert.alert(`Alert Male`, 'Not Available', [
        {
          text: 'Cancel',
          onPress: () => {
            setPostCreationSteps(1)
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setPostCreationSteps(1)
          },
        },
      ])
    }
  }, [isSelectedStyle, data])

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, 'Posts'), {
      style: isSelectedStyle,
      sizes: isSize,
      color: isColor,
      textAndImage: isImageOrText,
      description: FilteredData?.description,
      price: FilteredData?.normalPrice,
      offerPrice: FilteredData?.offerPrice,
      giftVideo: isGiftVideo,
      productName: isProduct,
      productCaption: isCaption,
      quantity: '1',
      status: 'pending',
      userId: user?.uid,
      gender: isGender,
      type: 'Post',
      orderStatus: {
        orderplaced: {
          createdAt: null,
          description: '',
          status: false,
        },
        manufacturing: {
          createdAt: null,
          description: '',
          status: false,
        },
        readyToShip: {
          createdAt: null,
          description: '',
          status: false,
        },
        shipping: {
          createdAt: null,
          description: '',
          status: false,
        },
        delivery: {
          createdAt: null,
          description: '',
          status: false,
        },
      },
    })
    navigation.navigate('Stack')
  }

  if (!data) return
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
          data={FilteredData}
          slideValue={slideValue}
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
            data={data}
            isDropDown={isDropDown}
            isSelectedStyle={isSelectedStyle}
            setDropDown={setDropDown}
            setSelectedStyle={setSelectedStyle}
            handleIncreaseSteps={handleIncreaseSteps}
          />
        )}
        {isPostCreationSteps === 2 && FilteredData && (
          <SelectSize
            isDropDown={isDropDown}
            isSize={isSize}
            setSize={setSize}
            setDropDown={setDropDown}
            handleIncreaseSteps={handleIncreaseSteps}
            data={FilteredData}
          />
        )}

        {isPostCreationSteps === 3 && FilteredData && (
          <SelectColor
            data={FilteredData}
            isDropDown={isDropDown}
            isColor={isColor}
            setDropDown={setDropDown}
            setColor={setColor}
            handleIncreaseSteps={handleIncreaseSteps}
          />
        )}
        {isPostCreationSteps === 4 && (
          <PostAddImageOrText
            data={FilteredData}
            isImageOrText={isImageOrText}
            isDropDown={isDropDown}
            setDropDown={setDropDown}
            setOpenDesign={setOpenDesign}
            setImageOrText={setImageOrText}
          />
        )}
        <View>
          <ScrollView>
            {isPostCreationSteps !== 6 && <TShirt />}

            {isPostCreationSteps === 6 && FilteredData && (
              <FinalProduct
                handleSubmit={handleSubmit}
                isGiftVideo={isGiftVideo}
                setGiftVideo={setGiftVideo}
                Data={FilteredData.description}
                size={isSize}
                style={isSelectedStyle}
                price={FilteredData.normalPrice}
                offerPrice={FilteredData.offerPrice}
                caption={isCaption}
                product={isProduct}
                color={isColor}
              />
            )}
            {isPostCreationSteps === 5 && (
              <ProductAndCaption setCaption={setCaption} setProduct={setProduct} />
            )}
          </ScrollView>
        </View>

        {isOpenDesign && !isDone && isPostCreationSteps === 4 && (
          <UploadDesign
            setImageOrText={setImageOrText}
            setDone={setDone}
            isImageOrText={isImageOrText}
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
