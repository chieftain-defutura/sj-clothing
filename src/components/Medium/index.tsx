import uuid from 'react-native-uuid'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSharedValue, withSequence, withTiming } from 'react-native-reanimated'

import TShirt from './T-Shirt'
import Navigation from './Navigation'
import Avatar from './Avatar'
import { userStore } from '../../store/userStore'
import { gradientOpacityColors } from '../../styles/theme'
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../../firebase'
import SelectStyle from './SelectStyle'
import { IDesigns, IMidlevel } from '../../constant/types'
import SelectSize from './Selectsize'
import SelectColor from './SelectColor'
import FinalView from './FinalView'
import { useNavigation } from '@react-navigation/native'
import AddImageOrText from './AddImageOrText'
import SelectCountry from './SelectCountry'
import SelectDesign from './SelectDesign'

const { width } = Dimensions.get('window')

const Medium = () => {
  const isMounted = useRef(false)
  const navigation = useNavigation()
  const slideValue = useSharedValue(0)
  const { avatar, user, updateOderId } = userStore()
  const [isSteps, setSteps] = useState(1)
  const [isDropDown, setDropDown] = useState(false)
  const [uid, setUid] = useState<string>('')
  const [focus, setFocus] = useState(false)

  //data
  const [data, setData] = useState<IMidlevel[]>()
  const [designs, setDesigns] = useState<IDesigns[]>()
  const [FilteredData, setFilteredData] = useState<IMidlevel>()
  const [Design, setDesign] = useState<IDesigns[]>()

  //style
  const [isSelectedStyle, setSelectedStyle] = useState('')
  const [warning, setWarning] = useState('')

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
    position: 'Front',
    rate: 0,
    designs: {
      hashtag: '',
      image: '',
    },
  })

  const handleDecreaseSteps = () => {
    if (isSteps !== 1) {
      setSteps(isSteps - 1)
      setDropDown(false)
      setOpenDesign(false)
    }
    if (isSteps === 2) {
      setSelectedStyle('')
    }
    slideValue.value = withSequence(
      withTiming(-1, { duration: 400 }), // Slide out
      withTiming(0, { duration: 400 }),
    )
  }

  const handleIncreaseSteps = () => {
    if (isSelectedStyle) {
      setSteps(isSteps + 1)
      setDropDown(false)
      setOpenDesign(false)
      setDone(false)
      slideValue.value = withSequence(
        withTiming(1, { duration: 400 }), // Slide out
        withTiming(0, { duration: 400 }), // Slide back to original state
      )
    } else {
      setWarning('Select Style to move further')
      setSteps(1)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setWarning('') // Set the state to null after 5 seconds
    }, 2000)
  }, [warning])

  const handleSetUid = useCallback(async () => {
    if (!isMounted.current) {
      try {
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'ModelsMidlevel', tempUid)
        await setDoc(docRef, { uid: tempUid, skin: avatar.skinTone })

        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])
  const handleUpdateGender = useCallback(async () => {
    if (!isColor || !uid) return
    try {
      const docRef = doc(db, 'ModelsMidlevel', uid)
      await updateDoc(docRef, { color: isColor })
      console.log('updated')
    } catch (error) {
      console.log(error)
    }
  }, [isColor])

  useEffect(() => {
    handleSetUid()
    handleUpdateGender()
  }, [handleSetUid, handleUpdateGender])

  useEffect(() => {
    const Filtereddata = data?.find((f) => f.styles === isSelectedStyle)
    setFilteredData(Filtereddata)
    if (
      Filtereddata?.gender.toLowerCase() !== avatar?.gender?.toLowerCase() &&
      isSelectedStyle !== ''
    ) {
      Alert.alert(`Alert ${avatar?.gender}`, 'Not Available', [
        {
          text: 'Cancel',
          onPress: () => {
            setSteps(1)
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setSteps(1)
          },
        },
      ])
    }
  }, [isSelectedStyle, data])

  useEffect(() => {
    const Designs = designs?.filter((f) => f.type === isImageOrText.title)
    setDesign(Designs)
  }, [isImageOrText, designs])

  const getData = useCallback(async () => {
    const ProductRef = await getDocs(collection(db, 'Products'))
    const fetchProduct = ProductRef.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }))
    const data = fetchProduct.filter((f) => f.type === 'MIDLEVEL-PRODUCTS')
    setData(data)
    const DesignRef = await getDocs(collection(db, 'Designimages'))
    const fetchDesign = DesignRef.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }))
    setDesigns(fetchDesign)
  }, [db])
  useEffect(() => {
    getData()
  }, [getData])

  const handleSubmit = async () => {
    if (!FilteredData) return

    if (!user) {
      setFocus(true)
    } else {
      const docRef = await addDoc(collection(db, 'Orders'), {
        style: isSelectedStyle,
        sizes: isSize,
        color: isColor,
        textAndImage: isImageOrText,
        description: FilteredData.description,
        price: FilteredData.normalPrice,
        offerPrice: FilteredData.offerPrice,
        paymentStatus: 'pending',
        productId: FilteredData.id,
        userId: user?.uid,
        gender: avatar?.gender,
        type: 'MidLevel',
        productImage: FilteredData.productImage,
        productName: FilteredData.productName,
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
      updateOderId(docRef.id)
      navigation.navigate('Checkout')
      setFocus(true)
    }
  }

  console.log(isImageOrText)
  return (
    // <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'space-between',
        zIndex: 10,
      }}
    >
      <Navigation
        warning={warning}
        setImageOrText={setImageOrText}
        steps={isSteps}
        isDone={isDone}
        setDone={setDone}
        dropDown={isDropDown}
        slideValue={slideValue}
        setDropDown={setDropDown}
        isOpenDesign={isOpenDesign}
        setOpenDesign={setOpenDesign}
        handleDecreaseSteps={handleDecreaseSteps}
        handleIncreaseSteps={handleIncreaseSteps}
      />
      <View style={{ zIndex: 5, width: width, position: 'absolute', top: 0 }}>
        {isSteps === 1 && data && isDropDown && (
          <SelectStyle
            data={data}
            handleIncreaseSteps={handleIncreaseSteps}
            isSelectedStyle={isSelectedStyle}
            setSelectedStyle={setSelectedStyle}
          />
        )}
        {isSteps === 2 && isDropDown && FilteredData && (
          <SelectCountry
            data={FilteredData}
            isSize={isSize}
            setSize={setSize}
            handleIncreaseSteps={handleIncreaseSteps}
            setDropDown={setDropDown}
          />
        )}
        {isSteps === 3 && isDropDown && FilteredData && (
          <SelectSize
            data={FilteredData}
            isDropDown={isDropDown}
            isSize={isSize}
            setSize={setSize}
            handleIncreaseSteps={handleIncreaseSteps}
            setDropDown={setDropDown}
          />
        )}
        {isSteps === 4 && isDropDown && FilteredData && (
          <SelectColor
            data={FilteredData}
            isColor={isColor}
            isDropDown={isDropDown}
            setDropDown={setDropDown}
            setColor={setColor}
          />
        )}
        {isSteps === 6 && isDropDown && FilteredData && (
          <AddImageOrText
            data={FilteredData}
            isDropDown={isDropDown}
            setDropDown={setDropDown}
            isImageOrText={isImageOrText}
            setImageOrText={setImageOrText}
            setOpenDesign={setOpenDesign}
          />
        )}
      </View>

      <TShirt uid={uid} steps={isSteps} />
      {isSteps === 5 && FilteredData && (
        <FinalView
          color={isColor}
          data={FilteredData}
          focus={focus}
          handleSubmit={handleSubmit}
          isSize={isSize}
          setFocus={setFocus}
          setSize={setSize}
          style={isSelectedStyle}
          isImageOrText={isImageOrText}
        />
      )}
      {isSteps === 6 && Design && isOpenDesign && !isDone && (
        <SelectDesign
          isImageOrText={isImageOrText}
          designs={Design}
          setOpenDesign={setOpenDesign}
          isDone={isDone}
          setDone={setDone}
          setImageOrText={setImageOrText}
        />
      )}
    </View>
    // </LinearGradient>
  )
}

export default Medium

const styles = StyleSheet.create({})
