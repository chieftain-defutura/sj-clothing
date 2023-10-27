import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import { doc, setDoc, updateDoc } from 'firebase/firestore/lite'

import Navigator from './Navigator'
import SelectStyle from './SelectStyle'
import SelectSize from './SelectSize'
import SelectColor from './SlectColor'
import TShirt from './T-Shirt'
import SelectDesign from './SelectDesign'
import FinalView from './FinalView'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../styles/theme'
import AddImageOrText from './AddImageOrText'
import { db } from '../../../firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
import { useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { userStore } from '../../store/userStore'
import Avatar from './Avatar'
import { IDesigns, IMidlevel } from '../../constant/types'

const MediumLevel: React.FC = () => {
  const { avatar, user } = userStore()

  const navigation = useNavigation()
  const slideValue = useSharedValue(0)
  const [isSteps, setSteps] = useState(1)
  const [focus, setFocus] = useState(false)

  //data
  const [data, setData] = useState<IMidlevel[]>()
  const [designs, setDesigns] = useState<IDesigns[]>()
  const [FilteredData, setFilteredData] = useState<IMidlevel>()
  const [Design, setDesign] = useState<IDesigns[]>()
  //style
  const [isDropDown, setDropDown] = useState(false)
  const [isSelectedStyle, setSelectedStyle] = useState('')
  //size
  const [isSize, setSize] = useState({
    country: 'Canada',
    sizeVarient: [{ size: '', measurement: '', quantity: '' }],
  })
  //color
  const [isColor, setColor] = useState('#ff0000')

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

  const [uid, setUid] = useState<string | null>(null)
  const isMounted = useRef(false)

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

  //finalview
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

  useEffect(() => {
    const Designs = designs?.filter((f) => f.type === isImageOrText.title)
    setDesign(Designs)
  }, [isImageOrText, designs])

  const handleIncreaseSteps = () => {
    setSteps(isSteps + 1)
    setDropDown(false)
    setOpenDesign(false)
    setDone(false)
    slideValue.value = withSequence(
      withTiming(1, { duration: 400 }), // Slide out
      withTiming(0, { duration: 400 }), // Slide back to original state
    )
  }

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
        textAndImage: isImageOrText,
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

  console.log(user)
  if (!data) return
  return (
    <View style={styles.midiumlevelContainer}>
      {!avatar.gender ? (
        <Avatar path='MidLevel' />
      ) : (
        <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Navigator
              showDesign={FilteredData?.showDesign}
              showTextDesign={FilteredData?.showTextDesign}
              steps={isSteps}
              slideValue={slideValue}
              isOpenDesign={isOpenDesign}
              isDone={isDone}
              setDone={setDone}
              setDropDown={setDropDown}
              setOpenDesign={setOpenDesign}
              setImageOrText={setImageOrText}
              handleDecreaseSteps={handleDecreaseSteps}
              handleIncreaseSteps={handleIncreaseSteps}
            />

            {isSteps === 1 && (
              <SelectStyle
                isDropDown={isDropDown}
                isSelectedStyle={isSelectedStyle}
                setDropDown={setDropDown}
                setSelectedStyle={setSelectedStyle}
                handleIncreaseSteps={handleIncreaseSteps}
                data={data}
              />
            )}
            {FilteredData && (
              <Fragment>
                {isSteps === 2 && (
                  <SelectSize
                    isSize={isSize}
                    setSize={setSize}
                    isDropDown={isDropDown}
                    setDropDown={setDropDown}
                    handleIncreaseSteps={handleIncreaseSteps}
                    data={FilteredData}
                  />
                )}
                {isSteps === 3 && (
                  <SelectColor
                    data={FilteredData}
                    isColor={isColor}
                    isDropDown={isDropDown}
                    setDropDown={setDropDown}
                    setColor={setColor}
                    handleIncreaseSteps={handleIncreaseSteps}
                  />
                )}
                {isSteps === 5 && (
                  <AddImageOrText
                    data={FilteredData}
                    isImageOrText={isImageOrText}
                    isDropDown={isDropDown}
                    setDropDown={setDropDown}
                    setOpenDesign={setOpenDesign}
                    setImageOrText={setImageOrText}
                  />
                )}

                {isSteps === 4 && !isOpenDesign && (
                  <View style={{ marginBottom: 80, zIndex: -10 }}>
                    <ScrollView>
                      <View>{uid && <TShirt steps={isSteps} uid={uid} />}</View>

                      <FinalView
                        focus={focus}
                        setFocus={setFocus}
                        navigation={navigation}
                        data={FilteredData}
                        color={isColor}
                        Data={FilteredData.description}
                        isSize={isSize}
                        setSize={setSize}
                        style={isSelectedStyle}
                        handleSubmit={handleSubmit}
                        price={FilteredData.normalPrice}
                        offerPrice={FilteredData.offerPrice}
                      />
                    </ScrollView>
                  </View>
                )}
              </Fragment>
            )}

            {Design && (
              <View>
                {isSteps !== 4 && (
                  <View style={{ marginBottom: 10 }}>
                    {uid && <TShirt steps={isSteps} uid={uid} />}
                  </View>
                )}
                {/* {isOpenDesign && (
                  <View style={{ marginBottom: 80 }}>
                    <TShirt />
                  </View>
                )} */}

                {isOpenDesign && (
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
            )}
          </View>
        </LinearGradient>
      )}
    </View>
  )
}

export default MediumLevel

const styles = StyleSheet.create({
  midiumlevelContainer: {
    flex: 1,
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 54,
  },
})
