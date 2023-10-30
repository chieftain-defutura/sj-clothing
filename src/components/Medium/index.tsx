import uuid from 'react-native-uuid'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSharedValue, withSequence, withTiming } from 'react-native-reanimated'

import TShirt from './T-Shirt'
import Navigation from './Navigation'
import Avatar from '../MediumLevel/Avatar'
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

const { width } = Dimensions.get('window')

const Medium = () => {
  const isMounted = useRef(false)
  const navigation = useNavigation()
  const slideValue = useSharedValue(0)
  const { avatar, user } = userStore()
  const [isSteps, setSteps] = useState(1)
  const [isDropDown, setDropDown] = useState(false)
  const [uid, setUid] = useState<string>('')
  const [focus, setFocus] = useState(false)

  //data
  const [data, setData] = useState<IMidlevel[]>()
  const [designs, setDesigns] = useState<IDesigns[]>()
  const [FilteredData, setFilteredData] = useState<IMidlevel>()

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
    }
    if (!isSelectedStyle) {
      setWarning('Select Style to move further')
      setSteps(1)
    }
  }

  const handleSetUid = useCallback(async () => {
    if (!isMounted.current) {
      try {
        console.log('rendered')
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'ModelsMidlevel', tempUid)
        await setDoc(docRef, { uid: tempUid })
        console.log('added')

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
    const FilteredData = data?.find((f) => f.styles === isSelectedStyle)
    setFilteredData(FilteredData)
    if (!FilteredData) return
    if (
      FilteredData.gender.toLowerCase() !== avatar.gender?.toLowerCase() &&
      isSelectedStyle !== ''
    ) {
      Alert.alert(`Alert ${avatar.gender}`, 'Not Available', [
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
      const docRef = await addDoc(collection(db, 'Posts'), {
        style: isSelectedStyle,
        sizes: isSize,
        color: isColor,
        // textAndImage: isImageOrText,
        description: FilteredData.description,
        price: FilteredData.normalPrice,
        offerPrice: FilteredData.offerPrice,
        productId: FilteredData.id,
        userId: user?.uid,
        gender: avatar.gender,
        productName: FilteredData.productName,
      })
      navigation.navigate('Checkout')
      setFocus(true)
    }
  }

  if (!data) return <Text>NO DATA</Text>

  return (
    <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
      {!avatar.gender ? (
        <Avatar path='MidLevel' />
      ) : (
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
            steps={isSteps}
            slideValue={slideValue}
            setDropDown={setDropDown}
            isOpenDesign={isOpenDesign}
            setOpenDesign={setOpenDesign}
            handleDecreaseSteps={handleDecreaseSteps}
            handleIncreaseSteps={handleIncreaseSteps}
          />
          <View style={{ position: 'absolute', top: 0, zIndex: 5, width: width }}>
            {isSteps === 1 && isDropDown && (
              <SelectStyle
                data={data}
                handleIncreaseSteps={handleIncreaseSteps}
                isSelectedStyle={isSelectedStyle}
                setDropDown={setDropDown}
                setSelectedStyle={setSelectedStyle}
              />
            )}
            {isSteps === 2 && isDropDown && FilteredData && (
              <SelectSize
                data={FilteredData}
                isDropDown={isDropDown}
                isSize={isSize}
                setSize={setSize}
                handleIncreaseSteps={handleIncreaseSteps}
                setDropDown={setDropDown}
              />
            )}
            {isSteps === 3 && isDropDown && FilteredData && (
              <SelectColor
                data={FilteredData}
                isColor={isColor}
                isDropDown={isDropDown}
                setDropDown={setDropDown}
                setColor={setColor}
                handleIncreaseSteps={handleIncreaseSteps}
              />
            )}
            {isSteps === 5 && isDropDown && FilteredData && (
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
          {isSteps === 4 && FilteredData && (
            <FinalView
              color={isColor}
              data={FilteredData}
              focus={focus}
              handleSubmit={handleSubmit}
              isSize={isSize}
              setFocus={setFocus}
              setSize={setSize}
              style={isSelectedStyle}
            />
          )}
        </View>
      )}
    </LinearGradient>
  )
}

export default Medium

const styles = StyleSheet.create({})
