// import React, { useCallback, useEffect, useState } from 'react'
// import styled from 'styled-components/native'
// import Animated, { useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
// import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
// import { useNavigation } from '@react-navigation/native'
// import { gradientOpacityColors } from '../../styles/theme'
// import { LinearGradient } from 'expo-linear-gradient'
// import SelectStyle from '../Medium/SelectStyle'
// import { db } from '../../../firebase'
// import SelectSize from '../Medium/Selectsize'
// import SelectColor from '../Medium/SelectColor'
// import AddImageOrText from '../Medium/AddImageOrText'
// import ProductAndCaption from './ProductAndCaption'
// import FinalProduct from './FinalProduct'
// import PostNavigator from './PostNavigator'
// import { Alert, ScrollView, View } from 'react-native'
// import TShirt from '../Medium/T-Shirt'
// import UploadDesign from './UploadDesign'
// import PostAddImageOrText from './PostAddImageOrText'
// import { userStore } from '../../store/userStore'
// import { IMidlevel } from '../../constant/types'

// interface IPostCreation {}
// const PostCreation: React.FC<IPostCreation> = () => {
//   const user = userStore((state) => state.user)
//   const navigation = useNavigation()
//   const slideValue = useSharedValue(0)
//   const [isPostCreationSteps, setPostCreationSteps] = useState(1)
//   const [FilteredData, setFilteredData] = useState<IMidlevel>()
//   const [dropDown, setDropDown] = useState(false)

//   const [isGender, setGender] = useState('MALE')
//   //data
//   const [data, setData] = useState<IMidlevel[]>()

//   //style
//   const [style, setStyle] = useState('')
//   //size
//   const [size, setSize] = useState({
//     country: 'Canada',
//     sizeVarient: [{ size: '', measurement: '', quantity: '' }],
//   })
//   //color
//   const [color, setColor] = useState('')

//   //image&text
//   const [isOpenDesign, setOpenDesign] = useState(false)
//   const [isDone, setDone] = useState(false)
//   const [isImageOrText, setImageOrText] = useState({
//     title: '',
//     image: '',
//     position: 'Front',
//   })

//   //product and caption
//   const [isCaption, setCaption] = useState('')
//   const [isProduct, setProduct] = useState('')
//   //final product
//   const [isGiftVideo, setGiftVideo] = useState<any>(null)

//   const handleIncreaseSteps = () => {
//     setPostCreationSteps(isPostCreationSteps + 1)
//     setDropDown(false)
//     setOpenDesign(false)
//     setDone(false)
//     slideValue.value = withSequence(
//       withTiming(1, { duration: 400 }), // Slide out
//       withTiming(0, { duration: 400 }), // Slide back to original state
//     )
//   }
//   const handleDecreaseSteps = () => {
//     if (isPostCreationSteps !== 1) {
//       setPostCreationSteps(isPostCreationSteps - 1)
//       setDropDown(false)
//       setOpenDesign(false)
//     }
//     if (isPostCreationSteps === 1) {
//       navigation.navigate('Post')
//     }
//     slideValue.value = withSequence(
//       withTiming(-1, { duration: 400 }), // Slide out
//       withTiming(0, { duration: 400 }),
//     )
//   }

//   const getData = useCallback(async () => {
//     const ProductRef = await getDocs(collection(db, 'Products'))
//     const fetchProduct = ProductRef.docs.map((doc) => ({
//       id: doc.id,
//       ...(doc.data() as any),
//     }))
//     const data = fetchProduct.filter((f) => f.type === 'MIDLEVEL-PRODUCTS')
//     setData(data)
//   }, [db])
//   useEffect(() => {
//     getData()
//   }, [getData])

//   useEffect(() => {
//     const FilteredData = data?.find((f) => f.styles === style)

