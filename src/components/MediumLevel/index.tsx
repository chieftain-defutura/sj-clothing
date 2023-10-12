import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Avatar from './Avatar'
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
interface IMediumLevel {}

const MediumLevel: React.FC<IMediumLevel> = () => {
  const user = userStore((state) => state.user)
  const navigation = useNavigation()
  const slideValue = useSharedValue(0)
  const [toggleAvatar, setToggleAvatar] = useState(false)
  const [isSteps, setSteps] = useState(1)
  //avatar
  const [isGender, setGender] = useState('Male')
  //data
  const [data, setData] = useState<any[]>()
  const [designs, setDesigns] = useState<any[]>()

  //style
  const [isDropDown, setDropDown] = useState(false)
  const [isSelectedStyle, setSelectedStyle] = useState('Round Neck')
  //size
  const [isSize, setSize] = useState({
    country: 'India',
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
    const docRef = await addDoc(collection(db, 'Orders'), {
      style: isSelectedStyle,
      sizes: isSize,
      color: isColor,
      quantity: quantity,
      textAndImage: isImageOrText,
      detailedFeatures: [...FilteredData[0].detailedFutures],
      price: FilteredData[0].normalPrice,
      offerPrice: FilteredData[0].offerPrice,
      productId: FilteredData[0].id,
      approved: approved,
      userId: user?.uid,
      gender: isGender,
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

  const FilteredData = data?.filter((f: any) => f.styles === isSelectedStyle) as any
  const Designs = designs?.filter((f: ImageorTextProps) => f.type === isImageOrText.title)
  console.log(FilteredData)

  return (
    <View style={styles.midiumlevelContainer}>
      {!toggleAvatar ? (
        <Avatar setToggleAvatar={setToggleAvatar} isGender={isGender} setGender={setGender} />
      ) : (
        <LinearGradient
          colors={gradientOpacityColors}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
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
              isGender={isGender}
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
          <View>
            <ScrollView>
              <TShirt />
              {isSteps === 5 && (
                <FinalView
                  color={isColor}
                  Data={FilteredData[0].detailedFutures}
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
              )}
            </ScrollView>
          </View>
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
