import uuid from 'react-native-uuid'
import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite'
import TShirt from './T-Shirt'
import FinalView from './FinalView'
import Navigation from './Navigation'
import SelectSize from './Selectsize'
import { db } from '../../../firebase'
import SelectStyle from './SelectStyle'
import SelectColor from './SelectColor'
import SelectDesign from './SelectDesign'
import SelectCountry from './SelectCountry'
import AddImageOrText from './AddImageOrText'
import { userStore } from '../../store/userStore'
import LoginModal from '../../screens/Modals/Login'
import SignupModal from '../../screens/Modals/Signup'
import ForgotMail from '../../screens/Modals/ForgotMail'
import { IDesigns, IMidlevel } from '../../constant/types'
import Checkout from '../../pages/Navigation/StackNavigation/Checkout'
import AlertModal from '../../screens/Modals/AlertModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('window')

const Medium = () => {
  const isMounted = useRef(false)
  const slideValue = useSharedValue(0)
  const avatar = userStore((state) => state.avatar)
  const phoneNumber = userStore((state) => state.phoneNo)

  const user = userStore((state) => state.user)
  const [isSteps, setSteps] = useState(1)
  const [isDropDown, setDropDown] = useState(false)
  const [uid, setUid] = useState<string>('')
  const [focus, setFocus] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  //data
  const [data, setData] = useState<IMidlevel[]>()
  const [designs, setDesigns] = useState<IDesigns[]>()
  const [FilteredData, setFilteredData] = useState<IMidlevel>()
  const [Design, setDesign] = useState<IDesigns[]>()

  //login
  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [forgotMail, setForgotmail] = useState(false)

  //style
  const [isSelectedStyle, setSelectedStyle] = useState('')
  const [warning, setWarning] = useState('')

  //size
  const [isSize, setSize] = useState({
    country: '',
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
      originalImage: '',
    },
  })
  const [openCheckout, setOpenCheckout] = useState(false)

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

  useEffect(() => {
    if (isSize.country) {
      handleIncreaseSteps()
    }
  }, [isSize.country])

  // useEffect(() => {
  //   if (isSteps === 5) {
  //     AsyncStorage.setItem('mid-steps', isSteps.toString())
  //   }
  //   if (isSteps !== 5) {
  //     AsyncStorage.setItem('mid-steps', '')
  //   }
  // }, [isSteps])

  const handleIncreaseSteps = () => {
    let currentField
    switch (isSteps) {
      case 1:
        currentField = isSelectedStyle
        break
      case 2:
        currentField = isSize.country
        break
      case 3:
        currentField = isSize.sizeVarient[0].size
        break
      case 4:
        currentField = isColor
        break
      default:
        currentField = 'any'
    }
    console.log('currentField', currentField)

    if (currentField === '') {
      // setError('Please fill in the current field before proceeding.');
      setWarning('Please select current field before proceeding.')
      setSteps(isSteps)
    } else {
      // Clear any previous error and move to the next step
      setSteps(isSteps + 1)
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
    if (!isColor || !uid) return
    try {
      const docRef = doc(db, 'ModelsMidlevel', uid)
      await updateDoc(docRef, { color: isColor })
    } catch (error) {
      console.log(error)
    }
  }, [isColor])
  const handleUpdateSize = useCallback(async () => {
    if (!isSize.sizeVarient[0].size || !uid) return
    try {
      const docRef = doc(db, 'ModelsMidlevel', uid)
      await updateDoc(docRef, { size: isSize.sizeVarient[0].size })
    } catch (error) {
      console.log(error)
    }
  }, [isSize])
  const handleUpdateImageAndText = useCallback(async () => {
    if (!isImageOrText.designs.originalImage || !uid) return
    try {
      const docRef = doc(db, 'ModelsMidlevel', uid)
      await updateDoc(docRef, { image: isImageOrText.designs.originalImage })
    } catch (error) {
      console.log(error)
    }
  }, [isImageOrText])

  useEffect(() => {
    handleSetUid()
    handleUpdateColor()
    handleUpdateSize()
    handleUpdateImageAndText()
  }, [handleSetUid, handleUpdateColor, handleUpdateSize, handleUpdateImageAndText])
  useEffect(() => {
    const Filtereddata = data?.find(
      (f) =>
        f.styles.toLowerCase() === isSelectedStyle.toLowerCase() &&
        f.gender.toLowerCase() === avatar.gender?.toLowerCase(),
    )
    setFilteredData(Filtereddata)
    // if (
    //   Filtereddata?.gender.toLowerCase() !== avatar?.gender?.toLowerCase() &&
    //   isSelectedStyle !== ''
    // ) {
    //   // Alert.alert(`Alert ${avatar?.gender}`, 'Not Available', [
    //   //   {
    //   //     text: 'Cancel',
    //   //     onPress: () => {
    //   //       setSteps(1)
    //   //     },
    //   //     style: 'cancel',
    //   //   },
    //   //   {
    //   //     text: 'OK',
    //   //     onPress: () => {
    //   //       setSteps(1)
    //   //     },
    //   //   },
    //   // ])
    //   setOpenModal(true)
    // }
  }, [isSelectedStyle, data, avatar])

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
      setLogin(true)
    }
    if (user && !phoneNumber) {
      setSignUp(true)
    }
    if (user && phoneNumber) {
      setOpenCheckout(true)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {!openCheckout && (
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
            isColor={isColor}
            setDone={setDone}
            dropDown={isDropDown}
            slideValue={slideValue}
            country={isSize.country}
            setDropDown={setDropDown}
            isOpenDesign={isOpenDesign}
            setOpenDesign={setOpenDesign}
            sizeVarient={isSize.sizeVarient[0]}
            isSelectedStyle={isSelectedStyle}
            handleDecreaseSteps={handleDecreaseSteps}
            handleIncreaseSteps={handleIncreaseSteps}
          />

          <View style={{ zIndex: 5, width: width, position: 'absolute', top: 0 }}>
            {isSteps === 1 && data && isDropDown && (
              <SelectStyle
                data={data}
                setDropDown={setDropDown}
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
              color={isColor}
              isImageOrText={isImageOrText}
              designs={Design}
              setOpenDesign={setOpenDesign}
              isDone={isDone}
              setDone={setDone}
              setImageOrText={setImageOrText}
            />
          )}
          {login && (
            <LoginModal
              onForgotClick={() => {
                setForgotmail(true), setLogin(false)
              }}
              onSignClick={() => {
                setSignUp(true), setLogin(false)
              }}
              onClose={() => setLogin(false)}
            />
          )}

          {signUp && (
            <SignupModal
              onLoginClick={() => {
                setLogin(true), setSignUp(false)
              }}
              onClose={() => setSignUp(false)}
            />
          )}
          {forgotMail && (
            <ForgotMail
              onLoginClick={() => {
                setLogin(true), setForgotmail(false)
              }}
              onClose={() => setForgotmail(false)}
            />
          )}
          {openModal && <AlertModal />}
        </View>
      )}
      {openCheckout && FilteredData && (
        // <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        <Checkout
          setOpenCheckout={setOpenCheckout}
          color={isColor}
          textAndImage={isImageOrText}
          description={FilteredData?.description}
          gender={avatar.gender as string}
          offerPrice={FilteredData?.offerPrice}
          price={FilteredData?.normalPrice}
          productImage={FilteredData?.productImage}
          productName={FilteredData?.productName}
          size={{ country: isSize.country, sizeVarient: isSize.sizeVarient[0] }}
          style={isSelectedStyle}
          id={FilteredData?.id}
          type='MidLevel'
        />
      )}
    </View>
  )
}

export default Medium

const styles = StyleSheet.create({})