//     setFilteredData(FilteredData)
//     if (!FilteredData) return
//     if (FilteredData.gender.toLowerCase() !== 'Male'?.toLowerCase() && style !== '') {
//       Alert.alert(`Alert Male`, 'Not Available', [
//         {
//           text: 'Cancel',
//           onPress: () => {
//             setPostCreationSteps(1)
//           },
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => {
//             setPostCreationSteps(1)
//           },
//         },
//       ])
//     }
//   }, [style, data])

//   const handleSubmit = async () => {
//     const docRef = await addDoc(collection(db, 'Posts'), {
//       style: style,
//       sizes: size,
//       color: color,
//       textAndImage: isImageOrText,
//       description: FilteredData?.description,
//       price: FilteredData?.normalPrice,
//       offerPrice: FilteredData?.offerPrice,
//       giftVideo: isGiftVideo,
//       productName: isProduct,
//       productCaption: isCaption,
//       quantity: '1',
//       status: 'pending',
//       userId: user?.uid,
//       gender: isGender,
//       type: 'Post',
//       orderStatus: {
//         orderplaced: {
//           createdAt: null,
//           description: '',
//           status: false,
//         },
//         manufacturing: {
//           createdAt: null,
//           description: '',
//           status: false,
//         },
//         readyToShip: {
//           createdAt: null,
//           description: '',
//           status: false,
//         },
//         shipping: {
//           createdAt: null,
//           description: '',
//           status: false,
//         },
//         delivery: {
//           createdAt: null,
//           description: '',
//           status: false,
//         },
//       },
//     })
//     navigation.navigate('Stack')
//   }

//   if (!data) return
//   return (
//     <Animated.View style={{ flex: 1 }}>
//       <LinearGradient
//         colors={gradientOpacityColors}
//         style={{
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}
//       >
//         <PostNavigator
//           data={FilteredData}
//           slideValue={slideValue}
//           steps={isPostCreationSteps}
//           isOpenDesign={isOpenDesign}
//           isDone={isDone}
//           setDone={setDone}
//           setDropDown={setDropDown}
//           setOpenDesign={setOpenDesign}
//           setImageOrText={setImageOrText}
//           handleDecreaseSteps={handleDecreaseSteps}
//           handleIncreaseSteps={handleIncreaseSteps}
//         />
//         {isPostCreationSteps === 1 && (
//           <SelectStyle
//             data={data}
//             dropDown={dropDown}
//             style={style}
//             setDropDown={setDropDown}
//             setStyle={setStyle}
//             handleIncreaseSteps={handleIncreaseSteps}
//           />
//         )}
//         {isPostCreationSteps === 2 && FilteredData && (
//           <SelectSize
//             dropDown={dropDown}
//             size={size}
//             setSize={setSize}
//             setDropDown={setDropDown}
//             handleIncreaseSteps={handleIncreaseSteps}
//             data={FilteredData}
//           />
//         )}

//         {isPostCreationSteps === 3 && FilteredData && (
//           <SelectColor
//             data={FilteredData}
//             dropDown={dropDown}
//             color={color}
//             setDropDown={setDropDown}
//             setColor={setColor}
//             handleIncreaseSteps={handleIncreaseSteps}
//           />
//         )}
//         {isPostCreationSteps === 4 && (
//           <PostAddImageOrText
//             data={FilteredData}
//             isImageOrText={isImageOrText}
//             dropDown={dropDown}
//             setDropDown={setDropDown}
//             setOpenDesign={setOpenDesign}
//             setImageOrText={setImageOrText}
//           />
//         )}
//         <View>
//           <ScrollView>
//             {isPostCreationSteps !== 6 && <TShirt />}

//             {isPostCreationSteps === 6 && FilteredData && (
//               <FinalProduct
//                 handleSubmit={handleSubmit}
//                 isGiftVideo={isGiftVideo}
//                 setGiftVideo={setGiftVideo}
//                 Data={FilteredData.description}
//                 size={size}
//                 style={style}
//                 price={FilteredData.normalPrice}
//                 offerPrice={FilteredData.offerPrice}
//                 caption={isCaption}
//                 product={isProduct}
//                 color={color}
//               />
//             )}
//             {isPostCreationSteps === 5 && (
//               <ProductAndCaption setCaption={setCaption} setProduct={setProduct} />
//             )}
//           </ScrollView>
//         </View>

//         {isOpenDesign && !isDone && isPostCreationSteps === 4 && (
//           <UploadDesign
//             setImageOrText={setImageOrText}
//             setDone={setDone}
//             isImageOrText={isImageOrText}
//           />
//         )}

