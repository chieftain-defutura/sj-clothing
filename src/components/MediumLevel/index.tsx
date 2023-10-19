import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Alert } from 'react-native'
import Navigator from './Navigator'
import SelectStyle from './SelectStyle'
import SelectSize from './SelectSize'
import SelectColor from './SlectColor'
import TShirt from './T-Shirt'
import SelectDesign from './SelectDesign'
import FinalView from './FinalView'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../styles/theme'
import AddImageOrText from './AddImageOrText'
import { db } from '../../../firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
import { ImageorTextProps } from '../../constant/types'
import { useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { userStore } from '../../store/userStore'
import Avatar from './Avatar'
interface IMediumLevel {}

const MediumLevel: React.FC<IMediumLevel> = () => {
  const { avatar, user } = userStore()

  const navigation = useNavigation()
  const slideValue = useSharedValue(0)
  const [isSteps, setSteps] = useState(1)
  //data
  const [data, setData] = useState<any[]>()
  const [designs, setDesigns] = useState<any[]>()

  //style
  const [isDropDown, setDropDown] = useState(false)
  const [isSelectedStyle, setSelectedStyle] = useState('Round Neck')
  //size
  const [isSize, setSize] = useState({
    country: 'Canada',
    sizeVarient: { size: '', measurement: '' },
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
  //finalview
  const [quantity, setQuantity] = useState('1')
  const [approved, setApproved] = useState(false)

  const FilteredData = data?.filter((f: any) => f.styles === isSelectedStyle) as any
  const Designs = designs?.filter((f: ImageorTextProps) => f.type === isImageOrText.title)

  const handleIncreaseSteps = () => {
    if (!FilteredData) return
    if (FilteredData[0].gender.toLowerCase() !== avatar?.toLowerCase()) {
      Alert.alert(`Alert ${avatar}`, 'Not Available', [
        {
          text: 'Cancel',
          onPress: () => setSteps(1),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => setSteps(1) },
      ])
    }
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
    const docRef = await addDoc(collection(db, 'Orders'), {
      style: isSelectedStyle,
      sizes: isSize,
      color: isColor,
      quantity: quantity,
      textAndImage: isImageOrText,
      description: FilteredData[0].description,
      price: FilteredData[0].normalPrice,
      offerPrice: FilteredData[0].offerPrice,
      productId: FilteredData[0].id,
      approved: approved,
      userId: user?.uid,
      gender: avatar,
      type: 'Mid-Level',
      productName: FilteredData[0].productName,
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
    navigation.navigate('Checkout')
  }

  return (
    <View style={styles.midiumlevelContainer}>
      {!avatar ? (
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
              zIndex: 100,
            }}
          >
            <Navigator
              data={FilteredData}
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
            {isSteps === 2 && (
              <SelectSize
                isGender={avatar}
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
            {isSteps === 4 && (
              <AddImageOrText
                data={FilteredData}
                isImageOrText={isImageOrText}
                isDropDown={isDropDown}
                setDropDown={setDropDown}
                setOpenDesign={setOpenDesign}
                setImageOrText={setImageOrText}
              />
            )}

            {isSteps !== 5 && (
              <View style={{ marginBottom: 80, zIndex: -20 }}>
                <TShirt />
              </View>
            )}
            {isSteps === 5 && (
              <View style={{ marginBottom: 80 }}>
                <ScrollView>
                  <TShirt />

                  <FinalView
                    color={isColor}
                    Data={FilteredData[0].description}
                    size={isSize.sizeVarient.size}
                    style={isSelectedStyle}
                    setQuantity={setQuantity}
                    approved={approved}
                    setApproved={setApproved}
                    handleSubmit={handleSubmit}
                    quantity={quantity}
                    price={FilteredData[0].normalPrice}
                    offerPrice={FilteredData[0].offerPrice}
                  />
                </ScrollView>
              </View>
            )}
            {isOpenDesign && !isDone && isSteps === 4 && (
              <SelectDesign
                isImageOrText={isImageOrText}
                designs={Designs}
                setOpenDesign={setOpenDesign}
                isDone={isDone}
                setDone={setDone}
                setImageOrText={setImageOrText}
              />
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