//         {/* <CustomButton text='create' onPress={handleSubmit} /> */}
//       </LinearGradient>
//     </Animated.View>
//   )
// }

// export default PostCreation

// const PostCreationContainer = styled.View`
//   flex: 1;
// `

import uuid from 'react-native-uuid'
import { Animated, StyleSheet, View, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../styles/theme'
import PostNavigator from './PostNavigator'
import { Easing, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { userStore } from '../../store/userStore'
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite'
import { db, dbDefault } from '../../../firebase'
import { IDesigns, IMidlevel } from '../../constant/types'
import PostNavigation from './PostNavigator'
import {
  query as defaultQuery,
  collection as defualtCollection,
  where as defaultWhere,
  onSnapshot,
} from 'firebase/firestore'
import { Audio } from 'expo-av'
import SelectStyle from '../Medium/SelectStyle'
import SelectCountry from '../Medium/SelectCountry'
import SelectSize from '../Medium/Selectsize'
import SelectColor from '../Medium/SelectColor'
import AddImageOrText from '../Medium/AddImageOrText'
import AddImageAddTextTooltip from '../Tooltips/MidLevel/AddImageAddTextTooltip'
import FlowTwo from '../Medium/MidlevelWebView/FlowTwo'
import FlowThree from '../Medium/MidlevelWebView/FlowThree'
import FlowOne from '../Medium/MidlevelWebView/FlowOne'
import SelectDesign from '../Medium/SelectDesign'
import FinalView from '../Medium/FinalView'
import FinalProduct from './FinalProduct'
import { useNavigation } from '@react-navigation/native'
import ProductAndCaption from './ProductAndCaption'

const { width } = Dimensions.get('window')

const PostCreation = () => {
  const isMounted = useRef(false)
  const navigation = useNavigation()
  const slideValue = useSharedValue(0)
  const avatar = userStore((state) => state.avatar)
  const user = userStore((state) => state.user)

  const [steps, setSteps] = useState(1)
  const [dropDown, setDropDown] = useState(false)
  const [uid, setUid] = useState<string>('')
  const [focus, setFocus] = useState(false)

  //login
  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [forgotMail, setForgotmail] = useState(false)

  //style
  const [style, setStyle] = useState('')
  const [warning, setWarning] = useState('')

  //size
  const [size, setSize] = useState({
    country: '',
    sizeVarient: [{ size: '', measurement: '', quantity: '' }],
  })

  //color
  const [color, setColor] = useState('')
  const [colorName, setColorName] = useState('')

  //data
  const [data, setData] = useState<IMidlevel[]>()
  const [designs, setDesigns] = useState<IDesigns[]>()
  const [FilteredData, setFilteredData] = useState<IMidlevel>()
  const [Design, setDesign] = useState<IDesigns[]>()

  //image&text
  const [openDesign, setOpenDesign] = useState(false)
  const [done, setDone] = useState(false)
  const [imageApplied, setImageApplied] = useState(false)
  const [imageOrText, setImageOrText] = useState({
    title: '',
    position: 'Front',
    rate: 0,
    designs: {
      hashtag: '',
      image: '',
      originalImage: '',
    },
  })
  const [tempIsImageOrText, setTempImageOrText] = useState({
    title: '',
    position: 'Front',
    rate: 0,
    designs: {
      hashtag: '',
      image: '',
      originalImage: '',
    },
  })

  //product and caption
  const [isCaption, setCaption] = useState('')
  const [isProduct, setProduct] = useState('')
  //final product
  const [isGiftVideo, setGiftVideo] = useState<any>(null)

  //animation
  const [animationUpdated, setAnimationUpdated] = useState(false)
  const [colorAnimationUpdated, setColorAnimationUpdated] = useState(false)
  //tooltip
  const [toolTip, showToolTip] = useState(false)
  const [addImageAndAddTextToolTip, setAddImageAndAddTextToolTip] = useState(false)

  const shakeAnimation = useRef(new Animated.Value(0)).current

  const handleDecreaseSteps = () => {
    if (steps !== 1) {
      setSteps(steps - 1)
      setDropDown(false)
      setOpenDesign(false)
    }
    if (steps === 2) {
      setStyle('')
    }
    slideValue.value = withSequence(
      withTiming(-1, { duration: 400 }), // Slide out
      withTiming(0, { duration: 400 }),
    )
  }

  const handleIncreaseSteps = () => {
    let currentField
    switch (steps) {
      case 1:
        currentField = style
        break
      case 2:
        currentField = size.country
        break
      case 3:
        currentField = size.sizeVarient[0].size
        break
      case 4:
        currentField = color
        break
      default:
        currentField = 'any'
    }

    if (currentField === '') {
      // setError('Please fill in the current field before proceeding.');
      setWarning('Please select current field before proceeding.')
      setSteps(steps)
    } else {
      // Clear any previous error and move to the next step
      setSteps(steps + 1)
      setDropDown(false)
      setOpenDesign(false)
      setDone(false)
      slideValue.value = withSequence(
        withTiming(1, { duration: 400 }), // Slide out
        withTiming(0, { duration: 400 }), // Slide back to original state
      )
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setWarning('') // Set the state to null after 5 seconds
    }, 2000)
  }, [warning])

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleGetData = useCallback(() => {
    if (!uid) return
    const q = defaultQuery(
      defualtCollection(dbDefault, 'ModelsMidlevel'),
      defaultWhere('uid', '==', uid),
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data()['animationFinished']) {
          setAnimationUpdated(doc.data()['animationFinished'])
          playSound()
        }
      })
    })

    return () => {
      unsubscribe()
    }
  }, [uid])

  console.log('colorAnimationUpdated', colorAnimationUpdated)
  useEffect(() => {
    handleGetData()
  }, [handleGetData])

  const handleGetColorAnimation = useCallback(() => {
    if (!uid) return
    const q = defaultQuery(
      defualtCollection(dbDefault, 'ModelsMidlevel'),
      defaultWhere('uid', '==', uid),
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data()['colorAnimationFinished']) {
          setColorAnimationUpdated(doc.data()['colorAnimationFinished'])
          playSound()
        }

        console.log('doc.data()[colorAnimationFinished]', doc.data()['colorAnimationFinished'])
      })
    })

    return () => {
      unsubscribe()
    }
  }, [uid])

  useEffect(() => {
    handleGetColorAnimation()
  }, [handleGetColorAnimation])

  useEffect(() => {
    if (!imageApplied) {
      setTempImageOrText(imageOrText)
    }
  }, [imageApplied])

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/video/sound.mp3'))
      await sound.playAsync()
    } catch (error) {
      console.log('sound error:', error)
    }
  }

  const handleSetUid = useCallback(async () => {
    if (!isMounted.current) {
      try {
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'ModelsMidlevel', tempUid)
        await setDoc(docRef, { uid: tempUid, skin: avatar?.skinTone, gender: avatar?.gender })

        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  const handleUpdateColor = useCallback(async () => {
    if (!color || !uid) return
    try {
      const docRef = doc(db, 'ModelsMidlevel', uid)
      await updateDoc(docRef, { color: color })
    } catch (error) {
      console.log(error)
    }
  }, [color])

  useEffect(() => {
    handleSetUid()
    handleUpdateColor()
  }, [handleSetUid, handleUpdateColor])

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
    const Filtereddata = data?.find(
      (f) =>
        f.styles.toLowerCase() === style.toLowerCase() &&
        f.gender.toLowerCase() === avatar.gender?.toLowerCase(),
    )
    setFilteredData(Filtereddata)
  }, [style, data, avatar])

  useEffect(() => {
    const Designs = designs?.filter((f) => f.type === imageOrText.title)
    setDesign(Designs)
  }, [imageOrText, designs])

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, 'Posts'), {
      style: style,
      sizes: size,
      color: color,
      textAndImage: imageOrText,
      description: FilteredData?.description,
      price: FilteredData?.normalPrice,
      offerPrice: FilteredData?.offerPrice,
      giftVideo: isGiftVideo,
      productName: isProduct,
      productCaption: isCaption,
      quantity: '1',
      status: 'pending',
      userId: user?.uid,
      gender: avatar.gender,
      type: 'Post',
    })
    navigation.navigate('Home')
  }

  return (
    <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <PostNavigation
          steps={steps}
          warning={warning}
          handleDecreaseSteps={handleDecreaseSteps}
          handleIncreaseSteps={handleIncreaseSteps}
          animationUpdated={animationUpdated}
          colorAnimationUpdate={colorAnimationUpdated}
          country={size.country}
          dropDown={dropDown}
          color={color}
          done={done}
          openDesign={openDesign}
          setDone={setDone}
          setDropDown={setDropDown}
          setImageApplied={setImageApplied}
          setImageOrText={setImageOrText}
          setOpenDesign={setOpenDesign}
          shake={shake}
          shakeAnimation={shakeAnimation}
          sizeVarient={size.sizeVarient[0]}
          slideValue={slideValue}
          style={style}
        />
        <View style={{ zIndex: 100, width: width, position: 'absolute', top: 0, flex: 1 }}>
          {steps === 1 && data && dropDown && (
            <SelectStyle
              data={data}
              setDropDown={setDropDown}
              isSelectedStyle={style}
              setSelectedStyle={setStyle}
            />
          )}
          {steps === 2 && dropDown && FilteredData && (
            <SelectCountry
              data={FilteredData}
              isSize={size}
              setSize={setSize}
              handleIncreaseSteps={handleIncreaseSteps}
              setDropDown={setDropDown}
            />
          )}
          {steps === 3 && dropDown && FilteredData && (
            <SelectSize
              data={FilteredData}
              isDropDown={dropDown}
              isSize={size}
              setSize={setSize}
              handleIncreaseSteps={handleIncreaseSteps}
              setDropDown={setDropDown}
            />
          )}
          {steps === 4 && dropDown && FilteredData && (
            <SelectColor
              data={FilteredData}
              isColor={color}
              isDropDown={dropDown}
              setDropDown={setDropDown}
              setColor={setColor}
              setColorName={setColorName}
              isColorName={colorName}
            />
          )}
          {steps === 5 && <ProductAndCaption setCaption={setCaption} setProduct={setProduct} />}
          {/* {steps === 6 && dropDown && FilteredData && (
              <AddImageOrText
                data={FilteredData}
                isDropDown={dropDown}
                setDropDown={setDropDown}
                isImageOrText={imageOrText}
                setImageOrText={setImageOrText}
                setOpenDesign={setOpenDesign}
              />
            )}
            {steps === 6 && (
              <AddImageAddTextTooltip
                isVisible={addImageAndAddTextToolTip}
                onClose={() => {
                  setAddImageAndAddTextToolTip(false)
                }}
              />
            )} */}
        </View>

        <View
          style={{
            flex: steps === 5 ? 9 : 1,
            zIndex: -100,
            position: steps === 5 ? 'relative' : 'absolute',
            bottom: 0,
          }}
        >
          {steps === 5 ? (
            <FlowTwo
              color={color}
              isImageOrText={tempIsImageOrText}
              designs={designs}
              imageApplied={imageApplied}
            />
          ) : steps === 6 ? (
            <FlowThree color={color} isImageOrText={imageOrText} designs={designs} />
          ) : (
            <FlowOne uid={uid} steps={steps} />
          )}
        </View>
        {steps === 5 && FilteredData && (
          <FinalProduct
            handleSubmit={handleSubmit}
            isGiftVideo={isGiftVideo}
            setGiftVideo={setGiftVideo}
            Data={FilteredData.description}
            size={size}
            style={style}
            price={FilteredData.normalPrice}
            offerPrice={FilteredData.offerPrice}
            caption={isCaption}
            product={isProduct}
            color={color}
          />
        )}

        {steps === 6 && Design && openDesign && !done && (
          <SelectDesign
            color={color}
            isImageOrText={imageOrText}
            designs={Design}
            setOpenDesign={setOpenDesign}
            isDone={done}
            setDone={setDone}
            setImageOrText={setImageOrText}
          />
        )}
      </View>
    </LinearGradient>
  )
}

export default PostCreation

const styles = StyleSheet.create({})
